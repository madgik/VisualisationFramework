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
import autobind from 'autobind-decorator';
import { configGraphActions } from './network-graph/actions';

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
    this.store.dispatch(configGraphActions.setUsername());
    
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
    // baseUrl: 'http://localhost:8081/data-analytics-visualization-service',
    baseUrl: 'http://192.168.32.125:8081/data-analytics-visualization-service',
    username: 'testTenant'
  },
  size: {
    width: '100%',
    height: 800,
  },
}

export default App;

