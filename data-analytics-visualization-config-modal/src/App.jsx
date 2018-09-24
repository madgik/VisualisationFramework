import React, { Component } from 'react';
import logo from './logo.svg';
import ConfigurationModal from './components/ConfigurationModal';

function defaultState() {
  var fieldsToValidate = [
    'label',
    'type',
    'xAxis',
    'xAxisLabel',
    'yAxis',
    'yAxisLabel',
    'zAxis',
    'zAxisLabel',
    'labelField',
    'valueField'];

  var validation = {}
  fieldsToValidate.forEach(field => {
    validation[field] = {
      valid: true,
      touched: false,
      messages: []
    }
  })

  return {
    isNew: true,
    open: false,
    data: {
      type: 'Line'
    },
    menu: {
      activeItem: 'general'
    },
    validation: validation,
    isFormValid: true,
    validationPanelMessages: [],
    errorMessage: null
  }
}

class App extends Component {
  render() {
    var state = defaultState();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ConfigurationModal open="true" menu={{activeItem: 'general'}} data={state.data} validation={state.validation} />
      </div>
    );
  }
}

export default App;
