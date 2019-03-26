import update from 'immutability-helper'
import React from "react";
import { controlGraphConstants } from '../constants/controlGraph.constants'
import axios from 'axios';
import Ajax from '../utilities/Ajax';


const dataDefault = {
    type: '',
    tree: null,
    graph: null,
    barChartData: null,
    timeSeries: [],
    filters: []
  }

export function controlGraph(state = dataDefault, action) {
    switch (action.type) {
        case controlGraphConstants.LOAD_GRAPH:
            return action.data;
        case controlGraphConstants.RESET_GRAPH:
            return dataDefault;
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