import update from 'immutability-helper'
import React from "react";
import { controlGraphConstants } from '../constants/controlGraph.constants'
import axios from 'axios';
import Ajax from '../utilities/Ajax';


const dataDefault = {
    type: '',
    tree: null,
    selectedNode: '',
    startingDate: '2012.01',
    lastDate: '2015.12',
    currentDate: '2012.01',
    selectedWeight:'',
    graph: {
        links: '',
        nodes: ''
    },
    linkColor: 'blue',
    prevGraphState: {
        links: '',
        nodes: ''
    },
    graphData: null,
    barChartData: null,
    timeSeries: [],
    filters: [],
    paused: false
}

export function controlGraph(state = dataDefault, action) {
    switch (action.type) {

        case controlGraphConstants.SET_GRAPH_DATA:
            return update(state, {
                graphData: {
                    $set: action.graphData
                }
            })
        case controlGraphConstants.SET_GRAPH_LINKS:
            return update(state, {
                graph: {
                    links: {
                        $set: action.links
                    }
                }
            })
        case controlGraphConstants.SET_GRAPH_NODES:
            return update(state, {
                graph: {
                    nodes: {
                        $set: action.nodes
                    }
                }
            })
        case controlGraphConstants.SET_LINK_COLOR:
            return update(state, {
                linkColor: {
                    $set: action.color
                }
            })
        case controlGraphConstants.SET_SELECTED_NODE:
            return update(state, {
                selectedNode: {
                    $set: action.nodeId
                }
            })
        case controlGraphConstants.SET_CURRENT_DATE:
            return update(state, {
                currentDate: {
                    $set: action.date
                }
            })
        case controlGraphConstants.SET_PAUSED:
            return update(state, {
                paused: {
                    $set: action.paused
                }
            })
        case controlGraphConstants.SET_SELECTED_WEIGHT:
            return update(state, {
                selectedWeight: {
                    $set: action.weight
                }
            })
        //   case visualizationConstants.CHANGE_TIME:
        //     return update(state, {
        //       type: {
        //         $set: action.loadTime
        //       }
        //     })
        default:
            return state;
    }
}

const filtersDefault = {

}

export function filters(state = filtersDefault, action) {
    switch (action.type) {
        case controlGraphConstants.UPDATE_FILTER:
            return update(state, {
                [action.field]: {
                    $set: action.value
                }
            })
        case controlGraphConstants.RESET_VISUALIZATION:
            return filtersDefault;
        default:
            return state;
    }
}