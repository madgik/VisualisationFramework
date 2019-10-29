/* FOR PORTLET BUILD comment THIS */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';


/* FOR PORTLET BUILD comment above and uncomment bellow */

// const React=require('react').default;
// const ReactDOM = require('react-dom').default;
// require('./index.css');
// const App = require('./App').default;
// const serviceWorker = require('./serviceWorker').default;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ReactDOM.render(<App />, document.getElementById('root'));
    serviceWorker();
}
 else{
    module.exports = {
        reactComponent: App
    };
    
}