import update from 'immutability-helper'

import { configGraphConstants } from '../constants'
import { CardActions } from '@material-ui/core';

const dataDefault = {
  open: false,
  isNew: false,
  uploaded: true,
  editGraphId: '',
  fileDetails:{
    valid: false
  },
  graphSource: 'new',
  selectedGraph: '-',
  allGraphsMetadata: '',
  openImportModal: false,
  openSidebar: false,
  nodesNumber: 5
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
    case configGraphConstants.SET_GRAPH_SOURCE: {
      return update(state, {
        graphSource: {
          $set: action.graphSource
        }
      })
    }
    case configGraphConstants.SET_SELECTED_GRAPH: {
      return update(state, {
        selectedGraph: {
          $set: action.selectedGraph
        }
      })
    }
    case configGraphConstants.SET_ALL_GRAPHS_METADATA: {
      return update( state, {
        allGraphsMetadata: {
          $set: action.allGraphsMetadata
        }
      })
    }
    case configGraphConstants.SET_OPEN_IMPORT_MODAL: {
      return update(state, {
        openImportModal: {
          $set: action.openImportModal
        }
      })
    }
    case configGraphConstants.SET_OPEN_SIDEBAR: {
      return update(state, {
        openSidebar: {
          $set: action.openSidebar
        }
      })
    }
    case configGraphConstants.SET_NODES_NUMBER: {
      return update(state, {
        nodesNumber: {
          $set: action.nodesNumber
        }
      })
    }
    default:
      return state;
  }
}

