import React from 'react';

import ehicVerifier from "../../../assets/images/ehic-verifier-02.svg";
import Header from "../../components/header";
import Steps from '../../components/steps';
import { ProgressIndicatorStep } from "../../shared/models";

export default class Verifier extends React.Component {
  organisation = "Neutopia Health Service";
  page = "verifier";
  title = "Verify an EHIC";

  steps: Array<ProgressIndicatorStep> = [
    { id: 1, label: "Connect-wallet" },
    { id: 2, label: "Present Credential" },
    { id: 3, label: "Verify Credential" },
  ]

  render() {
    return (
      <>
        <Header title={this.title} page={this.page} icon={ehicVerifier} organisation={this.organisation}></Header>
        <Steps steps={this.steps}></Steps>
      </>
    );
  }
}
