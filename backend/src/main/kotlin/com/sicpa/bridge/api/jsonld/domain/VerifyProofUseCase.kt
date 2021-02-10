package com.sicpa.bridge.api.jsonld.domain

import com.google.gson.Gson
import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.getLinkedDataProof
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.toSingleProof
import com.sicpa.bridge.core.BaseUseCase
import com.sicpa.bridge.resolver.DidDocResolverRepository
import org.springframework.stereotype.Service

@Service
class VerifyProofUseCase(
    val jsonldRepository: JsonldRepository,
    val didDocResolverRepository: DidDocResolverRepository
) : BaseUseCase<Boolean, Any>() {

    val gson: Gson by lazy { Gson() }

    override suspend fun run(params: Any): Boolean {

        @Suppress("UNCHECKED_CAST")
        val proof = (params as Map<String, Any>).getLinkedDataProof()
            ?: throw ApiException.NotFoundException("Could not find proof")

        val verKey = didDocResolverRepository.getVerKey(proof.verificationMethod)
            ?: throw ApiException.NotFoundException("Could not find verkey")

        val verifyRequest = jsonldRepository.verifyProof(
            presentation = params.toSingleProof(proof),
            verKey = verKey
        )

        return verifyRequest.valid
    }

}