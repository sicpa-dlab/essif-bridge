import React from 'react'
import { ProgressIndicator, ProgressStep } from 'carbon-components-react';

import { ProgressIndicatorStep } from "../../shared/models"

interface Props {
  steps: Array<ProgressIndicatorStep>
}

export default class Steps extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  /**
   * Arrow function to map all steps and render the progress step.
   */
  renderProgressSteps = () => {
    return this.props.steps.map(step => this.renderProgressStep(step.label));
  };

  /** 
   * Arrow function to set progress step with the correct label.
   * @param label - The label of step.
   */
  renderProgressStep = (label: string) => {
    return (
      <ProgressStep label={label}></ProgressStep>
    );
  };

  render() {
    return (
      <div className="progress-indicator">
        <ProgressIndicator spaceEqually={false} >
          {this.renderProgressSteps()}
        </ProgressIndicator>
      </div>
    )
  }
}
