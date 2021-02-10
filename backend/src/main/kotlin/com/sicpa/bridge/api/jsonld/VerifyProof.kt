package com.sicpa.bridge.api.jsonld

import com.sicpa.bridge.api.jsonld.domain.VerifyProofUseCase
import com.sicpa.bridge.api.jsonld.domain.model.VerifiablePresentation
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "JSON-LD Verification")
@RequestMapping("/presentations")
class VerifyProof(
    val  verifyProofUseCase: VerifyProofUseCase
) {

    @PostMapping(
        "/verify",
        produces = ["application/json"]
    )

    @io.swagger.v3.oas.annotations.parameters.RequestBody(
        content = [
            Content(
                schema = Schema(implementation = VerifiablePresentation::class)
            ),
        ]
    )

    suspend fun verityCredential(
        @RequestBody
        verifiablePresentation: Any
    ): ResponseEntity<VerificationResult> {

        val valid = verifyProofUseCase.invoke(verifiablePresentation)
        var errors: List<String> = emptyList()
        if(!valid) {
            errors = listOf(VerifyCredential.checkType)
        }

        val verificationResult = VerificationResult(
            checks = listOf(VerifyCredential.checkType),
            warnings = emptyList(),
            errors = errors
        )

        val httpStatus = if (valid) HttpStatus.OK else HttpStatus.BAD_REQUEST

        return ResponseEntity(verificationResult, httpStatus)
    }
}