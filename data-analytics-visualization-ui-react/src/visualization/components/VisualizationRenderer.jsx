import React from 'react';

import ChartRenderer from './charts/ChartRenderer';
import GraphRenderer from './graphs/GraphRenderer';
import TreeRenderer from './tree/TreeRenderer';
import MindMapRenderer from './mindmap/MindMapRenderer';
import MultiDRenderer from './multidrendering/MultiDRenderer';
import MapRenderer from './maps/MapRenderer';
import WWMapRenderer from './maps/WWMapRenderer';
import TableRenderer from './tables/TableRenderer';
import HeatMapRenderer from './heatmap/HeatMapRenderer'

class VisualizationRenderer extends React.Component {
  render() {
    if (this.props.visualization.type === 'Graph') {
      return <GraphRenderer {...this.props} />
    } else if (this.props.visualization.type === 'Tree') {
      return <TreeRenderer {...this.props} />
    } else if (this.props.visualization.type === 'MindMap') {
      return <MindMapRenderer ref={this.props.mmRender} {...this.props} />
    } else if (this.props.visualization.type === 'ThreeD') {
      return <MultiDRenderer {...this.props} />
    } else if (this.props.visualization.type === 'Map') {
      return <MapRenderer {...this.props} />
    } else if (this.props.visualization.type === 'WorldWindMap') {
      return <WWMapRenderer {...this.props} />
    } else if (this.props.visualization.type === 'Table') {
      return <TableRenderer {...this.props} />
    } else if (this.props.visualization.type === 'HeatMap') {
      return <HeatMapRenderer {...this.props} />
    } else {
      return <ChartRenderer {...this.props} />
    }
  }
}

export default VisualizationRenderer;
