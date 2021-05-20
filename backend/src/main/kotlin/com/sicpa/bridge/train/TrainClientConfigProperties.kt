package com.sicpa.bridge.train

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("train")
data class TrainClientConfigProperties(
    val url: String
)
