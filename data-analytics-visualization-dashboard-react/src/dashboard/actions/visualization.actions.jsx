import axios from 'axios';
import { visualizationConstants } from '../constants/visualization.constants'
//import { documentActions } from '.'
import Ajax from '../utilities/Ajax';
import RequestPayload from '../utilities/RequestPayload';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {optionValues} from '../components/ChartHeader';

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
  selectLayer,
  selectYear,
  updateCurrentGeometry,
  getMapDataset,
  getSelectedFieldDetails,
  updateDashBoardTitle,
  reloadSelectedLayer,
  enableFieldDetailsDropdown,
  disableFieldDetailsDropdown,
  setFieldDetailsDropdownValue,
  updateFieldDetailsDropdownValue,
  updateCurrentZoomLevel,
  updateDibableFetchData,
  getCropHistory
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

function updateDashBoardTitle(dashboardTitle) {
  return { type: visualizationConstants.CHANGE_DASHBOARD_TITLE, dashboardTitle };
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

function selectLayer(selectedLayer) {
  return { type: visualizationConstants.SELECT_LAYER, selectedLayer };
}

function updateCurrentGeometry(currentGeometry) {
  return { type: visualizationConstants.UPDATE_CURRENT_GEOMETRY, currentGeometry };
}

function updateCurrentZoomLevel(zoomlevel) {
  return { type: visualizationConstants.UPDATE_CURRENT_ZOOM_LEVEL, zoomlevel };
}

function updateDibableFetchData(disableFetchData) {
  return { type: visualizationConstants.UPDATE_DISABLE_FETCH_DATA, disableFetchData };
}

function selectYear(selectedYear) {
  return { type: visualizationConstants.SELECT_YEAR, selectedYear };
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

function enableFieldDetailsDropdown() {
  return { type: visualizationConstants.ENABLE_FIELD_DETAILS_DROPDOWN };
}

function disableFieldDetailsDropdown() {
  return { type: visualizationConstants.DISABLE_FIELD_DETAILS_DROPDOWN };
}

function setFieldDetailsDropdownValue(selected) {
  return { type: visualizationConstants.SET_FIELD_DETAILS_DROPDOWN, selected };
}

function updateFieldDetailsDropdownValue(selected) {
  return function (dispatch, getState) {

    dispatch(showLoading());
    switch (selected){
      case optionValues.field:{
        dispatch(getSelectedFieldDetails(getState().visualization.selectedLayer));
        dispatch(hideLoading());
        return dispatch(setFieldDetailsDropdownValue(selected));
      }
      case optionValues.altitude:{
        dispatch(getSelectedFieldAltitudeData(getState().visualization.selectedLayer));
        dispatch(hideLoading());
        return dispatch(setFieldDetailsDropdownValue(selected));
      }
      case optionValues.soil:{
        dispatch(getSelectedFieldSoilInformation(getState().visualization.selectedLayer));
        dispatch(hideLoading());
        return dispatch(setFieldDetailsDropdownValue(selected));
      }
      case optionValues.crop:{
        dispatch(getCropHistory());
        dispatch(hideLoading());
        return dispatch(setFieldDetailsDropdownValue(selected));
      }
      default:{
        dispatch(hideLoading());
        return dispatch(setFieldDetailsDropdownValue(''));
      }
    }
   }
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

function getMapDataset() {
  return function (dispatch, getState) {
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/get');
    dispatch(showLoading());

    let data = RequestPayload.buildMapRequestPayload(getState());

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
      dispatch(reloadData(response.data)
      );
      dispatch(hideLoading());
    })
    .catch(response => {
      alert(response);
  });
}
}

function getCropHistory() {
  return function (dispatch, getState) {
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/getCropHistory');
    dispatch(showLoading());

    let data = RequestPayload.buildCropHistoryRequestPayload(getState());

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
        dispatch(reloadSelectedLayer(response.data));

      dispatch(hideLoading());
    })
    .catch(response => {
      alert(response);
  });
}
}


function reloadData(data) {
  return { type: visualizationConstants.RELOAD_DATA, data };
}

function reloadSelectedLayer(data) {
  return { type: visualizationConstants.SELECTED_LAYER_FIELD_DETAILS, data };
}

function getSelectedFieldDetails(selectedLayer){

  return function (dispatch, getState) 
  {
  //  let selectedLayer = selectedLayer;getState().visualization.selectedLayer;
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/field/' + selectedLayer.properties.fieldid);
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
      dispatch(reloadSelectedLayer(response.data))
    })
    .catch(response => {
      alert(response);
    });
  }
}

function getSelectedFieldAltitudeData(selectedLayer){

  return function (dispatch, getState) 
  {
  //  let selectedLayer = selectedLayer;getState().visualization.selectedLayer;
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/field/' + selectedLayer.properties.fieldid + "/ahn");
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
      dispatch(reloadSelectedLayer(response.data))
    })
    .catch(response => {
      alert(response);
    });
  }
}

function getSelectedFieldSoilInformation(selectedLayer){

  return function (dispatch, getState) 
  {
  //  let selectedLayer = selectedLayer;getState().visualization.selectedLayer;
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/field/' + selectedLayer.properties.fieldid + "/soiltypes");
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
      dispatch(reloadSelectedLayer(response.data))
    })
    .catch(response => {
      alert(response);
    });
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

