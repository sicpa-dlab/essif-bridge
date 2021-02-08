package com.sicpa.bridge.api.jsonld

import com.sicpa.bridge.api.jsonld.domain.SignCredentialUseCase
import com.sicpa.bridge.api.jsonld.domain.model.Credential
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController


@RestController
@Tag(name = "JSON-LD Credentials", description = "Issues a JSON-LD credential and returns it in the response body.")
@RequestMapping("/credentials")
class IssueCredential(
    var signCredentialUseCase: SignCredentialUseCase,
) {
    @PostMapping(
        "/issue",
        produces = ["application/json"],
        consumes = ["application/json"]
    )

    @ApiResponses(value = [
        ApiResponse(
            responseCode = "201",
            description = "Credential successfully issued!",
            content = [
                Content(
                    schema = Schema(implementation = VerifiableCredential::class)
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
                schema = Schema(implementation = Credential::class)
            ),
        ]
    )

    @ResponseStatus(value = HttpStatus.CREATED)
    suspend fun issueCredential(
        @RequestBody
        credential: Any,
    ): Any = signCredentialUseCase.invoke(credential)

}