import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ConfigurationModal from './components/ConfigurationModal'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
} else {
  module.exports = { 
    ConfigurationModal 
  }
}