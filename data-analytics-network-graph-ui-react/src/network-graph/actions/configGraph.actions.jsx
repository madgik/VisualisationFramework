import { configGraphConstants } from '../constants'

export const configGraphActions = {
  storeGraphData,
  editGraphConfiguration,
  showGraphEdit,
  closeGraphEdit,
  showErrorMessage
}

/*
 * action creators
 */
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
