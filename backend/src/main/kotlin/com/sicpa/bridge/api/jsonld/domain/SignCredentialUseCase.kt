package com.sicpa.bridge.api.jsonld.domain

import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.data.WalletApiRepository
import com.sicpa.bridge.api.jsonld.domain.model.IssueCredentialRequest
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProofOptions
import com.sicpa.bridge.core.BaseUseCase
import com.sicpa.bridge.eidas.EidasBridgeRepository
import org.springframework.stereotype.Service

@Service
class SignCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val walletApiRepository: WalletApiRepository,
    val eidasBridgeRepository: EidasBridgeRepository
) : BaseUseCase<Any, Any>() {

    override suspend fun run(params: Any): Any {

        val acaPyDid = walletApiRepository.getDid()

        val issueCredentialRequest = IssueCredentialRequest(
            credential = params,
            options = LinkedDataProofOptions(
                proofPurpose = "assertionMethod",
                verificationMethod = acaPyDid.publicDid
            )
        )

        val response = jsonldRepository.signCredential(credential = issueCredentialRequest, verKey = acaPyDid.verKey)

        val signed = response.signedDoc ?: throw throw ApiException.WrongCredential("Could not sign")

        val credential = (signed as Map<*, *>).toMutableMap()
        val credentialProof = mutableListOf(credential["proof"])

        eidasBridgeRepository.createProf(credential, acaPyDid.publicDid).let { eidasProof ->
            credentialProof.add(eidasProof)
        }

        credential["proof"] = credentialProof

        return credential

    }
}