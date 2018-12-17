import React from 'react';

import { connect } from 'react-redux'

import { configItemActions, configListActions } from '../../actions'

import { ConfigurationModal } from 'data-analytics-visualization-config-modal'

class ConfigurationModalContainer extends React.Component {
  render() {
    return (
      <ConfigurationModal
        allowDelete={true}
        routing={this.props.routing}
        isLocalDeployment={this.props.isLocalDeployment}

        open={this.props.open}

        isNew={this.props.isNew}
        editItemId={this.props.editItemId}

        onModalClose={this.props.onModalClose}
        onConfigurationLoaded={this.props.onConfigurationLoaded}
        onSaveComplete={this.props.onSaveComplete}
        onDeleteComplete={this.props.onDeleteComplete} />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.configItem
  }
}

const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(configItemActions.closeItemEdit()),
  onConfigurationLoaded: () => dispatch(configItemActions.showItemEdit()),
  onSaveComplete: () => {
    dispatch(configItemActions.closeItemEdit())
    dispatch(configListActions.loadConfigurations())
  },
  onDeleteComplete: () => {
    dispatch(configItemActions.closeItemEdit())
    dispatch(configListActions.loadConfigurations())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationModalContainer)
