package com.sicpa.bridge.api.jsonld.domain

import com.google.gson.Gson
import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.getJsonLdProof
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import com.sicpa.bridge.api.toModel
import com.sicpa.bridge.api.toSingleProof
import com.sicpa.bridge.core.BaseUseCase
import com.sicpa.bridge.resolver.DidDocResolverRepository
import org.springframework.stereotype.Service

@Service
class VerifyCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val didDocResolverRepository: DidDocResolverRepository
) : BaseUseCase<Boolean, Any>() {

    val gson: Gson by lazy { Gson() }

    override suspend fun run(credential: Any): Boolean {

        val verifiableCredential = gson.toJson(credential).toModel<VerifiableCredential>()

        val proof = verifiableCredential?.proof?.getJsonLdProof()
            ?: throw ApiException.NotFoundException("Could not find proof")

        val verKey = didDocResolverRepository.getVerKey(proof.verificationMethod)
            ?: throw ApiException.NotFoundException("Could not find verkey")

        val verifyRequest = jsonldRepository.verifyCredential(
            credential = credential.toSingleProof(proof),
            verKey = verKey
        )

        return verifyRequest.valid
    }
}