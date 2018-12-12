import React, { Component } from 'react';

import VisualizationRendererContainer from './containers/VisualizationRendererInnerContainer'

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
   // const mmRenderRef = React.createRef();

    return (
      <div className="App">
          <VisualizationRendererContainer size={this.props.size}  />
      </div>
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
