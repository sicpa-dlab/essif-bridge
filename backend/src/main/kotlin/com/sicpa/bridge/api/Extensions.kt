package com.sicpa.bridge.api

import com.google.gson.Gson
import com.sicpa.acapyclient.model.SignResponse
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof

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

// convert to single proof credential for Aca-py
fun Any.toSingleProof(linkedDataProof: LinkedDataProof): Any {
    val credentialSingleProof = (this as Map<*, *>).toMutableMap()
    credentialSingleProof["proof"] = linkedDataProof
    return credentialSingleProof
}

fun List<LinkedDataProof>.getJsonLdProof(): LinkedDataProof? {
    return this.firstOrNull { proof ->
        proof.proofPurpose == "assertionMethod"
    }
}