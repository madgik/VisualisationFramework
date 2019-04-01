import axios from 'axios';
import { controlGraphConstants } from '../constants'
import Ajax from '../utilities/Ajax';
import DateUtils from '../utilities/DateUtils';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { func, node } from 'prop-types';


export const controlGraphActions = {
  //API CALLS
  getTopNodes,
  loadGraph,
  getNeighbors,
  getDateGraph,
  playTimeGraph,
  //OTHERS
  addGraphData,
  deleteGraphLinks,
  //SETTERS
  setSelectedNode,
  setGraphData,
  setGraphNodes,
  setGraphLinks,
  setPrevGraphStateData,
  setPrevGraphStateNodes,
  setPrevGraphStateLinks,
  setCurrentDate,
  setPaused,
  setSelectedWeight
}

/*
 * action creators
 */

function getTopNodes(graphId, num) {
  return function (dispatch) {
    dispatch(showLoading());
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_GRAPHS_PATH + "/" + graphId);

    return axios.get(resourceUrl, {
      params: {
        number: num
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch(loadGraph(response.data));
        dispatch(hideLoading());
        return response
      }).then(response=>{
        setTimeout(function(){
          dispatch(deleteGraphLinks(response.data));
        }, 2000);
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
    var newGraphDataNodes= mergeDeep(graphData.nodes, data.nodes);
    graphData.links= data.links;
    graphData.nodes= newGraphDataNodes
    dispatch(loadGraph(graphData));
  }
}


function getDateGraph(date, graphData, graphId) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_DATE_PATH + "/" + graphId);
    var nodeIds=[];
    graphData.nodes.forEach(element => {
      nodeIds.push(element.id)
    });
    console.log("get string:"+JSON.stringify(nodeIds))
    return axios.get(resourceUrl, {
      params: {
        nodes: nodeIds,
        date: date
      }
    })
      .then(response => {
        // dispatch(loadGraph(response.data));

        dispatch(addGraphData(response.data,graphData))
        dispatch(setCurrentDate(date))
      })
      .catch(response => {
        alert(response);
      });
  }
}

function playTimeGraph(date, graphData, graphId, paused) {
  return function (dispatch) {
    var index = DateUtils.dates.indexOf(date);
      if(paused != true){
        
        var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_DATE_PATH + "/" + graphId);
        var nodeIds=[];
        graphData.nodes.forEach(element => {
          nodeIds.push(element.id)
        });
        console.log("get string:"+JSON.stringify(nodeIds))
        return axios.get(resourceUrl, {
          params: {
            nodes: nodeIds,
            date: date
          }
        })
          .then(response => {
            // dispatch(loadGraph(response.data));
    
            dispatch(addGraphData(response.data,graphData))
            dispatch(setCurrentDate(date))
            var nextDate=DateUtils.getNextDate(this.props.currentDate);
            setInterval(function(){
              dispatch( getDateGraph(nextDate, graphData, graphId));
            }, 3000);

          })
          .catch(response => {
            alert(response);
          });
    }
  }
}
/* SET GRAPH DATA */


function setSelectedNode(nodeId) {
  return { type: controlGraphConstants.SET_SELECTED_NODE, nodeId };
}


function loadGraph(graphData) {
  return function (dispatch) {
    console.log("-"+graphData.nodes)
    // if(graphData.nodes != ''){
      dispatch(setGraphData(graphData));
      dispatch(setGraphLinks(graphData.links));
      dispatch(setGraphNodes(graphData.nodes));
    // }
  
  }
}

function deleteGraphLinks(graphData) {
  return function (dispatch) {
    
    graphData.links = [];
    dispatch(setGraphData(graphData));
    dispatch(setGraphLinks([]));
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

function setCurrentDate(date) {
  return { type: controlGraphConstants.SET_CURRENT_DATE, date };
}

function setPaused(paused) {
  return { type: controlGraphConstants.SET_PAUSED, paused };
}

function setSelectedWeight(weight) {
  return { type: controlGraphConstants.SET_SELECTED_WEIGHT, weight };
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