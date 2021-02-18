package com.sicpa.bridge.api.jsonld.data

import com.sicpa.acapyclient.api.WalletApi
import com.sicpa.acapyclient.model.DIDResult
import com.sicpa.bridge.api.ApiException
import com.sicpa.bridge.api.jsonld.domain.model.AcaPyDid
import org.springframework.stereotype.Repository

@Repository
class WalletApiRepository {

    fun getDid(): AcaPyDid {

        val didResult: DIDResult? = WalletApi().walletDidPublicGet()
        val result = didResult?.result ?: throw throw ApiException.NotFoundException("Could not retrieve info from Aca-py")
        val did = result.did
        val verKey = result.verkey ?: throw throw ApiException.NotFoundException("Could not retrieve info from VerKey")

        return AcaPyDid(publicDid = "did:sov:staging:${ did }", verKey = verKey)
    }
}