package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.VerificationsRepository
import com.sicpa.bridge.api.annoncreds.domain.model.Verification
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationCreate
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationTemplate
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationTemplateCreate
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class VerificationTemplateUseCase(
    val verificationsRepository: VerificationsRepository,
) : BaseUseCase<VerificationTemplate, VerificationTemplateCreate>() {

    companion object : KLogging()

    override suspend fun run(param: VerificationTemplateCreate): VerificationTemplate {
        return verificationsRepository.createVerificationTemplate(param)
    }

}