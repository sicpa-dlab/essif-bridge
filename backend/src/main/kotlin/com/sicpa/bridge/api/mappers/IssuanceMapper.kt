package com.sicpa.bridge.api.mappers



import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import com.sicpa.acapyclient.model.*
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialAttribute
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialIssuance
import com.sicpa.bridge.utils.DateUtil.toOffsetDateTime
import java.util.*

object IssuanceMapper {
    private val objectMapper = ObjectMapper().registerModule(KotlinModule())
    fun V10CredentialExchange.toCredentialIssuance(): CredentialIssuance {
        return CredentialIssuance(
            issuanceId = credentialExchangeId ?: throw RuntimeException("The credential id should not be null"),
            errorMessage = errorMsg,
            state = state ?: throw RuntimeException("The credential state should not be null"),
            updatedAt = updatedAt?.toOffsetDateTime(),
            credential = credentialProposalDict.let {
                objectMapper.readValue(objectMapper.writeValueAsString(it))
            }
        )
    }

    fun CredentialCreate.toV10CredentialProposalRequestMand(): V10CredentialProposalRequestMand {
        return V10CredentialProposalRequestMand()
            .autoRemove(false)
            .credentialProposal(
                CredentialPreview()
                    .attributes(attributes.map { it.toCredAttrSpec() })
            )
            .comment(comment)
            .connectionId(UUID.fromString(connectionId))
            .credDefId(credentialDefinitionId)
            .schemaId(schemaId)
    }

    fun CredentialCreate.toV10CredentialCreate(): V10CredentialCreate {
        return V10CredentialCreate()
            .credentialProposal(
                CredentialPreview()
                    .attributes(attributes.map { it.toCredAttrSpec() })
            )
            .comment(comment)
            .credDefId(credentialDefinitionId)
            .schemaId(schemaId)
    }

    private fun CredentialAttribute.toCredAttrSpec(): CredAttrSpec {
        return CredAttrSpec()
            .name(name)
            .value(value)
    }
}
