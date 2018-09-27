import React, { Component } from 'react';
import ConfigurationModal from './components/ConfigurationModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      isNew: true,
      editItemId: null
    }
  }

  onModalClose() {
    this.setState({
      open: false,
      isNew: true,
      editItemId: null
    })
  }

  handleConfigurationLoaded(){
    this.setState({
      open: true
    })
  }

  handleModalOpen() {
    this.setState({
      isNew: false,
      editItemId: '5baca31a990a036e10244e01'
    })
  }

  render() {
    return (
      <div className="App">
        <div onClick={() => this.handleModalOpen()}>Open</div>
        <ConfigurationModal
          allowDelete={true}
          open={this.state.open}
          isNew={this.state.isNew}
          editItemId={this.state.editItemId}
          routing={this.props.routing}
          isLocalDeployment={true}
          onModalClose={() => this.onModalClose()}
          onConfigurationLoaded={() => this.handleConfigurationLoaded()}
          onDeleteComplete={() => this.onModalClose()}
          onSaveComplete={() => this.onModalClose()} />
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
