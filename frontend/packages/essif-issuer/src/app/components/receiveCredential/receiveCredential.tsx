import React, { Component } from 'react'
import { Launch16, Restart16 } from '@carbon/icons-react'
import { Button, InlineLoading, TextInput, TooltipIcon } from 'carbon-components-react'
import { CredentialTransport, ChapiCredentialIssuer, OIDCData } from '../../shared/models'
import { CredentialIssuer, AnonCredentialIsssuer, OidcCredentialIsssuer } from 'bridge-shared-components'
import { sampleCredential, sampleAnonCredential } from '../chapi-example/sample-credential'
import eidasLogo02 from '../../../assets/images/eidas-logo-02.png'
import eidasLogo04 from '../../../assets/images/eidas-logo-04.svg'
import { StepperProps } from '../../shared/models/stepperProps.interface'
import credentials from './credential.json'
import StompClient from 'react-stomp-client'
import './receiveCredential.scss'

interface FormState {
}
interface FormProps {
  credential: { [key: string]: string }
}

class GetInput extends Component<FormProps, FormState> {
  render() {
    return (
      Object.entries(credentials).map(([key, value]) => {
        return key !== 'Issuer' ?
          <div className="receive-credential-tile-form  bx--col-lg-6 bx--col-md-8 bx--col-sm-12" key={key}>
            <TextInput readOnly
              id={key}
              value={value}
              labelText={key}
              placeholder="Data entry"
            />
          </div>
          : <div className="receive-credential-tile-form  bx--col-lg-6 bx--col-md-8 bx--col-sm-12" key={key}>
            <label className="bx--label" style={{ display: 'flex', justifyContent: 'space-between' }} htmlFor="issuer">
              <div className="bx--col-lg-6 bx--col-md-6 bx--col-sm-10 bx--no-gutter">{key}</div>
              <div className="bx--col-lg-2 bx--col-md-2 bx--col-sm-2 bx--no-gutter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TooltipIcon
                  tooltipText="The issuer is a qualified trust service provider."
                  direction='right' align='center'>
                  <img style={{ height: '12px', width: '39px' }} src={eidasLogo04} alt="lock"></img>
                </TooltipIcon>
              </div>
            </label>
            <div className="bx--text-input__field-wrapper">
              <input readOnly id="issuer" type="text" className="bx--text-input" value={value} />
            </div>
          </div>
      })
    )
  }
}

interface Props extends StepperProps {
  loading: boolean
  error: boolean
  credentialData?: any
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
          <Button style={{ maxWidth: 'none', width: '100%' }} size="field" renderIcon={Launch16} onClick={props.handleClick}>Receive Credential</Button>
          :
          <div className="receive-credential-flex" >
            <InlineLoading className={`inline-loading inline-loading-error`} description="Could not ussue credential" status="error" />
            <Button kind="tertiary" style={{ maxWidth: 'none', width: '100%' }} size="field" de renderIcon={Restart16} onClick={props.handleClick}>
              Issue Credential <span>Retry</span>
            </Button>
          </div>
    )
  }

  const GetCredential = () => {

    if(props.credentialTransport === CredentialTransport.OIDCSIOP) {
      const credData = props.credentialData as OIDCData
      if(credData?.id) {
        credentials['Family name'] = credData.lastName || credentials['Family name']
        credentials['Given name'] = credData.name || credentials['Given name']
        credentials.Birthdate = "-"
      }
    }

    return credentials
  }

  return (
    <>
      <div className="receive-credential-tile">
        {/* Header title  */}
        <div className="bx--row" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
          <div >
            <div className="custom-tile-header"> {header} </div>
            <div className="custom-tile-content"> {content} </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <TooltipIcon
              tooltipText="This crendential is compliant with EU electronic IDentification, Authentication and trust Services (eIDAS) regulations and specifications."
              direction='right' align='end'>
              <img style={{ height: '34px', width: '23px' }} src={eidasLogo02} alt="lock"></img>
            </TooltipIcon>
          </div>
        </div>
        <div className="receive-credential-flex">
          <GetInput credential={GetCredential()} />
        </div>
        <div className="receive-credential-tile-form bx--col-lg-6 ">
          <ReceiveButton />
        </div>
        <div className="bx--col" style={{ fontSize: '14px', fontWeight: 300 }}>
          <div className="bx--row"> 1 - After clicking receive crendential, check your wallet.</div >
          <div className="bx--row"> 2 - Follow the prompt to receive your EHIC.</div >
        </div>
      </div>
    </>
  )
}

interface ReceiveCredentialProps extends StepperProps {
  connectionId?: string,
  credentialData?: any
}

export default class ReceiveCredential extends React.Component<ReceiveCredentialProps> {
  headerTitle: string;
  title: string;
  description: string;
  error: boolean;
  state = { loading: false };

  private credentialIssuer: CredentialIssuer

  constructor(props: ReceiveCredentialProps) {
    super(props);
    this.credentialIssuer = this.getIssuer(props.credentialTransport)
    this.error = false;
    this.headerTitle = `We have identified your wallet and we are now ready to issue your digital European Health Insurance Card.`;
    this.title = "Receive Credential";
    this.description = `Your digital EHIC credential will be safely and securely stored in your wallet, ready to be used wherever and whenever your need it.`
  }

  componentDidMount() {
    this.credentialIssuer.configure?.()
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
  }

  private getIssuer(credentialTransport?: CredentialTransport) {
    switch (credentialTransport) {
      case CredentialTransport.CHAPI:
        return new ChapiCredentialIssuer()
      case CredentialTransport.DIDCOMM:
        return new AnonCredentialIsssuer()
      case CredentialTransport.OIDCSIOP:
        return new OidcCredentialIsssuer()
      default:
        return new ChapiCredentialIssuer()
    }
  }

  private getCredential = () => {

    if(this.props.credentialTransport === CredentialTransport.DIDCOMM) {
      return sampleAnonCredential(this.props.connectionId || "")
    }

    if(this.props.credentialTransport === CredentialTransport.OIDCSIOP) {
      const oidcData = this.props.credentialData as OIDCData

      sampleCredential.credentialSubject.id = oidcData.id
      if(oidcData.name) {
        sampleCredential.credentialSubject.givenName = oidcData.name
      }

      if(oidcData.lastName) {
        sampleCredential.credentialSubject.familyName = oidcData.lastName
      }

      sampleCredential.credentialSubject.birthDate = ""
    }

    return sampleCredential
  }

  issueCredential = async () => {
    this.setState({ loading: true })
    const issue = this.credentialIssuer.issue(this.getCredential())
    const result = await issue

    this.error = result.isErr()

    if(this.props.credentialTransport === CredentialTransport.DIDCOMM) {
      return
    }
    
    result.isOk() && result.value === true ? this.props.handleClick() : this.setState({ loading: false })
  }

  currentTopic = (): string => {
    const topic = `topic/credential/${this.props.connectionId}`
    console.log(`Subscribing to: ${topic}`)
    return topic
  }

  handleMessage = (stompMessage: any) => {
    const content = JSON.parse(stompMessage.body)
    console.log(content)
    const connState = content.state

    const issued = connState === "credential_issued"

    if(issued) {
      this.props.handleClick()
    }
  }

  render() {
    return (
      <div className="receive-credential bx--col-lg-7 bx--col-md-6 bx--col-sm-3">
        <h3>{this.headerTitle}</h3>
        <h2 className="receive-credential-title">{this.title}</h2>
        <p>{this.description}</p>
        <ExpandablePanel credentialTransport={this.props.credentialTransport} credentialData={this.props.credentialData} error={this.error} loading={this.state.loading} handleClick={async () => { await this.issueCredential() }} />

        { this.props.connectionId &&
            <StompClient endpoint={`${process.env.REACT_APP_WEBSOCKET_URL}`} topic={this.currentTopic()} onMessage={this.handleMessage}><div></div></StompClient>
        }

      </div>
    )
  }
}
