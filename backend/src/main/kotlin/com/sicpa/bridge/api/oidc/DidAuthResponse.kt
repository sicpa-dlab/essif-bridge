package com.sicpa.bridge.api.oidc

import com.sicpa.bridge.api.oidc.domain.AuthResponseUseCase
import com.sicpa.bridge.api.oidc.domain.model.AuthResponseCallback
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mu.KLogging
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "OpenID Connect Connect", description = "OpenID Connect API")
@RequestMapping("/oidc/didauthresponse/{clientId}", method = [RequestMethod.POST])
@CrossOrigin
class DidAuthResponse(
    private val authResponseUseCase: AuthResponseUseCase,
    private val simpMessagingTemplate: SimpMessagingTemplate,
) {

    companion object : KLogging()

    @Operation(
        summary = "Processes Auth Response"
    )

    @PostMapping(
        produces = ["application/json"],
        consumes = [MediaType.APPLICATION_FORM_URLENCODED_VALUE]
    )
    suspend fun connectionsPost(
        @ModelAttribute
        authResponse: AuthResponseCallback,
        @PathVariable("clientId")
        clientId: String,
    ): ResponseEntity<Any> {

        val profile = authResponseUseCase.invoke(
            AuthResponseUseCase.AuthResponseParams(
                clientId = clientId,
                response = authResponse
            )
        )

        logger.info { profile }
        simpMessagingTemplate.convertAndSend("/topic/oidc/${clientId}", profile)

        return ResponseEntity(null, HttpStatus.OK)

    }
}