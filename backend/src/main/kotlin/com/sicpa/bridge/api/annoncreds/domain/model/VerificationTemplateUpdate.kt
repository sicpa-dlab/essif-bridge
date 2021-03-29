package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class VerificationTemplateUpdate(
    @field:Schema(example = "example", description = "The verification template name")
    val name: String?,
    @field:Schema(description = "The verification template content")
    val content: VerificationTemplateContent?,
)
