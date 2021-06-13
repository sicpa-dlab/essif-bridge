import { BridgeClient } from "../sicpa-bridge/BridgeClient"

export class JsonLdCredentialVerifier {
  private bridgeClient: BridgeClient

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient
  }

  verifyCredential = async (credential: any): Promise<any> => {
    const verification = await this.bridgeClient.verifyCredential(credential)

    console.log(verification.isOk() ? verification.value : verification.error)

    return verification.isOk() ? verification.value : []
  }
}
