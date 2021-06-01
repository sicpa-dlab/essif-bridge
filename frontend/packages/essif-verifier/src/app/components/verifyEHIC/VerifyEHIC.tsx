import React from 'react'
import { ClickableTile, InlineLoading, InlineLoadingStatus } from 'carbon-components-react';
import { ChapiResult } from '../../shared/models'
import './VerifyEHIC.scss'

interface VerifyEHICProps {
  result: ChapiResult
}

const VerifyEHIC: React.FC<VerifyEHICProps> = (props: VerifyEHICProps) => {

  const headerTitle: string = "We need to verify your digital European Health Insurance Card to make sure you receive treatment at the right costs.";
  const title: string = "Your EHIC";

  const profVerification = () => {

    let status: InlineLoadingStatus = 'active'
    let msg = 'Verifying Credential'

    if(props.result.checks.includes('proof')) {
      status = 'finished'
      msg = 'Credential Verified'
    } else if(props.result.errors.includes('proof')) {
      status = 'error'
      msg = 'Credential Verified'
    }

    return <InlineLoading className={`inline-loading inline-loading-${status}`} description={msg} status={status} />
  }

  const eidasVerification = () => {
    if(props.result.checks.includes('eidas')) return <InlineLoading className={`inline-loading inline-loading-finished`} description="Credential eIDAS compliance" status="finished" />
  }

  const trainVerification = () => {

    if(!props.result.checks.includes('train')) return

    const anchor = <div>Health Insurance Provider acreditted <a target="_blank" href={props.result.info?.trustListUrl}>{props.result.info?.trustList}</a></div>

    return <InlineLoading className={`inline-loading inline-loading-finished`} description={anchor} status="finished" />
    
  }

  return (
    <div className="connect-wallet bx--col-lg-7 bx--col-md-6  bx--col-sm-3">
      <h3>{headerTitle}</h3>
      <h2 className="connect-wallet-title">{title}</h2>
      <p>&nbsp;</p>
      <div className="connect-wallet-tile" >
        <ClickableTile className="bx-tile verify-ehic" light >
          <div className="custom-tile-header"> Credential Verification </div>
          <div className="custom-tile-content"> The credential's cryptographic signature and compliance with the eIDAS specifications will be verified. </div>
          <div className="verify-ehic-footer" >
            <div className="bx--col-lg-7 bx--col-md-8 bx--col-sm-12">
              { profVerification()  }
              { eidasVerification() }
              { trainVerification() }
            </div>
          </div>
        </ClickableTile>
      </div>
    </div>
  )
}

export default VerifyEHIC