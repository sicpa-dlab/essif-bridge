import React, { useState, MouseEvent } from 'react'
import { Loading } from 'carbon-components-react'
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react'
import { ConnectionsApi } from 'bridge-api-client'
import QRCode from 'qrcode.react'
import './connInvitation.scss'

interface Props { 
    header: string,
    content: string,
    logo: string,
    onConnectionInvitation?: (connectionId: string) => void
}

export const ConnInvitation: React.FC<Props> = (props: Props) => {

    const [qrGenerated, setQrGenerated] = useState(null);
    
    const expanded = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(qrGenerated) return;

        const connApi = new ConnectionsApi({
            basePath: process.env.REACT_APP_BRIDGE_API_URL
        })
        connApi.connectionsPost({}).then( (result) => {
            setQrGenerated(result.data.invitationUrl);
            props.onConnectionInvitation?.(result.data.connectionId)
        }).catch((error) => {
            // show retry
        });
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
                                    { qrGenerated
                                        ? <QRCode value={qrGenerated || ""} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', maxHeight: '100%', height: 'auto', width: 'auto' }}/>
                                        : <Loading description="Loading" withOverlay={true} small />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </TileBelowTheFoldContent>
        </ExpandableTile>

    )
}