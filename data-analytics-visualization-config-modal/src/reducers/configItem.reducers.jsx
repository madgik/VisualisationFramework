import update from 'immutability-helper'

import { configItemConstants } from '../constants'

function defaultState() {

  var fieldsToValidate = [
    'label',
    'type',
    'xAxis',
    'xAxisLabel',
    'yAxis',
    'yAxisLabel',
    'zAxis',
    'zAxisLabel',
    'labelField',
    'valueField',
    'transformationLabel',
    'transformationLabelValue',
    'transformationColumns'];

  var validation = {}
  fieldsToValidate.forEach(field => {
    validation[field] = {
      valid: true,
      touched: false,
      messages: []
    }
  })

  return {
    isNew: true,
    data: {
      type: 'Line',
      activeDocuments: 1
    },
    menu: {
      activeItem: 'general'
    },
    validation: validation,
    isFormValid: true,
    validationPanelMessages: [],
    errorMessage: null,
    geoanalytics: {
      layers: [],
      checked: false
    },
    delimiter: '',
    commentCharacter:''
  }
}

export function configItem(state = defaultState(), action) {
  switch (action.type) {
    case configItemConstants.CREATE_ITEM: {
      var createState = defaultState();
      return createState;
    }
    case configItemConstants.EDIT_ITEM: {
      var editState = defaultState();
      editState.isNew = false;
      editState.data = action.data;
      return editState;
    }
    case configItemConstants.UPDATE_EDITED_ITEM:
      return update(state, {
        data: {
          $set: action.data
        },
        validation: {
          $set: action.validation
        }
      });
    case configItemConstants.ADD_DATA_SOURCE:
      if (!state.data.dataSources) state.data.dataSources = [];
      return update(state, {
        data: {
          dataSources: {
            $push: [{
              source: action.id,
              type: 'IMPORTED'
            }]
          }
        }
      })
    case configItemConstants.SET_UPLOADED_FILE_METADATA: {
      var index = state.data.dataSources.length - 1;
      return update(state, {
        data: {
          dataSources: {
            [index]: {
              name: {
                $set: action.metadata.name
              },
              fields: {
                $set: action.metadata.fields
              }
            }
          }
        }
      })
    }
    case configItemConstants.REMOVE_DATA_SOURCE: {
      var data = state.data;
      var dataSources = data.dataSources;
      var sourceId = dataSources[action.index].source;
      dataSources.splice(action.index, 1);
      dataSources = dataSources.slice();

      if (data.xAxis && data.xAxis.startsWith(sourceId)) data.xAxis = '';
      if (data.yAxis && data.yAxis.startsWith(sourceId)) data.yAxis = '';
      if (data.zAxis && data.zAxis.startsWith(sourceId)) data.zAxis = '';
      if (data.labelField && data.labelField.startsWith(sourceId)) data.labelField = '';
      if (data.valueField && data.valueField.startsWith(sourceId)) data.valueField = '';
      if (data.colorField && data.colorField.startsWith(sourceId)) data.colorField = '';
      if (data.documentField && data.documentField.startsWith(sourceId)) data.documentField = '';

      return update(state, {
        data: {
          dataSources: {
            $set: dataSources
          }
        }
      })
    }
    case configItemConstants.UPDATE_JOIN_FIELD: {
      if (!state.data.joins) state.data.joins = [];
      var found = false;
      var field = null;
      var idx = -1;
      for (var i = 0; i < state.data.joins.length; i++) {
        var element = state.data.joins[i];
        if (element.source === action.source) {
          found = true;
          field = element;
          idx = i;
          break;
        }
      }
      if (found) {
        return update(state, {
          data: {
            joins: {
              [idx]: {
                $set: field
              }
            }
          }
        })
      } else {
        return update(state, {
          data: {
            joins: {
              $push: [{
                source: action.source,
                field: action.field
              }]
            }
          }
        })
      }
    }
    case configItemConstants.ADD_FILTER:
      if (!state.data.filters) state.data.filters = [];
      return update(state, {
        data: {
          filters: {
            $push: [action.filter]
          }
        }
      })
    case configItemConstants.ADD_TRANSFORMATION:
      if (!state.data.transformations) state.data.transformations = '';
      return update(state, {
        data: {
          transformations: {
            $set: action.transformation
          }
        }
      })
    case configItemConstants.UPDATE_TRANSFORMATION:
      return update(state, {
        data: {
          $set: action.data
        },
        validation: {
          $set: action.validation
        }
      });
    case configItemConstants.UPDATE_FILTER: {
      return update(state, {
        data: {
          filters: {
            [action.index]: {
              $set: action.filter
            }
          }
        }
      })
    }
    case configItemConstants.REMOVE_FILTER: {
      var filters = state.data.filters;
      filters.splice(action.index, 1);
      filters = filters.slice();

      return update(state, {
        data: {
          filters: {
            $set: filters
          }
        }
      })
    }
    case configItemConstants.UPDATE_MENU_ITEM:
      return update(state, {
        menu: {
          $set: {
            activeItem: action.item
          }
        }
      })
    case configItemConstants.SHOW_VALIDATION_RESULT:
      return update(state, {
        validation: {
          $set: action.validation
        },
        isFormValid: {
          $set: action.isFormValid
        },
        validationPanelMessages: {
          $set: action.validationPanelMessages
        }
      });
    case configItemConstants.CLOSE_ITEM_EDIT:
      return defaultState();
    case configItemConstants.SHOW_MODAL_ERROR:
      return update(state, {
        errorMessage: {
          $set: action.message
        }
      });
    case configItemConstants.SET_GEOANALYTICS_LAYERS:
      if (!state.geoanalytics.layers) state.geoanalytics.layers = [];
      return update(state, {
        geoanalytics: {
          layers: {
            $set: action.geoanalytics.layers
          }
        }
      });
    case configItemConstants.UPDATE_CHECK_LAYER:
      return update(state, {
        geoanalytics: {
          checked: {
            $set: action.value
          }
        }
      });
    case configItemConstants.SET_DELIMITER:
      return update(state, {
        delimiter: {
          $set: action.delimiter
        }
      });
    case configItemConstants.SET_COMMENT_CHARACTER:
      return update(state, {
        commentCharacter: {
          $set: action.commentCharacter
        }
      });
    default:
      return state;
  }

}

