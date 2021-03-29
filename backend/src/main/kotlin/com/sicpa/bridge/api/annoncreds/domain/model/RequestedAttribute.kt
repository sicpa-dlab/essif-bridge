package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class RequestedAttribute(
    @field:Schema(description = "List of attribute names")
    val names: List<String>,
    @field:Schema(
        description = "The attribute restrictions. At least one restriction should be valid in order for the verification to be " +
            "successful. (Not considering predicates, revocation requirements...)"
    )
    val restrictions: List<Restriction>
) {
    data class Restriction(
        @field:Schema(description = "A credential definition ID")
        val credentialDefinitionId: String,
        @field:Schema(description = "A schema ID")
        val schemaId: String? = null,
        @field:Schema(description = "Restrict attributes value", example = "{\"firstname\": \"John\"}")
        val valueRestrictions: Map<String, String>? = emptyMap()
    )
}
