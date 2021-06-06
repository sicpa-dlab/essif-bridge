package com.sicpa.bridge.api.oidc.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class ResponseProfile(
    @field:Schema(nullable = false, required = true)
    val id: String,
    @field:Schema(nullable = false, required = true)
    val name: String,
    @field:Schema(nullable = false, required = true)
    val lastName: String,
)
