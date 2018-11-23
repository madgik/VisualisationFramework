import React from 'react';
import VisualizationRendererContainer from './containers/VisualizationRendererContainer'
import ChartRenderContainer from './containers/ChartRenderContainer'
import Chart2RenderContainer from './containers/Chart2RenderContainer'
import Columns from 'react-columns';


class Dashboard extends React.Component {

  render() {
    var queries = [{
      columns: 2,
      query: 'min-width: 1350px'
    }];
    
    const mmRenderRef = React.createRef();

    return (
      <Columns columns={2} gap='8px' queries={queries}
      >
        <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />
        <div >
            <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            <Chart2RenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
        </div>
      </Columns>


    );
  }
}

export default Dashboard;
