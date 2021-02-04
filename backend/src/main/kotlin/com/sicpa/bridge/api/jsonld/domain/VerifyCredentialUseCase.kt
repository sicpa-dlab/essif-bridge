package com.sicpa.bridge.api.jsonld.domain

import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import com.sicpa.bridge.resolver.DidDocResolverRepository
import org.springframework.stereotype.Service

@Service
class VerifyCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val didDocResolverRepository: DidDocResolverRepository
) {

    operator fun invoke(credential: VerifiableCredential): Boolean {

        val verKey = didDocResolverRepository.getVerKey(credential.proof.verificationMethod) ?: throw ApiException.NotFoundException("Could not find verkey")

        val verifyRequest = jsonldRepository.verifyCredential(
            credential = credential,
            verKey = verKey
        )

        return verifyRequest.valid
    }
}