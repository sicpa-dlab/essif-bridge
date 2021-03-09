import React from 'react';

import { Launch16, Restart16 } from '@carbon/icons-react';
import { Button, InlineLoading, TextInput, TooltipIcon } from 'carbon-components-react';

import { SicpaBridgeClient } from '../../shared/services/sicpa-bridge'
import { sampleCredential } from '../chapi-example/sample-credential'
import * as chapiQueries from '../chapi-example/WalletQueries'
import { WalletChapi } from '../../shared/services/wallet'

import eidasLogo02 from '../../../assets/images/eidas-logo-02.png';
import eidasLogo04 from '../../../assets/images/eidas-logo-04.svg';
import credential from './credential.json';
import './receiveCredential.scss';
import { StepperProps } from '../../shared/models/stepperProps.interface';

interface Props extends StepperProps {
  loading: boolean;
  error: boolean;
}

const ExpandablePanel: React.FC<Props> = (props: Props) => {
  const header = "Verified Information to be received"
  const content = "European Health Insurance Card."

  const ReceiveButton: React.FC = () => {
    return (
      props.loading
        ?
        <InlineLoading style={{ marginBottom: 0 }} className={`inline-loading inline-loading-active`} description="Issue Credential" status="active" />
        :
        !props.error
          ?
          <Button style={{ width: '-webkit-fill-available' }} size="field" renderIcon={Launch16} onClick={props.handleClick}>Receive Credential</Button>
          :
          <div className="bx--col">
            <InlineLoading className={`inline-loading inline-loading-error`} description="Could not ussue credential" status="error" />
            <Button kind="tertiary" style={{ width: '-webkit-fill-available' }} size="field" de renderIcon={Restart16} onClick={props.handleClick}>
              Issue Credential <span>Retry</span>
            </Button>
          </div>
    )
  }

  return (
    <>
      <div className="receive-credential-tile">
        {/* Header title  */}
        <div className="bx--row" style={{ marginBottom: '32px' }}>
          <div className="bx--col-lg-5">
            <div className="custom-tile-header"> {header} </div>
            <div className="custom-tile-content"> {content} </div>
          </div>
          <div className="bx--col-lg-1" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <TooltipIcon
              tooltipText="This crendential is compliant with EU electronic IDentification, Authentication and trust Services (eIDAS) regulations and specifications."
              direction='right' align='end'>
              <img style={{ height: '34px', width: '23px' }} src={eidasLogo02} alt="lock"></img>
            </TooltipIcon>
          </div>
        </div>

        {/* Issuer */}
        <div className="receive-credential-tile-form bx--row bx--col-lg-6">
          <label className="bx--label" style={{ display: 'flex', justifyContent: 'space-between' }} htmlFor="issuer">
            <div className="bx--col-lg-6 bx--no-gutter">Issuer</div>
            <div className="bx--col-lg-2">
              <TooltipIcon
                tooltipText="The issuer is a qualified trust service provider."
                direction='right' align='center'>
                <img style={{ height: '12px', width: '39px' }} src={eidasLogo04} alt="lock"></img>
              </TooltipIcon>
            </div>
          </label>
          <div className="bx--text-input__field-wrapper">
            <input readOnly id="issuer" type="text" className="bx--text-input" value={credential.issuer} />
          </div>
        </div>

        {/* Family Name */}
        <div className="receive-credential-tile-form bx--row bx--col-lg-6">
          <TextInput
            readOnly
            id="familyName"
            value={credential.familyName}
            labelText="Family name"
            placeholder="Data entry"
          />
        </div>

        {/* Given Name */}
        <div className="receive-credential-tile-form bx--row bx--col-lg-6">
          <TextInput readOnly
            id="givenName"
            value={credential.givenName}
            labelText="Given name"
            placeholder="Data entry"
          />
        </div>

        {/* Birth date and Receive credential button */}
        <div className="bx--row receive-credential-tile-form ">
          <div className="bx--col-lg-6">
            <TextInput readOnly
              id="birthDate"
              value={credential.birthDate}
              labelText="Birth date"
              placeholder="Data entry" />
          </div>
          <div className="bx--col-lg-6" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <ReceiveButton />
          </div>
        </div>
      </div>
    </>
  )
}


export default class ReceiveCredential extends React.Component<StepperProps> {
  headerTitle: string;
  title: string;
  description: string;
  error: boolean;
  state = { loading: false };

  private walletChapi: WalletChapi;
  constructor(props: StepperProps) {
    super(props);
    this.setState({ loading: false })
    const bridgeClient = new SicpaBridgeClient();
    this.walletChapi = new WalletChapi(bridgeClient)
    this.error = false;
    this.headerTitle = `Great! We are now ready to issue your European Health Insurance Card.`;
    this.title = "Receive Credential";
    this.description = `Your EHIC credential allows you to verify your health insurance eligibility wherever and whenever your need. 
                        This credential will be safely and securely stored in your identity wallet.`
  }

  async componentDidMount() {
    await this.walletChapi.configure()
  }

  issueChapiCredential = async () => {
    // onnecting to wallet
    this.setState({ loading: true })

    const presentation = await this.walletChapi.connectToWallet(chapiQueries.didAuthQuery())
    if (presentation == null) {
      // could not connect to wallet
      return
    }

    // issuing credential
    await this.walletChapi.issueCredential(presentation, sampleCredential)
      .then(() => {
        this.setState({ loading: false });
        this.props.handleClick();
      })
      .catch(() => {
        this.setState({ loading: false });
        this.error = true;
      })
  }

  render() {
    return (
      <div className="receive-credential bx--col-lg-5 bx--col-md-6 bx--col-sm-3">
        <h3>{this.headerTitle}</h3>
        <h2 className="receive-credential-title">{this.title}</h2>
        <p>{this.description}</p>
        <ExpandablePanel error={this.error} loading={this.state.loading} handleClick={async () => { await this.issueChapiCredential() }} />
      </div>
    )
  }
}
