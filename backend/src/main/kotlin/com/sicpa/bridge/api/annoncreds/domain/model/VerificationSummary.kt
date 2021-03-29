package com.sicpa.bridge.api.annoncreds.domain.model

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

data class VerificationSummary(
    @field:Schema(example = "ac32f24e-2f90-4e90-9427-c59482078a4b", description = "The verification id")
    val verificationId: String,

    @field:Schema(example = "example", description = "The name of the validation")
    @JsonProperty("name") val name: String
)
