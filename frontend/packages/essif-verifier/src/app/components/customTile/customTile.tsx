import React from 'react'
import { Launch16 } from '@carbon/icons-react'
import { ClickableTile, ExpandableTile, TileAboveTheFoldContent } from 'carbon-components-react'
import { StepResult } from '../../shared/models/stepperProps.interface'
import './customTile.scss'
import { CredentialTransport } from 'bridge-shared-components'

interface Props {
  header: string;
  content: string;
  logo?: string;
  isExpendable?: boolean;
  disabled?: boolean;
  href?: string;
  handleClick?: (result: StepResult) => void
}

export default class CustomTile extends React.Component<Props> {
  render() {
    return (
      <Tile handleClick={this.props.handleClick} header={this.props.header} content={this.props.content} logo={this.props.logo} isExpendable={this.props.isExpendable} disabled={this.props.disabled} />
    )
  }
}

export const Tile: React.FC<Props> = (props: Props) => {

  const chapiFlowSelected = () => {
    const result: StepResult = {
      transport: CredentialTransport.CHAPI
    }
    props.handleClick?.(result)
  }

  if (!props.isExpendable) {
    return (
      <ClickableTile className="bx-tile custom-tile" light onClickCapture={chapiFlowSelected} href={props.href}>
        <div className="custom-tile-header"> {props.header} </div>
        <div className="custom-tile-content"> {props.content} </div>
        <div className="custom-tile-footer" >
          <img className="custom-tile-footer-logo" src={props.logo} alt="logo" />
          <div className="bx--tile__chevron">
            <Launch16 />
          </div>
        </div>
      </ClickableTile>
    )
  } else {
    return (
      <ExpandableTile className="bx-tile custom-tile" disabled={props.disabled} light>
        <TileAboveTheFoldContent>
          <div className="custom-tile-header"> {props.header} </div>
          <div className="custom-tile-content"> {props.content} </div>
          <div style={{ marginTop: '63px', width: '64px', height: '54px' }} >
            <img src={props.logo} alt="logo" />
          </div>
        </TileAboveTheFoldContent>
      </ExpandableTile>
    )
  }
}