import update from 'immutability-helper'

import { configItemConstants } from '../constants'
import { configListDefault } from './configList.reducers'

export const defaultState = {
  open: false,
  isNew: false,
  editItemId: '',
  data: [],
  loading: false,
  errorMessage: null,
  disableChartCreation: false
}

export function configItem(state = defaultState, action) {
  switch (action.type) {
    case configItemConstants.CREATE_ITEM: {
      return update(state, {
        open: {
          $set: true
        }
      });
    }
    case configItemConstants.EDIT_ITEM: {
      return update(state, {
        isNew: {
          $set: false
        },
        editItemId: {
          $set: action.id
        }
      });
    }
    case configItemConstants.SHOW_ITEM_EDIT: {
      return update(state, {
        open: {
          $set: true
        }
      });
    }
    case configItemConstants.CLOSE_ITEM_EDIT:
      return update(state, {
        open: {
          $set: false
        },
        isNew: {
          $set: false
        },
        editItemId: {
          $set: ''
        }
      });
    default:
      return state;
  }
}

