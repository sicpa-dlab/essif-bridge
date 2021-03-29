package com.sicpa.bridge.api.annoncreds.data

import com.sicpa.acapyclient.api.SchemaApi
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary
import com.sicpa.bridge.api.mappers.SchemaMapper.toSchemaSendRequest
import com.sicpa.bridge.api.mappers.SchemaMapper.toSchemaSummary
import org.springframework.stereotype.Repository
import java.util.concurrent.TimeUnit
import javax.annotation.PostConstruct

@Repository
class SchemasRepository {

    private val schemaApi: SchemaApi = SchemaApi()

    @PostConstruct
    fun configureHttpClientTimeoutApi() {
        schemaApi.apiClient.readTimeout = 60000
        schemaApi.apiClient.connectTimeout = 60000
        schemaApi.apiClient.writeTimeout = 60000
    }


    fun createSchema(
        schemaCreate: SchemaCreate,
    ): SchemaSummary {
        val schemaSendResults =
            schemaApi.schemasPost(
                schemaCreate.toSchemaSendRequest()
            )
        return schemaSendResults?.toSchemaSummary() ?: throw RuntimeException("Schema id should not be null")
    }



}