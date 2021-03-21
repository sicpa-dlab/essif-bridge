package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class ConnectionInvitation(
    @field:Schema(nullable = false, required = true)
    val connectionInvitationContent: ConnectionInvitationContent,
    val alias: String?
)
