package com.sicpa.bridge

import com.sicpa.bridge.config.AcaPyClientConfigProperties
import com.sicpa.bridge.eidas.EidasBridgeConfigProperties
import com.sicpa.bridge.resolver.ResolverClientConfigProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(
	AcaPyClientConfigProperties::class,
	ResolverClientConfigProperties::class,
	EidasBridgeConfigProperties::class
)
class BridgeApplication

fun main(args: Array<String>) {
	runApplication<BridgeApplication>(*args)
}
