import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import VisualizationRendererContainer from './visualization/containers/VisualizationRendererInnerContainer'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const mmRenderRef = React.createRef();

    return (
      <Provider store={this.store}>
          <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />

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
