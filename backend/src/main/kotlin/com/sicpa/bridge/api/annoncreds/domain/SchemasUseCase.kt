package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.ConnectionsRepository
import com.sicpa.bridge.api.annoncreds.data.SchemasRepository
import com.sicpa.bridge.api.annoncreds.domain.model.*
import com.sicpa.bridge.api.jsonld.data.JsonldRepository
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class SchemasUseCase(
    val schemasRepository: SchemasRepository,
) : BaseUseCase<SchemaSummary, SchemaCreate>() {

    companion object : KLogging()

    override suspend fun run(param: SchemaCreate): SchemaSummary {
        return schemasRepository.createSchema(param)
    }


}