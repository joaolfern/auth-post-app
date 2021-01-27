import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from './context/token'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);