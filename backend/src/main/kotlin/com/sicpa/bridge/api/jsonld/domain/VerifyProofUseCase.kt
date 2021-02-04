package com.sicpa.bridge.api.jsonld.domain

import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.domain.model.VerifiablePresentation
import com.sicpa.bridge.resolver.DidDocResolverRepository
import org.springframework.stereotype.Service

@Service
class VerifyProofUseCase(
    val jsonldRepository: JsonldRepository,
    val didDocResolverRepository: DidDocResolverRepository
) {

    operator fun invoke(presentation: VerifiablePresentation): Boolean {

        val verKey = didDocResolverRepository.getVerKey(presentation.proof.verificationMethod) ?: throw ApiException.NotFoundException("Could not find verkey")

        val verifyRequest = jsonldRepository.verifyProof(
            presentation = presentation,
            verKey = verKey
        )

        return verifyRequest.valid
    }
}