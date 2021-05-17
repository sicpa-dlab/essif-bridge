package com.sicpa.bridge.train

import com.sicpa.trainclient.api.TrainAtvApi

class TrainRepository {

    private val trainBridgeApi: TrainAtvApi by lazy {
        TrainAtvApi().apply {
            apiClient.basePath = "http://atvtrain3-env.eba-gewjbrmq.eu-central-1.elasticbeanstalk.com"
        }
    }

    fun verify(issuer: String, trustScheme: String): Boolean {
        return trainBridgeApi.atvtrainApiV1SsiPost(issuer, trustScheme).verificationResult ?: false
    }
}