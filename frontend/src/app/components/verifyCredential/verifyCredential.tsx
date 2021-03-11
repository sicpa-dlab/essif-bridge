import React from 'react';

import { ArrowRight16 } from '@carbon/icons-react';
import { ClickableTile } from 'carbon-components-react';

import chekmark from '../../../assets/images/checkmark.circle.green.svg';
import ehicVerifier from '../../../assets/images/ehic-verifier-04.svg';
import './verifyCredential.scss';

interface OrganisationProps {
  logo: string;
  header: string;
  content: string;
  url: string;
}

const Tile: React.FC<OrganisationProps> = ({ logo, header, content, url }: OrganisationProps) => {
  return (
    <ClickableTile className="bx-tile custom-tile" href={url} light>
      <div className="custom-tile-header"> {header}</div>
      <div className="custom-tile-content"> {content} </div>
      <div className="custom-tile-footer" >
        <img src={logo} alt="ehic verifier" />
        <div className="bx--tile__chevron">
          <ArrowRight16 />
        </div>
      </div>
    </ClickableTile>
  )
}

export default class VerifyCredential extends React.Component<{}> {
  headerTitle: string;
  title: string;
  description: string;

  constructor(props: {}) {
    super(props);
    this.headerTitle = `Congratulations! Your digital European Health Insurance Card has been stored in your digital wallet.`;
    this.title = "What next?";
    this.description = `You can use your digital European Health Insurance Card at the following services:`
  }

  render() {
    return (
      <div className="verify-crendential bx--col-lg-7 bx--col-md-5  bx--col-sm-3">
        <img src={chekmark} alt="" style={{ width: '111px', height: '111px', marginBottom: '16px' }} />
        <h3>{this.headerTitle}</h3>
        <h2 className="verify-crendential-title">{this.title}</h2>
        <p>{this.description}</p>
        <div className="verify-crendential-tile" >
          <Tile header="Paris Regional Medical Centre" content="Verify your digital EHIC to receive treatment at the right coast." logo={ehicVerifier} url="https://verifier.essif.adaptivespace.io/verifier" />
        </div>
      </div>
    )
  }
}
