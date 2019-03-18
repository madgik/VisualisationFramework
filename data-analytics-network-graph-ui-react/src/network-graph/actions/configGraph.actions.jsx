import { configGraphConstants } from '../constants'
import axios from 'axios';
import Ajax from '../utilities/Ajax';

export const configGraphActions = {
  uploadFile,
  updateUploadedFile,
  storeGraphData,
  editGraphConfiguration,
  showGraphEdit,
  closeGraphEdit,
  showErrorMessage
}

/*
 * action creators
 */
function uploadFile(file) {
  return function (dispatch) {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH);
    return axios.post(resourceUrl, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    }).then(response => {
      console.log("file uploaded"+response)
    }).catch(_ => { });

  }
}

function updateUploadedFile(id) {
  return function (dispatch) {

    // dispatch(addDataSource(id))

  
  }
}

function storeGraphData() {
  return { type: configGraphConstants.CREATE_GRAPH}
}

function editGraphConfiguration() {
  return function (dispatch, getState) {

    var id = getState().visualization.selected;

    dispatch(editSelectedConfiguration(id))
  }
}

function editSelectedConfiguration(id) {
  return { type: configGraphConstants.EDIT_ITEM, id };
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
