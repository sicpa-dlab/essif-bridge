package com.sicpa.bridge.api.jsonld.domain.model

data class VerifyCredentialRequest(
    val verifiableCredential: VerifiableCredential,
    val options: LinkedDataProofOptions
)