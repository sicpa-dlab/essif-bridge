package com.sicpa.bridge.api.oidc.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class AuthResponseCallback(
    @field:Schema(nullable = false, required = true)
    val id_token: String,
    @field:Schema(nullable = false, required = true)
    val state: String,
    @field:Schema(nullable = false, required = true)
    val login_challenge: String,
)
