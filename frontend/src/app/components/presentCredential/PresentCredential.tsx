import React from 'react'

import didcom from '../../../assets/images/edison-wallet-didcom-03.svg';
import chapi from '../../../assets/images/edison-wallet-chapi-04.svg';
import './PresentCredential.scss'
import { CustomTile } from '..';
import { StepperProps } from '../../shared/models/stepperProps.interface';

const PresentCredential: React.FC<StepperProps> = ({ handleClick }) => {
  const headerTitle: string = "We need to verify your European Health Insurance Card to make sure you receive treatment at the right costs.";
  const title: string = "Choose your wallet";
  const description: string = `Please present your European Health Insurance Card from your identity walle.
                                This might bean app on your mobile device, or a plugin. Please select the walet you wish use`;
  const header: string = "Browser Wallet";
  const content: string = "My wallet is a plugin in my browser.";
  const logo: string = chapi;

  return (
    <div className="present-credential bx--col-lg-5 bx--col-md-6  bx--col-sm-3">
      <h3>{headerTitle}</h3>
      <h2 className="present-credential-title">{title}</h2>
      <p>{description}</p>
      <div className="present-credential-tile" >
        <CustomTile header={header} content={content} logo={logo} handleClick={handleClick} />
        <CustomTile header='Mobile Wallet' content='My wallet is an app on my smartphone.' logo={didcom} isExpendable disabled />
      </div>
    </div>
  )
}

export default PresentCredential
