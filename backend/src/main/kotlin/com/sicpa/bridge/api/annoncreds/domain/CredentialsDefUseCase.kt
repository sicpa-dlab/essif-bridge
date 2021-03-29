package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.CredentialsDefRepository
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialDefinitionSummary
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