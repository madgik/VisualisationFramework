import React from 'react';
import VisualizationRendererContainer from './containers/VisualizationRendererContainer'
import ChartRenderContainer from './containers/ChartRenderContainer'
import Chart2RenderContainer from './containers/Chart2RenderContainer'


class Dashboard extends React.Component {

  render() {
    var sizeStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '25px',

    };

    var chartsDsiplay = {
      alignItems: 'center',
      padding: ' 0px 25px ',

    };
    const mmRenderRef = React.createRef();

    return (
      <div className="chart-container" style={sizeStyle}>
        <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />

        <div style={chartsDsiplay}>
        <p>
            <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
        </p>
        <p>
            <Chart2RenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
        </p>
            <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
        </div> 
       
      </div>
    );
  }
}

export default Dashboard;
