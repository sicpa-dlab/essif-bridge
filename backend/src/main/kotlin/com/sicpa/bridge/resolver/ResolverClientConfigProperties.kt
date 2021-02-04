package com.sicpa.bridge.resolver

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("universal-resolver")
data class ResolverClientConfigProperties(
    val url: String
)