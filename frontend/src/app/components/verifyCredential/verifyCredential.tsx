import { ArrowRight16 } from '@carbon/icons-react';
import { ClickableTile } from 'carbon-components-react';
import React from 'react'

import ehic from '../../../assets/images/ehic-verifier-favicon@2x.png';
import { StepperProps } from '../../shared/models/stepperProps.interface';
import './verifyCredential.scss'

interface OrganisationProps {
  logo: string;
  name: string;
  url: string;
}

const Tile: React.FC<OrganisationProps> = ({ logo, name, url }: OrganisationProps) => {
  return (
    <ClickableTile className="bx-tile custom-tile bx--col-lg-6" href={url} light>
      <div className="custom-tile-header"> <img style={{ width: '24px', height: '24px' }} src={logo} alt={`${name} logo`} /></div>
      <div className="custom-tile-content"> {name} </div>
      <div className="custom-tile-footer" >
        <div className="bx--tile__chevron">
          <ArrowRight16 />
        </div>
      </div>
    </ClickableTile>
  )
}

interface Props {

}

export default class VerifyCredential extends React.Component<Props> {
  headerTitle: string;
  title: string;
  description: string;

  constructor(props: Props) {
    super(props);
    this.headerTitle = `Congratulations! You received your digital EHIC! Your credential is securley stored in your identity wallet on your web browser.`;
    this.title = "What next?";
    this.description = `The following organisations and services are able to verify and accept your EHIC credential.`
  }

  render() {
    return (
      <div className="connect-wallet bx--col-lg-5 bx--col-md-6  bx--col-sm-3">
        <h3>{this.headerTitle}</h3>
        <h2 className="connect-wallet-title">{this.title}</h2>
        <p>{this.description}</p>
        <div className="connect-wallet-tile" style={{ display: 'flex', flexFlow: 'row wrap' }} >
          <Tile logo={ehic} name='Neutopia Health Service' url='/verifier' />
          <Tile logo={ehic} name='Neutopia Health Service' url='/verifier' />
          <Tile logo={ehic} name='Neutopia Health Service' url='/verifier' />
        </div>
      </div>
    )
  }
}
