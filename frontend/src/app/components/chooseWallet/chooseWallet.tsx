import React from 'react';

import chapi from '../../../assets/images/edison-wallet-chapi-04.svg';
import didcom from '../../../assets/images/edison-wallet-didcom-03.svg';
import { StepperProps } from '../../shared/models/stepperProps.interface';
import { CustomTile } from '..';
import './chooseWallet.scss';

export default class ChooseWallet extends React.Component<StepperProps> {
  headerTitle: string;
  title: string;
  description: string;

  constructor(props: StepperProps) {
    super(props);
    this.headerTitle = `Welcome back! Now you've logged in, your're only a few steps away from receiving your European Health Insurance Card (EHIC).`;
    this.title = "Choose your wallet";
    this.description = `To safely store your European Health Insurance Card, you need a digital wallet. This could be an app in your mobile device,
    or in your browser. Please select the wallet you wish to use.`
  }

  render() {
    return (
      <div className="connect-wallet bx--col-lg-5 bx--col-md-6  bx--col-sm-3">
        <h3>{this.headerTitle}</h3>
        <h2 className="connect-wallet-title">{this.title}</h2>
        <p>{this.description}</p>
        <div className="connect-wallet-tile" >
          <CustomTile header="Browser Wallet" content="My wallet is a plugin in my browser." logo={chapi} handleClick={this.props.handleClick} />
          <CustomTile header="Mobile Wallet" content="My wallet is an app on my smartphone." logo={didcom} isExpendable disabled />
        </div>
      </div>
    )
  }
}
