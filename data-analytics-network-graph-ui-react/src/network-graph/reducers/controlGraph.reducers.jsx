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
    selectedWeight: '',
    graph: {
        links: [],
        nodes: []
    },
    topNodes: [],
    linkColor: 'blue',
    prevGraphState: {
        links: '',
        nodes: ''
    },
    graphData: null,
    barChartData: null,
    timeSeries: [],
    filters: [],
    paused: false,
    stopped: true,
    selectedLink: {
        source: '',
        target: '',
        weight: ''
    },
    sliderValue: 0,
    timestamps: null,
    playerTimestamps:null,
    showOldNodes: true,
    timestampFrom: '2012.01',
    timestampTo:'2015.12',
    propModalIsOpen: false,
    record: false,
    availRec: false
}

export function controlGraph(state = dataDefault, action) {
    switch (action.type) {
        case controlGraphConstants.SET_GRAPH:
            return update(state, {
                graph: {
                    $set: action.graph
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
        case controlGraphConstants.SET_TOP_NODES:
            return update(state, {
                topNodes: {
                    $set: action.topNodes
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
        case controlGraphConstants.SET_SELECTED_LINK:
            return update(state, {
                selectedLink: {
                    $set: action.selectedLink
                }
            })
        case controlGraphConstants.SET_SLIDER_VALUE:
            return update(state, {
                sliderValue: {
                    $set: action.sliderValue
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
        case controlGraphConstants.SET_STOPPED:
            return update(state, {
                stopped: {
                    $set: action.stopped
                }
            })
        case controlGraphConstants.SET_SELECTED_WEIGHT:
            return update(state, {
                selectedWeight: {
                    $set: action.weight
                }
            })
        case controlGraphConstants.SET_TIMESTAMPS: {
            return update(state, {
                timestamps: {
                    $set: action.timestamps
                }
            })
        }
        case controlGraphConstants.SET_PLAYER_TIMESTAMPS: {
            return update(state, {
                playerTimestamps: {
                    $set: action.playerTimestamps
                }
            })
        }
        case controlGraphConstants.SET_SHOW_OLD_NODES: {
            return update(state, {
                showOldNodes: {
                    $set: action.showOldNodes
                }
            })
        }
        case controlGraphConstants.SET_TIMESTAMP_FROM: {
            return update(state, {
                timestampFrom: {
                    $set: action.timestampFrom
                }
            })
        }
        case controlGraphConstants.SET_TIMESTAMP_TO: {
            return update(state, {
                timestampTo: {
                    $set: action.timestampTo
                }
            })
        }
        case controlGraphConstants.SET_PROP_MODAL_IS_OPEN: {
            return update(state, {
                propModalIsOpen: {
                    $set: action.propModalIsOpen
                }
            })
        }
        case controlGraphConstants.SET_RECORD: {
            return update(state, {
                record: {
                    $set: action.record
                }
            })
        }
        case controlGraphConstants.SET_AVAIL_REC: {
            return update(state, {
                availRec: {
                    $set: action.availRec
                }
            })
        }
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