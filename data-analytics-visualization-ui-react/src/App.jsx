import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';

import { visualizationActions } from './visualization/actions'
import rootReducer from './visualization/reducers'

import Visualization from './visualization/Visualization'
import Ajax from './visualization/utilities/Ajax';

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
    this.store.dispatch(visualizationActions.requestVisualizations());
  }

  render() {
    return (
      <Provider store={this.store}>
        <Visualization
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
    width: 1200,
    height: 600
  }
}

export default App;
