package com.sicpa.bridge.api.annoncreds.data

import com.sicpa.acapyclient.api.ConnectionApi
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreate
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreationResult
import com.sicpa.bridge.api.mappers.ConnectionMapper.toConnectionInvitationCreationResult
import org.springframework.stereotype.Repository

@Repository
class ConnectionsRepository {

    fun createConnectionInvitation(
        connectionInvitationCreate: ConnectionInvitationCreate
    ): ConnectionInvitationCreationResult {
        val invitationResult =
            ConnectionApi().connectionsCreateInvitationPost(
                connectionInvitationCreate.alias,
                true,
                false,
                null,
                null
            )

        return invitationResult.toConnectionInvitationCreationResult()
    }
}