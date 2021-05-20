package com.sicpa.bridge.train

import com.sicpa.bridge.train.models.TrainResult
import com.sicpa.trainclient.api.TrainAtvApi
import com.sicpa.trainclient.model.TRAINATVRequestParams
import com.sicpa.trainclient.model.TRAINATVResult
import org.springframework.stereotype.Repository

@Repository
class TrainRepository(
    trainClientConfigProperties: TrainClientConfigProperties
) {

    private val trainBridgeApi: TrainAtvApi by lazy {

        TrainAtvApi().apply {
            apiClient.basePath = trainClientConfigProperties.url
        }

    }

    fun verify(issuer: String, trustScheme: String): TrainResult? {

        val params = TRAINATVRequestParams().apply {
            this.issuer = issuer
            this.trustSchemePointer = trustScheme
        }

        val trainResult = trainBridgeApi.apiV1SsiPost(params)

        if (trainResult.verificationStatus != TRAINATVResult.VerificationStatusEnum.OK) return  null

        return TrainResult(
            trustList = trustScheme,
            trustListUrl = trainResult.verificationResult?.trustListFoundAndLoaded ?: ""
        )
    }
}