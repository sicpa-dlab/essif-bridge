import React from 'react';

import { Header, PresentCredential, Steps } from '../../components';
import { VerifyEHIC } from '../../components/verifyEHIC';
import { ProgressIndicatorStep } from "../../shared/models";
import { SicpaBridgeClient, WalletChapi } from 'bridge-shared-components';
import * as chapiQueries from '../../components/chapi-example/WalletQueries'
import { InlineLoadingProps } from 'carbon-components-react';
import logo from '../../../assets/images/essif-logo-lead-france.svg';
import subLogo from '../../../assets/images/essif-logo-verifier2-white.svg';
import "./verifier.scss";

interface VerifyState {
  currentIndex: number;
  chapiResult: string;
  credentialState: InlineLoadingProps['status'];
}

export default class Verifier extends React.Component<{}, VerifyState> {
  organisation = "Neutopia Health Service";
  page = "verifier";
  title = "Verify an EHIC";
  verificationResult: Array<string>;

  steps: Array<ProgressIndicatorStep> = [
    { id: 1, label: "Present Credential" },
    { id: 2, label: "Verify Credential" },
  ]
  constructor(props: {}, private walletChapi: WalletChapi) {
    super(props);
    this.state = { currentIndex: 0, chapiResult: "Ready", credentialState: 'active' };
    const bridgeClient = new SicpaBridgeClient();
    this.walletChapi = new WalletChapi(bridgeClient);
    this.verificationResult = [];
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
      this.verificationResult = response;
      response.includes('proof') ? this.setState({ credentialState: 'finished' }) : this.setState({ credentialState: 'error' })
    }).catch(() => { /* errors handle */ })
  }

  getStepContent() {
    switch (this.state.currentIndex) {
      case 0:
        return <PresentCredential handleClick={this.nextStep} />
      case 1:
        return <VerifyEHIC result={this.verificationResult} credentialState={this.state.credentialState} />
      default:
        return null;
    }
  }

  nextStep = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1, chapiResult: "verifying credential" })
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
