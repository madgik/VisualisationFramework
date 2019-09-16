import React from 'react';

import { connect } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers'

import { configItemActions } from '../actions'

import ConfigurationForm from './ConfigurationForm'

import ConfigurationErrorPanel from './ConfigurationErrorPanel'

import { Button, Modal, Message, Loader } from 'semantic-ui-react'

var positionRelative = {
  position: 'relative'

}
class ConfigurationModalInner extends React.Component {

  constructor(props) {
    super(props);
    this.store = createStore(rootReducer,
      applyMiddleware(thunkMiddleware, createLogger({
        predicate: () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      }))
    );
  }
  

  render() {
    return (
      <Modal open={this.props.open} size="fullscreen" onClose={this.props.onModalClose}>
        <Modal.Header>Configuration</Modal.Header>
        <Modal.Content>
          <div>
          <ConfigurationForm
            isNew = {this.props.isNew}
            data={this.props.data}
            menuState={this.props.menu}
            geoanalytics={this.props.geoanalytics}
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
            onCheckLayerChange={this.props.onCheckLayerChange}
            setDelimiter={this.props.setDelimiter}
            delimiter={this.props.delimiter}
            loading={this.props.loading}
            setCommentCharacter={this.props.setCommentCharacter}
            commentCharacter={this.props.commentCharacter}         
            configurations={this.props.configurations}
            configOptions={this.props.configOptions}
            selectedConfiguration={this.props.selectedConfiguration}
            setSelectedConfiguration={this.props.setSelectedConfiguration}
            showConfigurationData={this.props.showConfigurationData}
            setConfigurationData={this.props.setConfigurationData}
            />
            <div  >

          </div>
            </div>
          {this.props.validationPanelMessages && this.props.validationPanelMessages.length > 0 ?
            <ConfigurationErrorPanel validation={this.props.validationPanelMessages} /> : ''}
          {this.props.errorMessage && this.props.errorMessage.length > 0 ?
            <Message negative>
              <Message.Header>{this.props.errorMessage}</Message.Header>
            </Message> : ''}
        </Modal.Content>
        <Modal.Actions>
          {(!this.props.isNew && this.props.allowDelete) ?
            <Button negative className="left-aligned-modal-button" content='Delete' onClick={() => this.props.onDeletePressed(this.props.onDeleteComplete)} /> : ''}
          <Button primary content='Cancel' onClick={this.props.onModalClose} />
          <Button positive content='Save' onClick={() => this.props.onSavePressed(this.props.onSaveComplete)} />
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
  onFileDropped: (files, type, delimiter,commentCharacter) => {
    dispatch(configItemActions.setLoader(true));

    dispatch(configItemActions.uploadFile(files, type, delimiter, commentCharacter))
  
  },
  onRemoveFileClick: (index) => dispatch(configItemActions.removeFile(index)),
  onJoinFieldChange: (source, field) => dispatch(configItemActions.updateJoinField(source, field)),
  onFilterAddition: (filter) => dispatch(configItemActions.addFilter(filter)),
  onFilterFieldChange: (index, filter) => dispatch(configItemActions.updateFilter(index, filter)),
  onFilterRemoval: (index) => dispatch(configItemActions.removeFilter(index)),
  onMenuItemClick: (item) => dispatch(configItemActions.updateSelectedMenuItem(item)),
  //onModalClose: () => dispatch(configItemActions.closeItemEdit()),
  onSavePressed: (callback) => dispatch(configItemActions.storeConfiguration(callback)),
  onDeletePressed: (callback) => dispatch(configItemActions.deleteConfiguration(callback)),
  onTransformationAddition: (transformation) => dispatch(configItemActions.addTransformation(transformation)),
  onCheckLayerChange: (value) => dispatch(configItemActions.updateCheckLayer(value)),
  setDelimiter: (value) => dispatch(configItemActions.setDelimiter(value)),
  setCommentCharacter: (value) => dispatch(configItemActions.setCommentCharacter(value)),
  setSelectedConfiguration: (value) => dispatch(configItemActions.setSelectedConfiguration(value)),
  showConfigurationData: (value) => dispatch(configItemActions.showConfigurationData(value)),
  setConfigurationData: (value) => dispatch(configItemActions.setConfigurationData(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationModalInner)