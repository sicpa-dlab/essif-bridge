package com.sicpa.bridge.api.jsonld.domain

import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.data.WalletApiRepository
import com.sicpa.bridge.api.jsonld.domain.model.IssueCredentialRequest
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProofOptions
import com.sicpa.bridge.core.BaseUseCase
import org.springframework.stereotype.Service

@Service
class SignCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val walletApiRepository: WalletApiRepository,
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

        // return proof as array
        val credential = (signed as Map<*, *>).toMutableMap()
        credential["proof"] = listOf(credential["proof"])
        return credential

    }
}