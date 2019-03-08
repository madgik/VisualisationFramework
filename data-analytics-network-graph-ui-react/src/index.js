import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ReactDOM.render(<App />, document.getElementById('root'));
    serviceWorker();
} else{
    module.exports = {
        reactComponent: App
    };
}
