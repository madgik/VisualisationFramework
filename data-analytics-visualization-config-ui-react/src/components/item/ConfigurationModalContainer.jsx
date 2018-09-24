import React from 'react';

import { connect } from 'react-redux'

import { configItemActions } from '../../actions'

import { ConfigurationModal } from 'data-analytics-visualization-config-modal'

class ConfigurationModalContainer extends React.Component {
  render() {
    return (
      <ConfigurationModal
        open={this.props.open}
        data={this.props.data}
        menu={this.props.menu}
        validation={this.props.validation}
        onFieldChange={this.props.onFieldChange}
        onFileDropped={this.props.onFileDropped}
        onRemoveFileClick={this.props.onRemoveFileClick}
        onJoinFieldChange={this.props.onJoinFieldChange}
        onMenuItemClick={this.props.onMenuItemClick}
        onFilterAddition={this.props.onFilterAddition}
        onFilterFieldChange={this.props.onFilterFieldChange}
        onFilterRemoval={this.props.onFilterRemoval}
        validationPanelMessages={this.props.validationPanelMessages}
        errorMessage={this.props.errorMessage}
        onDeletePressed={this.props.onDeletePressed}
        onModalClose={this.props.onModalClose}
        onSavePressed={this.props.onSavePressed}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.configItem
  }
}

const mapDispatchToProps = dispatch => ({
  onFieldChange: (data, validation) => dispatch(configItemActions.updateEditedItem(data, validation)),
  onFileDropped: (files, type) => dispatch(configItemActions.uploadFile(files, type)),
  onRemoveFileClick: (index) => dispatch(configItemActions.removeFile(index)),
  onJoinFieldChange: (source, field) => dispatch(configItemActions.updateJoinField(source, field)),
  onFilterAddition: (filter) => dispatch(configItemActions.addFilter(filter)),
  onFilterFieldChange: (index, filter) => dispatch(configItemActions.updateFilter(index, filter)),
  onFilterRemoval: (index) => dispatch(configItemActions.removeFilter(index)),
  onMenuItemClick: (item) => dispatch(configItemActions.updateSelectedMenuItem(item)),
  onModalClose: () => dispatch(configItemActions.closeItemEdit()),
  onSavePressed: () => dispatch(configItemActions.storeConfiguration()),
  onDeletePressed: () => dispatch(configItemActions.deleteConfiguration())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationModalContainer)