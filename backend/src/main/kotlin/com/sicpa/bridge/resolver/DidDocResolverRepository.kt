package com.sicpa.bridge.resolver

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
        val resolvedDidDoc = didDocument.toString().toModel<ResolvedDidDoc>() ?: return null

        var pubKey: PublicKeyBase58?
        if(proof.proofPurpose == "assertionMethod") {
            pubKey = resolvedDidDoc.assertionMethod?.firstOrNull()
        } else {
            pubKey = resolvedDidDoc.verificationMethod?.firstOrNull()
        }

        if(pubKey == null) {
            pubKey = resolvedDidDoc.publicKey?.find { publicKey ->
                publicKey.id.startsWith(proof.verificationMethod)
            }
        }

        return pubKey?.publicKeyBase58
    }
}