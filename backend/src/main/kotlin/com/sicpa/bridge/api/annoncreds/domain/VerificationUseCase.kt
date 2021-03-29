package com.sicpa.bridge.api.annoncreds.domain

import com.sicpa.bridge.api.annoncreds.data.VerificationsRepository
import com.sicpa.bridge.api.annoncreds.domain.model.Verification
import com.sicpa.bridge.api.annoncreds.domain.model.VerificationCreate
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class VerificationUseCase(
    val verificationsRepository: VerificationsRepository,
) : BaseUseCase<Verification, VerificationCreate>() {

    companion object : KLogging()

    override suspend fun run(param: VerificationCreate): Verification {
        return verificationsRepository.createVerification(param)
    }


}