import React from 'react'

import { StepperProps } from '../../shared/models/stepperProps.interface'
import { CustomTile, ConnInvitation } from '../'
import didcom from '../../../assets/images/edison-wallet-didcom-03.svg'
import chapi from '../../../assets/images/edison-wallet-chapi-04.svg'
import './PresentCredential.scss'

const PresentCredential: React.FC<StepperProps> = ({ handleClick }) => {
  const headerTitle: string = "We need to verify your digital European Health Insurance Card to make sure you receive treatment at the right costs.";
  const title: string = "Choose your wallet";
  const description: string = `Please present your European Health Insurance Card from your identity wallet.
                                This might be an app on your mobile device, or a plugin. Please select the wallet you wish to use`;
  const header: string = "Browser Wallet";
  const content: string = "My wallet is a plugin in my browser.";
  const logo: string = chapi;

  return (
    <div className="present-credential bx--col-lg-7 bx--col-md-6  bx--col-sm-3">
      <h3>{headerTitle}</h3>
      <h2 className="present-credential-title">{title}</h2>
      <p>{description}</p>
      <div className="present-credential-tile" >
        <CustomTile header={header} content={content} logo={logo} handleClick={handleClick} />
        <ConnInvitation header="Mobile Wallet" content="My wallet is an application on my smartphone." logo={didcom}/>
      </div>
    </div>
  )
}

export default PresentCredential
