package com.sicpa.bridge.api.oidc

import com.sicpa.bridge.api.oidc.domain.SendCredentialUseCase
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "OpenID Connect Connect", description = "OpenID Connect API")
@RequestMapping("/oidc/sendcredential")
@CrossOrigin
class SendCredential(
    private val sendCredentialUseCase: SendCredentialUseCase
) {
    @Operation(
        summary = "Sends a credential"
    )

    @PostMapping(
        produces = ["application/json"]
    )
    suspend fun sendCredential(
        @RequestBody
        credential: Any
    ): Any {
        return sendCredentialUseCase.invoke(credential)
    }
}