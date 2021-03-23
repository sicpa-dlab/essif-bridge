package com.sicpa.bridge.api.annoncreds.data

import com.sicpa.acapyclient.api.CredentialDefinitionApi
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionSummary
import com.sicpa.bridge.api.mappers.CredentialDefinitionMapper.toCredentialDefinitionSendRequest
import com.sicpa.bridge.api.mappers.CredentialDefinitionMapper.toCredentialDefinitionSummary
import org.springframework.stereotype.Repository

@Repository
class CredentialsDefRepository {

    fun createCredentialDefinition(credentialDefinitionCreate: CredentialDefinitionCreate): CredentialDefinitionSummary {
        val credentialDefinitionSendResults =
            CredentialDefinitionApi().credentialDefinitionsPost(
                credentialDefinitionCreate.toCredentialDefinitionSendRequest()
            )
        return credentialDefinitionSendResults?.toCredentialDefinitionSummary()
            ?: throw RuntimeException("Credential definition id should not be null")
    }

}