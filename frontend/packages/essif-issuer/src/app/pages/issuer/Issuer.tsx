import React from "react";

import logo from '../../../assets/images/essif-logo-lead-spain.svg';
import subLogo from '../../../assets/images/essif-logo-issuer-colour.svg';
import "./Issuer.scss";
import { ProgressIndicatorStep, CredentialTransport } from '../../shared/models';
import { ReceiveCrendential, Header, Steps, VerifyCredential, LogIn, ChooseWallet } from '../../components';
import StompClient from "react-stomp-client"


interface IssuerState {
  currentIndex: number,
  walletType?: number,
  connectionId?: string,
  credentialTransport?: CredentialTransport
}

export default class Issuer extends React.Component<{}, IssuerState> {
  organisation = "Utopia Business Services Authority";
  page = "issuer";
  title = "Get your EHIC";
  state: IssuerState
  currentTopic = "none"

  steps: Array<ProgressIndicatorStep> = [
    { id: 0, label: "Log in" },
    { id: 1, label: "Choose wallet" },
    { id: 2, label: "Receive Credential" },
  ]

  constructor(props: {}) {
    super(props);
    this.state = { currentIndex: 1 };
    this.nextStep = this.nextStep.bind(this);
  }

  transport = (): CredentialTransport => {
    return this.state.credentialTransport || CredentialTransport.chapi
  }

  getStepContent() {
    switch (this.state.currentIndex) {
      case 0:
        return <LogIn handleClick={this.nextStep} />
      case 1:
        return <ChooseWallet onConnectionInvitation={this.onConnectionInvitation} handleClick={this.nextStep} />
      case 2:
        return <ReceiveCrendential credentialTransport={ this.transport() } handleClick={this.nextStep} />
      case 3:
        return <VerifyCredential />
      default:
        return null;
    }
  }

  nextStep() {
    if (this.state.currentIndex < 4) {
      this.setState({ currentIndex: this.state.currentIndex + 1 })
    }
  }

  onConnectionInvitation = (connectionId: string) => {
    this.setState({
      connectionId : `topic/${connectionId}`,
      credentialTransport: CredentialTransport.anoncreds
    })

    // remove
    this.handleMessage("hello")
  }

  handleMessage = (stompMessage: any) => {
    console.log(stompMessage);

    setTimeout(() => {
      this.nextStep()
    }, 5000);
  }

  render() {
    return (
      <div>
        <Header title={this.title} page={this.page} logo={logo} subLogo={subLogo} description="Ministry of Social Security & Inclusion"></Header>
        <div className="issuer-step"><Steps steps={this.steps} currentIndex={this.state.currentIndex} /></div>
        <div className="issuer-content">{this.getStepContent()}</div>
        { this.state.connectionId &&
          <StompClient endpoint={`${process.env.REACT_APP_WEBSOCKET_URL}`} topic={this.state.connectionId} onMessage={this.handleMessage}><div></div></StompClient>
        }
      </div>
    );
  }
}