package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema
import java.time.OffsetDateTime

data class VerificationRequest(
    @field:Schema(description = "The verification request name")
    val name: String,
    @field:Schema(description = "The requested attributes")
    val requestedAttributes: List<RequestedAttribute>,
    @field:Schema(description = "The requested predicates")
    val requestedPredicates: List<RequestedPredicate>,
    @field:Schema(description = "The date at which the credential should be valid")
    val validAt: OffsetDateTime? = null
)
