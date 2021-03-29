package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class SchemaCreate(
    @field:Schema(example = "prefs", required = true, description = "Schema name", nullable = false)
    val name: String,
    @field:Pattern(regexp = Patterns.VERSION)
    @field:Schema(example = "1.0", required = true, description = "Schema version", nullable = false)
    val version: String,
    @field:Schema(required = true, description = "List of schema attributes", nullable = false)
    val attributesName: List<String>
)
