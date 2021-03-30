import React from 'react';

import chapi from '../../../assets/images/edison-wallet-chapi-04.svg';
import didcom from '../../../assets/images/edison-wallet-didcom-03.svg';
import { StepperProps } from '../../shared/models/stepperProps.interface';
import { CustomTile, ConnInvitation } from '..';
import './chooseWallet.scss';

interface StepperState {
  invitationCreated: boolean
}

export default class ChooseWallet extends React.Component<StepperProps,StepperState> {
  headerTitle: string;
  title: string;
  description: string;

  constructor(props: StepperProps) {
    super(props);
    this.headerTitle = `Welcome back! Now you've logged in, you're only a few steps away from receiving your digital European Health Insurance Card (EHIC).`;
    this.title = "Choose your wallet";
    this.description = `To safely store your digital European Health Insurance Card, you need a digital wallet. This could be an application in your mobile device,
    or in your browser. Please select the wallet you wish to use.`

    this.state = {
      invitationCreated: false
    }

  }

  render() {
    return (
      <div className="connect-wallet bx--col-lg-7 bx--col-md-6  bx--col-sm-3">
        <h3>{this.headerTitle}</h3>
        <h2 className="connect-wallet-title">{this.title}</h2>
        <p>{this.description}</p>
        <div className="connect-wallet-tile" >
          <CustomTile header="Browser Wallet" content="My wallet is a plugin in my browser." logo={chapi} handleClick={this.props.handleClick} />
          <ConnInvitation header="Mobile Wallet" content="My wallet is an application on my smartphone." onConnectionInvitation={this.props.onConnectionInvitation} logo={didcom}/>
        </div>
      </div>
    )
  }
}
