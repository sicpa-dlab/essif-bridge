package com.sicpa.bridge.api.annoncreds.domain.model

import com.sicpa.bridge.utils.Patterns
import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.Pattern

data class ConnectionInvitationCreationResult(
    @field:Schema(
        example = "http://192.168.56.101:8020/invite?c_i=eyJAdHlwZSI6Li4ufQ==",
        description = "Invitation URL",
        nullable = false,
        required = true
    )
    val invitationUrl: String,
    @field:Schema(nullable = false, required = true)
    val connectionInvitationContent: ConnectionInvitationContent,
    @field:Pattern(regexp = Patterns.CONNECTION_ID)
    @field:Schema(nullable = false, required = true)
    val connectionId: String
)
