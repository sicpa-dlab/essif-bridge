import React from "react";

import "./header.scss";

export interface Props {
  organisation: string;
  icon: string;
  page: string;
  title: string;
}

export default class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={"header header-" + this.props.page}>
        <div className=" header-organisation">
          <h4>{this.props.organisation}</h4>
        </div>
        <div className="header-border">
        </div>
        <div className="header-logo">
          <img src={this.props.icon} alt="logo" />
        </div>
        <div className="header-title">
          <h1>{this.props.title}</h1>
        </div>
      </div>
    )
  }
}
