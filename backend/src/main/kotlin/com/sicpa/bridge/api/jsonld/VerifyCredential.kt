package com.sicpa.bridge.api.jsonld

import com.sicpa.bridge.api.jsonld.domain.VerifyCredentialUseCase
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredential
import com.sicpa.bridge.api.jsonld.domain.model.VerifiableCredentialMultipleProof
import com.sicpa.bridge.api.jsonld.domain.model.VerificationResult
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
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
                examples = [
                    ExampleObject( name = "Verifiable Credential", value = "{ \"@context\": [ \"https://www.w3.org/2018/credentials/v1\", \"https://www.w3.org/2018/credentials/examples/v1\" ], \"id\": \"http://example.gov/credentials/3732\", \"type\": [ \"VerifiableCredential\", \"UniversityDegreeCredential\" ], \"issuer\": \"did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd\", \"issuanceDate\": \"2020-03-16T22:37:26.544Z\", \"expirationDate\": \"2020-03-16T22:37:26.544Z\", \"credentialSubject\": { \"id\": \"did:example:123\", \"degree\": { \"type\": \"BachelorDegree\", \"name\": \"Bachelor of Science and Arts\" } }, \"proof\": { \"type\": \"Ed25519Signature2018\", \"created\": \"2020-04-02T18:28:08Z\", \"verificationMethod\": \"did:example:123#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN\", \"proofPurpose\": \"assertionMethod\", \"jws\": \"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..YtqjEYnFENT7fNW-COD0HAACxeuQxPKAmp4nIl8jYAu__6IH2FpSxv81w-l5PvE1og50tS9tH8WyXMlXyo45CA\" } }"),
                    ExampleObject( name = "Multiple Proof Verifiable Credential", value = "{ \"@context\": [ \"https://www.w3.org/2018/credentials/v1\", \"https://www.w3.org/2018/credentials/examples/v1\" ], \"id\": \"http://example.gov/credentials/3732\", \"type\": [ \"VerifiableCredential\", \"UniversityDegreeCredential\" ], \"issuer\": \"did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd\", \"issuanceDate\": \"2020-03-16T22:37:26.544Z\", \"expirationDate\": \"2020-03-16T22:37:26.544Z\", \"credentialSubject\": { \"id\": \"did:example:123\", \"degree\": { \"type\": \"BachelorDegree\", \"name\": \"Bachelor of Science and Arts\" } }, \"proof\": [{ \"type\": \"Ed25519Signature2018\", \"created\": \"2020-04-02T18:28:08Z\", \"verificationMethod\": \"did:example:123#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN\", \"proofPurpose\": \"assertionMethod\", \"jws\": \"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..YtqjEYnFENT7fNW-COD0HAACxeuQxPKAmp4nIl8jYAu__6IH2FpSxv81w-l5PvE1og50tS9tH8WyXMlXyo45CA\" }] }")
                           ],
                schema = Schema(name = "Verifiable Credential", oneOf = [
                    VerifiableCredential::class,
                    VerifiableCredentialMultipleProof::class
                ]),
            )
        ]
    )

    suspend fun verityCredential(
        @RequestBody
        verifiableCredential: Any
    ): ResponseEntity<VerificationResult> {

        val verificationResult = verifyCredentialUseCase.invoke(verifiableCredential)

        val valid = verificationResult.checks.isNotEmpty() && verificationResult.errors.isEmpty()

        val httpStatus = if (valid) HttpStatus.OK else HttpStatus.BAD_REQUEST

        return ResponseEntity(verificationResult, httpStatus)
    }
}