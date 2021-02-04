import React, { Component } from "react";
import SockJsClient from "react-stomp";
import './events.css'

export default class AcaPyEvents extends Component {
  constructor(props) {
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
          url={process.env.REACT_APP_NOT_WEBSOCKET_URL}
          topics={["/topic/proof"]}
          onMessage={(msg) => {
            console.log(msg);
            messages.unshift(JSON.stringify(msg));
            this.setState({
              messages: messages,
            });
          }}
          ref={(client) => {
            this.clientRef = client;
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
