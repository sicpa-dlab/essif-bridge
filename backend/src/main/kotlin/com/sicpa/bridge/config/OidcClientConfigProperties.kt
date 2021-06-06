package com.sicpa.bridge.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("oicd-client")
data class OidcClientConfigProperties(
    val url: String
)