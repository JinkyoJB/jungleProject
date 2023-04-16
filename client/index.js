import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

// IMPORT MAIN SCSS FILE
import './styling/application.scss';

// RENDER APP
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

