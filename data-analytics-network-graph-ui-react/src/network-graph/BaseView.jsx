import React from 'react';

import ConfigDataContainer from './containers/ConfigDataContainer';
import GraphVisualizationContainer from './containers/GraphVisualizationContainer';
import LoadingBar from 'react-redux-loading-bar'


class BaseView extends React.Component {

  render() {
    var sizeStyle = {
      width: this.props.size.width + 'px'
    };
    const mmRenderRef = React.createRef();

    return (
      <div className='App-style'>
        <div className="headerMenu">
          <LoadingBar updateTime={2200} maxProgress={90} progressIncrease={5} showFastActions />
        </div>
        <div className="content" style={sizeStyle}>
          <ConfigDataContainer
            onFileDropped={this.props.onFileDropped}
            onFileUpload={this.props.onFileUpload}
            mmRender={mmRenderRef} />
          <GraphVisualizationContainer
            mmRender={mmRenderRef} />
        </div>
      </div>
    );
  }
}

export default BaseView;