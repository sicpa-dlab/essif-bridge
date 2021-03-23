package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.ConnectionsRepository
import com.sicpa.bridge.api.annoncreds.data.IssuanceRepository
import com.sicpa.bridge.api.annoncreds.data.SchemasRepository
import com.sicpa.bridge.api.annoncreds.domain.model.*
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class IssuanceUseCase(
    val issuanceRepository: IssuanceRepository,
) : BaseUseCase<CredentialIssuance, CredentialCreate>() {

    companion object : KLogging()

    override suspend fun run(param: CredentialCreate): CredentialIssuance {
        return issuanceRepository.issueCredential(param)
    }


}