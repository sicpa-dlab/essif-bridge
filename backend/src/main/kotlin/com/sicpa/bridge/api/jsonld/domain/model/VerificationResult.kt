package com.sicpa.bridge.api.jsonld.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class VerificationResult(
    @field:Schema(
        nullable = false,
        description = "The checks performed",
        example = "[\"proof\"]"
    )
    val checks: List<String>,
    @field:Schema(
        nullable = false,
        description = "Warnings",
        example = "[]"
    )
    val warnings: List<String?>,
    @field:Schema(
        nullable = false,
        description = "Errors",
        example = "[]"
    )
    val errors: List<String?>
)