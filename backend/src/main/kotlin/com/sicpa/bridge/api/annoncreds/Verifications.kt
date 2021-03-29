package com.sicpa.bridge.api.annoncreds

import com.sicpa.bridge.api.annoncreds.domain.VerificationTemplateUseCase
import com.sicpa.bridge.api.annoncreds.domain.VerificationUseCase
import com.sicpa.bridge.api.annoncreds.domain.model.*
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@Tag(name = "Verifications", description = "The Verifications API")
class Verifications (
    private val verificationUseCase: VerificationUseCase,
    private val verificationTemplateUseCase : VerificationTemplateUseCase

){

    @Operation(
        summary = "Create a new Verification"
    )
    @RequestMapping(
        value = ["/verifications"],
        produces = ["application/json"],
        consumes = ["application/json"],
        method = [RequestMethod.POST]
    )
    suspend fun verificationsPost(
        @Valid
        @RequestBody
        verificationCreate: VerificationCreate
    ): Verification {
        return verificationUseCase.invoke(verificationCreate)
    }

    @Operation(
        summary = "Create a new Verification Template"
    )
    @PostMapping(
        value = ["/verification-templates"],
        produces = ["application/json"],
        consumes = ["application/json"]
    )
    suspend fun verificationTemplatesPost(
        @Valid
        @RequestBody verificationTemplateCreate: VerificationTemplateCreate
    ): VerificationTemplate {
       return verificationTemplateUseCase.invoke(verificationTemplateCreate)
    }


}