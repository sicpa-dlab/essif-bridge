import React, { Component } from 'react'
import { sampleCredential } from './sample-credential'
import * as chapiQueries from './WalletQueries'
import { WalletChapi, SicpaBridgeClient } from 'bridge-shared-components'

interface IssuerChapiProps {
}

type IssuerChapiState = {
  chapiResult: string
}

export default class ChapiExample extends Component<IssuerChapiProps, IssuerChapiState> {

  private walletChapi: WalletChapi

  constructor(props: IssuerChapiProps) {
    super(props);
    const bridgeClient = new SicpaBridgeClient();
    this.walletChapi = new WalletChapi(bridgeClient)
    this.state = { chapiResult: "Ready" };
  }

  async componentDidMount() {
    await this.walletChapi.configure()
  }

  issueChapiCredential = async () => {
    this.setState({ chapiResult: "connecting to wallet" })
    const presentation = await this.walletChapi.connectToWallet(chapiQueries.didAuthQuery())
    if (presentation == null) {
      this.setState({ chapiResult: "could not connect to wallet" })
      return
    }

    this.setState({ chapiResult: "issuing credential" })
    const issuance = await this.walletChapi.issueCredential(presentation, sampleCredential)
    this.setState({ chapiResult: issuance ? "credential ISSUED" : "could not issue the credential" })
  }

  verifyChapiCredential = async () => {
    this.setState({ chapiResult: "verifying credential" })
    const vefification = await this.walletChapi.verifyCredential(chapiQueries.credentialQuery())
    this.setState({ chapiResult: vefification.length > 0 ? vefification.join(" - ") : "could not verify credential" })
  }

  render() {
    return (
      <>
        <div>
          <div style={{ margin: "2em" }}>
            <button onClick={async () => { await this.issueChapiCredential(); }}>Issue Credential</button>
          </div>
          <div style={{ margin: "2em" }}>
            <button onClick={async () => { await this.verifyChapiCredential(); }}>VerifyCredential</button>

          </div>
          <div style={{ margin: "2em" }}>
            <h3>{this.state.chapiResult}</h3>
          </div>
        </div>
      </>
    );
  }
}
