package com.sicpa.bridge.resolver.models

data class AssertionMethod(
    val id: String,
    override val publicKeyBase58: String,
    val type: Any
) : PublicKeyBase58