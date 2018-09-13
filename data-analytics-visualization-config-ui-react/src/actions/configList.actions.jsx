import { configListConstants } from '../constants'
import { configurationService } from '../services'

export const configListActions = {
  loadConfigurations,
  showErrorMessage
}

/*
 * action creators
 */

function loadConfigurations() {
  return function (dispatch) {
    
    dispatch(loadConfigurationsStarted())

    configurationService.getConfigurations().then(response => {
      dispatch(setConfigurations(response.data))

      dispatch(loadConfigurationsCompleted())
    }).catch(() => {
      dispatch(loadConfigurationsCompleted())
    });
  }

  function loadConfigurationsStarted() {
    return { type: configListConstants.LOAD_CONFIGURATIONS_STARTED };
  }
  
  function setConfigurations(data) {
    return { type: configListConstants.SET_CONFIGURATIONS, data };
  }
  
  function loadConfigurationsCompleted() {
    return { type: configListConstants.LOAD_CONFIGURATIONS_COMPLETED };
  }
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
  return { type: configListConstants.SHOW_GRID_ERROR, message };
}
