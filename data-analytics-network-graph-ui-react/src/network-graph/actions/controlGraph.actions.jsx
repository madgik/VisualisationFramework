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
  getAllTimestamps,
  //OTHERS
  addGraphData,
  deleteGraphLinks,
  //SETTERS
  setSelectedNode,
  setSelectedLink,
  setGraphData,
  setGraphNodes,
  setGraphLinks,
  setPrevGraphStateData,
  setPrevGraphStateNodes,
  setPrevGraphStateLinks,
  setCurrentDate,
  setPaused,
  setStopped,
  setSelectedWeight,
  setGraph,
  setSliderValue,
  setPausedPromise,
  setTimestamps

}

/*
 * action creators
 */

function getTopNodes(graphId, num) {
  return function (dispatch) {
    dispatch(showLoading());
    // var params = {
    //   number: num
    // }
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_GRAPHS_PATH + "/" + graphId, "number="+num);
    if(num === undefined || num === null) {
      num = 5;
    }
    return axios.get(resourceUrl)
      .then(response => {
        // console.log(response.data);
        dispatch(loadGraph(response.data));
        dispatch(hideLoading());
        return response
      }).then(response => {
        setTimeout(function () {
          dispatch(deleteGraphLinks());
        }, 1000);
      })
      .catch(response => {
        alert(response);
      });
  }
}
function getNeighbors(graphId, nodeId, graphData) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_NEIGHBORS + "/" + graphId + "/" + nodeId + "");
    return axios.get(resourceUrl)
      .then(response => {
        dispatch(addGraphData(response.data, graphData))
      })
      .catch(response => {
        // alert(response);
      });
  }
}


function getAllTimestamps(graphId) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH +'/'+Ajax.NETWORK_GRAPH_TIMESTAMPS_PATH + "/" + graphId);
    return axios.get(resourceUrl, {
      headers: { 
        'content-type': 'application/json'
       }
    }).then(response => {
      // var times = response.data[0].split(',');
      dispatch(setTimestamps(response.data));
      dispatch(setCurrentDate(response.data[0]));
    }).catch(_ => { });
  }
}

/* OTHERS */
function addGraphData(newData, graphData) {
  return function (dispatch) {
    
    // console.log("Old String:" + JSON.stringify(graphData.links));

    var newGraphDataNodes = mergeJson(newData.nodes, graphData.nodes);//mergeDeep(newData.nodes, graphData.nodes);

    graphData.links = newData.links;
    graphData.nodes = newGraphDataNodes
    dispatch(loadGraph(graphData));
  }
}


function getDateGraph(date, graphData, graphId) {
  return function (dispatch) {
    var nodeIds = '';
    // var nodeIds = [];
    graphData.nodes.forEach(element => {
      // nodeIds.push(element.id)
       nodeIds +="nodes[]="+element.id +",";
    });

    // var params =   
    //  {
    //   nodeIds,
    //   date: date
    // }
    var params =nodeIds + "date="+date;
    //  params = Ajax.buildUrlParameters(params);
    //FOR PRODUCTION PORTLET PARAMETERS
    // , JSON.stringify(params)  // , params
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_DATE_PATH + "/" + graphId );
  //  console.log(resourceUrl);
    // console.log("get string:" + JSON.stringify(nodeIds))
    // ,{params:{nodes: nodeIds,date: date}}
    return axios.get(resourceUrl,{params:{nodes: nodeIds,date: date}})
      .then(response => {

        dispatch(addGraphData(response.data, graphData))
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
    for (var i = index; i < DateUtils.dates.length; i++) {
      if (paused != true) {
        setInterval(function () {
          dispatch(getDateGraph(DateUtils.dates[index], graphData, graphId));
        }, 3000);

      }
      else {
        return;
      }

    }
  }
}
/* SET GRAPH DATA */


function setPausedPromise(paused) {
  return function (dispatch) {
     return new Promise(() => dispatch(setPaused(paused)));
  }
}

function setSelectedNode(nodeId) {
  return { type: controlGraphConstants.SET_SELECTED_NODE, nodeId };
}


function loadGraph(graphData) {
  return function (dispatch) {
    dispatch(setGraphLinks([]));
    let newNodes = graphData.nodes.slice(0);
    dispatch(setGraphNodes(newNodes));
    let newLinks = graphData.links.slice(0);
    dispatch(setGraphLinks(newLinks));
    // console.log("GRAPH:" + JSON.stringify(graphData));
  }
}

function deleteGraphLinks() {
  return function (dispatch) {
    dispatch(setGraphLinks([]));
  }
}

function setGraphData(graphData) {
  return { type: controlGraphConstants.SET_GRAPH_DATA, graphData };
}
function setGraph(graph) {
  return { type: controlGraphConstants.SET_GRAPH, graph };
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

function setStopped(stopped) {
  return { type: controlGraphConstants.SET_STOPPED, stopped };
}

function setSelectedWeight(weight) {
  return { type: controlGraphConstants.SET_SELECTED_WEIGHT, weight };
}

function setSelectedLink(selectedLink) {
  return { type: controlGraphConstants.SET_SELECTED_LINK, selectedLink };
}

function setSliderValue(sliderValue) {
  return { type: controlGraphConstants.SET_SLIDER_VALUE, sliderValue };
}


function setTimestamps(timestamps) {
  return { type: controlGraphConstants.SET_TIMESTAMPS, timestamps };
}

function mergeDeep(o1, o2) {
  var tempNewObj = o1;
  var key, value, index;
  if (o1.length === undefined && typeof o1 !== "number") {
    for (key in o2) {
      value = o2[key]
      if (o1[key] === undefined) {
        tempNewObj[key] = value;
      } else {
        tempNewObj[key] = mergeDeep(o1[key], o2[key]);
      }
    }
  }

  //else if o1 is an array - []    I THINK I BROKE IT ._.
  else if (o1.length > 0 && typeof o1 !== "string") {
    for (index in o2) {
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


function mergeJson(obj1, obj2) {
  return Object.values(obj1.concat(obj2).reduce((r, o) => {
    r[o.id] = o;
    return r;
  }, {}));
}
