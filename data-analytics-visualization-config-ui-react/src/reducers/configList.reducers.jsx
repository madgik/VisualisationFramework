import update from 'immutability-helper'

import { configListConstants } from '../constants'

const configListDefault = {
  data: [],
  loading: false,
  errorMessage: null
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
    default:
      return state;
  }
}
