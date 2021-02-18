package com.sicpa.bridge.resolver.models

data class PublicKey(
    val controller: String? = null,
    val id: String,
    override val publicKeyBase58: String,
    val type: String,
    val usage: String? = null
) : PublicKeyBase58