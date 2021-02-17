import React, { Component } from "react";
import AcaPyEvents from "../eventsdemo";
import logo from '../../assets/images/logo.svg';

export default class Home extends Component {
  render() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
            <AcaPyEvents/>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
        </header>
    );
  }
}