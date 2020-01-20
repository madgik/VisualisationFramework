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
  getPropertyValues,
  //OTHERS
  getPropertiesValues,
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
  setNode,
  setPropertyValues,
  setIsStatic,
  setQuery
}

/*
 * action creators
 */

function getTopNodes(graphId, num) {
  return function (dispatch) {
    dispatch(showLoading());
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_GRAPHS_PATH + "/" + graphId, "number=" + num);
    if (num === undefined || num === null) {
      num = 5;
    }
    return axios.get(resourceUrl)
      .then(response => {
        //  console.log(response.data);
        dispatch(loadGraph(response.data));
        var topNodes = {
          nodes: response.data.nodes.slice(0),
          links: response.data.links.slice(0)
        }        
        if (topNodes.node != undefined && topNodes.nodes[0].x == undefined){
          dispatch(setIsStatic(false));
        }
        dispatch(setTopNodes(topNodes));
        dispatch(hideLoading());
        dispatch(getPropertiesValues(topNodes, graphId));

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

function getFilteredGraph(query, graphId, nodesNumber) {
  return function (dispatch) {
    var queryParams = new URLSearchParams();

    for (var i in query) {
      queryParams.append(i, query[i]);
    }
    queryParams.append("nodesNumber", nodesNumber)
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + '/' + Ajax.NETWORK_GRAPH_FILTERED_PATH + "/" + graphId, queryParams);
    return axios.get(resourceUrl, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      // console.log("response" + JSON.stringify(response.data));

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

function getPropertyValues(name, graphId) {
  return function (dispatch) {
    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + '/' + Ajax.NETWORK_GRAPH_PROPERTIES + "/" + graphId, "property="+name);
    return axios.get(resourceUrl, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      dispatch(setPropertyValues({[name]: response.data}));
    });
  }
}

function getPropertiesValues(topNodes, graphId) {
  return function (dispatch) {
    // console.log(topNodes.nodes);
    if (topNodes.nodes[0] != undefined) {
      for (var key in topNodes.nodes[0]) {
        if (isNaN(topNodes.nodes[0][key]) && key != "id") {
          // console.log(topNodes.nodes[0][key])
          dispatch(getPropertyValues(key, graphId));
        }
      }
    }
  }
}

/* OTHERS */
function addGraphData(newData, graphData, showOldNodes, topNodes) {
  return function (dispatch) {
    var newGraphDataNodes = mergeJson(newData.nodes, graphData.nodes);//mergeDeep(newData.nodes, graphData.nodes);
    // console.log("new String:" + JSON.stringify(newData.nodes));

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

    var nodesIds = [];
    graphData.nodes.forEach(element => {
      nodesIds.push(element.id);
    });

    var data = {
      nodes: nodesIds,
      date: dateReq
    }

    var resourceUrl = Ajax.buildUrl(Ajax.NETWORK_GRAPH_BASE_PATH + "/" + Ajax.NETWORK_GRAPH_DATE_PATH + "/" + graphId);

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

function setPropertyValues(propertyValues) {
  return { type: controlGraphConstants.SET_PROPERTY_VALUES, propertyValues };
}

function setIsStatic(isStatic) {
  return { type: controlGraphConstants.SET_IS_STATIC, isStatic };
}

function setQuery(query) {
  return { type: controlGraphConstants.SET_QUERY, query };
}

function mergeJson(obj1, obj2) {
  return Object.values(obj1.concat(obj2).reduce((r, o) => {
    r[o.id] = o;
    return r;
  }, {}));
}

