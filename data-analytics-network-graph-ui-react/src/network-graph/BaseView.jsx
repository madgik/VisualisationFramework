import React from 'react';

import BaseViewMenuContainer from './containers/BaseViewMenuContainer';
import ConfigDataContainer from './containers/ConfigDataContainer';
import GraphVisualizationContainer from './containers/GraphVisualizationContainer';

class BaseView extends React.Component {

  render() {
    var sizeStyle = {
      width: this.props.size.width + 'px'
    };
    const mmRenderRef = React.createRef();

    return (
      <div className="base-container" style={sizeStyle}>
    
        <ConfigDataContainer
          onFileDropped={this.props.onFileDropped}
          onFileUpload={this.props.onFileUpload}
          mmRender={mmRenderRef} />
        <GraphVisualizationContainer
          mmRender={mmRenderRef}/>
      </div>
    );
  }
}

export default BaseView;