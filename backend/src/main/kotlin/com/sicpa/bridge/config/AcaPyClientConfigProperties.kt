package com.sicpa.bridge.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("aca-py-client")
data class AcaPyClientConfigProperties(
    val url: String
)