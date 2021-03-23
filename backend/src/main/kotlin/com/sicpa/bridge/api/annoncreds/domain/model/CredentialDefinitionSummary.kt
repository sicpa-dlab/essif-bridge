package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class CredentialDefinitionSummary(
    @field:Pattern(regexp = Patterns.CREDENTIAL_DEFINITION_ID)
    @field:Schema(description = "The credential definition's id", nullable = false, required = true)
    val id: String
)
