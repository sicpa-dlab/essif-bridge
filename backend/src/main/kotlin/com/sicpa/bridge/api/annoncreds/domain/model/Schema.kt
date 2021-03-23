package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class Schema(
    @field:Pattern(regexp = Patterns.SCHEMA_ID)
    @field:Schema(description = "The schema's id", nullable = false, required = true)
    val id: String,
    @field:Schema(description = "The schema's name", nullable = false, required = true)
    val name: String,
    @field:Pattern(regexp = Patterns.VERSION)
    @field:Schema(description = "The schema's version", nullable = false, required = true)
    val version: String,
    @field:Schema(description = "The schema's attributes", nullable = false, required = true)
    val attributesName: List<String>
)
