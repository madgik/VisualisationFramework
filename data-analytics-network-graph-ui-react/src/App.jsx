import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from './network-graph/reducers'

import BaseView from './network-graph/BaseView'
import Ajax from './network-graph/utilities/Ajax';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.store = createStore(rootReducer,
      applyMiddleware(thunkMiddleware, createLogger({
        predicate: () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      }))
    );
  }

  componentWillMount() {
    Ajax.setBaseUrl(this.props.routing.baseUrl);
  }

  render() {
    return (
      <Provider store={this.store}>
        <BaseView
          isLocalDeployment={Ajax.isLocalDeployment()}
          {...this.props} />
      </Provider>
    );
  }
}

App.defaultProps = {
  routing: {
    baseUrl: 'http://localhost:8081/data-analytics-visualization-service'
  },
  size: {
    width: 1600,
    height: 800
  },
}

export default App;

