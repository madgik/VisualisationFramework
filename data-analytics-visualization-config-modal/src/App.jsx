import React, { Component } from 'react';
import ConfigurationModal from './components/ConfigurationModal';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConfigurationModal open={true} routing={this.props.routing} />
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
