package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class VerificationTemplateParam(
    @field:Schema(nullable = false, required = true)
    val name: String,
    @field:Schema(nullable = false, required = true)
    val content: VerificationTemplateContent
)
