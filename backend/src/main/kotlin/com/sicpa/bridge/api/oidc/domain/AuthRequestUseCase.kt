package com.sicpa.bridge.api.oidc.domain

import com.sicpa.bridge.api.oidc.OidcRepository
import com.sicpa.bridge.api.oidc.domain.model.AuthResponseCallback
import com.sicpa.bridge.api.oidc.domain.model.ResponseProfile
import com.sicpa.bridge.core.BaseUseCase
import mu.KLogging
import org.springframework.stereotype.Service

@Service
class AuthResponseUseCase(
    private val oidcRepository: OidcRepository
) : BaseUseCase<Any, AuthResponseUseCase.AuthResponseParams>() {

    companion object : KLogging()

    override suspend fun run(params: AuthResponseParams): Any {
        return oidcRepository.validateResponse(params.response, params.clientId) ?: ResponseProfile(id = "", name = "", lastName = "")
    }

    data class AuthResponseParams(
        val response: AuthResponseCallback,
        val clientId: String
    )
}