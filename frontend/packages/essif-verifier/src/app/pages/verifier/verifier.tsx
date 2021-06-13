import React from 'react'

import { Header, PresentCredential, Steps } from '../../components'
import { VerifyEHIC } from '../../components/verifyEHIC'
import { ProgressIndicatorStep, VerificationResult } from "../../shared/models"
import { CredentialTransport, SicpaBridgeClient, WalletChapi } from 'bridge-shared-components'
import * as chapiQueries from '../../components/chapi-example/WalletQueries'
import logo from '../../../assets/images/essif-logo-lead-france.svg'
import subLogo from '../../../assets/images/essif-logo-verifier2-white.svg'
import "./verifier.scss"
import { StepResult } from '../../shared/models/stepperProps.interface'

interface VerifyState {
  currentIndex: number
  verificationResult: VerificationResult,
  stepResult: StepResult
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
    this.state = { 
      currentIndex: 0,
      verificationResult: { checks: [], errors: [] },
      stepResult: { transport: CredentialTransport.CHAPI }
    };
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
      const chapiResult = response as VerificationResult
      if(chapiResult.checks) {
        this.setState( { verificationResult: response })
      } else {
        this.setState( { verificationResult: { checks: [], errors: ['proof'] } })
      }
    }).catch(() => { /* errors handle */ })
  }

  getStepContent() {
    switch (this.state.currentIndex) {
      case 0:
        return <PresentCredential handleClick={this.nextStep} />
      case 1:
        return <VerifyEHIC verificationResult={this.state.verificationResult} result={this.state.stepResult} />
      default:
        return null;
    }
  }

  nextStep = (result: StepResult) => {

    const verificationResult: VerificationResult = { checks: [], errors: [] }

    if(result.transport !== CredentialTransport.CHAPI) {
      if(result.valid) {
        verificationResult.checks.push('proof')
      } else {
        verificationResult.errors.push('proof')
      }
    }

    this.setState({ 
      currentIndex: this.state.currentIndex + 1,
      verificationResult: verificationResult,
      stepResult: result
    })

    if(result.transport === CredentialTransport.CHAPI) {
      this.verifyChapiCredential();
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    
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
