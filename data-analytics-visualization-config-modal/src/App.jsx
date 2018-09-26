import React, { Component } from 'react';
import ConfigurationModal from './components/ConfigurationModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  onModalClose() {
    this.setState({
      open: false
    })
  }

  handleModalOpen() {
    this.setState({
      open: true
    })
  }

  render() {
    return (
      <div className="App">
        <div onClick={() => this.handleModalOpen()}>Open</div>
        <ConfigurationModal
          open={this.state.open}
          routing={this.props.routing}
          onModalClose={() => this.onModalClose()}
          onDeleteComplete={() => this.props.onModalClose()}
          onSaveComplete={() => this.props.onModalClose()} />
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
