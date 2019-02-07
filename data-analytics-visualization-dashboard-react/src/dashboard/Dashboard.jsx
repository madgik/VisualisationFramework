import React from 'react';
import VisualizationRendererContainer from './containers/VisualizationRendererContainer'
import ChartRenderContainer from './containers/ChartRenderContainer'
import Chart2RenderContainer from './containers/Chart2RenderContainer'
import HeaderMenuContainer from './containers/HeaderMenuContainer'
import Columns from 'react-columns';
import MapConfigurationContainer from './containers/MapConfigurationContainer';
import LoadingBar from 'react-redux-loading-bar'
import FieldInfoContainer from './containers/FieldInfoContainer';
import ChartHeaderContainer from './containers/ChartHeaderContainer';
import TimeSeriesChartContainer from './containers/TimeSeriesChartContainer';


class Dashboard extends React.Component {

  componentWillMount() {


  }
  render() {
    var queries = [{
      columns: 2,
      query: 'min-width: 1350px'
    }];

    const mmRenderRef = React.createRef();

    return (

      <div className='App-style'>

        <div  className="headerMenu">
        <LoadingBar updateTime={1200} maxProgress={90} progressIncrease={5} showFastActions />

        </div>

        <div className="content">
        <HeaderMenuContainer> </HeaderMenuContainer>

          <Columns columns={2} gap='8px' queries={queries}
          >
            <div className='ui clearing segment'>
              <VisualizationRendererContainer size={this.props.size} mmRender={mmRenderRef} />
              <MapConfigurationContainer />
            </div>
            <div >
              <div className='ui clearing segment'>
                <FieldInfoContainer></FieldInfoContainer>
              </div>
              <div className='ui clearing segment'>
                <TimeSeriesChartContainer></TimeSeriesChartContainer>
                <br></br>
                <br></br>
                <br></br>
                <Chart2RenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
              </div>
              {/* <div className='ui clearing segment'>
                <ChartHeaderContainer></ChartHeaderContainer>
                <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
              </div> */}
            </div>
          </Columns>
        </div>
      </div>


    );
  }
}

export default Dashboard;
