import axios from 'axios';
import { visualizationConstants } from '../constants'
import { documentActions } from '.'
import Ajax from '../utilities/Ajax';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export const visualizationActions = {
  requestVisualizations,
  loadVisualizations,
  changeVisualizationAndLoad,
  changeVisualization,
  loadVisualization,
  reloadVisualization,
  resetVisualization,
  changeChartType,
  updateFilterAndReload,
  reloadData,
  updateFilter,
  showNetworkError,
  showEmptyConfigurations,
  setSliderValue
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

const emptryConfigurationsOptions = {
  title: 'Alert',
  message: 'No configurations for charts are specified.',
  buttons: [
    {
      label: 'Close'
    }
  ]
}
/*
 * action creators
 */

function requestVisualizations() {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH);
    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadVisualizations(response.data))
        if(response.data.length === 0){
          dispatch(showEmptyConfigurations());
        }
      })
      .catch(response => {
        dispatch(showNetworkError());
      });
  }
}

function loadVisualizations(options) {
  return { type: visualizationConstants.LOAD_VISUALIZATIONS, options };
}

function setSliderValue(sliderSelectedValue) {
  return { type: visualizationConstants.UPDATE_SLIDER, sliderSelectedValue };
}


function changeVisualizationAndLoad(selected) {

  return function (dispatch) {

    dispatch(documentActions.hideDocument());

    dispatch(resetVisualization());

    dispatch(changeVisualization(selected));

    var resourceUrl = Ajax.buildUrl(Ajax.VISUALIZATIONS_BASE_PATH + '/' + selected);

    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadVisualization(response.data))
      })
      .catch(response => {
        alert(response);
      })
  }
}

function reloadVisualization() {

  return function (dispatch, getState) {

    var selected = getState().visualization.selected;

    dispatch(documentActions.hideDocument());
    
    dispatch(resetVisualization());

    var resourceUrl = Ajax.buildUrl(Ajax.VISUALIZATIONS_BASE_PATH + '/' + selected);

    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadVisualization(response.data))
      })
      .catch(response => {
        alert(response);
      })
  }
}

function changeVisualization(selected) {
  return { type: visualizationConstants.CHANGE_VISUALIZATION, selected };
}

function loadVisualization(data) {
  return { type: visualizationConstants.LOAD_VISUALIZATION, data };
}

function resetVisualization() {
  return { type: visualizationConstants.RESET_VISUALIZATION };
}

function changeChartType(chartType) {
  return { type: visualizationConstants.CHANGE_CHART_TYPE, chartType };
}

function updateFilterAndReload(field, value) {

  return function (dispatch, getState) {

    dispatch(documentActions.hideDocument());

    dispatch(updateFilter(field, value));

    var queryString = getFiltersQueryString(getState().filters);

    var resourceUrl = Ajax.buildUrl(Ajax.VISUALIZATIONS_BASE_PATH + '/' + getState().data.id, (queryString.length > 0 ? queryString : null));

    return axios.get(resourceUrl)
      .then(response => {
        dispatch(reloadData(response.data))
      })
      .catch(response => {
        alert(response);
      })
      
  }
}

function reloadData(data) {
  return { type: visualizationConstants.RELOAD_DATA, data };
}

function showNetworkError()
{
  return function (dispatch) {
    confirmAlert(options);
   
  }

}

function showEmptyConfigurations(){
  return function (dispatch) {
    confirmAlert(emptryConfigurationsOptions);
   
  }
}

function updateFilter(field, value) {
  return { type: visualizationConstants.UPDATE_FILTER, field, value };
}

function getFiltersQueryString(filters) {
  var queryString = '';
  for (var prop in filters) {
    if (!filters.hasOwnProperty(prop)) continue;
    if (filters[prop].length === 0) continue;
    queryString += (prop + "=" + filters[prop]);
  }
  return queryString;
}

