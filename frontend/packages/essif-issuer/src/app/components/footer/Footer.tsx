import React from 'react'

import sicpaIcon from '../../../assets/images/sicpa-monogram-white.svg'
import './Footer.scss'

interface Props {

}

const Footer: React.FC<Props> = () => {
  return (
    <div className="footer">
      <div className="bx--row bx--no-gutter footer-content">
        <div className="bx--col-lg-4 bx--col-md-3">
          <span className="bx--row">Contact Us</span>
          <span className="bx--row">Privacy</span>
          <span className="bx--row">Terms of use</span>
          <span className="bx--row">Sicpa.com</span>
        </div>
        <div className="bx--col-lg-4 bx--col-md-3">
          <span className="bx--row">Issuer</span>
          <span className="bx--row">Verifier</span>
          <span className="bx--row">Wallet</span>
          <span className="bx--row">APIs</span>
        </div>
        <div className="bx--col-lg-4 bx--col-md-3">
          <span className="bx--row">Have questions? Email us at dlab@sicpa.com.</span>
          <span className="bx--row">Powered by SICPA bridge</span>
          <span className="bx--row">Last updated 4 march 2021</span>
          <span className="bx--row">Copyright © 2021 Sicpa</span>
        </div>
      </div>
      <div className="bx--row">
        <img className="footer-content-logo" src={sicpaIcon} alt="Sicpa logo" />
      </div>
    </div>
  )
}

export default Footer
