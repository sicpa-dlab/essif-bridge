import React, { useState, MouseEvent } from 'react'
import { Loading } from 'carbon-components-react'
import { OpenIDConnectConnectApi } from 'bridge-shared-components'
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react'
import StompClient from 'react-stomp-client'
import { v4 as uuidv4 } from "uuid"
import QRCode from 'qrcode.react'
import { OIDCData } from '../../shared/models'

import logo from '../../../assets/images/edison-wallet-openid-01.svg'

interface Props { 
    handleClick?: (data: OIDCData) => void
}

export const OidcAuthentication = (props: Props) => {

    const [oidcState, setOidcState] = useState({
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
                "credentialId": "VerifiableIdCredential"
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
        const content = JSON.parse(stompMessage.body) as OIDCData
        console.log(content)

        const walletDid = content.id
        if(walletDid == null) return;

        props.handleClick?.(content)
        
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
                                    &nbsp;
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