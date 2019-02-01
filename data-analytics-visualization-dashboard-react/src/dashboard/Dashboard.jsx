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
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

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
{/* <StickyHeader
    // This is the sticky part of the header.
    header={
      <div className="Header_root">
        <h1 className="Header_title">ReactStickyHeader</h1>
 
        <ul className="Header_links">
          <li className="Header_link">When</li>
          <li className="Header_link">Why</li>
          <li className="Header_link">About</li>
        </ul>
      </div>
    }
  >
    <section>
      <p>
        This section will be what the sticky header scrolls over before entering into
        sticky state. See the gif above or run the test story book to see examples.
      </p>
    </section>
  </StickyHeader> */}
       <header>
        <LoadingBar updateTime={1200} maxProgress={90} progressIncrease={5}/>
        <br></br> 
      </header>
        <div>
          <HeaderMenuContainer> </HeaderMenuContainer>
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
                <FieldInfoContainer></FieldInfoContainer>
            </div>
            <div className='ui clearing segment'>
                <ChartHeaderContainer></ChartHeaderContainer>
                <Chart2RenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            </div>
            <div className='ui clearing segment'>
                <ChartHeaderContainer></ChartHeaderContainer>    
                <ChartRenderContainer size={this.props.chartsSize} mmRender={mmRenderRef} />
            </div>
          </div>
        </Columns>
      </div>


    );
  }
}

export default Dashboard;
