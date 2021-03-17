import React from 'react'
import { ProgressIndicator, ProgressStep } from 'carbon-components-react';

import './steps.scss'
import { ProgressIndicatorStep } from "../../shared/models"

interface State {
  steps: Array<ProgressIndicatorStep>;
  currentIndex: number;
}

interface Props {
  steps: Array<ProgressIndicatorStep>;
  currentIndex: number;
}

export default class Steps extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      steps: [{ id: 0, label: "Log in" }],
      currentIndex: 0
    }
  }

  /**
   * Arrow function to map all steps and render the progress step.
   */
  renderProgressSteps = () => {
    return this.props.steps.map(step => this.renderProgressStep(step.id, step.label));
  };

  /** 
   * Arrow function to set progress step with the correct label.
   * @param label - The label of step.
   */
  renderProgressStep = (id: number, label: string) => {
    return (
      <ProgressStep className="progress-indicator-step" key={id} label={label}></ProgressStep>
    );
  };

  render() {
    return (
      <div className="progress-indicator">
        <ProgressIndicator spaceEqually={true} currentIndex={this.props.currentIndex} >
          {this.renderProgressSteps()}
        </ProgressIndicator>
      </div >
    )
  }
}
