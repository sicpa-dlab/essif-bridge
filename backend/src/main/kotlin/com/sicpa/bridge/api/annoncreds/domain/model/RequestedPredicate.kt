package com.sicpa.bridge.api.annoncreds.domain.model

import com.fasterxml.jackson.annotation.JsonCreator
import io.swagger.v3.oas.annotations.media.Schema

data class RequestedPredicate(
    @field:Schema(description = "A predicate name")
    val name: String,
    @field:Schema(description = "A predicate type")
    val predicateType: PredicateType,
    @field:Schema(description = "A predicate value")
    val predicateValue: Int,
    @field:Schema(description = "A list of predicate restrictions")
    val restrictions: List<Restriction>
) {
    enum class PredicateType(val value: String) {
        LESS_THAN("<"),
        LESS_THAN_OR_EQUAL_TO("<="),
        GREATER_THAN_OR_EQUAL_TO(">="),
        GREATER_THAN(">");
        companion object {
            @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
            @JvmStatic
            fun fromString(value: String): PredicateType {
                for (p in values()) {
                    if (p.value == value || p.name == value) {
                        return p
                    }
                }
                throw IllegalArgumentException("Unexpected value '$value'")
            }
        }
    }

    data class Restriction(
        @field:Schema(description = "A credential definition ID")
        val credentialDefinitionId: String,
        @field:Schema(description = "A schema ID")
        val schemaId: String? = null
    )
}
