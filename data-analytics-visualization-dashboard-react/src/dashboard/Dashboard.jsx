import React from 'react';
import VisualizationRendererContainer from './containers/VisualizationRendererContainer'
import ChartRenderContainer from './containers/ChartRenderContainer'
import Chart2RenderContainer from './containers/Chart2RenderContainer'
import HeaderMenuContainer from './containers/HeaderMenuContainer'
import Columns from 'react-columns';
import MapConfigurationContainer from './containers/MapConfigurationContainer';
import LoadingBar from 'react-redux-loading-bar'
import FieldInfoContainer from './containers/FieldInfoContainer';
import DataMinerChartHeaderContainer from './containers/DataMinerChartHeaderContainer';
import TimeSeriesChartContainer from './containers/TimeSeriesChartContainer';
import LoaderContainer from './containers/LoaderContainer';


class Dashboard extends React.Component {

  componentWillMount() {


  }
  componentDidMount() {
  }



  render() {
    var queries = [{
      columns: 2,
      query: 'min-width: 1350px'
    }];

    const mmRenderRef = React.createRef();
    var positionRelative = {
      position: 'relative',
      top  :'0px'
    }
    return (

      <div className='App-style'>

        <div  className="headerMenu">
        <LoadingBar updateTime={2200} maxProgress={90} progressIncrease={5} showFastActions />

        </div>

        <div className="content">
        <HeaderMenuContainer> </HeaderMenuContainer>

          <Columns columns={2} gap='8px' queries={queries} rootStyles={{overflowX:'visible'}} >
            <div className='ui clearing segment '  >
              <MapConfigurationContainer />
              <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />
            </div>
            <div >
              <div className='ui clearing segment'>
                <FieldInfoContainer></FieldInfoContainer>
              </div>
             
            </div>
          </Columns>
          <br></br>
          <Columns columns={2} gap='8px' queries={queries} rootStyles={{overflowX:'visible'}} >

          <div className='ui clearing segment' >
                <TimeSeriesChartContainer></TimeSeriesChartContainer>
                <br></br>
                <br></br>
                <br></br>
                <Chart2RenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
          </div>
          <div className='ui clearing segment' >
          <div style={positionRelative} >
            <DataMinerChartHeaderContainer></DataMinerChartHeaderContainer>
            <LoaderContainer></LoaderContainer>
            </div>
            <br></br>
            <br></br>
            <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
          </div>
       </Columns>
      </div>
</div>

    );
  }
}

export default Dashboard;
