import React from "react";
import { ReceiveCrendential, Header, Steps, VerifyCredential, LogIn, ChooseWallet } from '../../components';
import { ProgressIndicatorStep, CredentialTransport, OIDCData } from '../../shared/models';
import subLogo from '../../../assets/images/essif-logo-issuer-colour.svg';
import logo from '../../../assets/images/essif-logo-lead-spain.svg';
import "./Issuer.scss";

interface IssuerState {
  currentIndex: number,
  walletType?: number,
  connectionId?: string,
  credentialTransport?: CredentialTransport,
  credentialData?: any
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
    this.state = { 
      currentIndex: 1
    };
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
        return <ReceiveCrendential connectionId={this.state.connectionId} credentialTransport={ this.transport() } credentialData={ this.state.credentialData } handleClick={this.handleChildClick} />
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

  handleChildClick = (data?: OIDCData) => {
    if(data != null) {
      this.setState({
        credentialTransport: CredentialTransport.OIDCSIOP,
        credentialData: data
      })
    }
    this.nextStep()
  }

  onConnectionInvitation = (connectionId: string) => {
    this.setState({
      connectionId: connectionId,
      credentialTransport: CredentialTransport.DIDCOMM
    })
    this.nextStep()
  }

  render() {
    return (
      <div>
        <Header title={this.title} page={this.page} logo={logo} subLogo={subLogo} description="Ministry of Social Security & Inclusion"></Header>
        <div className="issuer-step"><Steps steps={this.steps} currentIndex={this.state.currentIndex} /></div>
        <div className="issuer-content">{this.getStepContent()}</div>
      </div>
    );
  }
}