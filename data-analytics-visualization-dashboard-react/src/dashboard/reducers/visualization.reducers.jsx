import update from 'immutability-helper'
import React from "react";

import { visualizationConstants } from '../constants/visualization.constants'

const visualizationDefault = {
  selected: '',
  fieldDetails:{
    disabled: true,
    selected: "",
    selectedFieldData:"",
    subComponent: undefined
  },
  options: [],
  selectedLayer:'',
  selectedYear:'2018',
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
    json:null
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
    timeSeries: [{
      "name":"All","color":null,"documents":["5be2fe27a3ce4d0180067f99","5be2fe27a3ce4d0180067f99","5be2fe2fa3ce4d018006865a","5be2fe27a3ce4d0180067f99","5be2fe2fa3ce4d018006865a","5be2fe2fa3ce4d01800685df","5be2fe24a3ce4d0180067ee0","5be2fe26a3ce4d0180067f43","5be2fe2da3ce4d01800684ce","5be2fe26a3ce4d0180067f6a","5be2fe26a3ce4d0180067f2a","5be2fe30a3ce4d0180068763","5be2fe2ba3ce4d01800682f0","5be2fe2fa3ce4d0180068640","5be2fe27a3ce4d0180067f8d","5be2fe2ea3ce4d018006851e","5be2fe2ca3ce4d0180068374","5be2fe2ba3ce4d0180068286","5be2fe2da3ce4d0180068440","5be2fe28a3ce4d018006808d","5be2fe2da3ce4d01800684b7","5be2fe2ea3ce4d0180068507","5be2fe28a3ce4d0180068014","5be2fe28a3ce4d0180068014","5be2fe29a3ce4d0180068188","5be2fe31a3ce4d0180068795","5be2fe2fa3ce4d01800685df","5be2fe29a3ce4d018006814d","5be2fe28a3ce4d0180068099","5be2fe30a3ce4d018006871c","5be2fe28a3ce4d01800680ca","5be2fe2da3ce4d0180068489","5be2fe28a3ce4d01800680ca","5be2fe27a3ce4d0180067fd8","5be2fe28a3ce4d0180068099","5be2fe2fa3ce4d01800685ec","5be2fe30a3ce4d018006871c","5be2fe2fa3ce4d01800685ec","5be2fe2ea3ce4d018006852a","5be2fe27a3ce4d0180067f8d","5be2fe28a3ce4d0180068099","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d01800681c3","5be2fe28a3ce4d018006802d","5be2fe30a3ce4d0180068734","5be2fe2aa3ce4d0180068235","5be2fe2ba3ce4d018006832d","5be2fe2aa3ce4d0180068235","5be2fe25a3ce4d0180067f12","5be2fe30a3ce4d0180068763","5be2fe2ea3ce4d0180068507","5be2fe29a3ce4d018006815a","5be2fe2fa3ce4d0180068673","5be2fe2aa3ce4d018006821d","5be2fe27a3ce4d0180067fd8","5be2fe2aa3ce4d01800681b7","5be2fe2aa3ce4d01800681b7","5be2fe2ea3ce4d018006851e","5be2fe27a3ce4d0180067fbf","5be2fe31a3ce4d0180068795","5be2fe30a3ce4d018006877c","5be2fe2ba3ce4d0180068339","5be2fe2aa3ce4d01800681b7","5be2fe28a3ce4d01800680b1","5be2fe2fa3ce4d01800686bd","5be2fe2ea3ce4d0180068573","5be2fe2aa3ce4d01800681b7","5be2fe28a3ce4d01800680a5","5be2fe24a3ce4d0180067ed5","5be2fe28a3ce4d0180068099","5be2fe2aa3ce4d0180068263","5be2fe30a3ce4d018006871c","5be2fe30a3ce4d01800686ed","5be2fe2ea3ce4d018006852a","5be2fe2da3ce4d0180068467","5be2fe2da3ce4d01800684e5","5be2fe2aa3ce4d01800681cf","5be2fe2da3ce4d01800684e5","5be2fe2da3ce4d01800684e5","5be2fe2aa3ce4d01800681cf","5be2fe2ba3ce4d0180068339","5be2fe30a3ce4d018006873f","5be2fe25a3ce4d0180067f06","5be2fe27a3ce4d0180067fa6","5be2fe2da3ce4d0180068472","5be2fe26a3ce4d0180067f2a","5be2fe29a3ce4d01800680f0","5be2fe28a3ce4d018006808d","5be2fe2ba3ce4d0180068320","5be2fe28a3ce4d01800680a5","5be2fe2fa3ce4d01800685ec","5be2fe2fa3ce4d0180068627","5be2fe2fa3ce4d01800686bd","5be2fe2da3ce4d01800684ab","5be2fe27a3ce4d0180067f82","5be2fe2aa3ce4d018006821d","5be2fe25a3ce4d0180067f06","5be2fe28a3ce4d018006808d","5be2fe2fa3ce4d01800685ec","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d0180068235","5be2fe2aa3ce4d018006821d","5be2fe2aa3ce4d01800681c3","5be2fe2da3ce4d0180068472","5be2fe24a3ce4d0180067ed5","5be2fe2ea3ce4d0180068542","5be2fe2ea3ce4d0180068597","5be2fe24a3ce4d0180067ed5","5be2fe29a3ce4d0180068137","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068046","5be2fe30a3ce4d018006873f","5be2fe2aa3ce4d0180068258","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d0180068235","5be2fe2fa3ce4d01800685ec","5be2fe24a3ce4d0180067ee0","5be2fe2aa3ce4d01800681cf","5be2fe2ba3ce4d018006826f","5be2fe28a3ce4d0180068075","5be2fe2aa3ce4d018006821d","5be2fe28a3ce4d0180068075","5be2fe2da3ce4d01800684ab","5be2fe2ba3ce4d01800682b5","5be2fe29a3ce4d0180068113","5be2fe2fa3ce4d0180068611","5be2fe28a3ce4d0180068075","5be2fe2ea3ce4d0180068597","5be2fe2da3ce4d01800684c3","5be2fe28a3ce4d0180068075","5be2fe2fa3ce4d0180068611","5be2fe2da3ce4d01800684c3","5be2fe28a3ce4d0180068075","5be2fe2fa3ce4d0180068611","5be2fe2ba3ce4d01800682b5","5be2fe2ba3ce4d018006827a","5be2fe2aa3ce4d01800681ab","5be2fe29a3ce4d0180068171","5be2fe2ea3ce4d01800685d4","5be2fe2ea3ce4d0180068507","5be2fe30a3ce4d01800686f9","5be2fe2ba3ce4d018006829d","5be2fe30a3ce4d01800686ed","5be2fe28a3ce4d0180067ffd","5be2fe29a3ce4d0180068171","5be2fe2fa3ce4d0180068611","5be2fe29a3ce4d0180068171","5be2fe27a3ce4d0180067ff1","5be2fe2aa3ce4d01800681ab","5be2fe27a3ce4d0180067ff1","5be2fe30a3ce4d01800686e1","5be2fe2ca3ce4d01800683a3","5be2fe2ca3ce4d01800683eb","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d01800681b7","5be2fe24a3ce4d0180067ee0","5be2fe2ea3ce4d018006858b","5be2fe2aa3ce4d01800681cf","5be2fe27a3ce4d0180067ff1","5be2fe28a3ce4d018006806a","5be2fe29a3ce4d0180068171","5be2fe28a3ce4d0180068008","5be2fe2ca3ce4d01800683eb","5be2fe2ba3ce4d0180068309","5be2fe2ba3ce4d0180068314","5be2fe2ba3ce4d0180068314","5be2fe28a3ce4d018006805e","5be2fe2ba3ce4d0180068314","5be2fe2fa3ce4d01800686a6","5be2fe2da3ce4d018006847e","5be2fe29a3ce4d018006817c","5be2fe29a3ce4d018006817c","5be2fe2ba3ce4d01800682c0","5be2fe2ba3ce4d01800682c0","5be2fe2ba3ce4d01800682c0","5be2fe2ba3ce4d0180068292","5be2fe2ea3ce4d0180068513","5be2fe2aa3ce4d01800681f1","5be2fe2ba3ce4d01800682d9","5be2fe2ba3ce4d0180068339","5be2fe28a3ce4d01800680a5","5be2fe2ba3ce4d0180068339","5be2fe2da3ce4d01800684ab","5be2fe26a3ce4d0180067f1e","5be2fe30a3ce4d01800686c8","5be2fe26a3ce4d0180067f1e","5be2fe2ca3ce4d0180068369","5be2fe2ca3ce4d0180068369","5be2fe30a3ce4d018006873f","5be2fe2aa3ce4d01800681cf","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068075","5be2fe2ea3ce4d0180068542","5be2fe28a3ce4d0180068075","5be2fe2ba3ce4d01800682b5","5be2fe2ba3ce4d01800682b5","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068075","5be2fe2ea3ce4d01800685d4","5be2fe2fa3ce4d01800686a6","5be2fe2fa3ce4d01800686a6","5be2fe2fa3ce4d0180068611","5be2fe28a3ce4d018006806a","5be2fe28a3ce4d018006806a","5be2fe28a3ce4d0180068008","5be2fe28a3ce4d0180068008","5be2fe28a3ce4d0180068008","5be2fe28a3ce4d0180068008","5be2fe2ca3ce4d01800683eb","5be2fe2ca3ce4d01800683eb","5be2fe2da3ce4d01800684c3","5be2fe2ba3ce4d018006826f","5be2fe2da3ce4d01800684ab","5be2fe28a3ce4d0180068075","5be2fe27a3ce4d0180067f82","5be2fe30a3ce4d018006873f","5be2fe27a3ce4d0180067f82","5be2fe29a3ce4d0180068137","5be2fe28a3ce4d0180068075","5be2fe2fa3ce4d0180068611"],"yaxisData":[1000,1144,1266,1234,1136,1279,1048,876,1022,885,1044,876,969,883,987,984,897,980,740,870,791,708,841,676,689,718,863,697,561,579,779,541,411,504,384,498,501,379,492,409,464,361,475,296,201,180,212,225,177,191,124,157,119,40,47,44,36,32,19,34,19,9,14],"xaxisData":[143,143,143,143,143,143,139,139,139,139,139,139,138,138,138,138,136,136,136,136,131,131,131,131,129,129,129,129,124,124,124,124,118,118,118,118,117,117,117,117,115,115,115,115,111,110,110,110,110,108,108,108,108,104,104,104,104,103,103,103,103,102,102],"xAxisDataType":"Decimal"}],
      filters: [],
      xAxisLabel: "Day",
      yAxisLabel: "Plant Height",
      type:"Line",
      json:null
    },
    weatherChartDetails:{
      dateRange: null,
      isOpen: false,

    },
    workspaceDetails: {
      workspaceUsername: '',
      workspaceToken: ''
    }
}

export function data(state = dataDefault, action) {
  switch (action.type) {
    case visualizationConstants.LOAD_VISUALIZATION:
      return action.data;
    case visualizationConstants.RESET_VISUALIZATION:
      return dataDefault;
    case visualizationConstants.SET_WORKSPACE_USERNAME:
      return update(state, {
        workspaceDetails: {
          workspaceUsername: {
            $set: action.username
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
