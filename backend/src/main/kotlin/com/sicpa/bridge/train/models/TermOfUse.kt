package com.sicpa.bridge.train.models

import com.google.gson.annotations.SerializedName

typealias TermsOfUSe = List<TermOfUse>

data class TermOfUse(
    @SerializedName("type") val type : String,
    @SerializedName("trustScheme") val trustScheme : List<String>
)
