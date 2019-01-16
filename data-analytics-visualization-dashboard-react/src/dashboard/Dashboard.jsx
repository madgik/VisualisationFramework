import React from 'react';
import VisualizationRendererContainer from './containers/VisualizationRendererContainer'
import ChartRenderContainer from './containers/ChartRenderContainer'
import Chart2RenderContainer from './containers/Chart2RenderContainer'
import ChartHeader from './components/ChartHeader'
import HeaderMenu from './components/HeaderMenu'
import MapConfiguration from './components/MapConfiguration'

import Columns from 'react-columns';
import MapConfigurationContainer from './containers/MapConfigurationContainer';


class Dashboard extends React.Component {

  render() {
    var queries = [{
      columns: 2,
      query: 'min-width: 1350px'
    }];
    
    const mmRenderRef = React.createRef();

    return (

      <div className='App-style'>
        <div>
          <HeaderMenu> </HeaderMenu>
        </div>
        <br></br>
        <Columns columns={2} gap='8px' queries={queries}
        >
          <div className='ui clearing segment'>
            <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />
            <MapConfigurationContainer />
          </div>
          <div >
            <div className='ui clearing segment'>
                <ChartHeader></ChartHeader>
                <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            </div>
            <div className='ui clearing segment'>
                <ChartHeader></ChartHeader>
                <Chart2RenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            </div>
            <div className='ui clearing segment'>
                <ChartHeader></ChartHeader>    
                <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            </div>
          </div>
        </Columns>
      </div>


    );
  }
}

export default Dashboard;
