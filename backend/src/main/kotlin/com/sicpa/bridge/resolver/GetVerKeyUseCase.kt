package com.sicpa.bridge.resolver

import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof
import org.springframework.stereotype.Service

@Service
class GetVerKeyUseCase(
    val didDocResolverRepository: DidDocResolverRepository
) {
    operator fun invoke(proof: LinkedDataProof): String? = didDocResolverRepository.getVerKey(proof)
}