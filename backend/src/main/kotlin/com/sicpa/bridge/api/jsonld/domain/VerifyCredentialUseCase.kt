package com.sicpa.bridge.api.jsonld.domain

import com.google.gson.Gson
import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.eidasProof
import com.sicpa.bridge.api.getLinkedDataProof
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import com.sicpa.bridge.api.toSingleProof
import com.sicpa.bridge.core.BaseUseCase
import com.sicpa.bridge.eidas.EidasBridgeRepository
import com.sicpa.bridge.train.TrainRepository
import com.sicpa.bridge.train.models.trainTermsOfUse
import org.springframework.stereotype.Service

@Service
class VerifyCredentialUseCase(
    val jsonldRepository: JsonldRepository,
    val eidasBridgeRepository: EidasBridgeRepository,
    val trainRepository: TrainRepository
) : BaseUseCase<VerificationResult, Any>() {

    val gson: Gson by lazy { Gson() }

    override suspend fun run(params: Any): VerificationResult {

        @Suppress("UNCHECKED_CAST")
        val paramsMap = params as Map<String, Any>

        val proof = paramsMap.getLinkedDataProof()
            ?: throw ApiException.NotFoundException("Could not find proof")

        val verifyRequest = jsonldRepository.verifyCredential(
            credential = params.toSingleProof(proof)
        )

        val results = arrayListOf<Pair<Boolean, String>>()
        results.add(Pair(verifyRequest.valid, "proof"))

        var verificationResult = VerificationResult(
            checks = arrayListOf(),
            warnings = arrayListOf(),
            errors = arrayListOf()
        )

        val eidasProof = params.eidasProof()
        if(verifyRequest.valid && eidasProof != null) {
            try {
                val eSealCheck = eidasBridgeRepository.verifyCredential(params)
                results.add(Pair(eSealCheck, "eidas"))
            } catch(ex: Exception) {
                verificationResult.warnings.add("could not verify eidas seal")
            }
        }

        val termsOfUse = params.trainTermsOfUse()
        if(verifyRequest.valid && termsOfUse != null) {
            try {
                val trustScheme = termsOfUse.trustScheme.first()
                val trainResult = trainRepository.verify(proof.verificationMethod.substringBefore("#"), trustScheme)
                trainResult.let {
                    verificationResult.info = it
                }

                results.add(Pair(trainResult != null, "train"))

            } catch(ex: Exception) {
                verificationResult.warnings.add("could not verify train trust scheme ")
            }
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
