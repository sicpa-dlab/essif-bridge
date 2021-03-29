package com.sicpa.bridge.api.mappers

import com.sicpa.acapyclient.invoker.JSON
import com.sicpa.acapyclient.model.*
import com.sicpa.bridge.api.annoncreds.domain.model.*
import com.sicpa.bridge.api.persistence.entities.VerificationTemplateEntity
import com.sicpa.bridge.utils.DateUtil
import com.sicpa.bridge.utils.DateUtil.toOffsetDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset.UTC
import java.util.*


object VerificationMapper {
    fun VerificationTemplateEntity.toVerificationTemplate(): VerificationTemplate {
        return VerificationTemplate(
            id = id ?: throw RuntimeException("The verification template id should not be null"),
            name = name,
            content = content,
        )
    }

    fun VerificationTemplateEntity.toVerificationTemplateSummary(): VerificationTemplateSummary {
        return VerificationTemplateSummary(
            id = id ?: throw RuntimeException("The verification template id should not be null"),
            name = name
        )
    }

    fun VerificationTemplateEntity.toV10PresentationSendRequestRequest(
        connectionId: String,
        comment: String?
    ): V10PresentationSendRequestRequest {
        return V10PresentationSendRequestRequest()
            .proofRequest(content.toIndyProofRequest(name))
            .comment(comment)
            .connectionId(UUID.fromString(connectionId))
            .trace(false)
    }

    fun VerificationTemplateCreate.toVerificationTemplateEntity(): VerificationTemplateEntity {
        return VerificationTemplateEntity(
            name = name,
            content = content,
        )
    }

    fun VerificationTemplateUpdate.toVerificationTemplateEntity(
        oldVerificationTemplateEntity: VerificationTemplateEntity
    ): VerificationTemplateEntity {
        return VerificationTemplateEntity(
            id = oldVerificationTemplateEntity.id,
            name = name ?: oldVerificationTemplateEntity.name,
            content = content ?: oldVerificationTemplateEntity.content,
        )
    }

    fun V10PresentationExchange.toVerificationSummary(): VerificationSummary {
        val json = JSON()
        val indyProofRequest: IndyProofRequest = json.deserialize(json.serialize(presentationRequest), IndyProofRequest().javaClass)

        return VerificationSummary(
            verificationId = presentationExchangeId ?: throw RuntimeException("Missing presentationExchangeId"),
            name = indyProofRequest.name ?: throw RuntimeException("Missing proof request name")
        )
    }

    private fun VerificationTemplateContent.toIndyProofRequest(name: String): IndyProofRequest {
        val nonRevoked = revocationRequirement?.let {
            if (it.validNow == false && it.validAt == null) {
                null
            } else {
                val timestamp = (revocationRequirement.validAt?.toEpochSecond() ?: OffsetDateTime.now(UTC).toEpochSecond()).toInt()
                IndyProofReqNonRevoked()
                    .to(timestamp)
            }
        }

        val indyRequestedAttributes = buildIndyRequestedAttributes(requestedAttributes)
        val indyRequestedPredicates = buildIndyRequestedPredicates(requestedPredicates)

        return IndyProofRequest()
            .name(name)
            .nonRevoked(nonRevoked)
            .nonce(generateNonce())
            .requestedAttributes(indyRequestedAttributes)
            .requestedPredicates(indyRequestedPredicates)
            .version("1.0")
    }

    private fun buildIndyRequestedPredicates(requestedPredicates: List<RequestedPredicate>): Map<String, IndyProofReqPredSpec> {
        return requestedPredicates.mapIndexed { index, requestedPredicate ->
            val predicateKey = "${index}_${requestedPredicate.name}"
            predicateKey to IndyProofReqPredSpec()
                .name(requestedPredicate.name)
                .restrictions(
                    requestedPredicate.restrictions.map { restriction ->
                        val indyPredRestrictions = IndyProofReqPredSpecRestrictions()
                            .credDefId(restriction.credentialDefinitionId)

                        restriction.schemaId?.apply {
                            indyPredRestrictions.schemaId(restriction.schemaId)
                        }

                        indyPredRestrictions
                    }
                )
                .pType(requestedPredicate.predicateType.toPTypeEnum())
                .pValue(requestedPredicate.predicateValue)
        }.toMap()
    }

    private fun buildIndyRequestedAttributes(requestedAttributes: List<RequestedAttribute>): Map<String, IndyProofReqAttrSpec> {
        val (emptyRestrictions: List<RequestedAttribute>, nonEmptyRestrictions: List<RequestedAttribute>) =
            requestedAttributes.partition { it.restrictions.isEmpty() }

        val emptyRestrictionsRequestedAttribute = emptyRestrictions.flatMapIndexed { index, requestedAttribute ->
            requestedAttribute.names.map { name ->
                "0_${index}_$name" to IndyProofReqAttrSpec()
                    .name(name)
            }
        }.toMap()

        val nonEmptyRestrictionsRequestedAttribute = nonEmptyRestrictions.mapIndexed { index, requestedAttribute ->
            val attributeKey = "1_${index}_${requestedAttribute.names.joinToString(separator = "_")}"
            attributeKey to IndyProofReqAttrSpec()
                .names(requestedAttribute.names)
                .restrictions(
                    requestedAttribute.restrictions.map { restriction ->
                        val restrictionMap = mutableMapOf(
                            IndyRestrictionKeys.CREDENTIAL_DEFINITION_ID.value to restriction.credentialDefinitionId
                        )
                        restriction.schemaId?.apply { restrictionMap[IndyRestrictionKeys.SCHEMA_ID.value] = this }
                        restriction.valueRestrictions
                            ?.forEach { (attributeName, attributeValue) ->
                                restrictionMap[IndyRestrictionKeys.getAttributeValueRestrictionKey(attributeName)] = attributeValue
                            }
                        restrictionMap
                    }
                )
        }.toMap()

        return emptyRestrictionsRequestedAttribute + nonEmptyRestrictionsRequestedAttribute
    }

    fun V10PresentationExchange.toVerification(): Verification {
        val json = JSON()
        val indyProofRequest: IndyProofRequest = json.deserialize(json.serialize(presentationRequest), IndyProofRequest().javaClass)

        return Verification(
            verificationId = presentationExchangeId ?: throw RuntimeException("Missing presentationExchangeId"),
            connectionId = connectionId ?: throw RuntimeException("Missing connectionId"),
            verificationRequest = indyProofRequest.toVerificationRequest(),
            state = toVerificationState(verified),
            createdAt = createdAt?.toOffsetDateTime() ?: throw RuntimeException("Missing createdAt"),
            updatedAt = updatedAt?.toOffsetDateTime() ?: throw RuntimeException("Missing updatedAt")
        )
    }

    private fun toVerificationState(verifiedEnum: V10PresentationExchange.VerifiedEnum?) = when (verifiedEnum) {
        V10PresentationExchange.VerifiedEnum.TRUE -> Verification.State.SUCCESS
        V10PresentationExchange.VerifiedEnum.FALSE -> Verification.State.FAILURE
        else -> Verification.State.PENDING
    }

    private fun IndyProofRequest.toVerificationRequest(): VerificationRequest {
        return VerificationRequest(
            name = name ?: throw RuntimeException("Missing name"),
            requestedAttributes = requestedAttributes?.map { (_, value) ->
                value.toRequestedAttribute()
            }?.withEmptyRestrictionsGrouped() ?: emptyList(),
            requestedPredicates = requestedPredicates?.map { (_, value) ->
                value.toRequestedPredicate()
            } ?: emptyList(),
            validAt = nonRevoked?.to?.let { DateUtil.convertEpochToOffsetDateTime(it) }
        )
    }

    private fun generateNonce(): String {
        return (1..39)
            .map { ('0'..'9').random() }
            .joinToString("")
    }

    private fun RequestedPredicate.PredicateType.toPTypeEnum(): IndyProofReqPredSpec.PTypeEnum {
        return when (this) {
            RequestedPredicate.PredicateType.LESS_THAN -> IndyProofReqPredSpec.PTypeEnum.LESS_THAN
            RequestedPredicate.PredicateType.LESS_THAN_OR_EQUAL_TO -> IndyProofReqPredSpec.PTypeEnum.LESS_THAN_OR_EQUAL_TO
            RequestedPredicate.PredicateType.GREATER_THAN_OR_EQUAL_TO -> IndyProofReqPredSpec.PTypeEnum.GREATER_THAN_OR_EQUAL_TO
            RequestedPredicate.PredicateType.GREATER_THAN -> IndyProofReqPredSpec.PTypeEnum.GREATER_THAN
        }
    }

    private fun IndyProofReqPredSpec.toRequestedPredicate(): RequestedPredicate {
        return RequestedPredicate(
            name = this.name,
            predicateType = RequestedPredicate.PredicateType.fromString(this.getpType().value),
            predicateValue = this.getpValue(),
            restrictions = this.restrictions?.map { restriction ->
                RequestedPredicate.Restriction(
                    schemaId = restriction.schemaId,
                    credentialDefinitionId = restriction.credDefId ?: throw RuntimeException("Missing credDefId")
                )
            } ?: emptyList()
        )
    }

    private fun IndyProofReqAttrSpec.toRequestedAttribute(): RequestedAttribute {
        return RequestedAttribute(
            names = this.names ?: this.name?.let { listOf(it) } ?: emptyList(),
            restrictions = this.restrictions?.map { restriction ->
                RequestedAttribute.Restriction(
                    schemaId = restriction[IndyRestrictionKeys.SCHEMA_ID.value],
                    credentialDefinitionId = restriction[IndyRestrictionKeys.CREDENTIAL_DEFINITION_ID.value]
                        ?: throw RuntimeException("Missing cred_def_id"),
                    valueRestrictions = restriction.filter { (restrictionName, _) ->
                        IndyRestrictionKeys.isAttributeValueRestrictionKey(restrictionName)
                    }.mapKeys { (restrictionName, _) ->
                        IndyRestrictionKeys.getAttributeNameFromRestrictionKey(restrictionName)
                    }
                )
            } ?: emptyList()
        )
    }

    private fun List<RequestedAttribute>.withEmptyRestrictionsGrouped(): List<RequestedAttribute> {
        val (e, ne) = this.partition { it.restrictions.isEmpty() }

        val agg = if (e.isEmpty()) {
            emptyList()
        } else {
            listOf(RequestedAttribute(restrictions = emptyList(), names = e.flatMap { it.names }))
        }

        return ne + agg
    }
}
