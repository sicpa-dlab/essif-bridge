package com.sicpa.bridge.resolver

import org.springframework.stereotype.Service

@Service
class GetVerKeyUseCase(
    val didDocResolverRepository: DidDocResolverRepository
) {
    operator fun invoke(verificationMethod: String): String? = didDocResolverRepository.getVerKey(verificationMethod)
}