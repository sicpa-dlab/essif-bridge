import React from 'react';

import chapi from '../../../assets/images/edison-wallet-chapi-04.svg';
import didcom from '../../../assets/images/edison-wallet-didcom-03.svg';
import { StepperProps } from '../../shared/models/stepperProps.interface';
import CustomTile from '../customTile';
import './chooseWallet.scss';

export default class ChooseWallet extends React.Component<StepperProps> {
  headerTitle: string;
  title: string;
  description: string;
  header: string; content: string; logo: string;

  constructor(props: StepperProps) {
    super(props);
    this.header = "Browser Wallet";
    this.content = "My wallet is a plugin in my browser.";
    this.logo = chapi;
    this.headerTitle = `Welcome back Mr. Mortimer! If you're looking to receive your European Health Insurance Card, you're in the right place.`;
    this.title = "Choose your wallet";
    this.description = `In order to safely store your EHIC, you need a digital identity wallet.
    These wallets can be your modile device in a dedicated app, or integrated into your web browser through a plugin. 
    If you have an existing identity wallet, please select the appropriate type.`
  }

  render() {
    return (
      <div className="connect-wallet bx--col-lg-5 bx--col-md-6  bx--col-sm-3">
        <h3>{this.headerTitle}</h3>
        <h2 className="connect-wallet-title">{this.title}</h2>
        <p>{this.description}</p>
        <div className="connect-wallet-tile" >
          <CustomTile header={this.header} content={this.content} logo={this.logo} handleClick={this.props.handleClick} />
        </div>
        <div style={{ marginTop: '2px' }}>
          <CustomTile header={'Mobile Wallet'} content={'My wallet is an app on my smartphone.'} logo={didcom} isExpendable disabled />
        </div>
      </div>
    )
  }
}
