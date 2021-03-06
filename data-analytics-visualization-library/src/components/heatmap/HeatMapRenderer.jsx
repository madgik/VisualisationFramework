import React from 'react';
import Plot from 'react-plotly.js';

class HeatMapRenderer extends React.Component {

  onInitialized(figure, graphDiv) {
    window.multirenderer = {}
    window.multirenderer.graphDiv = graphDiv;
    window.multirenderer.figure = figure;
  }

  render() {
    var visualization = this.props.visualization;
    var data;
    if(visualization.heatMapData !== null)
    {
        data = [
            {
                x: visualization.heatMapData.xAxis,
                y: visualization.heatMapData.yAxis,
                z: visualization.heatMapData.zAxis,
            type: 'heatmap'
            }
        ];
    }
    else{
        data = [
            {
                x: [],
                y: [],
                z: [],
            type: 'heatmap'
            }
        ];
    }

    var layout = {
      autosize: false,
      width: this.props.size.width,
      height: this.props.size.height,
     
      xaxis: { title: visualization.xAxisLabel },
      yaxis: { title: visualization.yAxisLabel },
      zaxis: { title: visualization.zAxisLabel }
      
    };

    var config = {
      showLink: false,
      displayModeBar: false
    }

    return (
      <Plot
        className="plot-renderer"
        onInitialized={this.onInitialized}
        data={data}
        layout={layout}
        config={config} />
    );
  }
}

export default HeatMapRenderer;
