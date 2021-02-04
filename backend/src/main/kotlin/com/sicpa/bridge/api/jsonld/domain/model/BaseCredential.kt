package com.sicpa.bridge.api.jsonld.domain.model

abstract class BaseCredential(
    @Transient
    open val context: List<String>,
    @Transient
    open val id: String? = null,
    @Transient
    open val type: List<String>,
    @Transient
    open val issuer: String,
    @Transient
    open val issuanceDate: String
)