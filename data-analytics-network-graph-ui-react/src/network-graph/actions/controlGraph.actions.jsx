import axios from 'axios';
import { controlGraphConstants } from '../constants'
import Ajax from '../utilities/Ajax';
import DateUtils from '../utilities/DateUtils';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { func, node } from 'prop-types';
import { configGraphActions } from './'



export const controlGraphActions = {
  //API CALLS
  getTopNodes,
  loadGraph,
  getNeighbors,
  getDateGraph,
  getAllTimestamps,
  getFilteredGraph,
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
  setTimestamps,
  setShowOldNodes,
  setTimestampFrom,
  setTimestampTo,
  setFilteredTimestamps,
  setPropModalIsOpen,
  setRecord,
  setAvailRecord,
  setNode
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
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_GRAPHS_PATH + "/" + graphId, "number=" + num);
    if (num === undefined || num === null) {
      num = 5;
    }
    return axios.get(resourceUrl)
      .then(response => {
        // console.log(response.data);
        dispatch(loadGraph(response.data));
        var topNodes = {
          nodes: response.data.nodes.slice(0),
          links: response.data.links.slice(0)
        }
        dispatch(setTopNodes(topNodes));
        dispatch(hideLoading());
        dispatch(configGraphActions.setOpenSidebar(true))
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

function getNeighbors(graphId, nodeId, graphData, topNodes) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_NEIGHBORS + "/" + graphId + "/" + nodeId + "");
    return axios.get(resourceUrl)
      .then(response => {
        dispatch(addGraphData(response.data, graphData, true, topNodes))
      })
      .catch(response => {
        // alert(response);
      });
  }
}

function getAllTimestamps(graphId) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + '/' + Ajax.NETWORK_GRAPH_TIMESTAMPS_PATH + "/" + graphId);
    return axios.get(resourceUrl, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      // var times = response.data[0].split(',');
      dispatch(setTimestamps(response.data));
      dispatch(setCurrentDate(response.data[0]));
      dispatch(setTimestampFrom(response.data[0]));
      dispatch(setTimestampTo(response.data[response.data.length - 1]))
      dispatch(setPlayerTimestamps(response.data));
    }).catch(_ => { });
  }
}

function setFilteredTimestamps(timestamps, timestampFrom, timestampTo) {
  return function (dispatch) {
    var playerTimestamps = timestamps.slice(timestamps.indexOf(timestampFrom), timestamps.indexOf(timestampTo));
    dispatch(setCurrentDate(playerTimestamps[0]));
    dispatch(setPlayerTimestamps(playerTimestamps));
  }

}

function getFilteredGraph(query, graphId) {
  return function (dispatch) {
    var queryParams = new URLSearchParams();

    for (var i in query) {
      queryParams.append(i, query[i]);

    }
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + '/' + Ajax.NETWORK_GRAPH_FILTERED_PATH + "/" + graphId, queryParams);
    return axios.get(resourceUrl, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      console.log("response" + JSON.stringify(response.data));

      dispatch(loadGraph(response.data));

      dispatch(hideLoading());
      dispatch(configGraphActions.setOpenSidebar(true))
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

/* OTHERS */
function addGraphData(newData, graphData, showOldNodes, topNodes) {
  return function (dispatch) {

    // console.log("Old String:" + JSON.stringify(graphData.links));

    var newGraphDataNodes = mergeJson(newData.nodes, graphData.nodes);//mergeDeep(newData.nodes, graphData.nodes);

    graphData.links = newData.links;
    if (showOldNodes) {
      graphData.nodes = newGraphDataNodes;
    }
    else if (showOldNodes == false && newData.nodes.length > 0) {
      graphData.nodes = newData.nodes;
    }
    else {
      graphData.nodes = topNodes.nodes;
      graphData.links = topNodes.links;
    }
    dispatch(loadGraph(graphData));
  }
}


function getDateGraph(dateReq, graphData, graphId, showOldNodes, topNodes) {
  return function (dispatch) {
    // var nodeIds = new URLSearchParams();

    var nodesIds = [];
    graphData.nodes.forEach(element => {
      nodesIds.push(element.id);
    });
    // nodeIds.append("date", date);

    var data = {
      nodes: nodesIds,
      date: dateReq
    }

    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_DATE_PATH + "/" + graphId);
    console.log(resourceUrl);
  
    console.log("TOP:" + showOldNodes + topNodes);

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    return axios.post(resourceUrl, data, axiosConfig)
      .then(response => {

        dispatch(addGraphData(response.data, graphData, showOldNodes, topNodes))
        dispatch(setCurrentDate(dateReq))
      })
      .catch(response => {
        alert(response);
      });
  }
}

// function playTimeGraph(date, graphData, graphId, paused) {
//   return function (dispatch) {
//     var index = DateUtils.dates.indexOf(date);
//     for (var i = index; i < DateUtils.dates.length; i++) {
//       if (paused != true) {
//         setInterval(function () {
//           dispatch(getDateGraph(DateUtils.dates[index], graphData, graphId));
//         }, 3000);

//       }
//       else {
//         return;
//       }

//     }
//   }
// }
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

function setTopNodes(topNodes) {
  return { type: controlGraphConstants.SET_TOP_NODES, topNodes };
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

function setPlayerTimestamps(playerTimestamps) {
  return { type: controlGraphConstants.SET_PLAYER_TIMESTAMPS, playerTimestamps };
}

function setShowOldNodes(showOldNodes) {
  return { type: controlGraphConstants.SET_SHOW_OLD_NODES, showOldNodes };
}

function setTimestampFrom(timestampFrom) {
  return { type: controlGraphConstants.SET_TIMESTAMP_FROM, timestampFrom };
}

function setTimestampTo(timestampTo) {
  return { type: controlGraphConstants.SET_TIMESTAMP_TO, timestampTo };
}

function setPropModalIsOpen(propModalIsOpen) {
  return { type: controlGraphConstants.SET_PROP_MODAL_IS_OPEN, propModalIsOpen };
}

function setRecord(record) {
  return { type: controlGraphConstants.SET_RECORD, record };
}

function setAvailRecord(availRecord) {
  return { type: controlGraphConstants.SET_AVAIL_RECORD, availRecord };
}

function setNode(node) {
  return { type: controlGraphConstants.SET_NODE, node };
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

