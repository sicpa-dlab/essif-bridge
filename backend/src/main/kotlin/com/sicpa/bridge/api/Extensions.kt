package com.sicpa.bridge.api

import com.google.gson.Gson
import com.sicpa.acapyclient.model.SignResponse

inline fun <reified T> String.toModel(): T? {
    val gson = Gson()
    return gson.fromJson(this, T::class.java) as T
}

inline fun <reified T> SignResponse.signedCredential(): T? {
    val gson = Gson()
    val jsonString = gson.toJson(this.signedDoc)
    return jsonString.toModel<T>()
}