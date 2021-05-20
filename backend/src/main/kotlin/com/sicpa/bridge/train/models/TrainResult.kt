package com.sicpa.bridge.train.models

import com.google.gson.annotations.SerializedName

data class TrainResult(
    @SerializedName("trustList") val trustList : String,
    @SerializedName("trustListUrl") val trustListUrl : String
)
