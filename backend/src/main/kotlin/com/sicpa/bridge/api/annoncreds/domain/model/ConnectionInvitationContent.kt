package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.NotEmpty

data class ConnectionInvitationContent(
    @field:Schema(description = "The connection's invitation id", nullable = false, required = true)
    val invitationId: String,
    @field:Schema(description = "The connection's service endpoint", nullable = false, required = true)
    val serviceEndpoint: String,
    @field:Schema(description = "The list of recipient's keys", nullable = false, required = true)
    @field:NotEmpty
    val recipientKeys: List<String>,
    @field:Schema(description = "The connection's label")
    val label: String?
)
