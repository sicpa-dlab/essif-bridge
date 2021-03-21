package com.sicpa.bridge.api.mappers

import com.sicpa.acapyclient.model.ConnRecord
import com.sicpa.acapyclient.model.InvitationResult
import com.sicpa.acapyclient.model.ReceiveInvitationRequest
import com.sicpa.bridge.api.annoncreds.domain.model.Connection
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationContent
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreationResult

object ConnectionMapper {
    fun InvitationResult.toConnectionInvitationCreationResult(): ConnectionInvitationCreationResult {
        return ConnectionInvitationCreationResult(
            connectionId = connectionId ?: throw RuntimeException("Missing connection id"),
            invitationUrl = invitationUrl ?: throw RuntimeException("Missing connection invitation url"),
            connectionInvitationContent = invitation?.toConnectionInvitation()
                ?: throw RuntimeException("Missing connection invitation"),
        )
    }

    fun ConnRecord.toConnection(): Connection {
        return Connection(
            label = theirLabel,
            connectionId = connectionId ?: throw RuntimeException("Connection id should not be null"),
            state = state?.let { Connection.State.valueOf(it.toUpperCase()) }
                ?: throw RuntimeException("Connection state should not be null")
        )
    }

    private fun com.sicpa.acapyclient.model.ConnectionInvitation.toConnectionInvitation(): ConnectionInvitationContent {
        return ConnectionInvitationContent(
            invitationId = atId ?: throw RuntimeException("Missing @id"),
            serviceEndpoint = serviceEndpoint ?: throw RuntimeException("Missing serviceEndpoint"),
            recipientKeys = recipientKeys ?: throw RuntimeException("Missing recipientKeys"),
            label = label
        )
    }

    fun ConnectionInvitationContent.toReceiveInvitationRequest(): ReceiveInvitationRequest {
        return ReceiveInvitationRequest()
            .atId(invitationId)
            .recipientKeys(recipientKeys)
            .serviceEndpoint(serviceEndpoint)
            .label(label)
    }
}
