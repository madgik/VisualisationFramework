import { configItemConstants } from '../constants'
import { configurationService } from '../services'
import { documentService } from '../services'
import { geoanalyticsService } from '../services'

import ConfigurationValidators from '../validation/ConfigurationValidators'
import Axios from 'axios'

export const  configItemActions = {
  createConfiguration,
  editConfiguration,
  showConfigurationData,
  updateEditedItem,
  uploadFile,
  postURLOfFile,
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
  showErrorMessage,
  updateGeoanalyticsLayers,
  updateCheckLayer,
  setDelimiter,
  setCommentCharacter,
  getAllConfigurations,
  setConfigurations,
  setConfigOptions,
  setSelectedConfiguration,
  setConfigurationData,
  setLoader,
  setUrl,
  getDataFromUrl
}

/*
 * action creators
 */

function getAllConfigurations() {
  return function(dispatch) {
    configurationService.getConfigurations()
      .then (response => {
        console.log(response.data);
        var options = response.data.map( (configuration) => ({ name: configuration.label, value: configuration.id }));
        dispatch(setConfigOptions(options))
        dispatch(setConfigurations(response.data))
      })
  }
}

function getDataFromUrl(url, type, delimiter, commentCharacter) {
  return function(dispatch) {
     configurationService.getDataFromUrl(url)
     .then(response => {
      console.log(response.data);

        dispatch(uploadFile(response, type, delimiter, commentCharacter));
     })
  }
}

function createConfiguration() {
  return { type: configItemConstants.CREATE_ITEM };
}

function editConfiguration(id, callback) {
  return function (dispatch) {
    configurationService.getConfiguration(id)
      .then(response => {
        dispatch(showConfigurationData(response.data))

        if (callback) callback();
      }).catch(_ => { });
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
  'Table': 'Records',
  'HeatMap': 'Records'

}

function visualizationToDataType(type) {
  return visualizationToDataTypeMap[type];
}

function updateGeoanalyticsLayers(){
  return function (dispatch) {
    return geoanalyticsService.getLayers().then(response => {
      dispatch(setGeoanalyticsLayers(response.data));
    }).catch(_ => { });
  }
}

function setGeoanalyticsLayers(layers){
  return {type: configItemConstants.SET_GEOANALYTICS_LAYERS, layers}
}

function updateCheckLayer(value) {
  return {type:configItemConstants.UPDATE_CHECK_LAYER, value}
}

function postURLOfFile(fileURL, type, delimiter, commentCharacter) {
  return function (dispatch) {
    
      const formData = new FormData();
      formData.append("url", fileURL);
      // formData.append("name", file.name);
      formData.append("type", type);
      formData.append("delimiter", delimiter);
      formData.append("comment", commentCharacter);

      return documentService.postDocumentURL(formData).then(response => {
        dispatch(configItemActions.setLoader(false));

        dispatch(updateUploadedFile(response.data));
      }).catch(_ => {
        dispatch(configItemActions.setLoader(false));
      });

  }
}

function uploadFile(files, type, delimiter, commentCharacter) {
  return function (dispatch) {
    // var dataType = visualizationToDataType(type);
    files.forEach(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("type", type);
      formData.append("delimiter", delimiter);
      formData.append("comment", commentCharacter);

      return documentService.postDocument(formData).then(response => {
        dispatch(configItemActions.setLoader(false));

        dispatch(updateUploadedFile(response.data));
      }).catch(_ => {     dispatch(configItemActions.setLoader(false));
      });
    });
  }
}

function updateUploadedFile(id) {
  return function (dispatch) {

    dispatch(addDataSource(id))

    return documentService.getDocumentMetadata(id).then(response => {
      dispatch(setUploadedFileMetadata(response.data));
    }).catch(_ => { });
  }
}

function addDataSource(id) {
  return { type: configItemConstants.ADD_DATA_SOURCE, id };
}

function setUploadedFileMetadata(metadata) {
  return { type: configItemConstants.SET_UPLOADED_FILE_METADATA, metadata };
}

function setLoader(loading) {
  return { type: configItemConstants.LOADING, loading };
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

function storeConfiguration(callback) {
  return function (dispatch, getState) {

    dispatch(validateData())
    var state = getState().configItem;

    if (state.isFormValid) {
      var promise = state.isNew ?
        configurationService.postConfiguration(state.data) :
        configurationService.putConfiguration(state.data);

      promise.then(() => {
        dispatch(configurationStored())

        if (callback) callback();
      }).catch(_ => { });
    }
  }
}

function validateData() {
  return function (dispatch, getState) {

    var state = getState().configItem;

    var result = ConfigurationValidators.validate(state.data, state.validation, state.configOptions);

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

function deleteConfiguration(callback) {
  return function (dispatch, getState) {

    var id = getState().configItem.data.id;

    configurationService.deleteConfiguration(id)
      .then(() => {
        dispatch(closeItemEdit())

        if (callback) callback();
      }).catch(_ => { });
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

function setDelimiter(delimiter) {
  return { type: configItemConstants.SET_DELIMITER, delimiter };
}

function setCommentCharacter(commentCharacter) {
  return { type: configItemConstants.SET_COMMENT_CHARACTER, commentCharacter };
}

function setConfigurations(configurations) {
  return { type: configItemConstants.SET_CONFIGURATIONS, configurations };
}

function setConfigOptions(configOptions) {
  return { type: configItemConstants.SET_CONFIG_OPTIONS, configOptions };
}

function setSelectedConfiguration(selectedConfiguration) {
  return { type: configItemConstants.SET_SELECTED_CONFIGURATION, selectedConfiguration };
}

function setConfigurationData(data) {
  return { type: configItemConstants.SET_CONFIGURATION_DATA, data };
}

function setUrl(url) {
  return { type: configItemConstants.SET_URL, url };
}