package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema
import java.time.OffsetDateTime

data class VerificationTemplateContent(
    @field:Schema(
        description = "The requested attributes. In order for the verification to be successful, all requested attribute should " +
                "be validated"
    )
    val requestedAttributes: List<RequestedAttribute> = emptyList(),
    @field:Schema(
        description = "The requested predicates. In order for the verification to be successful, all requested predicates " +
                "should be validated"
    )
    val requestedPredicates: List<RequestedPredicate> = emptyList(),
    val revocationRequirement: RevocationRequirement?
) {
    data class RevocationRequirement(
        @field:Schema(description = "Date at which the credential should be valid")
        val validAt: OffsetDateTime?,
        @field:Schema(description = "Defines if the credential should be valid at the current date")
        val validNow: Boolean?
    )
}
