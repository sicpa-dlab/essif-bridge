package com.sicpa.bridge.api.jsonld.domain.model

data class IssueCredentialRequest(

    val credential: Credential,
    var options: LinkedDataProofOptions
)