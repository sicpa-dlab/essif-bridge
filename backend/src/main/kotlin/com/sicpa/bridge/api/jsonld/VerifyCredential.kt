package com.sicpa.bridge.api.jsonld

import com.sicpa.bridge.api.jsonld.domain.VerifyCredentialUseCase
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "JSON-LD Verification", description = "Verify a given credential.")
@RequestMapping("/credentials")
class VerifyCredential(
    val  verifyCredentialUseCase: VerifyCredentialUseCase
) {

    companion object {
        const val checkType = "proof"
    }

    @PostMapping(
        "/verify",
        produces = ["application/json"]
    )

    @ApiResponses(value = [
        ApiResponse(
            responseCode = "200",
            description = "Result",
            content = [
                Content(
                    schema = Schema(implementation = VerificationResult::class)
                )
            ]
        ),
        ApiResponse(responseCode = "400",
            description = "invalid input!",
            content = [Content(schema = Schema(type = "object"))]),
        ApiResponse(responseCode = "500", description = "error!", content = [Content(schema = Schema(type = "object"))])
    ])

    @io.swagger.v3.oas.annotations.parameters.RequestBody(
        content = [
            Content(
                schema = Schema(implementation = VerifiableCredential::class)
            ),
        ]
    )

    suspend fun verityCredential(
        @RequestBody
        verifiableCredential: Any
    ): VerificationResult {

        val valid = verifyCredentialUseCase.invoke(verifiableCredential)
        var errors: List<String> = emptyList()
        if(!valid) {
            errors = listOf(checkType)
        }

        return VerificationResult(
            checks = listOf(checkType),
            warnings = emptyList(),
            errors = errors)
    }
}