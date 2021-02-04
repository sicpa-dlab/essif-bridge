package com.sicpa.bridge.api.jsonld

import com.sicpa.bridge.api.jsonld.domain.VerifyProofUseCase
import com.sicpa.bridge.api.jsonld.domain.model.VerifiablePresentation
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import io.swagger.v3.oas.annotations.tags.Tag
import javax.validation.Valid
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
    fun verityCredential(
        @RequestBody
        @Valid
        verifiablePresentation: VerifiablePresentation
    ): VerificationResult {

        val valid = verifyProofUseCase.invoke(verifiablePresentation)
        var errors: List<String> = emptyList()
        if(!valid) {
            errors = listOf(VerifyCredential.checkType)
        }

        return VerificationResult(
            checks = listOf(VerifyCredential.checkType),
            warnings = emptyList(),
            errors = errors
        )
    }
}