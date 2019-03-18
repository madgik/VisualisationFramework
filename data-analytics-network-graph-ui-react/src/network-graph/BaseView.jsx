import React from 'react';

import BaseViewMenuContainer from './containers/BaseViewMenuContainer';
import ConfigDataContainer from './containers/ConfigDataContainer';


class BaseView extends React.Component {

  render() {
    var sizeStyle = {
      width: this.props.size.width + 'px'
    };
    const mmRenderRef = React.createRef();

    return (
      <div className="base-container" style={sizeStyle}>
        <BaseViewMenuContainer           
          mmRender={mmRenderRef}/>
        <ConfigDataContainer
          onFileDropped={this.props.onFileDropped}
          mmRender={mmRenderRef} />
      </div>
    );
  }
}

export default BaseView;