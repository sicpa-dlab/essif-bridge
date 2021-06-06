package com.sicpa.bridge.api.oidc

import com.sicpa.bridge.api.oidc.domain.model.AuthRequestParam
import com.sicpa.bridge.api.oidc.domain.model.AuthResponseCallback
import com.sicpa.bridge.config.OidcClientConfigProperties
import com.sicpa.oidcclient.api.OidcServiceApi
import com.sicpa.oidcclient.model.DidAuthResponseParam
import org.springframework.stereotype.Repository

@Repository
class OidcRepository(
    oidcClientConfigProperties: OidcClientConfigProperties
) {

    private val oidcServiceApi: OidcServiceApi by lazy {
        OidcServiceApi().apply {
            apiClient.basePath = oidcClientConfigProperties.url
        }
    }

    fun getAuth(authRequestParam: AuthRequestParam) : String {
        return oidcServiceApi.didAuthRequest(authRequestParam.clientId, authRequestParam.credentialId)
    }

    fun validateResponse(response: AuthResponseCallback, clientId: String) : Any? {

        val didAuthResponseParam = DidAuthResponseParam().apply {
            idToken = response.id_token
            state = response.state
            loginChallenge = response.login_challenge
        }

        return oidcServiceApi.didAuthResponse(clientId, didAuthResponseParam)
    }

    fun sendCredential(credential: Any) : Any {
        return oidcServiceApi.sendCredential(credential)
    }
}