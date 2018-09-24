import React from 'react'

import CongigurationsGrid from './list/ConfigurationsGrid'
import ConfigurationModalContainer from './item/ConfigurationModalContainer'

class CongigurationsEditor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CongigurationsGrid />
        <ConfigurationModalContainer />
      </React.Fragment>
    );
  }
}

export default CongigurationsEditor;
