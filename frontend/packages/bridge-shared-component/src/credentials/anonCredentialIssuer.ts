import { CredentialIssuer } from "./credentialIssuer"
import { ResultAsync, errAsync, okAsync } from "neverthrow"
import { CredentialsIssuanceApi } from "bridge-api-client"

export interface AnonCredCredential {
  connectionId: string
  schemaId: string
  credentialDefinitionId: string
  attributes: any
}

export class AnonCredentialIsssuer implements CredentialIssuer {

  issue = (
    credential: any
  ): ResultAsync<boolean, Error> => {

    var anonCredential = credential as AnonCredCredential
    if (anonCredential == null) return errAsync(Error("invalid credential"))

    const credApi = new CredentialsIssuanceApi({
      basePath: process.env.REACT_APP_BRIDGE_API_URL,
    })

    console.log(anonCredential)

    const credIssu = credApi
      .issuanceCredentialPost({
        connectionId: anonCredential.connectionId,
        schemaId: anonCredential.schemaId,
        credentialDefinitionId: anonCredential.credentialDefinitionId,
        attributes: anonCredential.attributes,
      })

    const result = ResultAsync.fromPromise(credIssu, () => new Error("Could not issue credential"))

    return result.andThen( (issueReponse) => {
        if(issueReponse.status === 200) {
            return okAsync(true)
        }
        return errAsync(new Error("Could not issue credential"))
      }
    )
    
  }
}
