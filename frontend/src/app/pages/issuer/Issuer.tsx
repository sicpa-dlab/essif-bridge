import React from "react";

import ehicIssuer from "../../../assets/images/ehic-issuer-02.svg";
import "./Issuer.scss";
import { ProgressIndicatorStep } from '../../shared/models';
import { ReceiveCrendential, Header, Steps, VerifyCredential, LogIn, ChooseWallet } from '../../components';

export default class Issuer extends React.Component<{}, { currentIndex: number }> {
  organisation = "Utopia Business Services Authority";
  page = "issuer";
  title = "Get your EHIC";

  steps: Array<ProgressIndicatorStep> = [
    { id: 0, label: "Log in" },
    { id: 1, label: "Choose wallet" },
    { id: 2, label: "Receive Credential" },
  ]

  constructor(props: {}) {
    super(props);
    this.state = { currentIndex: 0 };
    this.nextStep = this.nextStep.bind(this);
  }

  getStepContent() {
    switch (this.state.currentIndex) {
      case 0:
        return <LogIn handleClick={this.nextStep} />
      case 1:
        return <ChooseWallet handleClick={this.nextStep} />
      case 2:
        return <ReceiveCrendential handleClick={this.nextStep} />
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

  render() {
    return (
      <div>
        <Header title={this.title} page={this.page} icon={ehicIssuer} organisation={this.organisation}></Header>
        <div className="issuer-step"><Steps steps={this.steps} currentIndex={this.state.currentIndex} /></div>
        <div className="issuer-content">{this.getStepContent()}</div>
      </div >
    );
  }


}
