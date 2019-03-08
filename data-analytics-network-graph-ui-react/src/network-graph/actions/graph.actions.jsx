import axios from 'axios';
import { graphConstants } from '../constants'
import Ajax from '../utilities/Ajax';

export const graphActions = {
  requestGraphs,
  loadGraphs,
  changeGraphAndLoad,
  changeGraph,
  loadGraph,
  reloadGraph,
  resetGraph,
  changeChartType,
  updateFilterAndReload,
  reloadData,
  updateFilter
}

/*
 * action creators
 */

function requestGraphs() {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH);
    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadGraphs(response.data))
      })
      .catch(response => {
        alert(response);
      });
  }
}

function loadGraphs(options) {
  return { type: graphConstants.LOAD_GRAPHS, options };
}

function changeGraphAndLoad(selected) {

  return function (dispatch) {


    dispatch(resetGraph());

    dispatch(changeGraph(selected));

    var resourceUrl = Ajax.buildUrl(Ajax.VISUALIZATIONS_BASE_PATH + '/' + selected);

    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadGraph(response.data))
      })
      .catch(response => {
        alert(response);
      })
  }
}

function reloadGraph() {

  return function (dispatch, getState) {

    var selected = getState().graph.selected;
    
    dispatch(resetGraph());

    var resourceUrl = Ajax.buildUrl(Ajax.VISUALIZATIONS_BASE_PATH + '/' + selected);

    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadGraph(response.data))
      })
      .catch(response => {
        alert(response);
      })
  }
}

function changeGraph(selected) {
  return { type: graphConstants.CHANGE_VISUALIZATION, selected };
}

function loadGraph(data) {
  return { type: graphConstants.LOAD_VISUALIZATION, data };
}

function resetGraph() {
  return { type: graphConstants.RESET_VISUALIZATION };
}

function changeChartType(chartType) {
  return { type: graphConstants.CHANGE_CHART_TYPE, chartType };
}

function updateFilterAndReload(field, value) {

  return function (dispatch, getState) {


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
  return { type: graphConstants.RELOAD_DATA, data };
}

function updateFilter(field, value) {
  return { type: graphConstants.UPDATE_FILTER, field, value };
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

