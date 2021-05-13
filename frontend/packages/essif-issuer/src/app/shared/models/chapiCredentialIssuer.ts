import { CredentialIssuer } from "bridge-shared-components"
import { WalletChapi, SicpaBridgeClient } from "bridge-shared-components"
import { ResultAsync, errAsync } from "neverthrow"
import * as chapiQueries from "../../components/chapi-example/WalletQueries"
import { sampleCredential } from "../../components/chapi-example/sample-credential"

export class ChapiCredentialIssuer implements CredentialIssuer {
  private walletChapi: WalletChapi

  constructor() {
    const bridgeClient = new SicpaBridgeClient()
    this.walletChapi = new WalletChapi(bridgeClient)
  }

  configure = () => {
    this.walletChapi.configure()
  }

  issue = (credential: any): ResultAsync<boolean, Error> => {
    return this.auth(chapiQueries.didAuthQuery()).andThen((presentation) => {
      if (presentation == null) {
        return errAsync(new Error("Could not authenticate"))
      }
      return this.issueCredential(presentation, sampleCredential)
    })
  }

  auth = (query: any): ResultAsync<any, Error> => {
    const auth = this.walletChapi?.connectToWallet(query)
    return ResultAsync.fromPromise(
      auth,
      () => new Error("Could not authenticate")
    )
  }

  issueCredential = (
    presentation: any,
    cred: any
  ): ResultAsync<boolean, Error> => {
    return ResultAsync.fromPromise(
      this.walletChapi?.issueCredential(presentation, cred),
      () => new Error("Could not issue Credential")
    )
  }
}
