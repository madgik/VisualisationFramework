import React from 'react';

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

export default ConfigurationModal
