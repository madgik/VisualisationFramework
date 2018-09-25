import { configItemConstants } from '../constants'
import { configurationService } from '../services'
import { documentService } from '../services'

import ConfigurationValidators from '../validation/ConfigurationValidators'

export const configItemActions = {
  createConfiguration,
  editConfiguration,
  showConfigurationData,
  updateEditedItem,
  uploadFile,
  removeFile,
  updateJoinField,
  addFilter,
  addTransformation,
  updateFilter,
  removeFilter,
  updateSelectedMenuItem,
  storeConfiguration,
  deleteConfiguration,
  closeItemEdit,
  showErrorMessage
}

/*
 * action creators
 */

function createConfiguration() {
  return { type: configItemConstants.CREATE_ITEM };
}

function editConfiguration(id) {
  return function (dispatch) {
    configurationService.getConfiguration(id)
      .then(response => {
        dispatch(showConfigurationData(response.data))
      });
  }
}

function showConfigurationData(data) {
  return { type: configItemConstants.EDIT_ITEM, data };
}

function updateEditedItem(data, validation) {
  return { type: configItemConstants.UPDATE_EDITED_ITEM, data, validation };
}

const visualizationToDataTypeMap = {
  'Graph': 'Graph',
  'Tree': 'Tree',
  'MindMap': 'FreeMind',
  'Pie': 'Records',
  'Doughnut': 'Records',
  'Polar': 'Records',
  'Bar': 'Records',
  'ThreeD': 'Records',
  'Line': 'Records',
  'Scatter': 'Records',
  'Spline': 'Records',
  'Step': 'Records',
  'Map': 'JSON',
  'WorldWindMap': 'JSON',
  'Table': 'Records'
}

function visualizationToDataType(type) {
  return visualizationToDataTypeMap[type];
}

function uploadFile(files, type) {
  return function (dispatch) {
    var dataType = visualizationToDataType(type);
    files.forEach(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("type", dataType);

      return documentService.postDocument(formData).then(response => {
        dispatch(updateUploadedFile(response.data));
      })
    });
  }
}

function updateUploadedFile(id) {
  return function (dispatch) {

    dispatch(addDataSource(id))

    return documentService.getDocumentMetadata(id).then(response => {
      dispatch(setUploadedFileMetadata(response.data));
    })
  }
}

function addDataSource(id) {
  return { type: configItemConstants.ADD_DATA_SOURCE, id };
}

function setUploadedFileMetadata(metadata) {
  return { type: configItemConstants.SET_UPLOADED_FILE_METADATA, metadata };
}

function removeFile(index) {
  return { type: configItemConstants.REMOVE_DATA_SOURCE, index };
}

function updateJoinField(source, field) {
  return { type: configItemConstants.UPDATE_JOIN_FIELD, source, field };
}

function addFilter(filter) {
  return { type: configItemConstants.ADD_FILTER, filter };
}

function addTransformation(transformation) {
  return { type: configItemConstants.ADD_TRANSFORMATION, transformation };
}

function updateFilter(index, filter) {
  return { type: configItemConstants.UPDATE_FILTER, index, filter };
}

function removeFilter(index) {
  return { type: configItemConstants.REMOVE_FILTER, index };
}

function updateSelectedMenuItem(item) {
  return { type: configItemConstants.UPDATE_MENU_ITEM, item };
}

function storeConfiguration() {
  return function (dispatch, getState) {

    dispatch(validateData())

    var state = getState().configItem;

    if (state.isFormValid) {
      var promise = state.isNew ?
        configurationService.postConfiguration(state.data) :
        configurationService.putConfiguration(state.data);

      promise.then(() => {
        dispatch(configurationStored())
      });
    }
  }
}

function validateData() {
  return function (dispatch, getState) {

    var state = getState().configItem;

    var result = ConfigurationValidators.validate(state.data, state.validation);

    var validation = result.state,
      isFormValid = result.valid,
      validationPanelMessages = result.messages;

    dispatch(showValidationResult(validation, isFormValid, validationPanelMessages))
  }
}

function configurationStored() {
  return function (dispatch) {

    dispatch(closeItemEdit())

    //dispatch(configListActions.loadConfigurations())
  }
}

function showValidationResult(validation, isFormValid, validationPanelMessages) {
  return { type: configItemConstants.SHOW_VALIDATION_RESULT, validation, isFormValid, validationPanelMessages };
}

function deleteConfiguration() {
  return function (dispatch, getState) {

    var id = getState().configItem.data.id;

    configurationService.deleteConfiguration(id)
      .then(() => {
        dispatch(closeItemEdit())

        //dispatch(configListActions.loadConfigurations())
      });
  }
}

function closeItemEdit() {
  return { type: configItemConstants.CLOSE_ITEM_EDIT };
}

function showErrorMessage(message) {
  return function (dispatch) {

    dispatch(setErrorMessage(message))

    setTimeout(function () {
      dispatch(setErrorMessage(null))
    }, 3000)
  }
}

function setErrorMessage(message) {
  return { type: configItemConstants.SHOW_MODAL_ERROR, message };
}
