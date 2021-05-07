package com.sicpa.bridge.api.annoncreds

import com.sicpa.bridge.api.annoncreds.domain.VerificationTemplateUseCase
import com.sicpa.bridge.api.annoncreds.domain.VerificationUseCase
import com.sicpa.bridge.api.annoncreds.domain.model.Verification
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationCreate
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationTemplate
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationTemplateCreate
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import javax.validation.Valid
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "Verifications", description = "The Verifications API")
@CrossOrigin

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