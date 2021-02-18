package com.sicpa.bridge.eidas

import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.cast
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof
import com.sicpa.eidasclient.api.SsiEidasBridgeApi
import com.sicpa.eidasclient.model.SignatureInput
import com.sicpa.eidasclient.model.VerifiableCredentialEsealed
import org.springframework.stereotype.Repository

@Repository
class EidasBridgeRepository(
    val eidasBridgeConfigProperties: EidasBridgeConfigProperties
) {

    private val ssiEidasBridgeApi: SsiEidasBridgeApi by lazy {
        SsiEidasBridgeApi().apply {
            apiClient.basePath = eidasBridgeConfigProperties.url
        }
    }

    private fun signCredential(credential: Any, issuerDid: String): VerifiableCredentialEsealed? {

        val signatureInput = SignatureInput().apply {
            issuer = issuerDid
            payload = credential
            password = eidasBridgeConfigProperties.certificatePassword
        }

        return ssiEidasBridgeApi.postEidasBridgeV1Signatures(signatureInput)
    }

    fun createProf(credential: Any, issuerDid: String): LinkedDataProof? {
        return signCredential(credential, issuerDid)?.proof.let { proofs ->
            cast<ArrayList<*>>(proofs)?.getEidasProof()
        }
    }

    @Throws(ApiException::class)
    fun verifyCredential(credential: Any): Boolean {

        val result = ssiEidasBridgeApi.postEidasBridgeV1SignatureValidations(credential)

        return result.errors.isEmpty()

    }

}