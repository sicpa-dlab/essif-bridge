import React, { Component } from "react"
import * as polyfill from "credential-handler-polyfill"
import { BridgeClient } from '../../../lib/bridge-service'
import { v4 as uuidv4 } from 'uuid';
import { sampleCredential } from './sample-credential'

interface IssuerChapiProps {
}

type IssuerChapiState = {
}

interface WalletCredential extends Credential {
  readonly data: any;
}

// eslint-disable-next-line
interface VerifiablePresentation {
  verifiablePresentation: any
}

interface WebCredentialWrapper extends Credential {
  verifiableCredential: any
}

export default class IssuerChapi extends Component<IssuerChapiProps, IssuerChapiState> {

  private bridgeClient: BridgeClient
  private credPolifill: any

  constructor(props: IssuerChapiProps) {
    super(props);

    this.bridgeClient = new BridgeClient();
  }

  async componentDidMount() {
    this.credPolifill = await polyfill.loadOnce()
  }

  connectToWallet = async () => {

    const challengeGenerated = uuidv4();

    const credentialQuery = {
      web: {
        VerifiablePresentation: {
          query: {
            type: 'DIDAuth'
          },
          // a 128-bit randomly generated value encoded as a string (use a UUID);
          // it will be digitally signed in the authentication proof
          // that will be attached to the VerifiablePresentation response
          //challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
          challenge: challengeGenerated,
          // the domain that must be digitally signed in the authentication
          // proof that will be attached to the VerifiablePresentation
          // response, identifying the recipient
          domain: 'essif.adaptivespace.io'
        }
      }
    } as CredentialRequestOptions;

    const webCredential = await navigator.credentials.get(credentialQuery);

    const {
      data: presentation
    } = webCredential as WalletCredential;

    const verification = await this.bridgeClient.verifyPresentation(presentation);
    console.log(`Valid presentation: ${verification.isOk()}`);

    if (verification.isOk()) {
      await this.issueCredential(presentation);
    }

  }

  issueCredential = async (presentation: any) => {

    const signedCredential = await this.bridgeClient.issueCredential(sampleCredential)
    if (signedCredential.isErr()) {
      console.log(signedCredential.error);
      return;
    }

    const webCredentialWrapper = presentation as WebCredentialWrapper

    webCredentialWrapper.verifiableCredential = signedCredential.value

    const webCredential = new this.credPolifill.WebCredential('VerifiablePresentation', webCredentialWrapper)

    const result = await navigator.credentials.store(webCredential)

    console.log(result)

  }

  render() {
    return (
      <>
        <div>
          <button onClick={async () => { await this.connectToWallet(); }}>Connect to Wallet</button>
        </div>
      </>
    );
  }
}
