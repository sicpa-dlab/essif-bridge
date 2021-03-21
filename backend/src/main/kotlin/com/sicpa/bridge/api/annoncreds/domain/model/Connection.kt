package com.sicpa.bridge.api.annoncreds.domain.model

import io.swagger.v3.oas.annotations.media.Schema

data class Connection(
    @field:Schema(description = "The connection's label")
    val label: String? = null,
    @field:Schema(nullable = false, required = true)
    val connectionId: String,
    @field:Schema(nullable = false, required = true)
    val state: State
) {
    enum class State(val value: String) {
        INIT("init"),
        INVITATION("invitation"),
        REQUEST("request"),
        RESPONSE("response"),
        ACTIVE("active"),
        ERROR("error"),
        INACTIVE("inactive")
    }
}
