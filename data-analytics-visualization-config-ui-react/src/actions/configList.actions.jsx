import { configListConstants } from '../constants'
import { configurationService } from '../services'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export const configListActions = {
  loadConfigurations,
  showErrorMessage,
  showNetworkError,
  disableChartCreation
}

const options = {
  title: 'Alert',
  message: 'An unexpected error has occurred. Please try again later.',
  buttons: [
    {
      label: 'Close'
    }
  ]
}
/*
 * action creators
 */

function loadConfigurations() {
  return function (dispatch) {
    
    dispatch(loadConfigurationsStarted())

    configurationService.getConfigurations().then(response => {
   
     // dispatch(disableChartCreation(false));

      dispatch(setConfigurations(response.data))
   
      dispatch(loadConfigurationsCompleted())
    }).catch(() => {
    });
  }

  function loadConfigurationsStarted() {
    return { type: configListConstants.LOAD_CONFIGURATIONS_STARTED };
  }
  
  function setConfigurations(data) {
    return { type: configListConstants.SET_CONFIGURATIONS, data };
  }
  

}

function loadConfigurationsCompleted() {
  return { type: configListConstants.LOAD_CONFIGURATIONS_COMPLETED };
}

function showNetworkError()
{
  return function (dispatch) {
    confirmAlert(options);
    dispatch(loadConfigurationsCompleted());
    dispatch(disableChartCreation(true));
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

function disableChartCreation(disableChartCreation) {
  return { type: configListConstants.DISABLE_CREATION_CHART, disableChartCreation };
}