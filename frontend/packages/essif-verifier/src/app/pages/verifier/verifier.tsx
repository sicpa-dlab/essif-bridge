import React from 'react'

import { Header, PresentCredential, Steps } from '../../components'
import { VerifyEHIC } from '../../components/verifyEHIC'
import { ProgressIndicatorStep, ChapiResult } from "../../shared/models"
import { SicpaBridgeClient, WalletChapi } from 'bridge-shared-components'
import * as chapiQueries from '../../components/chapi-example/WalletQueries'
import logo from '../../../assets/images/essif-logo-lead-france.svg'
import subLogo from '../../../assets/images/essif-logo-verifier2-white.svg'
import "./verifier.scss"

interface VerifyState {
  currentIndex: number
  chapiResult: ChapiResult
}

export default class Verifier extends React.Component<{}, VerifyState> {
  organisation = "Neutopia Health Service";
  page = "verifier";
  title = "Verify an EHIC";

  steps: Array<ProgressIndicatorStep> = [
    { id: 1, label: "Present Credential" },
    { id: 2, label: "Verify Credential" },
  ]
  constructor(props: {}, private walletChapi: WalletChapi) {
    super(props);
    this.state = { currentIndex: 0, chapiResult: { checks: [], errors: [] } };
    const bridgeClient = new SicpaBridgeClient();
    this.walletChapi = new WalletChapi(bridgeClient);
    this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    this.walletChapi.configure()
  }

  /**
   * Verify Credential and eidas and set their state.
   */
  verifyChapiCredential = () => {
    this.walletChapi.verifyCredential(chapiQueries.credentialQuery()).then((response) => {
      const chapiResult = response as ChapiResult
      if(chapiResult.checks) {
        this.setState( { chapiResult: response })
      } else {
        this.setState( { chapiResult: { checks: [], errors: ['proof'] } })
      }
    }).catch(() => { /* errors handle */ })
  }

  getStepContent() {
    switch (this.state.currentIndex) {
      case 0:
        return <PresentCredential handleClick={this.nextStep} />
      case 1:
        return <VerifyEHIC result={this.state.chapiResult} />
      default:
        return null;
    }
  }

  nextStep = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1 })
    this.verifyChapiCredential();
  }

  render() {
    return (
      <div>
        <Header title={this.title} page={this.page} logo={logo} subLogo={subLogo} description="Paris Regional Medical Centre"></Header>
        <div className="verify-step"><Steps steps={this.steps} currentIndex={this.state.currentIndex}></Steps></div>
        <div className="verify-content">{this.getStepContent()}</div>
      </div>
    );
  }
}
