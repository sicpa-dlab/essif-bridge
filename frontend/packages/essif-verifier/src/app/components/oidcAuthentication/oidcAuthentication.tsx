import React, { useState, MouseEvent } from 'react'
import { Loading } from 'carbon-components-react'
import { CredentialTransport, JsonLdCredentialVerifier, OpenIDConnectConnectApi, SicpaBridgeClient } from 'bridge-shared-components'
import { ExpandableTile, TileAboveTheFoldContent, InlineLoading, InlineLoadingStatus, TileBelowTheFoldContent } from 'carbon-components-react'
import { StepResult } from '../../shared/models/stepperProps.interface'
import StompClient from 'react-stomp-client'
import { v4 as uuidv4 } from "uuid"
import QRCode from 'qrcode.react'

import logo from '../../../assets/images/edison-wallet-openid-01.svg'


interface FlowIndicator {
    message: string,
    status: InlineLoadingStatus
}

interface Props { 
    handleClick?: (result: StepResult) => void
}

export const OidcAuthentication = (props: Props) => {


    enum OidcFlow {
        Idle = 1,
        Validating
    }

    const [oidcState, setOidcState] = useState({
        oidcFlow: OidcFlow.Idle,
        qrCode: null,
        clientId: uuidv4()
    });

    const expanded = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (oidcState.qrCode) return

        const oidcApi = new OpenIDConnectConnectApi({
            basePath: process.env.REACT_APP_BRIDGE_API_URL
        })

        oidcApi.didAuthRequest(
            {
                "clientId": oidcState.clientId,
                "credentialId": "EuropeanHealthInsuranceCard"
            }
        ).then((result) => {
            setOidcState((prevState) => ({
                ...prevState,
                qrCode: result.data.url
            }))
        })   
    }

    const currentTopic = (): string => {
        const topic = `topic/oidc/${oidcState.clientId}`
        console.log(`Subscribing to: ${topic}`)
        return topic
    }

    const handleWsMessage = (stompMessage: any) => {
        const content = JSON.parse(stompMessage.body)
        console.log(content)

        const walletDid = content.id
        if(walletDid == null) return;

        setOidcState((prevState) => ({
            ...prevState,
            oidcFlow: OidcFlow.Validating
        }))

        validateCredential(content)
        
    }

    const validateCredential = (credential: any) => {
        
        const bridgeClient = new SicpaBridgeClient();
        const jsonldCredentialVerifier = new JsonLdCredentialVerifier(bridgeClient)
        jsonldCredentialVerifier.verifyCredential(credential).then((response) => {
            
            console.log(response)
            
            const result: StepResult  = {
                transport: CredentialTransport.OIDCSIOP,
                valid: true, // TODO, verify response
                vc: credential
            }

            props.handleClick?.(result)
        });
        
    }

    const flowMessage = () => {

        const loadingMessage: FlowIndicator = { message: "Waiting for connection", status: "active" }

        switch (oidcState.oidcFlow) {
            case OidcFlow.Idle:
                loadingMessage.message = "Waiting for connection"
                break
            case OidcFlow.Validating:
                loadingMessage.message = "Verifying credential"
                break
            default:
        }

        return <InlineLoading className={`inline-loading inline-loading-active`} description={loadingMessage.message} status={loadingMessage.status} />
    }

    return (

        <ExpandableTile className="bx-tile custom-tile" light onClickCapture={expanded}>
            <TileAboveTheFoldContent>
                <div className="custom-tile-header">OpenID Connect Mobile Wallet</div>
                <div className="custom-tile-content">compatible wallet provided by Validated ID</div>
                <div style={{ marginTop: '63px', width: '64px', height: '54px' }} >
                    <img src={logo} alt="logo" />
                </div>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
                <div className="collapsed-body">
                    <div className="bx--grid">
                        <div className="bx--row">
                            <div className="bx--col">
                                <div className="outside">
                                    <div className="inside">
                                        Scan the QR code with your wallet app.
                                    </div>
                                </div>
                            </div>
                            <div className="bx--col col-qr">
                                <div className="outside qrcontainer">
                                    { oidcState.qrCode
                                        ? <QRCode renderAs="svg" size={400} value={oidcState.qrCode || ""} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', maxHeight: '100%', height: 'auto', width: 'auto' }}/>
                                        : <Loading description="Loading" withOverlay={true} small />
                                    }
                                </div>
                                <div className="outside loading">
                                    {flowMessage()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {oidcState.qrCode &&
                    <StompClient endpoint={`${process.env.REACT_APP_WEBSOCKET_URL}`} topic={currentTopic()} onMessage={handleWsMessage}><div></div></StompClient>
                }

            </TileBelowTheFoldContent>
        </ExpandableTile>

    )
   };