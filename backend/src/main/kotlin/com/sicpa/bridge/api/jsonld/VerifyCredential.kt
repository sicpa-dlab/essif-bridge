package com.sicpa.bridge.api.jsonld

import com.sicpa.bridge.api.jsonld.domain.VerifyCredentialUseCase
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import io.swagger.v3.oas.annotations.tags.Tag
import javax.validation.Valid
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
    fun verityCredential(
        @RequestBody
        @Valid
        verifiableCredential: VerifiableCredential
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