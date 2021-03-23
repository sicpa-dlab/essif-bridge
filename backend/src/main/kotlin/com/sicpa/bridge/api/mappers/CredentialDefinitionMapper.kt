package com.sicpa.bridge.api.mappers

import com.sicpa.acapyclient.model.CredentialDefinitionSendRequest
import com.sicpa.acapyclient.model.CredentialDefinitionSendResults
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinition
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionSummary

object CredentialDefinitionMapper {
    fun CredentialDefinitionCreate.toCredentialDefinitionSendRequest(): CredentialDefinitionSendRequest {
        val credentialDefinitionSendRequest = CredentialDefinitionSendRequest()
            .schemaId(schemaId)
            .supportRevocation(supportRevocation)
            .tag(tag)

        if (supportRevocation) {
            credentialDefinitionSendRequest.revocationRegistrySize(1024)
        }

        return credentialDefinitionSendRequest
    }

    fun CredentialDefinitionSendResults.toCredentialDefinitionSummary(): CredentialDefinitionSummary? {
        return credentialDefinitionId?.let { CredentialDefinitionSummary(it) }
    }

    fun com.sicpa.acapyclient.model.CredentialDefinition.toCredentialDefinition(): CredentialDefinition {
        return CredentialDefinition(
            id = id ?: throw RuntimeException("The credential definition id should not be null")
        )
    }
}
