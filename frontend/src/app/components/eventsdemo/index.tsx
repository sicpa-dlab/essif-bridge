import React, { Component } from "react";
import SockJsClient from "react-stomp";
import './events.scss'

interface AcaPyEventsProps {
}

type AcaPyEventsState = {
  messages: Array<String>
}

export default class AcaPyEvents extends Component<AcaPyEventsProps, AcaPyEventsState> {
  constructor(props: AcaPyEventsProps) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  
  render() {
    const messages = this.state.messages;

    return (
      <>
        <SockJsClient
          url={process.env.REACT_APP_WEBSOCKET_URL}
          topics={["/topic/proof"]}
          onMessage={(msg: any) => {
            console.log(msg);
            messages.unshift(JSON.stringify(msg));
            this.setState({
              messages: messages,
            });
          }}
        />
        <div className="events_container">
          <h2>Events</h2>
          {messages.map((item, index) => (
            <div key={index}>
              <pre>{item}</pre>
            </div>
          ))}
        </div>
      </>
    );
  }
}
