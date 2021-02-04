package com.sicpa.bridge.api.jsonld.domain

import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.data.WalletApiRepository
import com.sicpa.bridge.api.jsonld.domain.model.IssueCredentialRequest
import com.sicpa.bridge.api.jsonld.domain.model.Credential
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProofOptions
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import com.sicpa.bridge.api.signedCredential
import com.sicpa.bridge.core.BaseUseCase
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class SignCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val walletApiRepository: WalletApiRepository
) : BaseUseCase<VerifiableCredential, Credential>() {

    override suspend fun run(params: Credential): VerifiableCredential {

        val acaPyDid = walletApiRepository.getDid()

        val issueCredentialRequest = IssueCredentialRequest(
            credential = params,
            options = LinkedDataProofOptions(
                proofPurpose = "assertionMethod",
                verificationMethod = acaPyDid.publicDid
            )
        )

        val response = jsonldRepository.signCredential(credential = issueCredentialRequest, verKey = acaPyDid.verKey)

        return response.signedCredential<VerifiableCredential>()
            ?: throw throw ApiException.NotFoundException("Could not sign")
    }
}