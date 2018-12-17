import React from 'react'

import CongigurationsGrid from './list/ConfigurationsGrid'
import ConfigurationModalContainer from './item/ConfigurationModalContainer'

class CongigurationsEditor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CongigurationsGrid />
        <ConfigurationModalContainer
          routing={this.props.routing}
          isLocalDeployment={this.props.isLocalDeployment} />
      </React.Fragment>
    );
  }
}

export default CongigurationsEditor;
