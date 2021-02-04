package com.sicpa.bridge.resolver.models

data class ResolvedDidDoc(
    val publicKey: List<PublicKey>? = emptyList(),
    val assertionMethod: List<String>? = null,
    val verificationMethod: List<VerificationMethod>
)