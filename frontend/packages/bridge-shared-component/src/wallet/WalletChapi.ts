import * as polyfill from "credential-handler-polyfill"
import { BridgeClient } from "../sicpa-bridge/BridgeClient"

interface WalletCredential extends Credential {
  readonly data: any
}
interface WebCredentialWrapper extends Credential {
  verifiableCredential: any
  holder: string
}

interface VerifiablePresentationWithCredential extends Credential {
  readonly data: WebCredentialWrapper
}

interface CredentialSubject {
  id: string
}
interface VerifiableCredential {
  credentialSubject: CredentialSubject
}

export class WalletChapi {
  private bridgeClient: BridgeClient
  private credPolifill: any

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient
  }

  configure = async () => {
    this.credPolifill = await polyfill.loadOnce()
  }

  connectToWallet = async (didAuthQuery: any) => {
    const webCredential = await navigator.credentials.get(didAuthQuery)

    if (webCredential == null) {
      return
    }
    const { data: presentation } = webCredential as WalletCredential

    const verification = await this.bridgeClient.verifyPresentation(
      presentation
    )

    return verification.isOk() ? presentation : null
  }

  issueCredential = async (
    presentation: any,
    credential: any
  ): Promise<boolean> => {

    credential.issuanceDate = new Date().toISOString();

    const webCredentialWrapper = presentation as WebCredentialWrapper
    if (webCredentialWrapper == null) return false

    const unSignedCredential = credential as VerifiableCredential
    if (unSignedCredential == null) return false
    unSignedCredential.credentialSubject.id = webCredentialWrapper.holder

    const signedCredential = await this.bridgeClient.issueCredential(
      unSignedCredential
    )

    if (signedCredential.isErr()) {
      console.log(signedCredential.error)
      return false
    }

    webCredentialWrapper.verifiableCredential = signedCredential.value

    const webCredential = new this.credPolifill.WebCredential(
      "VerifiablePresentation",
      webCredentialWrapper
    )

    const result = await navigator.credentials.store(webCredential)

    return result?.type === "web" || false
  }

  verifyCredential = async (credentialQuery: any): Promise<any> => {
    const presentation = await navigator.credentials.get(credentialQuery)

    if (presentation == null) return []

    const {
      data: presentationData,
    } = presentation as VerifiablePresentationWithCredential

    if (presentationData?.verifiableCredential == null) return []

    const credential = presentationData.verifiableCredential[0]

    console.log("extracted Credential:", JSON.stringify(credential, null, 2))

    const verification = await this.bridgeClient.verifyCredential(credential)

    console.log(verification.isOk() ? verification.value : verification.error)

    return verification.isOk() ? verification.value : []
  }
}
