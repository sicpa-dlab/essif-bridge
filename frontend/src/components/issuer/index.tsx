import React, { Component } from "react";
import IssuerChapi from '../issuer-chapi';

export default class Issuer extends Component {
  render() {
    return (
      <div>
        <h2>Issuer Page</h2>
        <IssuerChapi/>
      </div>
    );
  }
}
