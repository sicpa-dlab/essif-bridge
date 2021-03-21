package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.ConnectionsRepository
import com.sicpa.bridge.api.annoncreds.domain.model.Connection
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreate
import com.sicpa.bridge.api.annoncreds.domain.model.ConnectionInvitationCreationResult
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class ConnectionsUseCase(
    val connectionsRepository: ConnectionsRepository,
) : BaseUseCase<ConnectionInvitationCreationResult, ConnectionInvitationCreate>() {

    companion object : KLogging()


    override suspend fun run(param: ConnectionInvitationCreate): ConnectionInvitationCreationResult {
        return connectionsRepository.createConnectionInvitation(param)
    }


}