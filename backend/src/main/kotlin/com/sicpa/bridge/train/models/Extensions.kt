package com.sicpa.bridge.train.models

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

fun Map<String, Any>.trainTermsOfUse() : TermOfUse? {
    val termsOfUse = this["termsOfUse"] ?: return null
    val gson = Gson()

    val listType = object : TypeToken<TermsOfUSe>() { }.type
    return gson.fromJson<TermsOfUSe>(gson.toJson(termsOfUse).toString(), listType)?.let {  termsOfUse->
        return termsOfUse.firstOrNull { tUse ->
            tUse.type == "https://train.trust-scheme.de/info"
        }
    }
}