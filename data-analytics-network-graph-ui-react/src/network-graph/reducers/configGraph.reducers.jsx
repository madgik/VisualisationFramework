import update from 'immutability-helper'

import { configGraphConstants } from '../constants'

const defaultState = {
  open: false,
  isNew: false,
  editGraphId: ''
}

export function configGraph(state = defaultState, action) {
  switch (action.type) {
    case configGraphConstants.CREATE_GRAPH: {
      return update(state, {
        open: {
          $set: true
        }
      });
    }
    case configGraphConstants.EDIT_GRAPH: {
      return update(state, {
        isNew: {
          $set: false
        },
        editGraphId: {
          $set: action.id
        }
      });
    }
    case configGraphConstants.SHOW_GRAPH_EDIT: {
      return update(state, {
        open: {
          $set: true
        }
      });
    }
    case configGraphConstants.CLOSE_GRAPH_EDIT:
      return update(state, {
        open: {
          $set: false
        },
        isNew: {
          $set: false
        },
        editGraphId: {
          $set: ''
        }
      });
    default:
      return state;
  }
}

