package com.sicpa.bridge.api.oidc.domain

import com.sicpa.bridge.api.oidc.OidcRepository
import com.sicpa.bridge.api.oidc.domain.model.AuthRequestParam
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class AuthRequestUseCase(
    private val oidcRepository: OidcRepository
) : BaseUseCase<String, AuthRequestParam>() {

    companion object : KLogging()

    override suspend fun run(params: AuthRequestParam): String {
        return oidcRepository.getAuth(params)
    }
}