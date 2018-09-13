import React from 'react'

import CongigurationsGrid from './list/ConfigurationsGrid'
import ConfigurationModal from './item/ConfigurationModal'

class CongigurationsEditor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CongigurationsGrid />
        <ConfigurationModal />
      </React.Fragment>
    );
  }
}

export default CongigurationsEditor;
