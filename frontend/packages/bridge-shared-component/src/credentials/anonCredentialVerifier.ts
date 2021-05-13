import { VerificationsApi } from "bridge-api-client"
import { ResultAsync, errAsync, okAsync } from 'neverthrow'

export class AnonCredentialVerifier {

    sendProof = (
        connectionId: string,
        verificationTemplateId: number
        
      ): ResultAsync<boolean, Error> => {

        const verApi = new VerificationsApi({
            basePath: process.env.REACT_APP_BRIDGE_API_URL,
        })

        const verIssu = verApi.verificationsPost(
            {
                connectionId: connectionId,
                verificationTemplateId: verificationTemplateId
            }
        )

        const result = ResultAsync.fromPromise(verIssu, () => new Error("Could not send verification"))

        return result.andThen( (issueReponse) => {
            if(issueReponse.status === 200) {
                return okAsync(true)
            }
            return errAsync(new Error("Could not send verification"))
        })

    }

}