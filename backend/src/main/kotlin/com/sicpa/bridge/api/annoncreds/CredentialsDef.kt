package com.sicpa.bridge.api.annoncreds

import com.sicpa.bridge.api.annoncreds.domain.CredentialsDefUseCase
import com.sicpa.bridge.api.annoncreds.domain.SchemasUseCase
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionSummary
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@Tag(name = "Credential Definitions", description = "The Credential Definitions API")
@RequestMapping("/credential-definitions")
class CredentialsDef (
    private val credentialsDefUseCase: CredentialsDefUseCase
        ) {

    @Operation(
        summary = "Create a new credentialDefinition"
    )
    @PostMapping(
        produces = ["application/json"]
    )
    suspend fun credentialDefinitionPost(
        @RequestBody
        credentialDefinitionCreate: CredentialDefinitionCreate
    ): CredentialDefinitionSummary {
        return credentialsDefUseCase.invoke(credentialDefinitionCreate)
    }







}