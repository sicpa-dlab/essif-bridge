package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class CredentialCreate(
    @field:Pattern(regexp = Patterns.CONNECTION_ID)
    @field:Schema(description = "A connection ID", example = "3fa85f64-5717-4562-b3fc-2c963f66afa6", nullable = false, required = true)
    val connectionId: String? = null,

    @field:Pattern(regexp = Patterns.SCHEMA_ID)
    @field:Schema(description = "A schema ID", nullable = false, required = true)
    val schemaId: String,

    @field:Pattern(regexp = Patterns.CREDENTIAL_DEFINITION_ID)
    @field:Schema(description = "A credential definition ID", nullable = false, required = true)
    val credentialDefinitionId: String,

    @field:Schema(description = "A human readable comment")
    val comment: String?,

    @field:Schema(description = "A list of credential attributes", nullable = false, required = true)
    val attributes: List<CredentialAttribute>
)
