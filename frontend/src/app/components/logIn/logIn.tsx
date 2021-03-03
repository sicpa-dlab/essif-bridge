import { ArrowRight32 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import React from 'react'
import { StepperProps } from '../../shared/models/stepperProps.interface';

import "./logIn.scss";

export default class LogIn extends React.Component<StepperProps> {
  title: string = `Welcome to the Utopia Business Services Authority! If you're looking to receive your digital credentials,
                    you're in the right place. Here's a run down of the different services we offer here.`

  render() {
    return (
      <div className="log-in bx--col-lg-5 bx--col-md-6  bx--col-sm-3">
        <h3>{this.title}</h3>
        <div className="issuer-button">
          <Button renderIcon={ArrowRight32} onClick={this.props.handleClick}>Go to next step</Button>
        </div>
      </div>
    )
  }
}
