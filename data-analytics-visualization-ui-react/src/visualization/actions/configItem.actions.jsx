import { configItemConstants } from '../constants'

export const configItemActions = {
  createConfiguration,
  editConfiguration,
  showItemEdit,
  closeItemEdit,
  showErrorMessage
}

/*
 * action creators
 */

function createConfiguration() {
  return { type: configItemConstants.CREATE_ITEM };
}

function editConfiguration() {
  return function (dispatch, getState) {

    var id = getState().visualization.selected;

    dispatch(editSelectedConfiguration(id))
  }
}

function editSelectedConfiguration(id) {
  return { type: configItemConstants.EDIT_ITEM, id };
}

function showItemEdit() {
  return { type: configItemConstants.SHOW_ITEM_EDIT };
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
