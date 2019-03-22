import update from 'immutability-helper'

import { configGraphConstants } from '../constants'

const dataDefault = {
  open: false,
  isNew: false,
  uploaded: true,
  editGraphId: '',
  fileDetails:{
    valid: false
  },
}



export function configGraph(state = dataDefault, action) {
  switch (action.type) {
    case configGraphConstants.UPLOAD_FILE: {
      return update(state, {
        uploaded: {
          $set: true
        },
        isNew: {
          $set:true
        }
      });
    }
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
    case configGraphConstants.CLOSE_GRAPH_EDIT: {
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
    }
    case configGraphConstants.SET_FILE_VALIDATION: {
      return update(state, {
        fileDetails: {
          valid: {
            $set: action.valid
          }
        }
      })
    }
    default:
      return state;
  }
}

