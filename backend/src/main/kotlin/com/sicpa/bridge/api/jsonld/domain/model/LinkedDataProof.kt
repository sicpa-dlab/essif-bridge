package com.sicpa.bridge.api.jsonld.domain.model

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "A JSON-LD Linked Data proof.")
data class LinkedDataProof(
    @field:Schema(
        nullable = false,
        description = "Linked Data Signature Suite used to produce proof.",
        example = "Ed25519Signature2018"
    )
    val type: String,
    @field:Schema(
        nullable = false,
        description = "Date the proof was created.",
        example = "2020-04-02T18:28:08Z"
    )
    val created: String,
    @field:Schema(
        nullable = false,
        description = "Verification Method used to verify proof.",
        example = "did:example:123#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN"
    )
    val verificationMethod: String,
    @field:Schema(
        nullable = false,
        description = "The purpose of the proof to be used with verificationMethod.",
        example = "assertionMethod"
    )
    val proofPurpose: String,
    @field:Schema(
        nullable = false,
        description = "Detached JSON Web Signature",
        example = "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..YtqjEYnFENT7fNW-COD0HAACxeuQxPKAmp4nIl8jYAu__6IH2FpSxv81w-l5PvE1og50tS9tH8WyXMlXyo45CA"
    )
    val jws: String,

    val cades: String? = null
)