import React from 'react'
import { ArrowRight16 } from '@carbon/icons-react'
import { ClickableTile } from 'carbon-components-react'

import chapi from '../../../assets/images/edison-wallet-chapi-04.svg'
import didcom from '../../../assets/images/edison-wallet-didcom-03.svg'
import oidcIcon from '../../../assets/images/edison-wallet-openid-01.svg'
import verifierLogo from '../../../assets/images/ehic-verifier-bluewhite@4x.png'
import issuerLogo from '../../../assets/images/essif-logo-issuer-colour.svg'
import sicpa from '../../../assets/images/sicpa-monogram-w-38.svg'
import { Header } from '../../components'
import './Home.scss'

interface OrganisationProps {
  logo: string;
  header: string;
  content: string;
  url?: string;
  className?: string;
}

const Tile: React.FC<OrganisationProps> = ({ logo, header, content, url, className }: OrganisationProps) => {
  return (
    <ClickableTile aria-disabled className={`bx-tile custom-tile bx--col-lg-6 ${className}`} href={url} target="_blank" rel="noreferrer" light>
      <div className="custom-tile-header"> {header}</div>
      <div className="custom-tile-content"> {content} </div>
      <div className="custom-tile-footer" >
        <img style={{ height: '56px', width: '56px' }} src={logo} alt={`${header} logo`} />
        <div className="bx--tile__chevron">
          <ArrowRight16 />
        </div>
      </div>
    </ClickableTile>
  )
}
export default class Home extends React.Component {
  render() {
    return (
      <>
        <Header title="ESSIF Bridge Live Demo" page='home' logo={sicpa}></Header>
        <div className="home">
          <div className="home-content">
            <div className="bx--col-lg-6 bx--col-md-6 bx bx--no-gutter">
              <h3 className="home-title">Demo launchpad for the ESSIF Bridge project, following a European Health Insurance Card (EHIC) use case, powered by SICPA Bridge.</h3>
            </div>
            <div className="bx--col-lg-6 bx--col-md-6 bx bx--no-gutter">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
            <div className="bx--col-lg-6 bx--no-gutter" style={{ display: 'flex', flexFlow: 'row wrap' }}>
              <Tile header="Issuer" content="Ministry of Social Security & Inclusion." logo={issuerLogo} url="https://issuer.essif.adaptivespace.io" />
              <Tile header="Verifier" content="Paris Regional Medical Centre." logo={verifierLogo} url="https://verifier.essif.adaptivespace.io" />
              <Tile header="Browser Wallet" content="Web interface for browser wallet." logo={chapi} url="https://wallet.essif.adaptivespace.io" />
              <Tile className="home-mobile-tile-sus" header="Mobile Wallet" content="DIDComm Aries Wallet" logo={didcom} url="https://play.google.com/store/apps/details?id=com.esatus.wallet&hl=en&gl=US" />
              <Tile className="home-mobile-tile-sus" header="OIDC-SIOP Mobile Wallet" content="OIDC-SIOP wallet provided by Validated ID" logo={oidcIcon} url="https://drive.google.com/file/d/1n4TeHESTTS0oIn9Mxs1Rhtmp7Hwb3Y7M/view?usp=sharing" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
