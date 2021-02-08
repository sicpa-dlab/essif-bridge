package com.sicpa.bridge.api.jsonld.domain.model

data class IssueCredentialRequest(

    val credential: Any,
    var options: LinkedDataProofOptions
)