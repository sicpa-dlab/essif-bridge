package com.sicpa.bridge.api.annoncreds

import com.sicpa.bridge.api.annoncreds.domain.ConnectionsUseCase
import com.sicpa.bridge.api.annoncreds.domain.SchemasUseCase
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@Tag(name = "Schemas", description = "The Schemas API")
@RequestMapping("/schemas")
class Schemas (
    private val schemasUseCase: SchemasUseCase
        ) {

    @Operation(
        summary = "Create a new schema"
    )
    @PostMapping(
        produces = ["application/json"]
    )
   suspend fun schemaPost(
        @RequestBody
        schemaCreate: SchemaCreate
    ): SchemaSummary {
        return schemasUseCase.invoke(schemaCreate)
    }




}