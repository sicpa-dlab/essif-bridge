package com.sicpa.bridge.api.jsonld.domain

import com.google.gson.Gson
import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.getLinkedDataProof
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import com.sicpa.bridge.api.toSingleProof
import com.sicpa.bridge.core.BaseUseCase
import com.sicpa.bridge.eidas.EidasBridgeRepository
import com.sicpa.bridge.resolver.DidDocResolverRepository
import org.springframework.stereotype.Service

@Service
class VerifyCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val didDocResolverRepository: DidDocResolverRepository,
    val eidasBridgeRepository: EidasBridgeRepository
) : BaseUseCase<VerificationResult, Any>() {

    val gson: Gson by lazy { Gson() }

    override suspend fun run(params: Any): VerificationResult {

        @Suppress("UNCHECKED_CAST")
        val proof = (params as Map<String, Any>).getLinkedDataProof()
            ?: throw ApiException.NotFoundException("Could not find proof")

        val verKey = didDocResolverRepository.getVerKey(proof.verificationMethod)
            ?: throw ApiException.NotFoundException("Could not find verkey")

        val verifyRequest = jsonldRepository.verifyCredential(
            credential = params.toSingleProof(proof),
            verKey = verKey
        )
        val results = arrayListOf<Pair<Boolean, String>>()
        results.add(Pair(verifyRequest.valid, "proof"))

        val verificationResult = VerificationResult(
            checks = arrayListOf<String>(),
            warnings = arrayListOf<String>(),
            errors = arrayListOf<String>()
        )

        try {
            val eSealCheck = eidasBridgeRepository.verifyCredential(params)
            results.add(Pair(eSealCheck, "eidas"))
        } catch(ex: Exception) {
            verificationResult.warnings.add("could not verify eidas seal")
        }


        results.map { result ->
            when(result.first) {
                true -> verificationResult.checks.add(result.second)
                false -> verificationResult.errors.add(result.second)
            }
        }

        return verificationResult
    }

}
