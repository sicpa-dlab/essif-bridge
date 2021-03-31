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

  steps: Array<ProgressIndicatorStep> = [
    { id: 0, label: "Log in" },
    { id: 1, label: "Choose wallet" },
    { id: 2, label: "Receive Credential" },
  ]

  constructor(props: {}) {
    super(props);
    this.state = { currentIndex: 1 };
  }

  transport = (): CredentialTransport => {
    return this.state.credentialTransport || CredentialTransport.CHAPI
  }

  getStepContent() {
    switch (this.state.currentIndex) {
      case 0:
        return <LogIn handleClick={this.handleChildClick} />
      case 1:
        return <ChooseWallet onConnectionInvitation={this.onConnectionInvitation} handleClick={this.handleChildClick} />
      case 2:
        return <ReceiveCrendential connectionId={this.state.connectionId} credentialTransport={ this.transport() } handleClick={this.handleChildClick} />
      case 3:
        return <VerifyCredential />
      default:
        return null;
    }
  }

  private nextStep = () => {
    if (this.state.currentIndex < 4) {
      this.setState({ currentIndex: this.state.currentIndex + 1 })
    }
  }

  handleChildClick = () => {
    if(this.state.currentIndex > 1 && this.state.credentialTransport === CredentialTransport.DIDCOMM) return;
    this.nextStep()
  }

  onConnectionInvitation = (connectionId: string) => {
    this.setState({
      connectionId: connectionId,
      credentialTransport: CredentialTransport.DIDCOMM
    })
  }

  currentTopic = (): string => {
    var baseTopic = ''
    switch (this.state.currentIndex) {
      case 1:
        baseTopic = `connections`
        break
      case 2:
        baseTopic = `credential`
        break
    }

    console.log(`Subscribing to: ${baseTopic}/${this.state.connectionId}`)
    return `topic/${baseTopic}/${this.state.connectionId}`
  }

  handleMessage = (stompMessage: any) => {
    console.log(JSON.parse(stompMessage.body))
    const connState = JSON.parse(stompMessage.body)?.state
    const invitation = this.state.currentIndex === 1 && connState === "response"
    const issued = this.state.currentIndex === 2 && connState === "credential_issued"

    if(invitation || issued) {
      this.nextStep()
    }
  }

  render() {
    return (
      <div>
        <Header title={this.title} page={this.page} logo={logo} subLogo={subLogo} description="Ministry of Social Security & Inclusion"></Header>
        <div className="issuer-step"><Steps steps={this.steps} currentIndex={this.state.currentIndex} /></div>
        <div className="issuer-content">{this.getStepContent()}</div>
        { this.state.connectionId &&
          <StompClient endpoint={`${process.env.REACT_APP_WEBSOCKET_URL}`} topic={this.currentTopic()} onMessage={this.handleMessage}><div></div></StompClient>
        }
      </div>
    );
  }
}