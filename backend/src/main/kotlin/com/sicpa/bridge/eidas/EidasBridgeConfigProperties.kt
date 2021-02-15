package com.sicpa.bridge.eidas

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("eidas-bridge")
class EidasBridgeConfigProperties(
    val url: String,
    val certificatePassword: String
)