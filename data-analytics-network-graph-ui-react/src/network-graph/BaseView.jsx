import React from 'react';

import ConfigDataContainer from './containers/ConfigDataContainer';
import GraphVisualizationContainer from './containers/GraphVisualizationContainer';
import LoadingBar from 'react-redux-loading-bar'
import PropertiesContainer from './containers/SidebarContainer';
import PlayerContainer from './containers/PlayerContainer';

import Grid from '@material-ui/core/Grid';


class BaseView extends React.Component {

  render() {

    var queries = [{
      columns: 3,
      query: 'min-width: 1350px'
    }];
    var sizeStyle = {
      width: this.props.size.width + 'px'
    };
    const mmRenderRef = React.createRef();

    return (
      <div className='App-style'>
        <div className="headerMenu">
          <LoadingBar updateTime={2200} maxProgress={90} progressIncrease={5} showFastActions />
        </div>
        <div className="main-content" style={sizeStyle}>
          <Grid container
            direction="row"
            justify="center"
          >
            <Grid item xs={12}>
              <div className="topMenu">
                <ConfigDataContainer
                  onFileDropped={this.props.onFileDropped}
                  onFileUpload={this.props.onFileUpload}
                  mmRender={mmRenderRef} />

              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="content" >

                <PropertiesContainer
                  mmRender={mmRenderRef}
                />


                <GraphVisualizationContainer
                  mmRender={mmRenderRef} />
              </div>

            </Grid>

            <Grid item xs={12}>
              <PlayerContainer
                mmRender={mmRenderRef}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default BaseView;