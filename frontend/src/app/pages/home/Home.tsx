import React from 'react';

import AcaPyEvents from '../../components/eventsdemo';
import './Home.scss';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <header >
          <AcaPyEvents />
        </header>
      </>
    );
  }
}
