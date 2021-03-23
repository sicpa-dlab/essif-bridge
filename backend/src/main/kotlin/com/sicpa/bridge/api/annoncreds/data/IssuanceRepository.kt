package com.sicpa.bridge.api.annoncreds.data

import com.sicpa.acapyclient.api.IssueCredentialApi
import com.sicpa.acapyclient.api.SchemaApi
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialCreate
import com.sicpa.bridge.api.annoncreds.domain.model.CredentialIssuance
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaCreate
import com.sicpa.bridge.api.annoncreds.domain.model.SchemaSummary
import com.sicpa.bridge.api.mappers.IssuanceMapper.toCredentialIssuance
import com.sicpa.bridge.api.mappers.IssuanceMapper.toV10CredentialProposalRequestMand
import com.sicpa.bridge.api.mappers.SchemaMapper.toSchemaSendRequest
import com.sicpa.bridge.api.mappers.SchemaMapper.toSchemaSummary
import org.springframework.stereotype.Repository

@Repository
class IssuanceRepository {

    fun issueCredential(credentialCreate: CredentialCreate): CredentialIssuance {
        val credExchange =
            IssueCredentialApi().issueCredentialSendPost(credentialCreate.toV10CredentialProposalRequestMand())
        return credExchange.toCredentialIssuance()
    }


}