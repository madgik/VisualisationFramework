import React from 'react';

import { Button, Icon } from 'semantic-ui-react'

import { ConfigurationModal } from 'data-analytics-visualization-config-modal'

class ChartConfigurator extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button className="chart-printer" icon onClick={this.props.onConfigurationClick}>
          <Icon name='cogs' />
        </Button>
        <ConfigurationModal
          allowDelete={false}
          routing={this.props.routing}
          isLocalDeployment={this.props.isLocalDeployment}

          open={this.props.open}

          isNew={this.props.isNew}
          editItemId={this.props.editItemId}

          onModalClose={this.props.onModalClose}
          onConfigurationLoaded={this.props.onConfigurationLoaded}
          onSaveComplete={this.props.onSaveComplete}
          onDeleteComplete={this.props.onDeleteComplete} />
      </React.Fragment>
    )
  }
}

export default ChartConfigurator;
