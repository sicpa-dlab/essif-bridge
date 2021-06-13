import React, { useState, MouseEvent } from 'react'
import { Loading, InlineLoading, InlineLoadingStatus,ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react'
import { ConnectionsApi, AnonCredentialVerifier, CredentialTransport } from 'bridge-shared-components'
import { StepResult } from '../../shared/models/stepperProps.interface'
import StompClient from 'react-stomp-client'
import QRCode from 'qrcode.react'
import './connInvitation.scss'

interface ConnInvitationProps {
    header: string,
    content: string,
    logo: string,
    onProofResult?: (result: StepResult) => void
}

interface FlowIndicator {
    message: string,
    status: InlineLoadingStatus
}

export const ConnInvitation: React.FC<ConnInvitationProps> = (props: ConnInvitationProps) => {

    enum DidComFlow {
        Idle = 1,
        Invited,
        Connected,
        ProofSent,
        ProofResultValid,
        ProofResultInValid
    }

    const [didCommState, setDidCommState] = useState({
        didComFlow: DidComFlow.Idle,
        connectionId: null,
        qrCode: null
    });

    const expanded = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (didCommState.qrCode) return

        const connApi = new ConnectionsApi({
            basePath: process.env.REACT_APP_BRIDGE_API_URL
        })

        connApi.connectionsPost({}).then((result) => {
            setDidCommState((prevState) => ({
                ...prevState,
                didComFlow: DidComFlow.Invited,
                connectionId: result.data.connectionId,
                qrCode: result.data.invitationUrl
            }))
        }).catch((error) => {
            // show retry
        });
    }

    const currentTopic = (): string => {
        var baseTopic = ''
        switch (didCommState.didComFlow) {
          case DidComFlow.Invited:
            baseTopic = `connections`
            break
          case DidComFlow.ProofSent:
            baseTopic = `proof`
            break
        }
        const topic = `topic/${baseTopic}/${didCommState.connectionId}`
        console.log(`Subscribing to: ${topic}`)
        return topic
    }

    const handleWsMessage = (stompMessage: any) => {
        const content = JSON.parse(stompMessage.body)
        console.log(content)
        const connState = content.state

        const invitation = didCommState.didComFlow === DidComFlow.Invited && connState === "response"

        const currentConnectionId = didCommState.connectionId || ""

        if (invitation) {
            sendProofRequest(currentConnectionId)
            return;
        }

        const verification = didCommState.didComFlow === DidComFlow.ProofSent && connState === "verified"
        if (!verification) return

        const validProof = verification && content.verified === "true"

        setDidCommState((prevState) => ({
            ...prevState,
            connectionId: null, /* unsub to websockets */
            didComFlow: validProof === false ? DidComFlow.ProofResultInValid : DidComFlow.ProofResultValid
        }))

        const result: StepResult = {
            transport: CredentialTransport.DIDCOMM,
            valid: validProof
        }

        props.onProofResult?.(result);

    }

    const flowMessage = () => {

        const loadingMessage: FlowIndicator = { message: "Waiting for connection", status: "active" }

        switch (didCommState.didComFlow) {
            case DidComFlow.Invited:
                loadingMessage.message = "Waiting for connection"
                break
            case DidComFlow.Connected:
                loadingMessage.message = "Connected"
                break
            case DidComFlow.ProofSent:
                loadingMessage.message = "Verifying credential"
                break
            case DidComFlow.ProofResultValid:
                loadingMessage.message = "Valid credential"
                loadingMessage.status = "finished"
                break
            case DidComFlow.ProofResultInValid:
                loadingMessage.message = "Invalid credential"
                loadingMessage.status = "error"
                break
            default:
        }

        return <InlineLoading className={`inline-loading inline-loading-active`} description={loadingMessage.message} status={loadingMessage.status} />
    }


    const sendProofRequest = (connectionId: string) => {
        
        const verifier = new AnonCredentialVerifier()
        verifier.sendProof(
            connectionId,
            2 // template id to verify EHIC
        ).then(() => {
            setDidCommState((prevState) => ({
                ...prevState,
                didComFlow: DidComFlow.ProofSent
            }))
        })
    }

    return (

        <ExpandableTile className="bx-tile custom-tile" light onClickCapture={expanded}>
            <TileAboveTheFoldContent>
                <div className="custom-tile-header"> {props.header} </div>
                <div className="custom-tile-content"> {props.content} </div>
                <div style={{ marginTop: '63px', width: '64px', height: '54px' }} >
                    <img src={props.logo} alt="logo" />
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
                                    {didCommState.qrCode
                                        ? <QRCode renderAs="svg" size={400} value={didCommState.qrCode || ""} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', maxHeight: '100%', height: 'auto', width: 'auto' }} />
                                        : <Loading description="Loading" withOverlay={true} small />
                                    }
                                </div>
                                <div className="outside loading">
                                    {flowMessage()}
                                    {/* <InlineLoading style={{ marginBottom: 0 }} className={`inline-loading inline-loading-active`} description={props.waitingMessage} status="active" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {didCommState.connectionId &&
                    <StompClient endpoint={`${process.env.REACT_APP_WEBSOCKET_URL}`} topic={currentTopic()} onMessage={handleWsMessage}><div></div></StompClient>
                }

            </TileBelowTheFoldContent>
        </ExpandableTile>

    )
}