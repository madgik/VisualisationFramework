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
    Ajax.setWorkspaceUrl(this.props.routing.workspaceUrl);
    //this.store.dispatch(visualizationActions.requestVisualizations());
    const dateToFormat = '2018-12-31';
    const today = moment(dateToFormat);
    const dataMiner =  'http://dataminer-prototypes.d4science.org/wps/WebProcessingService'

    this.store.dispatch(visualizationActions.setDataMinerUrl(dataMiner));

    this.value = moment.range(today.clone().subtract(1, "years"), today.clone());
    this.store.dispatch(visualizationActions.setDateRange(this.value));
    this.store.dispatch(visualizationActions.setWorkspaceUsername(this.props.routing.workspaceUsername));
    this.store.dispatch(visualizationActions.setWorkspaceToken(this.props.routing.workspaceToken));
    this.store.dispatch(visualizationActions.requestWorkspaceListing());

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
    baseUrl: 'http://localhost:8081/data-analytics-visualization-service',
    workspaceUrl: 'http://workspace-repository.d4science.org/storagehub/workspace',
    workspaceUsername: 'cmitatakis',
    workspaceToken: '2a85cb45-5dc1-4d29-a630-919f549e9858-843339462'  },
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
