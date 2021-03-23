package com.sicpa.bridge.api.annoncreds.data

import com.sicpa.acapyclient.api.SchemaApi
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary
import com.sicpa.bridge.api.mappers.SchemaMapper.toSchemaSendRequest
import com.sicpa.bridge.api.mappers.SchemaMapper.toSchemaSummary
import org.springframework.stereotype.Repository

@Repository
class SchemasRepository {

    fun createSchema(
        schemaCreate: SchemaCreate,
    ): SchemaSummary {
        val schemaSendResults =
            SchemaApi().schemasPost(
                schemaCreate.toSchemaSendRequest()
            )
        return schemaSendResults?.toSchemaSummary() ?: throw RuntimeException("Schema id should not be null")
    }
}