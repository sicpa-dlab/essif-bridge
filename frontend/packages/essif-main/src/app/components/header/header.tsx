import React from "react";

import europFlag from '../../../assets/images/Flag_of_Europe.svg';
import ngiEssifLogo from  '../../../assets/images/ngi-essif.png'


import "./header.scss";

export interface Props {
  logo: string;
  subLogo?: string;
  description?: string;
  page: string;
  title: string;
}

export default class Header extends React.Component<Props> {

  render() {
    return (
      this.props.page !== 'home'
        ?
        <div className={"header header-" + this.props.page}>
          <div className="bx--row" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '54px' }}>
            <img src={europFlag} alt="" style={{ height: '34px', width: '51px' }} />
          </div>
          <div className=" header-organisation">
            <div className="bx--row" style={{ marginLeft: 0 }}>
              <img src={this.props.logo} style={{ height: '56px', width: '20px', marginRight: '16px' }} alt={`logo ${this.props.page}`} />
              <img src={this.props.subLogo} style={{ height: '56px', width: '56px', marginRight: '16px' }} alt={`logo ${this.props.page}`} />
              <p style={{ height: '56px', width: '108px', display: 'flex', alignItems: 'center' }}>{this.props.description}</p>
            </div>
          </div>
          <div className="header-title">
            <h1>{this.props.title}</h1>
          </div>
        </div>
        :
        <div className="header header-home">
          <div className="header-organisation">
            <div className="bx--row" style={{ paddingTop: '42px', paddingBottom: '60px', position: 'relative' }}>
              <img src={this.props.logo} style={{ height: '40px', width: '45px', marginRight: '16px', left: '0' }} alt={`logo ${this.props.page}`} />
              <img src={ngiEssifLogo} style={{ height: '40px', marginRight: '16px', right: '0' }} alt={`logo ${this.props.page}`} />
            </div>
          </div>
          <div className="header-title">
            <h1>{this.props.title}</h1>
          </div>
        </div>
    )
  }
}
