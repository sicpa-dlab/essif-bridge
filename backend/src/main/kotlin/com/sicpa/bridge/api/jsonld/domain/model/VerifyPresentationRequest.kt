package com.sicpa.bridge.api.jsonld.domain.model

data class VerifyPresentationRequest(
    val verifiablePresentation: VerifiablePresentation,
    val options: LinkedDataProofOptions
)