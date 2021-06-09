package com.sicpa.bridge.api.oidc

import com.sicpa.bridge.api.oidc.domain.AuthRequestUseCase
import com.sicpa.bridge.api.oidc.domain.model.AuthRequestParam
import com.sicpa.bridge.api.oidc.domain.model.AuthRequestResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "OpenID Connect Connect", description = "OpenID Connect API")
@RequestMapping("/oidc/didauthrequest")
@CrossOrigin
class DidAuthRequest(
    private val authRequestUseCase: AuthRequestUseCase
) {
    @Operation(
        summary = "Create a new authenticate url"
    )

    @PostMapping(
        produces = ["application/json"]
    )
    suspend fun didAuthRequest(
        @RequestBody
        authRequestParam: AuthRequestParam
    ): AuthRequestResponse {

        val url = authRequestUseCase.invoke(authRequestParam)

        return AuthRequestResponse(url=url)

    }
}