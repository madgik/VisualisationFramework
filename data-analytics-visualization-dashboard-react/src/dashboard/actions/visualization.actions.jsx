import axios from 'axios';
import qs from 'qs';
import { visualizationConstants } from '../constants/visualization.constants'
//import { documentActions } from '.'
import Ajax from '../utilities/Ajax';
import RequestPayload from '../utilities/RequestPayload';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {optionValues} from '../components/ChartHeader';
import {dataValues} from '../components/TimeSeriesChartHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

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
  getCropHistory,
  updateFieldTableHeader,
  getNearestMeteoStation,
  getSelectedFieldMeteoStation,
  setDateRange,
  setDateRangeOpen,
  setFieldDataDropdownValue,
  updateFieldDataDropdownValue,
  getSelectedFieldData,
  getNDVIFieldData,
  reloadRelatedFieldDataProperties,
  reloadRelatedNDVIDataProperties,
  getNDVIFieldDataProperties,
  getSelectedFieldDataProperties,
  setWeatherPropertiesDropdownValue,
  setWeatherPropertiesDropdownText,
  reloadRelatedFieldData,
  setNdviPropertiesDropdownValue,
  setNdviPropertiesDropdownText,
  cleanRelatedFieldData,
  setFieldDataSubComponent,
  updateSoilTableHeader,
  reloadSelectedLayerSoilData,
  loadRelatedData,
  shouldDisableibableFetchData,
  setWorkspaceUsername,
  setWorkspaceToken,
  requestWorkspaceListing,
  setWorkspaceParentDirDetails,
  setWorkspaceDashboardDirDetails,
  getDashboardFolder,
  createDashboardFolder,
  getDashboardFolderListing,
  setWorkspaceListing,
  showSaveToWorkspace,
  showOpenFromWorkspace,
  setFilenameForWorkspace,
  saveNewFileToWorkspace,
  openDashboardFile,
  loadDashboardFile,
  setDataToState,
  setVisualizationToState,
  setFiltersToState
}

/*
 * action creators
 */
const defaultHeader = {
  columns: [
    {
      Header: "Field Property",
      accessor: "key"
    },
    {
      Header: "Value",
      accessor: "value"
    }
  ]
}
const options = {
  title: '',
  message: 'No fields found for the specified region',
  buttons: [
    {
      label: 'Close'
    }
  ]
}

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

function requestWorkspaceListing() {
  return function (dispatch, getState) {
    let gcube_token = "gcube-token=" + getState().data.workspaceDetails.workspaceToken;
    var resourceUrl = Ajax.buildWorkspaceUrl("",gcube_token);
    return axios.get(resourceUrl)
      .then(response => {
        console.log("requestWorkspaceListing: " + response);
        dispatch(setWorkspaceParentDirDetails(response.data))
        dispatch(getDashboardFolder());
      })
      .catch(response => {
        alert(response);
      });
  }
}


function parseWorkspaceListing(data){

  return function (dispatch, getState) {
  console.log(data);

  let files = [];
  for(let i=0; i< data.length; i++){
    let details = data[i];
    console.log(details);
    let file = {key: details.name, modified: details.lastModificationTime, size: details.content.size, id: details.id  }
    files.push(file);

  }
  console.log(files);
  dispatch(setWorkspaceListing(files));
  }
}




function getDashboardFolder() {
  return function (dispatch, getState) {
    let parameters = "gcube-token=" + getState().data.workspaceDetails.workspaceToken;
    var resourceUrl = Ajax.buildWorkspaceUrl(Ajax.WORKSPACE_ITEMS + "/" + getState().data.workspaceDetails.workspaceParentDirDetails.item.id + "/items/" + visualizationConstants.DASHBOARD_DIR, parameters);
    console.log("getDashboardFolder: resource url --> " + resourceUrl);
    return axios.get(resourceUrl)
      .then(response => {
        console.log("getDashboardFolder: " + response.data.itemlist);

        if(response.data.itemlist.length === 0){
          console.log("getDashboardFolder:  in create " + response.data.itemlist);

          dispatch(createDashboardFolder());
        }
        else{
          console.log("getDashboardFolder:  already created " + response.data.itemlist);

          dispatch(setWorkspaceDashboardDirDetails(response.data.itemlist[0]))
          dispatch(getDashboardFolderListing());  
        }
      })
      .catch(response => {
        console.log("getDashboardFolder:  in exception!!! " + response);

        alert(response);
      });
  }
}

function getDashboardFolderListing() {
  return function (dispatch, getState) {
    let parameters = "gcube-token=" + getState().data.workspaceDetails.workspaceToken;
    var resourceUrl = Ajax.buildWorkspaceUrl(Ajax.WORKSPACE_ITEMS + "/" + getState().data.workspaceDetails.workspaceDashboardDirDetails.id + "/children", parameters);
    console.log("print in avtions: " + resourceUrl);
    return axios.get(resourceUrl)
      .then(response => {
        console.log(response.data.itemlist)
       
        dispatch(parseWorkspaceListing(response.data.itemlist));
      })
      .catch(response => {
        alert(response);
      });
  }
}

function createDashboardFolder() {
  return function (dispatch, getState) {

    let parameters = "gcube-token=" + getState().data.workspaceDetails.workspaceToken;

    var resourceUrl = Ajax.buildWorkspaceUrl(Ajax.WORKSPACE_ITEMS + "/" + getState().data.workspaceDetails.workspaceParentDirDetails.item.id + "/create/FOLDER", parameters);

    const data = qs.stringify({
      name: visualizationConstants.DASHBOARD_DIR,
      description: visualizationConstants.DASHBOARD_DIR,
      hidden: false
      });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    console.log("createDashboardFolder: " + resourceUrl);

    return axios.post(resourceUrl,data,headers)
      .then(response => { 
        dispatch(getDashboardFolder());
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

function updateFieldTableHeader(header) {
  return { type: visualizationConstants.UPDATE_FIELD_TABLE_HEADER, header };
}

function updateSoilTableHeader(header) {
  return { type: visualizationConstants.UPDATE_FIELD_TABLE_HEADER, header };
}

function updateCurrentZoomLevel(zoomlevel) {
  return { type: visualizationConstants.UPDATE_CURRENT_ZOOM_LEVEL, zoomlevel };
}

function showSaveToWorkspace(showSaveToWorkspace) {
  return { type: visualizationConstants.SET_SAVE_OPEN_TO_WORKSPACE, showSaveToWorkspace };
}

function showOpenFromWorkspace(showOpenFromWorkspace) {
  return { type: visualizationConstants.SET_SHOW_OPEN_FROM_WORKSPACE, showOpenFromWorkspace };
}

function setFilenameForWorkspace(filename) {
  return { type: visualizationConstants.SET_FILENAME_FOR_WORKSPACE, filename };
}

function saveNewFileToWorkspace() {
  
  return function (dispatch, getState) {

    let parameters = "gcube-token=" + getState().data.workspaceDetails.workspaceToken;
    var resourceUrl = Ajax.buildWorkspaceUrl(Ajax.WORKSPACE_ITEMS + "/" + getState().data.workspaceDetails.workspaceDashboardDirDetails.id + "/create/FILE", parameters);
    let state = getState();
   
    let json = JSON.parse(state.data.map.json);
    let features = json["features"];
    let arr = [];

    Object.keys(features).forEach(function(key) {
      let feature = features[key].properties;
      if(features[key].properties.color !== undefined){
        delete features[key].properties.color;
        console.log(features[key].properties);

      }
      arr.push(features[key]);


    });

    console.log(arr);
    json["features"] = arr;
    state.data.map.json = JSON.stringify(json);
    console.log(state.data.map.json);
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // }
  
    const headers = {
      'Content-Type': 'multipart/form-data'
    };

    const formData = new FormData();
    formData.append('name',getState().data.workspaceDetails.filename + ".json");
    formData.append('description',"");
    formData.append('file',JSON.stringify(state));
    
    return axios.post(resourceUrl,formData,headers)
      .then(response => { 
        console.log(response)
        dispatch(showSaveToWorkspace(false));

      })
      .catch(response => {
        alert(response);
    });
  }
}

function openDashboardFile(id) {
  return function (dispatch, getState) {

    let parameters = "gcube-token=" + getState().data.workspaceDetails.workspaceToken;

    var resourceUrl = Ajax.buildWorkspaceUrl(Ajax.WORKSPACE_ITEMS + "/" + id + "/publiclink", parameters);



    return axios.get(resourceUrl)
      .then(response => { 
        console.log(response);
        dispatch(loadDashboardFile(response.data));
      })
      .catch(response => {
        alert(response);
  });

  }
}

function loadDashboardFile(fileUrl){
  return function (dispatch, getState) {
    console.log(fileUrl);
    var params = new URLSearchParams();

    params.append("url", fileUrl);

    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/getWorkspaceFile', params);

  axios.get(resourceUrl)
      .then(response => { 
        dispatch(loadStateFromFile(response.data));
      })
      .catch(response => {
        alert(response);
  });



  }
}

function loadStateFromFile(file) {
  return function (dispatch, getState) {

    console.log(file);

   // const dateToFormat = '2018-12-31';
    const start = moment(file.data.weatherChartDetails.dateRange.start);
    const end = moment(file.data.weatherChartDetails.dateRange.end);

    let value = moment.range(start.clone(), end.clone());
    file.data.weatherChartDetails.dateRange = value;
    console.log(file.data);
    dispatch(setDataToState(file.data));

    //this.store.dispatch(visualizationActions.setDateRange(this.value));
    dispatch(setVisualizationToState(file.visualization));
    dispatch(showSaveToWorkspace(false));

  }
}

function setDataToState(data) {
  return { type: visualizationConstants.SET_DATA_TO_STATE, data };
}

function setVisualizationToState(visualization) {
  return { type: visualizationConstants.SET_VISUALIZATION_TO_STATE, visualization };
}

function setFiltersToState(filters) {
  return { type: visualizationConstants.SET_FILTERS_TO_STATE, filters }
};

function shouldDisableibableFetchData(zoom) {
  
  return function (dispatch, getState) {
    let state = getState();
    if(state.loadingBar.default === undefined || state.loadingBar.default === 0){
      if(state.visualization.disableFetchData === false || state.visualization.zoomLevel !== zoom ){
        if(zoom >=14 && zoom <=18){
          dispatch(updateDibableFetchData(false));
        }
        else{
          dispatch(updateDibableFetchData(true));
        }
      }
    }
  }
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

function setFieldDataDropdownValue(selected) {
  return { type: visualizationConstants.SET_FIELD_DATA_DROPDOWN, selected };
}

function setDateRange(dateRange) {
  return { type: visualizationConstants.SET_DATE_RANGE, dateRange };
}

function setWeatherPropertiesDropdownValue(selected) {
  return { type: visualizationConstants.SET_WEATHER_PROPERTIES_DROPDOWN, selected };
}

function setWeatherPropertiesDropdownText(selected) {
  return { type: visualizationConstants.SET_WEATHER_PROPERTIES_DROPDOWN_TEXT, selected };
}

function setNdviPropertiesDropdownValue(selected) {
  return { type: visualizationConstants.SET_NDVI_PROPERTIES_DROPDOWN, selected };
}

function setNdviPropertiesDropdownText(selected) {
  return { type: visualizationConstants.SET_NDVI_PROPERTIES_DROPDOWN_TEXT, selected };
}

function setDateRangeOpen(isOpen) {
  return { type: visualizationConstants.SET_DATE_RANGE_OPEN, isOpen };
}

function updateFieldDetailsDropdownValue(selected) {
  return function (dispatch, getState) {

    dispatch(showLoading());
    switch (selected){
      case optionValues.field:{
        dispatch(setFieldDetailsDropdownValue(selected))
        dispatch(getSelectedFieldDetails(getState().visualization.selectedLayer));
        return dispatch(hideLoading());
      }
      case optionValues.altitude:{
        dispatch(setFieldDetailsDropdownValue(selected))
        dispatch(getSelectedFieldAltitudeData(getState().visualization.selectedLayer));
        return dispatch(hideLoading());
      }
      case optionValues.soil:{
        dispatch(setFieldDetailsDropdownValue(selected))
        dispatch(getSelectedFieldSoilInformation(getState().visualization.selectedLayer));
        return dispatch(hideLoading());
      }
      case optionValues.crop:{
        dispatch(setFieldDetailsDropdownValue(selected))
        dispatch(getCropHistory());
        return dispatch(hideLoading());

      }
      default:{
        dispatch(setFieldDetailsDropdownValue(''));
        return dispatch(hideLoading());
         
      }
    }
   }
}

function updateFieldDataDropdownValue(selected) {
  return function (dispatch, getState) {

    dispatch(showLoading());
    switch (selected){
      case dataValues.weather:{
        dispatch(getSelectedFieldDataProperties());
        dispatch(getSelectedFieldData(getState()));
     //   dispatch(setYaxisFieldDataLabel(getState().data.chart1.selectedFieldInYAxis));
        dispatch(hideLoading());
        return dispatch(setFieldDataDropdownValue(selected));
      }
      case dataValues.ndvi:{
        dispatch(getNDVIFieldDataProperties());
        dispatch(getNDVIFieldData());
   //     dispatch(setYaxisFieldDataLabel(getState().data.chart1.selectedNDVIFieldInYAxis));
        dispatch(hideLoading());
        return dispatch(setFieldDataDropdownValue(selected));
      }
      default:{
        dispatch(hideLoading());
        return dispatch(setFieldDataDropdownValue(''));
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
    dispatch(visualizationActions.updateDibableFetchData(true));
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/get');
    dispatch(showLoading());

    let data = RequestPayload.buildMapRequestPayload(getState());

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {

      dispatch(reloadData(response.data));
      dispatch(visualizationActions.updateDibableFetchData(false));
      dispatch(hideLoading());

      if(response.data.features.length === 0){
          confirmAlert(options);
      }
      else if(response.data.features[0].geometry.coordinates === undefined)
        confirmAlert(options);
        
      
    })
    .catch(response => {
      dispatch(visualizationActions.updateDibableFetchData(false));
      dispatch(hideLoading());
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

        let header = {
          columns: [
            {
              Header: "Year",
              accessor: "year"
            },
            {
              Header: "Crop Code",
              accessor: "crop_code"
            },
            {
              Header: "Crop name",
              accessor: "crop_name"
            },
            {
              Header: "Field id",
              accessor: "fieldid"
            },
            {
              Header: "Area",
              accessor: "area"
            },
            {
              Header: "Perimeter",
              accessor: "perimeter"
            }
          ]
        }
        dispatch(updateFieldTableHeader(header));
        dispatch(reloadSelectedLayer(response.data));
        dispatch(reloadSelectedLayerSoilData([]));

      dispatch(hideLoading());
    })
    .catch(response => {
      alert(response);
  });
}
}

function setWorkspaceUsername(username) {
  return { type: visualizationConstants.SET_WORKSPACE_USERNAME, username };
}

function setWorkspaceToken(token) {
  return { type: visualizationConstants.SET_WORKSPACE_TOKEN, token };
}

function setWorkspaceParentDirDetails(workspaceParentDirDetails) {
  return { type: visualizationConstants.SET_WORKSPACE_PARENT_DIR_DETAILS, workspaceParentDirDetails };
}

function setWorkspaceDashboardDirDetails(workspaceDashboardDirDetails) {
  return { type: visualizationConstants.SET_WORKSPACE_DASHBOARD_DIR_DETAILS, workspaceDashboardDirDetails };
}

function reloadData(data) {
  return { type: visualizationConstants.RELOAD_DATA, data };
}

function setFieldDataSubComponent(subComponent) {
  return { type: visualizationConstants.SET_FIELD_DATA_SUBCOMPONENT, subComponent };
}

function reloadRelatedFieldData(chart1) {
  return { type: visualizationConstants.SET_RELEATED_DATA, chart1 };
}

function cleanRelatedFieldData(){
  return function (dispatch, getState) 
  {
    let chart1 =  Object.assign({}, getState().data.chart1);
    chart1.timeSeries = null;
    chart1.xAxisLabel = "";
    chart1.yAxisLabel = "";
    dispatch(reloadRelatedFieldData(chart1));
  }
}

function loadRelatedData(feature){
  return function (dispatch, getState) 
  {
    let fieldDetails =  Object.assign({}, getState().visualization.fieldDetails);
    console.log(fieldDetails);
    if(fieldDetails.selected === ""){
      dispatch(visualizationActions.setFieldDetailsDropdownValue(1));
      dispatch(visualizationActions.getSelectedFieldDetails(feature));
      dispatch(visualizationActions.updateFieldDataDropdownValue(1));
      

    }
    else{
      // dispatch(visualizationActions.setFieldDetailsDropdownValue(fieldDetails.selected));
      // dispatch(visualizationActions.getSelectedFieldDetails(feature));
      dispatch(visualizationActions.updateFieldDetailsDropdownValue(fieldDetails.selected));
      dispatch(visualizationActions.updateFieldDataDropdownValue(fieldDetails.selectedFieldData));

      
    //  dispatch(visualizationActions.getSelectedFieldMeteoStation(feature));
    }
  }
}

// function setXaxisFieldDataLabel(xAxisLabel) {
//   return { type: visualizationConstants.SET_FIELD_DATA_X_AXIS_LABEL, xAxisLabel };
// }

// function setYaxisFieldDataLabel(yAxisLabel) {
//   return { type: visualizationConstants.SET_FIELD_DATA_Y_AXIS_LABEL, yAxisLabel };
// }

function setWorkspaceListing(workspaceFiles) {
  return { type: visualizationConstants.SET_WORKSPACE_FILE_LISTING, workspaceFiles };
}

function reloadRelatedFieldDataProperties(fieldDataProperties) {
  return { type: visualizationConstants.SET_FIELD_DATA_PROPERTIES, fieldDataProperties };
}

function reloadRelatedNDVIDataProperties(ndviDataProperties) {
  return { type: visualizationConstants.SET_NDVI_DATA_PROPERTIES, ndviDataProperties };
}

function reloadSelectedLayer(data) {
  return { type: visualizationConstants.SELECTED_LAYER_FIELD_DETAILS, data };
}
function reloadSelectedLayerSoilData(data) {
  return { type: visualizationConstants.SELECTED_LAYER_FIELD_SOIL_DETAILS, data };
}

function getNearestMeteoStation(meteostation) {
  return { type: visualizationConstants.GET_NEAREST_METEOSTATION, meteostation };
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
        dispatch(updateFieldTableHeader(defaultHeader));
      dispatch(reloadSelectedLayer(response.data));
      dispatch(reloadSelectedLayerSoilData([]));

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
        dispatch(updateFieldTableHeader(defaultHeader));

      dispatch(reloadSelectedLayer(response.data))
      dispatch(reloadSelectedLayerSoilData([]));

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
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/soil/' + selectedLayer.properties.fieldid + "/soiltypes");
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
      
      dispatch(reloadSelectedLayerSoilData(response.data))
      dispatch(reloadSelectedLayer([]));

    })
    .catch(response => {
      alert(response);
    });
  }
}

function getSelectedFieldMeteoStation(selectedLayer){

  return function (dispatch, getState) 
  {
  //  let selectedLayer = selectedLayer;getState().visualization.selectedLayer;
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/meteostation/' + selectedLayer.properties.fieldid);
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
      dispatch(getNearestMeteoStation(response.data));
      dispatch(loadRelatedData(selectedLayer))

    })
    .catch(response => {
      alert(response);
    });
  }
}

function getSelectedFieldData(){

  return function (dispatch, getState) 
  {
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/meteodata/' + getState().data.chart1Properties.selectedFieldInYAxis);
    let data = RequestPayload.buildMeteoRequestPayload(getState());

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
        let chart1 =  Object.assign({}, getState().data.chart1);
        chart1.timeSeries = response.data;
        chart1.xAxisLabel = "Date";
        chart1.yAxisLabel = getState().data.chart1Properties.selectedFieldInYAxis;
        dispatch(reloadRelatedFieldData(chart1));
    })
    .catch(response => {
      alert(response);
    });
  }
}

function getSelectedFieldDataProperties(){

  return function (dispatch, getState) 
  {
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/meteodata/properties');
    let data = RequestPayload.buildMeteoRequestPayload(getState());

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
            dispatch(reloadRelatedFieldDataProperties(response.data));
    })
    .catch(response => {
      alert(response);
    });
  }
}

function getNDVIFieldData(){

  return function (dispatch, getState) 
  {
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/ndvi/' + getState().visualization.selectedLayer.properties.fieldid + "/" +  getState().data.chart1Properties.selectedNDVIFieldInYAxis);
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {

        let chart1 =  Object.assign({}, getState().data.chart1);
        chart1.timeSeries = response.data;
        chart1.xAxisLabel = "Date";
        chart1.yAxisLabel = getState().data.chart1Properties.selectedNDVIFieldInYAxis;
        dispatch(reloadRelatedFieldData(chart1));
      })
    .catch(response => {
      alert(response);
    });
  }
}

function getNDVIFieldDataProperties(){

  return function (dispatch, getState) 
  {
    var resourceUrl = Ajax.buildUrl(Ajax.DASHBOARD_BASE_PATH + '/ndvi/properties/' + getState().visualization.selectedLayer.properties.fieldid);
    let data = RequestPayload.simpleRequestPayload();

    return axios.post(resourceUrl, data, {
      headers: {
          'Content-Type': 'application/json',
      }}).then(response => {
        dispatch(reloadRelatedNDVIDataProperties(response.data));

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

