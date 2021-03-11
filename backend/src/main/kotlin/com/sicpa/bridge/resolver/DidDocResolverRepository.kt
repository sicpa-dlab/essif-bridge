package com.sicpa.bridge.resolver

import com.sicpa.bridge.api.cast
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof
import com.sicpa.bridge.api.toModel
import com.sicpa.bridge.resolver.models.PublicKeyBase58
import com.sicpa.bridge.resolver.models.ResolvedDidDoc
import org.springframework.stereotype.Repository
import uniresolver.client.ClientUniResolver

@Repository
class DidDocResolverRepository(
    resolverClientConfigProperties: ResolverClientConfigProperties
) {

    private val uniResolver: ClientUniResolver by lazy {
        ClientUniResolver().apply {
            setResolveUri(resolverClientConfigProperties.url)
        }
    }

    fun getVerKey(proof: LinkedDataProof) : String? {

        val didDocument = uniResolver.resolve(proof.verificationMethod)?.didDocument ?: return null

        /* TEMP SOLUTION FOR OLD DidDoc */
        if(didDocument.jsonObject["assertionMethod"] is List<*>) {
            val assertion = cast<ArrayList<*>>(didDocument.jsonObject["assertionMethod"])
            if (assertion?.first() is String) {
                didDocument.jsonObject["assertionMethod"] = null
            }
        }

        if(didDocument.jsonObject["verificationMethod"] is List<*>) {
            val verification = cast<ArrayList<*>>(didDocument.jsonObject["verificationMethod"])
            if (verification?.first() is String) {
                didDocument.jsonObject["verificationMethod"] = null
            }
        }

        val resolvedDidDoc = didDocument.toString().toModel<ResolvedDidDoc>() ?: return null

        var pubKey: PublicKeyBase58?
        if(proof.proofPurpose == "assertionMethod") {
            pubKey = resolvedDidDoc.assertionMethod?.firstOrNull()
        } else {
            pubKey = resolvedDidDoc.verificationMethod?.firstOrNull()
        }

        if(pubKey == null) {
            pubKey = resolvedDidDoc.publicKey?.find { publicKey ->
                publicKey.id.startsWith(proof.verificationMethod) || publicKey.id == proof.verificationMethod
            }
        }

        return pubKey?.publicKeyBase58
    }
}