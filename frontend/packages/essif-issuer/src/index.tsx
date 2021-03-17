import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import './index.scss'
import App from './app/components/App';
import Footer from './app/components/footer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <>
        <App />
        <Footer />
      </>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
