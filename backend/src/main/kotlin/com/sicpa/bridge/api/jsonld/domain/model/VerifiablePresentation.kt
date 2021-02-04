package com.sicpa.bridge.api.jsonld.domain.model

import com.fasterxml.jackson.annotation.JsonProperty
import com.google.gson.annotations.SerializedName
import io.swagger.v3.oas.annotations.media.Schema

data class VerifiablePresentation(
    @field:Schema(
        name = "@context",
        nullable = false,
        description = "The JSON-LD context of the presentation.",
        example = "[\"https://www.w3.org/2018/credentials/v1\", \"https://www.w3.org/2018/credentials/examples/v1\"]"
    )
    @SerializedName("@context")
    @JsonProperty("@context")
    val context: List<String>,

    @field:Schema(
        nullable = false,
        description = "The holder",
        example = "did:example:123"
    )
    val holder: String,

    @field:Schema(
        nullable = false,
        description = "The JSON-LD type of the presentation.",
        example = "VerifiablePresentation"
    )
    val type: String,
    val verifiableCredential: VerifiableCredential,
    val proof: LinkedDataProof
)