package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.ConnectionsRepository
import com.sicpa.bridge.api.annoncreds.data.CredentialsDefRepository
import com.sicpa.bridge.api.annoncreds.data.SchemasRepository
import com.sicpa.bridge.api.annoncreds.domain.model.*
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class CredentialsDefUseCase(
    val credentialsDefRepository: CredentialsDefRepository,
) : BaseUseCase<CredentialDefinitionSummary, CredentialDefinitionCreate>() {

    companion object : KLogging()

    override suspend fun run(param: CredentialDefinitionCreate): CredentialDefinitionSummary {
        return credentialsDefRepository.createCredentialDefinition(param)
    }


}