import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import VisualizationRendererInnerContainer from './visualization/containers/VisualizationRendererInnerContainer'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
} else {
  module.exports = { 
    VisualizationRendererInnerContainer 
  }
}