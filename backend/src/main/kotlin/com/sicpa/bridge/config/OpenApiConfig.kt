package com.sicpa.bridge.acapy.config

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.servers.Server
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
@OpenAPIDefinition(info = Info(title = "Sicpa Bridge API", version = "0.0.1"))
class OpenApiConfig {
    @Bean
    fun openAPI(): OpenAPI {
        return OpenAPI()
            .addServersItem(Server().url("/api/"))
    }
}