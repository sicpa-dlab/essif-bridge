import { CredentialIssuer } from './'
import { ResultAsync, errAsync } from "neverthrow"
import { CredentialsIssuanceApi } from 'bridge-api-client'

export interface AnonCredCredential {
    schemaId: any,
    credentialDefinitionId: any,
    attributes: any
}

export class AnonCredentialIsssuer implements CredentialIssuer {
    
    issue = (credential: any, connectionId?: string): ResultAsync<boolean, Error> => {

        var anonCredential = credential as AnonCredCredential
        if(anonCredential == null) return errAsync(Error("invalid credential"))

        const credApi = new CredentialsIssuanceApi({
            basePath: process.env.REACT_APP_BRIDGE_API_URL
        })

        credApi.issuanceCredentialPost(
            {
                connectionId: connectionId,
                schemaId: anonCredential.schemaId,
                credentialDefinitionId: anonCredential.credentialDefinitionId,
                attributes: anonCredential.attributes
            }
        )

        // connApi.connectionsPost({}).then( (result) => {
        //     setQrGenerated(result.data.invitationUrl);
        //     props.onConnectionInvitation?.(result.data.connectionId)
        // }).catch((error) => {
        //     // show retry
        // });


        return errAsync(Error("not implemented"))
    }



    
}