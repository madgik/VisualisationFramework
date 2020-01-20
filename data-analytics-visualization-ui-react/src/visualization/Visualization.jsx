import React from 'react';

import VisualizationRendererContainer from './containers/VisualizationRendererContainer'
import FiltersRendererContainer from './containers/FiltersRendererContainer'
import ChartHeaderContainer from './containers/ChartHeaderContainer'
import DocumentRendererContainer from './containers/DocumentRendererContainer';

class Visualization extends React.Component {

  render() {
    var sizeStyle = {
      width: this.props.size.width + 'px'
    };

    const mmRenderRef = React.createRef();

    return (
      <div className="chart-container" style={sizeStyle}>
        <ChartHeaderContainer
          mmRender={mmRenderRef}
          routing={this.props.routing}
          isLocalDeployment={this.props.isLocalDeployment} />
        <DocumentRendererContainer />
        <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />
        <FiltersRendererContainer />


      </div>
    );
  }
}

export default Visualization;
