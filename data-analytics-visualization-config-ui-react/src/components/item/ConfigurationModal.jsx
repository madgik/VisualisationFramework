import React from 'react';

import { connect } from 'react-redux'

import { configItemActions } from '../../actions'

import ConfigurationForm from './ConfigurationForm'

import ConfigurationErrorPanel from './ConfigurationErrorPanel'

import { Button, Modal, Message } from 'semantic-ui-react'

class ConfigurationModal extends React.Component {
  render() {
    return (
      <Modal open={this.props.open} size="fullscreen" onClose={this.props.onModalClose}>
        <Modal.Header>Configuration</Modal.Header>
        <Modal.Content>
          <ConfigurationForm
            data={this.props.data}
            menuState={this.props.menu}
            validation={this.props.validation}
            onFieldChange={this.props.onFieldChange}
            onFileDropped={this.props.onFileDropped}
            onRemoveFileClick={this.props.onRemoveFileClick}
            onJoinFieldChange={this.props.onJoinFieldChange}
            onMenuItemClick={this.props.onMenuItemClick}
            onFilterAddition={this.props.onFilterAddition}
            onFilterFieldChange={this.props.onFilterFieldChange}
            onFilterRemoval={this.props.onFilterRemoval}
            onTransformationAddition={this.props.onTransformationAddition}
            />
          {this.props.validationPanelMessages && this.props.validationPanelMessages.length > 0 ?
            <ConfigurationErrorPanel validation={this.props.validationPanelMessages} /> : ''}
          {this.props.errorMessage && this.props.errorMessage.length > 0 ?
            <Message negative>
              <Message.Header>{this.props.errorMessage}</Message.Header>
            </Message> : ''}
        </Modal.Content>
        <Modal.Actions>
          {!this.props.isNew ?
            <Button negative className="left-aligned-modal-button" content='Delete' onClick={this.props.onDeletePressed} /> : ''}
          <Button primary content='Cancel' onClick={this.props.onModalClose} />
          <Button positive content='Save' onClick={this.props.onSavePressed} />
        </Modal.Actions>
      </Modal>
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
  onTransformationAddition: (transformation) => dispatch(configItemActions.addTransformation(transformation)),
  onModalClose: () => dispatch(configItemActions.closeItemEdit()),
  onSavePressed: () => dispatch(configItemActions.storeConfiguration()),
  onDeletePressed: () => dispatch(configItemActions.deleteConfiguration())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationModal)