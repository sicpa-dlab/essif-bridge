package com.sicpa.bridge.api.annoncreds.data

import com.sicpa.acapyclient.api.PresentProofApi
import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.annoncreds.domain.model.*
import com.sicpa.bridge.api.mappers.VerificationMapper.toV10PresentationSendRequestRequest
import com.sicpa.bridge.api.mappers.VerificationMapper.toVerification
import com.sicpa.bridge.api.mappers.VerificationMapper.toVerificationTemplate
import com.sicpa.bridge.api.mappers.VerificationMapper.toVerificationTemplateEntity
import com.sicpa.bridge.api.persistence.repositories.VerificationTemplateRepository
import com.sicpa.bridge.utils.KotlinJavaUtil.unwrap
import org.springframework.stereotype.Repository

@Repository
class VerificationsRepository(
    private val verificationTemplateRepository: VerificationTemplateRepository
) {


    fun createVerification(verificationCreate: VerificationCreate): Verification {

        val verificationTemplateEntity = verificationTemplateRepository.findById(
            verificationCreate.verificationTemplateId
        ).unwrap()
            ?: throw ApiException.NotFoundException("VerificationTemplate with id: ${verificationCreate.verificationTemplateId} not found!")

        val v10PresentationSendRequestRequest = verificationTemplateEntity.toV10PresentationSendRequestRequest(
            connectionId = verificationCreate.connectionId,
            comment = verificationCreate.comment
        )

        return PresentProofApi().presentProofSendRequestPost(v10PresentationSendRequestRequest).toVerification()

    }

    fun createVerificationTemplate(
        verificationTemplateCreate: VerificationTemplateCreate
    ): VerificationTemplate {
        if (verificationTemplateCreate.content.revocationRequirement?.validNow == true &&
            verificationTemplateCreate.content.revocationRequirement.validAt != null
        ) {
            throw ApiException.GenericBusinessException("The revocation requirement expects only one of validNow or validAt")
        }

        val verificationTemplateToSave = verificationTemplateCreate.toVerificationTemplateEntity()

        return verificationTemplateRepository.save(verificationTemplateToSave)
            .toVerificationTemplate()
    }


}