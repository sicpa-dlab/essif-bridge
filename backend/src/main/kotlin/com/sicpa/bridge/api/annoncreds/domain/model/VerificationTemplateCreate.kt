package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class VerificationTemplateCreate(
    @field:Schema(description = "The verificationTemplate name", nullable = false, required = true)
    val name: String,
    @field:Schema(nullable = false, required = true)
    val content: VerificationTemplateContent,
)
