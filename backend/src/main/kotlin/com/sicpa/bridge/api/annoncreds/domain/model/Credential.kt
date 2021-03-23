package com.sicpa.bridge.api.annoncreds.domain.model

import com.fasterxml.jackson.annotation.JsonAlias
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

@JsonIgnoreProperties(ignoreUnknown = true)
data class Credential(
    @JsonAlias("referent")
    val credentialId: String?,
    @field:Pattern(regexp = Patterns.SCHEMA_ID)
    @field:Schema(description = "A schema ID")
    @JsonAlias("schema_id")
    val schemaId: String?,
    @field:Pattern(regexp = Patterns.CREDENTIAL_DEFINITION_ID)
    @field:Schema(description = "A credential definition ID")
    @JsonAlias("cred_def_id")
    val credentialDefinitionId: String?,
    @field:Schema(description = "A human readable comment")
    val comment: String?,
    @JsonAlias("credential_proposal")
    val credentialProposal: CredentialProposal
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    data class CredentialProposal(
        @field:Schema(description = "A list of credential attributes")
        val attributes: List<CredentialAttribute>
    )
}
