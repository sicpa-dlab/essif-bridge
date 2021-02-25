import React from "react";

import ehicIssuer from "../../../assets/images/ehic-issuer-02.svg";
import Header from "../../components/header";
import Steps from '../../components/steps';
import { ProgressIndicatorStep } from '../../shared/models';


export default class Issuer extends React.Component {
  organisation = "Utopia Business Services Authority";
  page = "issuer";
  title = "Get your EHIC";

  steps: Array<ProgressIndicatorStep> = [
    { id: 1, label: "Authenticate" },
    { id: 2, label: "Connect Wallet" },
    { id: 3, label: "Receive Credential" },
  ]

  render() {
    return (
      <div>
        <Header title={this.title} page={this.page} icon={ehicIssuer} organisation={this.organisation}></Header>
        <Steps steps={this.steps} />
      </div>
    );
  }
}
