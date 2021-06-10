import { CredentialIssuer } from "./credentialIssuer"
import { ResultAsync, errAsync, okAsync } from "neverthrow"
import { OpenIDConnectConnectApi } from "bridge-api-client"

export class OidcCredentialIsssuer implements CredentialIssuer {

  issue = (
    credential: any
  ): ResultAsync<boolean, Error> => {

    
    if (credential == null) return errAsync(Error("invalid credential"))

    const credApi = new OpenIDConnectConnectApi({
      basePath: process.env.REACT_APP_BRIDGE_API_URL,
    })

    console.log(credential)

    const credIssu = credApi
      .sendCredential(credential)

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
