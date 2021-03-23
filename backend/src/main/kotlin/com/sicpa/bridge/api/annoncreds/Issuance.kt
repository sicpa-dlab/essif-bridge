package com.sicpa.bridge.api.annoncreds

import com.sicpa.bridge.api.annoncreds.domain.ConnectionsUseCase
import com.sicpa.bridge.api.annoncreds.domain.IssuanceUseCase
import com.sicpa.bridge.api.annoncreds.domain.SchemasUseCase
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialIssuance
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid


@RestController
@Tag(name = "Credentials Issuance", description = "The Credentials Issuance API")
class Issuance(
    private val issuanceUseCase: IssuanceUseCase
) {

    @Operation(summary = "Issue new credentials")
    @PostMapping(
        value = ["credentials-issuance"],
        produces = ["application/json"]
    )
    suspend fun issuanceCredentialPost(
        @RequestBody
        credentialCreate: CredentialCreate
    ): CredentialIssuance {
        return issuanceUseCase.invoke(credentialCreate)
    }


}