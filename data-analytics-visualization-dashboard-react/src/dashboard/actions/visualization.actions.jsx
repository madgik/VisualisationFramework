import axios from 'axios';
import { visualizationConstants } from '../constants/visualization.constants'
//import { documentActions } from '.'
import Ajax from '../utilities/Ajax';

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
  updateFilter
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
      })
      .catch(response => {
        alert(response);
      });
  }
}

function loadVisualizations(options) {
  return { type: visualizationConstants.LOAD_VISUALIZATIONS, options };
}

function changeVisualizationAndLoad(selected) {

  return function (dispatch) {

   // dispatch(documentActions.hideDocument());

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

    //dispatch(documentActions.hideDocument());
    
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

   // dispatch(documentActions.hideDocument());

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

