package com.sicpa.bridge.api.mappers

import com.sicpa.acapyclient.model.Schema
import com.sicpa.acapyclient.model.SchemaSendRequest
import com.sicpa.acapyclient.model.SchemaSendResults
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary

object SchemaMapper {
    fun SchemaCreate.toSchemaSendRequest(): SchemaSendRequest {
        return SchemaSendRequest()
            .attributes(attributesName)
            .schemaName(name)
            .schemaVersion(version)
    }

    fun SchemaSendResults.toSchemaSummary(): SchemaSummary {
        return SchemaSummary(schemaId)
    }

    fun Schema.toSchema(): com.sicpa.bridge.api.annoncreds.domain.model.Schema {
        return com.sicpa.bridge.api.annoncreds.domain.model.Schema(
            id = id ?: throw RuntimeException("The schema id should not be null"),
            name = name ?: throw RuntimeException("The schema name should not be null"),
            version = ver ?: throw RuntimeException("The schema version should not be null"),
            attributesName = attrNames ?: emptyList()
        )
    }
}
