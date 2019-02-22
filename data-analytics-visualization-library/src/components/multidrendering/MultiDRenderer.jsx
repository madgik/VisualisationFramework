import React from 'react';
import Plot from 'react-plotly.js';

class MultiDRenderer extends React.Component {

  onInitialized(figure, graphDiv) {
    window.multirenderer = {}
    window.multirenderer.graphDiv = graphDiv;
    window.multirenderer.figure = figure;
  }

  render() {
    var visualization = this.props.visualization;

    var data = [{
      x: visualization.threeDData.xAxis,
      y: visualization.threeDData.yAxis,
      z: visualization.threeDData.zAxis,
      type: 'scatter3d',
      mode: 'markers',
      marker: {
        size: 4,
        line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5
        }
      }
    }];

    var layout = {
      autosize: false,
      width: this.props.size.width,
      height: this.props.size.height,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
      },
      scene: {
        xaxis: { title: visualization.xAxisLabel },
        yaxis: { title: visualization.yAxisLabel },
        zaxis: { title: visualization.zAxisLabel }
      }
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

export default MultiDRenderer;
