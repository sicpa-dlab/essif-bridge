package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class CredentialDefinitionCreate(
    @field:Schema(example = "WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0", description = "Schema identifier", nullable = false, required = true)
    @field:Pattern(regexp = Patterns.SCHEMA_ID)
    val schemaId: String,
    @field:Schema(example = "default", description = "Credential definition identifier tag", nullable = false, required = true)
    val tag: String,
    @field:Schema(description = "Revocation supported flag", nullable = false, required = true)
    val supportRevocation: Boolean
)
