package com.sicpa.bridge.resolver.models

data class ResolvedDidDoc(
    val publicKey: List<PublicKey>? = null,
    val assertionMethod: List<AssertionMethod>? = null,
    val verificationMethod: List<VerificationMethod>? = null
)
