package com.sicpa.bridge.eidas

import com.sicpa.bridge.api.cast
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof
import com.sicpa.eidasclient.api.SsiEidasBridgeApi
import com.sicpa.eidasclient.model.SignatureInput
import com.sicpa.eidasclient.model.VerifiableCredentialEsealed
import org.springframework.stereotype.Repository

@Repository
class EidasBridgeRepository() {

    private val ssiEidasBridgeApi: SsiEidasBridgeApi by lazy {
        SsiEidasBridgeApi().apply {
            apiClient.basePath = "https://api.vidchain.net"
        }
    }

    private fun signCredential(credential: Any): VerifiableCredentialEsealed? {
        val signatureInput = SignatureInput().apply {
            issuer = "did:key:zQ3shtxV1FrJfhqE1dvxYRcCknWNjHc3c5X1y3ZSoPDi2aur2"
            payload = credential
            password = "vidchain"
        }
        return ssiEidasBridgeApi.postEidasBridgeV1Signatures(signatureInput)
    }

    fun createProf(credential: Any): LinkedDataProof? {
        return signCredential(credential)?.proof.let { proofs ->
            cast<ArrayList<*>>(proofs)?.getEidasProof()
        }
    }

    fun verifyCredential(credential: Any): Boolean {

        val result = ssiEidasBridgeApi.postEidasBridgeV1SignatureValidations(credential)

        return result.errors.isEmpty()

    }

}