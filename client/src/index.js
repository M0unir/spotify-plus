import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import logger from './services/logger';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('?', process.env)
if (process.env.REACT_APP_SENTRY_API_KEY && process.env.REACT_APP_SENTRY_API_KEY.length > 1) logger.init();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
