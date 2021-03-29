package com.sicpa.bridge.api.annoncreds.domain.model

enum class IndyRestrictionKeys(val value: String) {
    CREDENTIAL_DEFINITION_ID("cred_def_id"),
    SCHEMA_ID("schema_id");

    companion object {
        private const val prefix = "attr::"
        private const val suffix = "::value"

        fun getAttributeValueRestrictionKey(attributeName: String): String {
            return "$prefix$attributeName$suffix"
        }

        fun getAttributeNameFromRestrictionKey(restrictionKey: String): String {
            return restrictionKey.removePrefix(prefix).removeSuffix(suffix)
        }

        fun isAttributeValueRestrictionKey(restrictionKey: String): Boolean {
            return restrictionKey.startsWith(prefix) && restrictionKey.endsWith(suffix)
        }
    }
}
