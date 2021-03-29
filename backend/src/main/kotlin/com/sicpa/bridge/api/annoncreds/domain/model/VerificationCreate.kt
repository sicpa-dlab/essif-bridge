package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class VerificationCreate(
    @field:Schema(example = "0", description = "The verification template id", nullable = false, required = true)
    val verificationTemplateId: Int,
    @field:Schema(example = "3fa85f64-5717-4562-b3fc-2c963f66afa6", description = "The connection id", nullable = false, required = true)
    @field:Pattern(regexp = Patterns.CONNECTION_ID)
    val connectionId: String,
    @field:Schema(description = "An optional comment")
    val comment: String?
)
