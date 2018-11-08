import React from 'react';

import './App.css';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';


class App extends React.Component {

  constructor(props) {
    super(props);
    // this.store = createStore(rootReducer,
    //   applyMiddleware(thunkMiddleware, createLogger({
    //     predicate: () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    //   }))
    // );
  }

  componentWillMount() {
   
  }

  render() {
    return (
      <div className="App">
                <div className="App-header">
                    <h2>Welcome to React!</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    <code>src/App.js</code>
                    and save to reload.
                </p>
            </div>
    );
  }
}

App.defaultProps = {
  routing: {
    baseUrl: 'http://localhost:8081/data-analytics-visualization-service'
  }
};

export default App;
