package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class VerificationTemplate(
    @field:Schema(description = "The verificationTemplate id", nullable = false, required = true)
    val id: Int,
    @field:Schema(example = "example", description = "The verificationTemplate name", nullable = false, required = true)
    val name: String,
    @field:Schema(nullable = false, required = true)
    var content: VerificationTemplateContent
)
