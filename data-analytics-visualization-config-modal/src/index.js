import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ConfigurationModal from './components/ConfigurationModal'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

module.exports = { ConfigurationModal }
