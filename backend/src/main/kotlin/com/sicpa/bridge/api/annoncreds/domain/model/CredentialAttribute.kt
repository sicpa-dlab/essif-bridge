package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class CredentialAttribute(
    @field:Schema(description = "A credential attribute name")
    val name: String,
    @field:Schema(description = "A credential attribute value")
    val value: String
)
