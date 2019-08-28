import update from 'immutability-helper'
import React from "react";

import { visualizationConstants } from '../constants/visualization.constants'

const visualizationDefault = {
  selected: '',
  fieldDetails:{
    disabled: true,
    selected: "",
    selectedFieldData:"",
    subComponent: undefined,
    dataMinerDropdownDisabled:true

  },
  options: [],
  selectedLayer:'',
  selectedYear:2018,
  nearestMeteoStation:'',
  currentGeometry:'',
  disableFetchData:true,
  zoomLevel:4,
  selectedLayerFieldDetails:{
    columns: [
      {
        Header: "Field Property",
        accessor: "key"
      },
      {
        Header: "Value",
        accessor: "value"
      }
    ]
  },
  selectedLayerFieldDetailsData: [],
  selectedLayerFieldSoilDetails:{
    columns: [
      {
        Header: "Field Id",
        accessor: "fieldid"
      },
      {
        Header: "Soil Id",
        accessor: "soilid"
      },
      {
        Header: "Soil Code",
        accessor: "soilcode"
      },
      {
        Header: "Area",
        accessor: "area"
      },
      {
        expander: true,
        Header: () => <strong>Details</strong>,
        width: 65,
        Expander: ({ isExpanded, ...rest }) =>
          <div>
            {isExpanded
              ? <span>&#x2299;</span>
              : <span>&#x2295;</span>}
          </div>,
        style: {
          cursor: "pointer",
          fontSize: 25,
          padding: "0",
          textAlign: "center",
          userSelect: "none"
        },
      }
    ]
  },
  selectedLayerFieldSoilDetailsData: [],
  dashboardTitle:''
}

export function visualization(state = visualizationDefault, action) {
  switch (action.type) {
    case visualizationConstants.SET_VISUALIZATION_TO_STATE:
      return action.visualization;
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
    case visualizationConstants.SELECT_LAYER:
      return update(state, {
        selectedLayer: {
          $set: action.selectedLayer
        }
      })
    case visualizationConstants.GET_NEAREST_METEOSTATION:
      return update(state, {
        nearestMeteoStation: {
          $set: action.meteostation
        }
      })
    case visualizationConstants.ENABLE_FIELD_DETAILS_DROPDOWN:
      return update(state, {
        fieldDetails: 
        {
          disabled: {
            $set: false
        }
      }
      })
    case visualizationConstants.DISABLE_FIELD_DETAILS_DROPDOWN:
      return update(state, {
        fieldDetails: 
        {
          disabled: {
            $set: true
        }
      }
      })

    case visualizationConstants.ENABLE_DATA_MINER_FIELD_DETAILS_DROPDOWN:
    return update(state, {
      fieldDetails: 
      {
        dataMinerDropdownDisabled: {
          $set: false
      }
    }
    })
  case visualizationConstants.DISABLE_DATA_MINER_FIELD_DETAILS_DROPDOWN:
    return update(state, {
      fieldDetails: 
      {
        dataMinerDropdownDisabled: {
          $set: true
      }
    }
    })
    case visualizationConstants.SET_FIELD_DATA_DROPDOWN:
      return update(state, {
        fieldDetails: 
        {
          selectedFieldData: {
            $set: action.selected
        }
      }
      })
    case visualizationConstants.SET_FIELD_DATA_SUBCOMPONENT:
      return update(state, {
        fieldDetails: 
        {
          subComponent: {
            $set: action.subComponent
        }
      }
    })  
    case visualizationConstants.SET_FIELD_DETAILS_DROPDOWN:
      return update(state, {
        fieldDetails: 
        {
          selected: {
            $set: action.selected
        }
      }
      })
    case visualizationConstants.CHANGE_DASHBOARD_TITLE:
      return update(state, {
        dashboardTitle: {
          $set: action.dashboardTitle
        }
      })
    case visualizationConstants.SELECTED_LAYER_FIELD_DETAILS:
      return update(state, {
        selectedLayerFieldDetailsData: {
          $set: action.data
        }
      })

    case visualizationConstants.SELECTED_LAYER_FIELD_SOIL_DETAILS:
      return update(state, {
        selectedLayerFieldSoilDetailsData: {
          $set: action.data
        }
      })
    case visualizationConstants.SELECT_YEAR:
      return update(state, {
        selectedYear: {
          $set: action.selectedYear
        }
      })
    case visualizationConstants.UPDATE_CURRENT_GEOMETRY:
      return update(state, {
        currentGeometry: {
          $set: action.currentGeometry
        }
      })
      case visualizationConstants.UPDATE_CURRENT_ZOOM_LEVEL:
      return update(state, {
        zoomLevel: {
          $set: action.zoomlevel
        }
      })
      case visualizationConstants.UPDATE_DISABLE_FETCH_DATA:
      return update(state, {
        disableFetchData: {
          $set: action.disableFetchData
        }
      })
      case visualizationConstants.UPDATE_FIELD_TABLE_HEADER:
      return update(state, {
        selectedLayerFieldDetails: {
          $set: action.header
        }
      })
      case visualizationConstants.UPDATE_FIELD_SOIL_HEADER:
      return update(state, {
        selectedLayerFieldSoilDetails: {
          $set: action.header
        }
      })
    default:
      return state;
  }
}

const dataDefault = {
  map:{
    tree: null,
    graph: null,
    barChartData: null,
    timeSeries: [],
    filters: [],
    type:"Map",
    json:null,
    latitude:52.292779,
    longitude:4.918047,
    zoom:10
  },
  chart1:{
    tree: null,
    graph: null,
    barChartData: null,
    timeSeries: null,
    filters: [],
    xAxisLabel: "",
    yAxisLabel: "",
    type:"Line",
    json:null,
    freeMind: null,
    hasColors: false,
    hasDocuments: false,
    heatMapData: null,
    id: "test",
    inner: null,
    parameters: null,
    tabularData: null,
    threeDData: null,
    tuples: null,
    zAxisLabel: null
  },
  chart1Properties:{
    selectedFieldInYAxis:'mean_temperature',
    selectedFieldInYAxisId:0,
    selectedNDVIFieldInYAxis:'ndvi_avg',
    selectedNDVIFieldInYAxisId:0,
    fieldDataProperties:[],
    ndviDataProperties:[]
  },
  chart2:{
    tree: null,
    graph: null,
    barChartData: null,
    timeSeries: null,
    filters: [],
    xAxisLabel: "",
    yAxisLabel: "",
    type:"Line",
    json:null,
    freeMind: null,
    hasColors: false,
    hasDocuments: false,
    heatMapData: null,
    id: "test2",
    inner: null,
    parameters: null,
    tabularData: null,
    threeDData: null,
    tuples: null,
    zAxisLabel: null
    },
    chart2Properties:{
      selectedFieldInYAxis:'ELAPSED',
      selectedFieldInYAxisId:0,
      headerProperties:[],
      dataMinerData:[],
    },
    loader:{
      loading:false
    },
    weatherChartDetails:{
      dateRange: null,
      isOpen: false,

    },
    workspaceDetails: {
      workspaceUsername: '',
      workspaceToken: '',
      workspaceParentDirDetails: '',
      workspaceDashboardDirDetails: '',
      workspaceFiles:[],
      showOpenFromWorkspace: false,
      showSaveToWorkspace: false,
      filename: '',
      dataMinerUrl: ''

    }
}

export function data(state = dataDefault, action) {
  switch (action.type) {
    case visualizationConstants.SET_DATA_TO_STATE:
      return action.data;
    case visualizationConstants.RESET_VISUALIZATION:
      return dataDefault;
    case visualizationConstants.SET_WORKSPACE_FILE_LISTING:
      return update(state, {
        workspaceDetails: {
          workspaceFiles: {
            $set: action.workspaceFiles
          }
        }
      });    
    case visualizationConstants.SET_WORKSPACE_USERNAME:
      return update(state, {
        workspaceDetails: {
          workspaceUsername: {
            $set: action.username
          }
        }
      });  
    case visualizationConstants.SET_DATAMINER_URL:
        return update(state, {
          workspaceDetails: {
            dataMinerUrl: {
              $set: action.dataMinerUrl
            }
          }
        });      
    case visualizationConstants.SET_SHOW_OPEN_FROM_WORKSPACE:
      return update(state, {
        workspaceDetails: {
          showOpenFromWorkspace: {
            $set: action.showOpenFromWorkspace
          }
        }
      });    
    case visualizationConstants.SET_SAVE_OPEN_TO_WORKSPACE:
      return update(state, {
        workspaceDetails: {
          showSaveToWorkspace: {
            $set: action.showSaveToWorkspace
          }
        }
      });    
    case visualizationConstants.SET_FILENAME_FOR_WORKSPACE:
      return update(state, {
        workspaceDetails: {
          filename: {
            $set: action.filename
          }
        }
      });      
    case visualizationConstants.SET_WORKSPACE_TOKEN:
      return update(state, {
        workspaceDetails: {
          workspaceToken: {
            $set: action.token
          }
        }
      });  
    case visualizationConstants.SET_WORKSPACE_PARENT_DIR_DETAILS:
      return update(state, {
        workspaceDetails: {
          workspaceParentDirDetails: {
            $set: action.workspaceParentDirDetails
          }
        }
      });  
    case visualizationConstants.SET_WORKSPACE_DASHBOARD_DIR_DETAILS:
      return update(state, {
        workspaceDetails: {
          workspaceDashboardDirDetails: {
            $set: action.workspaceDashboardDirDetails
          }
        }
      });    
    case visualizationConstants.CHANGE_CHART_TYPE:
      return update(state, {
        type: {
          $set: action.chartType
        }
      })
    case visualizationConstants.RELOAD_DATA:
      return update(state, {
        map: {
          json: {
            $set: JSON.stringify(action.data)
          }
        }
      });
    case visualizationConstants.SET_RELEATED_DATA:
      return update(state, {
        chart1: {
            $set: action.chart1
          
        }
      });
    case visualizationConstants.SET_RELEATED_DATA_DATAMINER:
        return update(state, {
          chart2: {
              $set: action.chart2
            
          }
        });  
    case visualizationConstants.SET_FIELD_DATA_X_AXIS_LABEL:
      return update(state, {
        chart1: {
          xAxisLabel: {
            $set: action.xAxisLabel
          }
        }
      });
    case visualizationConstants.SET_FIELD_DATA_Y_AXIS_LABEL:
      return update(state, {
        chart1: {
          yAxisLabel: {
            $set: action.yAxisLabel
          }
        }
    });  
    case visualizationConstants.SET_FIELD_DATA_PROPERTIES:
      return update(state, {
        chart1Properties: {
          fieldDataProperties: {
            $set: action.fieldDataProperties
          }
        }
      }); 
    case visualizationConstants.SET_WEATHER_PROPERTIES_DROPDOWN:
      return update(state, {
        chart1Properties: 
        {
          selectedFieldInYAxisId: {
            $set: action.selected
        }
      }
    })
    case visualizationConstants.SET_DATAMINER_DATA_HEADER:
      return update(state, {
        chart2Properties: 
        {
          headerProperties: {
            $set: action.header
        }
      }
    })
    case visualizationConstants.SET_DATAMINER_DATA:
      return update(state, {
        chart2Properties: 
        {
          dataMinerData: {
            $set: action.data
        }
      }
    })
    case visualizationConstants.SET_WEATHER_PROPERTIES_DROPDOWN_TEXT:
      return update(state, {
        chart1Properties: 
        {
          selectedFieldInYAxis: {
            $set: action.selected
        }
      }
      })
    case visualizationConstants.SET_NDVI_PROPERTIES_DROPDOWN:
      return update(state, {
        chart1Properties: 
        {
          selectedNDVIFieldInYAxisId: {
            $set: action.selected
        }
      }
      })
    case visualizationConstants.SET_NDVI_PROPERTIES_DROPDOWN_TEXT:
        return update(state, {
          chart1Properties: 
          {
            selectedNDVIFieldInYAxis: {
              $set: action.selected
          }
        }
        })
    case visualizationConstants.SET_CROP_HISTORY_PROPERTIES_DROPDOWN:
      return update(state, {
        chart2Properties: 
        {
          selectedFieldInYAxisId: {
            $set: action.selected
        }
      }
      })
    case visualizationConstants.SET_CROP_HISTORY_PROPERTIES_DROPDOWN_TEXT:
        return update(state, {
          chart2Properties: 
          {
            selectedFieldInYAxis: {
              $set: action.selected
          }
        }
        })
    case visualizationConstants.SET_DATA_MINER_LOADING:
          return update(state, {
            loader: {
              loading: {
                $set: action.loading
              }
            }
          });    
    case visualizationConstants.SET_NDVI_DATA_PROPERTIES:
      return update(state, {
        chart1Properties: {
          ndviDataProperties: {
            $set: action.ndviDataProperties
          }
        }
      }); 
     case visualizationConstants.SET_DATE_RANGE:
      return update(state, {
        weatherChartDetails: {
          dateRange: {
            $set: action.dateRange
          }
        }
      });
      case visualizationConstants.SET_DATE_RANGE_OPEN:
      return update(state, {
        weatherChartDetails: {
          isOpen: {
            $set: action.isOpen
          }
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
