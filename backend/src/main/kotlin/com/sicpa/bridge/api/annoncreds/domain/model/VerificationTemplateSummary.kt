package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class VerificationTemplateSummary(
    @field:Schema(example = "0", description = "The verificationTemplate id")
    val id: Int?,

    @field:Schema(example = "example", description = "The verificationTemplate name")
    val name: String
)
