import React from 'react';

import './App.css';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';

import rootReducer from './reducers'

import CongigurationsEditor from './components/ConfigurationsEditor'

import Ajax from './utilities/Ajax';
import ErrorHandler from './utilities/ErrorHandler';

import { configListActions } from './actions';

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
    ErrorHandler.init(this.store);

    this.store.dispatch(configListActions.loadConfigurations());
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <CongigurationsEditor
            routing={this.props.routing}
            isLocalDeployment={Ajax.isLocalDeployment()} />
        </div>
      </Provider>
    );
  }
}

App.defaultProps = {
  routing: {
    baseUrl: 'http://localhost:8081/data-analytics-visualization-service'
  }
};

export default App;
