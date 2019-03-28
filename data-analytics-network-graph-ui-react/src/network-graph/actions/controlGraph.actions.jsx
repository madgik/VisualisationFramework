import axios from 'axios';
import { controlGraphConstants } from '../constants'
import Ajax from '../utilities/Ajax';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { func } from 'prop-types';


export const controlGraphActions = {
  //API CALLS
  getTopNodes,
  requestGraphs,
  loadGraph,
  getNeighbors,
  //OTHERS
  addGraphData,
  //SETTERS
  setSelectedNode,
  setGraphData,
  setGraphNodes,
  setGraphLinks,
  setPrevGraphStateData,
  setPrevGraphStateNodes,
  setPrevGraphStateLinks
}

/*
 * action creators
 */

function getTopNodes(graphId, num) {
  return function (dispatch) {
    dispatch(showLoading());
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_GRAPHS_PATH + "/" + graphId);
    console.log("num is" + num)

    return axios.get(resourceUrl, {
      params: {
        number: num
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch(loadGraph(response.data));
        dispatch(hideLoading());

      })
      .catch(response => {
        alert(response);
      });
  }
}

function requestGraphs() {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH);
    return axios.get(resourceUrl)
      .then(response => {
        dispatch(loadGraph(response.data))
      })
      .catch(response => {
        alert(response);
      });
  }
}

function getNeighbors(graphId, nodeId, graphData){
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_NEIGHBORS+ "/" +graphId + "/" + nodeId+ "");
    return axios.get(resourceUrl)
      .then(response => {
        dispatch(addGraphData(response.data,graphData))
      })
      .catch(response => {
        // alert(response);
      });
  }
}

/* OTHERS */
function addGraphData(data,graphData) {
  return function (dispatch) {
    console.log("response:"+JSON.stringify(data));
    var newGraphData = mergeDeep(graphData, data);
    console.log("newGra:"+JSON.stringify(newGraphData))

    dispatch(loadGraph(newGraphData));
  }
}

function setSelectedNode(nodeId) {
  return { type: controlGraphConstants.SET_SELECTED_NODE, nodeId };
}


/* SET GRAPH DATA */

function loadGraph(graphData) {
  return function (dispatch) {
    // if(graphData.links != []) {
    //   dispatch(setLinkColor(graphData.links[0].color));
    // }

    dispatch(setGraphData(graphData));
    console.log("graph:"+graphData.nodes)
    dispatch(setGraphLinks(graphData.links));
    dispatch(setGraphNodes(graphData.nodes));

  }
}

function setGraphData(graphData) {
  return { type: controlGraphConstants.SET_GRAPH_DATA, graphData };
}

function setGraphLinks(links) {
  return { type: controlGraphConstants.SET_GRAPH_LINKS, links };
}

function setGraphNodes(nodes) {
  return { type: controlGraphConstants.SET_GRAPH_NODES, nodes };
}

function setLinkColor(color) {
  return { type: controlGraphConstants.SET_LINK_COLOR, color };
}


function setPrevGraphStateData(prevGraphData) {
  return { type: controlGraphConstants.SET_PREV_GRAPH_STATE_DATA, prevGraphData };
}

function setPrevGraphStateLinks(prevGraphLinks) {
  return { type: controlGraphConstants.SET_PREV_GRAPH_STATE_LINKS, prevGraphLinks };
}

function setPrevGraphStateNodes(prevGraphNodes) {
  return { type: controlGraphConstants.SET_PREV_GRAPH_STATE_NODES, prevGraphNodes };
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
  return { type: controlGraphConstants.CHANGE_VISUALIZATION, selected };
}


function resetGraph() {
  return { type: controlGraphConstants.RESET_VISUALIZATION };
}

function changeChartType(chartType) {
  return { type: controlGraphConstants.CHANGE_CHART_TYPE, chartType };
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
  return { type: controlGraphConstants.RELOAD_DATA, data };
}

function updateFilter(field, value) {
  return { type: controlGraphConstants.UPDATE_FILTER, field, value };
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




function mergeDeep (o1, o2) {
  var tempNewObj = o1;
  var key,value,index;
  //if o1 is an object - {}
  if (o1.length === undefined && typeof o1 !== "number") {
      for(key in o2) {
          value=o2[key]
          if (o1[key] === undefined) {
              tempNewObj[key] = value;
          } else {
              tempNewObj[key] = mergeDeep(o1[key], o2[key]);
          }
      }
  }

  //else if o1 is an array - []    I THINK I BROKE IT ._.
  else if (o1.length > 0 && typeof o1 !== "string") {
      for(index in o2) {
          if (JSON.stringify(o1).indexOf(JSON.stringify(o2[index])) === -1) {
              tempNewObj.push(o2[index]);
          }
      }
  }
  //handling other types like string or number
  else {
      //taking value from the second object o2
      //could be modified to keep o1 value with tempNewObj = o1;
      tempNewObj = o2;
  }
  return tempNewObj;
}