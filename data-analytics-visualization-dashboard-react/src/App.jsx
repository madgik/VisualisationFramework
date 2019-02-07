import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';

import { visualizationActions } from './dashboard/actions/visualization.actions'
import rootReducer from './dashboard/reducers'

import Dashboard from './dashboard/Dashboard'
import Ajax from './dashboard/utilities/Ajax';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

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
    const today = moment();
    this.value = moment.range(today.clone().subtract(7, "days"), today.clone());
    this.store.dispatch(visualizationActions.setDateRange(this.value));

  }

  render() {
    return (
      <Provider store={this.store}>
         <Dashboard
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
    width: 1000,
    height: 660
  },
  chartsSize: {
    width: 900,
    height: 237
  }
}

export default App;
