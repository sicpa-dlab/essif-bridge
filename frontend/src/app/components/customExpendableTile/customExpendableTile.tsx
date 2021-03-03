import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react'
import React from 'react'
import './style.scss'

interface Props {
  header: string;
  content: string;
  logo: string;
}

export default class customExpendableTile extends React.Component<Props> {

  render() {
    return (
      <ExpandableTile light disabled >
        <TileAboveTheFoldContent>
          <div style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.4, fontFamily: "'Inter-SemiBold', 'Inter', sans-serif" }}>
            Mobile Wallet
          </div>
          <div style={{ fontSize: '14px', lineHeight: 1.4, fontFamily: '"Inter", sans-serif' }}>
            My wallet is an app on my smartphone.
          </div>
          <div style={{ marginTop: '63px', width: '64px', height: '54px' }}>
            {/* <img src={logo} alt="logo" /> */}
          </div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>

          </TileBelowTheFoldContent>
        </ExpandableTile>
    )
  }
}
