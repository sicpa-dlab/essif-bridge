package com.sicpa.bridge.api.oidc.domain

import com.sicpa.bridge.api.oidc.OidcRepository
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class SendCredentialUseCase(
    private val oidcRepository: OidcRepository
) : BaseUseCase<Any, Any>() {

    companion object : KLogging()

    override suspend fun run(params: Any): Any {
        return oidcRepository.sendCredential(params)
    }
}