package com.sicpa.bridge.api.annoncreds

import com.sicpa.bridge.api.annoncreds.domain.ConnectionsUseCase
import com.sicpa.bridge.api.annoncreds.domain.model.Connection
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreate
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreationResult
import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid
import javax.validation.constraints.Pattern


@RestController
@CrossOrigin
@Tag(name = "Connections", description = "The Connections API")
@RequestMapping("/connections")
class Connections(
    private val connectionsUseCase: ConnectionsUseCase,
) {

    @Operation(
        summary = "Create a new connection invitation"
    )
    @PostMapping(
        produces = ["application/json"],
        consumes = ["application/json"]
    )
    suspend fun connectionsPost(
        @RequestBody
        connectionInvitationCreate: ConnectionInvitationCreate
    ): ConnectionInvitationCreationResult {
        return connectionsUseCase.invoke(connectionInvitationCreate)
    }


}
