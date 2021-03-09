import { ClickableTile, InlineLoading, InlineLoadingProps } from 'carbon-components-react';
import React from 'react'
import './VerifyEHIC.scss'

interface VerifyEHICProps {
  result: Array<String>;
  credentialState: InlineLoadingProps['status'];
}

const VerifyEHIC: React.FC<VerifyEHICProps> = (props: VerifyEHICProps) => {

  const headerTitle: string = "We need to verify your European Health Insurance Card to make sure you receive treatment at the right costs.";
  const title: string = "Your EHIC";

  const InlineLoadingd: React.FC = () => {
    return (
      props.result.includes('eidas')
        ? <>
          <InlineLoading className={`inline-loading inline-loading-${props.credentialState}`} description="Credential Signature" status={props.credentialState} />
          <InlineLoading className={`inline-loading inline-loading-finished`} description="eIDAS compliance" status="finished" />
        </>
        : <InlineLoading className={`inline-loading inline-loading-${props.credentialState}`} description="Credential Signature" status={props.credentialState} />

    )
  }

  return (
    <div className="connect-wallet bx--col-lg-5 bx--col-md-6  bx--col-sm-3">
      <h3>{headerTitle}</h3>
      <h2 className="connect-wallet-title">{title}</h2>
      <div className="connect-wallet-tile" >
        <ClickableTile className="bx-tile verify-ehic" light >
          <div className="custom-tile-header"> Credential Verification </div>
          <div className="custom-tile-content"> The credential's cryptographic signature and compliance with the eIDAS specifications will be verified. </div>
          <div className="verify-ehic-footer" >
            <div className="bx--col-lg-6">
              <InlineLoadingd />
            </div>
          </div>
        </ClickableTile>
      </div>
    </div>
  )
}

export default VerifyEHIC