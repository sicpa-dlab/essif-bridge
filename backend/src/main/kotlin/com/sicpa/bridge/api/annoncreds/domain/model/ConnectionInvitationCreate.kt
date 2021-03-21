package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class ConnectionInvitationCreate(
    @field:Schema(example = "Some alias", description = "Connection alias")
    val alias: String?
)
