package com.sicpa.bridge.api.jsonld.domain.model

import com.fasterxml.jackson.annotation.JsonProperty
import com.google.gson.annotations.SerializedName
import io.swagger.v3.oas.annotations.media.Schema

data class VerifiableCredential(
    @field:Schema(
        name = "@context",
        nullable = false,
        description = "The JSON-LD context of the credential.",
        example = "[\"https://www.w3.org/2018/credentials/v1\", \"https://www.w3.org/2018/credentials/examples/v1\"]"
    )
    @SerializedName("@context")
    @JsonProperty("@context")
    override val context: List<String>,
    @field:Schema(
        nullable = true,
        description = "The ID of the credential.",
        example = "http://example.gov/credentials/3732"
    )
    @SerializedName("id")
    override val id: String?,
    @field:Schema(
        nullable = false,
        description = "The JSON-LD type of the credential.",
        example = "[\"VerifiableCredential\", \"UniversityDegreeCredential\"]"
    )
    override val type: List<String>,
    @field:Schema(
        nullable = false,
        description = "A JSON-LD Verifiable com.sicpa.bridge.api.jsonld.domain.model.Credential Issuer.",
        example = "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd"
    )
    override val issuer: String,
    @field:Schema(
        nullable = false,
        description = "The issuanceDate",
        example = "2020-03-16T22:37:26.544Z"
    )
    override val issuanceDate: String,
    @field:Schema(
        nullable = true,
        description = "The expirationDate",
        example = "2020-03-16T22:37:26.544Z"
    )
    val expirationDate: String? = null,
    @field:Schema(
        nullable = false,
        description = "The subject",
        type = "object",
        example = "{ \"id\": \"did:example:123\", \"degree\": { \"type\": \"BachelorDegree\", \"name\": \"Bachelor of Science and Arts\" } }"
    )
    val credentialSubject: Any,
    val proof: LinkedDataProof,
) : BaseCredential(context = context, id = id, type = type, issuer = issuer, issuanceDate = issuanceDate)