import update from 'immutability-helper'

import { configListConstants } from '../constants'
import { defaultState } from './configItem.reducers'

export const configListDefault = {
  data: [],
  loading: false,
  errorMessage: null,
  disableChartCreation: false,
}


export function configList(state = configListDefault, action) {
  switch (action.type) {
    case configListConstants.LOAD_CONFIGURATIONS_STARTED:
      return update(state, {
        loading: {
          $set: true
        }
      });
    case configListConstants.SET_CONFIGURATIONS:
      return update(state, {
        data: {
          $set: action.data
        }
      });
    case configListConstants.LOAD_CONFIGURATIONS_COMPLETED:
      return update(state, {
        loading: {
          $set: false
        }
      });
    case configListConstants.SHOW_GRID_ERROR:
      return update(state, {
        errorMessage: {
          $set: action.message
        }
      });
    case configListConstants.DISABLE_CREATION_CHART:
      return update(state, {
        disableChartCreation: {
          $set:action.disableChartCreation
        }
      });  
    default:
      return state;
  }
}