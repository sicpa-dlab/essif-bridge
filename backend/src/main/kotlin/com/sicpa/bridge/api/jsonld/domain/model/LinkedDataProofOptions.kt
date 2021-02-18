package com.sicpa.bridge.api.jsonld.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class LinkedDataProofOptions(
    @field:Schema(
        nullable = false,
        description = "The URI of the verificationMethod used for the proof. If omitted a default assertionMethod will be used.",
        example = "verificationMethod"
    )
    val verificationMethod: String,
    @field:Schema(
        nullable = false,
        description = "The purpose of the proof. If omitted \"assertionMethod\" will be used.",
        example = "assertionMethod"
    )
    val proofPurpose: String,
    @field:Schema(
        nullable = true,
        description = "The date of the proof. If omitted system time will be used.",
        example = "2020-04-02T18:48:36Z"
    )
    val created: String? = null,
    @field:Schema(
        nullable = true,
        description = "The domain of the proof.",
        example = "example.com"
    )
    val domain: String? = null,
    @field:Schema(
        nullable = true,
        description = "The challenge of the proof.",
        example = "d436f0c8-fbd9-4e48-bbb2-55fc5d0920a8"
    )
    val challenge: String? = null
)