import React from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers'
import ConfigurationModalInner from './ConfigurationModalInner';
import Ajax from '../utilities/Ajax';
import ErrorHandler from '../utilities/ErrorHandler';

class ConfigurationModal extends React.Component {

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
    ErrorHandler.init(this.store);
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConfigurationModalInner open={this.props.open} />
      </Provider>
    )
  }
}

export default ConfigurationModal