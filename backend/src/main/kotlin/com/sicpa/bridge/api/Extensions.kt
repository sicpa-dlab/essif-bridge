package com.sicpa.bridge.api

import com.google.gson.Gson
import com.sicpa.acapyclient.model.SignResponse
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof
import com.sicpa.bridge.api.jsonld.domain.model.MultipleProof
import com.sicpa.bridge.api.jsonld.domain.model.SingleProof




inline fun <reified T> String.toModel(): T? {
    val gson = Gson()
    return gson.fromJson(this, T::class.java) as T
}

inline fun <reified T> SignResponse.signedCredential(): T? {
    val signedDoc = this.signedDoc ?: throw ApiException.WrongCredential("Could not sign")
    val gson = Gson()
    val jsonString = gson.toJson(signedDoc)
    return jsonString.toModel<T>()
}

fun String.isValidUrl() = this.matches(Regex("^(https?|ftp)://[^\\s/$.?#].[^\\s]*$"))

inline fun <reified T : Any> Gson.fromMap(map: Map<*, *>): T? {
    return fromJson(toJsonTree(map), T::class.java)
}

// convert to single proof credential for Aca-py
fun Any.toSingleProof(linkedDataProof: LinkedDataProof): Any {
    val credentialSingleProof = (this as Map<*, *>).toMutableMap()
    credentialSingleProof["proof"] = linkedDataProof
    return credentialSingleProof
}

fun List<LinkedDataProof>.getProof(eidas: Boolean = false): LinkedDataProof? {

    return this.firstOrNull { proof ->
        if (eidas) {
            proof.type == "CAdESRSASignature2020"
        } else {
            proof.cades == null && (proof.proofPurpose == "assertionMethod" || proof.proofPurpose == "verificationMethod")
        }
    }
}

fun Map<String, Any>.getLinkedDataProof() : LinkedDataProof? {
    val proof = this["proof"] ?: return null
    val gson = Gson()

    return when (proof) {
        is Map<*,*> -> gson.fromMap<SingleProof>(this)?.proof
        is List<*> -> gson.fromMap<MultipleProof>(this)?.proof?.getProof()
        else   -> null
    }
}

fun Map<String, Any>.eidasProof() : LinkedDataProof? {
    val proof = this["proof"] ?: return null
    val gson = Gson()

    return when (proof) {
        is Map<*,*> -> return null
        is List<*> -> gson.fromMap<MultipleProof>(this)?.proof?.getProof(true)
        else   -> null
    }
}

// cast without exception
inline fun <reified T> cast(any: Any?) : T? = any as? T?