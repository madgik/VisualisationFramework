import { configGraphConstants } from '../constants'
import axios from 'axios';
import Ajax from '../utilities/Ajax';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {controlGraphActions} from './controlGraph.actions'


export const configGraphActions = {
  uploadFile,
  updateUploadedFile,
  getAllGraphsMetadata,
  storeGraphData,
  showGraphEdit,
  closeGraphEdit,
  showErrorMessage,
  setFileValidation,
  setGraphSource,
  setSelectedGraph,
  setAllGraphsMetadata,
  setOpenImportModal,
  setOpenSidebar,
  setNodesNumber
}

function uploadFile(file, fileName, privacy) {
  return function (dispatch) {
    dispatch(showLoading());

    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", fileName);
    formData.append("privacy", privacy);
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH +'/'+Ajax.NETWORK_GRAPH_FILE_PATH);
    return axios.post(resourceUrl, formData, {
      headers: { 
        'content-type': 'multipart/form-data'
       }
    }).then(response => {
      dispatch(hideLoading());
      dispatch(setOpenImportModal(false));
      console.log("file uploaded"+response)
    }).catch(_ => { });

  }
}

function updateUploadedFile(id) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH +'/'+Ajax.NETWORK_GRAPH_GRAPHS_PATH);
    return axios.get(resourceUrl, {
      headers: { 
        'content-type': 'application/json'
       }
    }).then(response => {
      dispatch(setAllGraphsMetadata(response.data));
      console.log("get graphs"+response.data)
    }).catch(_ => { });
  }
}

function getAllGraphsMetadata() {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH +'/'+Ajax.NETWORK_GRAPH_GRAPHS_PATH);
    return axios.get(resourceUrl, {
      headers: { 
        'content-type': 'application/json'
       }
    }).then(response => {
      console.log("get graphs"+response.data)

      dispatch(setAllGraphsMetadata(response.data));
    }).catch(_ => { });
  }
}




function storeGraphData() {
  return { type: configGraphConstants.CREATE_GRAPH}
}


function showGraphEdit() {
  return { type: configGraphConstants.SHOW_ITEM_EDIT };
}

function closeGraphEdit() {
  return { type: configGraphConstants.CLOSE_ITEM_EDIT };
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
  return { type: configGraphConstants.SHOW_MODAL_ERROR, message };
}

function setFileValidation(valid) {
  return { type: configGraphConstants.SET_FILE_VALIDATION, valid };
}

function setGraphSource(graphSource) {
  return { type: configGraphConstants.SET_GRAPH_SOURCE, graphSource };
}

function setSelectedGraph(selectedGraph) {
  return { type: configGraphConstants.SET_SELECTED_GRAPH, selectedGraph };
}

function setAllGraphsMetadata(allGraphsMetadata) {
  return { type: configGraphConstants.SET_ALL_GRAPHS_METADATA, allGraphsMetadata };
}

function setOpenImportModal(openImportModal) {
  return { type: configGraphConstants.SET_OPEN_IMPORT_MODAL, openImportModal };
}

function setOpenSidebar(openSidebar) {
  return { type: configGraphConstants.SET_OPEN_SIDEBAR, openSidebar };
}

function setNodesNumber(nodesNumber) {
  return { type: configGraphConstants.SET_NODES_NUMBER, nodesNumber };
}

