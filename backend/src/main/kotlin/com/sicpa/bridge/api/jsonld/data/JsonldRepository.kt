package com.sicpa.bridge.api.jsonld.data

import com.sicpa.acapyclient.api.JsonldApi
import com.sicpa.acapyclient.model.SignRequest
import com.sicpa.acapyclient.model.SignResponse
import com.sicpa.acapyclient.model.VerifyRequest
import com.sicpa.acapyclient.model.VerifyResponse
import com.sicpa.bridge.api.jsonld.domain.model.IssueCredentialRequest
import org.springframework.stereotype.Repository

@Repository
class JsonldRepository {

    fun signCredential(credential: IssueCredentialRequest, verKey: String) : SignResponse {

        val signRequest = SignRequest().apply {
            doc = credential
            verkey = verKey
        }

        return  JsonldApi().jsonldSignPost(signRequest)
    }

    fun verifyCredential(credential: Any, verKey: String? = null) : VerifyResponse {

        val req = VerifyRequest().apply {
            doc = credential
            verkey = verKey
        }

        return JsonldApi().jsonldVerifyPost(req)
    }

    fun verifyProof(presentation: Any, verKey: String? = null) : VerifyResponse {

        val req = VerifyRequest().apply {
            doc = presentation
            verkey = verKey
        }

        return JsonldApi().jsonldVerifyPost(req)
    }
}