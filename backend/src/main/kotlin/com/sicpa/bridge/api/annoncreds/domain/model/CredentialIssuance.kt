package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema
import java.time.OffsetDateTime

data class CredentialIssuance(
    @field:Schema(description = "A credential issuance ID", nullable = false, required = true)
    val issuanceId: String,
    @field:Schema(description = "Optional error message")
    val errorMessage: String?,
    @field:Schema(description = "State of the credential transaction", nullable = false, required = true)
    val state: String,
    val updatedAt: OffsetDateTime?,
    @field:Schema(nullable = false, required = true)
    val credential: Credential
)
