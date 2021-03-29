package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema
import java.time.OffsetDateTime

data class Verification(
    @field:Schema(example = "ac32f24e-2f90-4e90-9427-c59482078a4b", description = "The verification id")
    val verificationId: String,
    @field:Schema(example = "3fa85f64-5717-4562-b3fc-2c963f66afa6", description = "The connection id")
    val connectionId: String,
    @field:Schema(description = "The verification request")
    val verificationRequest: VerificationRequest,
    @field:Schema(description = "The verification state")
    val state: State,
    @field:Schema(example = "2020-11-12 06:27:47.780760Z", description = "The creation date ")
    val createdAt: OffsetDateTime,
    @field:Schema(example = "2020-11-12 06:27:50.407160Z", description = "The update date")
    val updatedAt: OffsetDateTime
) {
    enum class State {
        SUCCESS, PENDING, FAILURE, ERROR
    }
}
