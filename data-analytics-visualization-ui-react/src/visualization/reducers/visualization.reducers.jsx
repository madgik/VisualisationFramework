import update from 'immutability-helper'

import { visualizationConstants } from '../constants'

const visualizationDefault = {
  selected: '',
  options: []
}

export function visualization(state = visualizationDefault, action) {
  switch (action.type) {
    case visualizationConstants.LOAD_VISUALIZATIONS:
      return update(state, {
        options: {
          $set: action.options
        }
      })
    case visualizationConstants.CHANGE_VISUALIZATION:
      return update(state, {
        selected: {
          $set: action.selected
        }
      })
    default:
      return state;
  }
}

const dataDefault = {
  type: '',
  tree: null,
  graph: null,
  barChartData: null,
  timeSeries: [],
  filters: []
}

export function data(state = dataDefault, action) {
  switch (action.type) {
    case visualizationConstants.LOAD_VISUALIZATION:
      return action.data;
    case visualizationConstants.RESET_VISUALIZATION:
      return dataDefault;
    case visualizationConstants.CHANGE_CHART_TYPE:
      return update(state, {
        type: {
          $set: action.chartType
        }
      })
    case visualizationConstants.RELOAD_DATA:
      return update(state, {
        tree: {
          $set: action.data.tree
        },
        graph: {
          $set: action.data.graph
        },
        barChartData: {
          $set: action.data.barChartData
        },
        timeSeries: {
          $set: action.data.timeSeries
        },
        tuples: {
          $set: action.data.tuples
        },
        tabularData: {
          $set: action.data.tabularData
        },
        threeDData: {
          $set: action.data.threeDData
        }
      });
    default:
      return state;
  }
}

const filtersDefault = {

}

export function filters(state = filtersDefault, action) {
  switch (action.type) {
    case visualizationConstants.UPDATE_FILTER:
      return update(state, {
        [action.field]: {
          $set: action.value
        }
      })
    case visualizationConstants.RESET_VISUALIZATION:
      return filtersDefault;
    default:
      return state;
  }
}
