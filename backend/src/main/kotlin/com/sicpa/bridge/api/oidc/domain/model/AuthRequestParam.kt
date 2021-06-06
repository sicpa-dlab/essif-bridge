package com.sicpa.bridge.api.oidc.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class AuthRequestParam(
    @field:Schema(nullable = false, required = true)
    val clientId: String,
    @field:Schema(nullable = false, required = true)
    val credentialId: String,
)
