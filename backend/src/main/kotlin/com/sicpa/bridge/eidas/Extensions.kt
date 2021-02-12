package com.sicpa.bridge.eidas

import com.google.gson.Gson
import com.sicpa.bridge.api.fromMap
import com.sicpa.bridge.api.getProof
import com.sicpa.bridge.api.jsonld.domain.model.LinkedDataProof

fun List<Any>.getEidasProof() : LinkedDataProof? {

    val gson = Gson()

    val proofs = this.mapNotNull { proof ->
        gson.fromMap<LinkedDataProof>(proof as Map<*, *>)
    }

    return proofs.getProof(eidas = true)
}
