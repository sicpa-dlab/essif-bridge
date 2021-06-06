package com.sicpa.bridge.api.oidc.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class AuthRequestResponse(
    @field:Schema(nullable = false, required = true)
    val url: String,
)
