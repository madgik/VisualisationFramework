import update from 'immutability-helper'

import { visualizationConstants } from '../constants/visualization.constants'

const visualizationDefault = {
  selected: '',
  fieldDetails:{
    disabled: true,
    selected: ""
  },
  options: [],
  selectedLayer:'',
  selectedYear:'',
  currentGeometry:'',
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
    timeSeries: [{"name":"All","color":null,"documents":["5be2fe27a3ce4d0180067f99","5be2fe27a3ce4d0180067f99","5be2fe2fa3ce4d018006865a","5be2fe27a3ce4d0180067f99","5be2fe2fa3ce4d018006865a","5be2fe2fa3ce4d01800685df","5be2fe24a3ce4d0180067ee0","5be2fe26a3ce4d0180067f43","5be2fe2da3ce4d01800684ce","5be2fe26a3ce4d0180067f6a","5be2fe26a3ce4d0180067f2a","5be2fe30a3ce4d0180068763","5be2fe2ba3ce4d01800682f0","5be2fe2fa3ce4d0180068640","5be2fe27a3ce4d0180067f8d","5be2fe2ea3ce4d018006851e","5be2fe2ca3ce4d0180068374","5be2fe2ba3ce4d0180068286","5be2fe2da3ce4d0180068440","5be2fe28a3ce4d018006808d","5be2fe2da3ce4d01800684b7","5be2fe2ea3ce4d0180068507","5be2fe28a3ce4d0180068014","5be2fe28a3ce4d0180068014","5be2fe29a3ce4d0180068188","5be2fe31a3ce4d0180068795","5be2fe2fa3ce4d01800685df","5be2fe29a3ce4d018006814d","5be2fe28a3ce4d0180068099","5be2fe30a3ce4d018006871c","5be2fe28a3ce4d01800680ca","5be2fe2da3ce4d0180068489","5be2fe28a3ce4d01800680ca","5be2fe27a3ce4d0180067fd8","5be2fe28a3ce4d0180068099","5be2fe2fa3ce4d01800685ec","5be2fe30a3ce4d018006871c","5be2fe2fa3ce4d01800685ec","5be2fe2ea3ce4d018006852a","5be2fe27a3ce4d0180067f8d","5be2fe28a3ce4d0180068099","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d01800681c3","5be2fe28a3ce4d018006802d","5be2fe30a3ce4d0180068734","5be2fe2aa3ce4d0180068235","5be2fe2ba3ce4d018006832d","5be2fe2aa3ce4d0180068235","5be2fe25a3ce4d0180067f12","5be2fe30a3ce4d0180068763","5be2fe2ea3ce4d0180068507","5be2fe29a3ce4d018006815a","5be2fe2fa3ce4d0180068673","5be2fe2aa3ce4d018006821d","5be2fe27a3ce4d0180067fd8","5be2fe2aa3ce4d01800681b7","5be2fe2aa3ce4d01800681b7","5be2fe2ea3ce4d018006851e","5be2fe27a3ce4d0180067fbf","5be2fe31a3ce4d0180068795","5be2fe30a3ce4d018006877c","5be2fe2ba3ce4d0180068339","5be2fe2aa3ce4d01800681b7","5be2fe28a3ce4d01800680b1","5be2fe2fa3ce4d01800686bd","5be2fe2ea3ce4d0180068573","5be2fe2aa3ce4d01800681b7","5be2fe28a3ce4d01800680a5","5be2fe24a3ce4d0180067ed5","5be2fe28a3ce4d0180068099","5be2fe2aa3ce4d0180068263","5be2fe30a3ce4d018006871c","5be2fe30a3ce4d01800686ed","5be2fe2ea3ce4d018006852a","5be2fe2da3ce4d0180068467","5be2fe2da3ce4d01800684e5","5be2fe2aa3ce4d01800681cf","5be2fe2da3ce4d01800684e5","5be2fe2da3ce4d01800684e5","5be2fe2aa3ce4d01800681cf","5be2fe2ba3ce4d0180068339","5be2fe30a3ce4d018006873f","5be2fe25a3ce4d0180067f06","5be2fe27a3ce4d0180067fa6","5be2fe2da3ce4d0180068472","5be2fe26a3ce4d0180067f2a","5be2fe29a3ce4d01800680f0","5be2fe28a3ce4d018006808d","5be2fe2ba3ce4d0180068320","5be2fe28a3ce4d01800680a5","5be2fe2fa3ce4d01800685ec","5be2fe2fa3ce4d0180068627","5be2fe2fa3ce4d01800686bd","5be2fe2da3ce4d01800684ab","5be2fe27a3ce4d0180067f82","5be2fe2aa3ce4d018006821d","5be2fe25a3ce4d0180067f06","5be2fe28a3ce4d018006808d","5be2fe2fa3ce4d01800685ec","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d0180068235","5be2fe2aa3ce4d018006821d","5be2fe2aa3ce4d01800681c3","5be2fe2da3ce4d0180068472","5be2fe24a3ce4d0180067ed5","5be2fe2ea3ce4d0180068542","5be2fe2ea3ce4d0180068597","5be2fe24a3ce4d0180067ed5","5be2fe29a3ce4d0180068137","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068046","5be2fe30a3ce4d018006873f","5be2fe2aa3ce4d0180068258","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d0180068235","5be2fe2fa3ce4d01800685ec","5be2fe24a3ce4d0180067ee0","5be2fe2aa3ce4d01800681cf","5be2fe2ba3ce4d018006826f","5be2fe28a3ce4d0180068075","5be2fe2aa3ce4d018006821d","5be2fe28a3ce4d0180068075","5be2fe2da3ce4d01800684ab","5be2fe2ba3ce4d01800682b5","5be2fe29a3ce4d0180068113","5be2fe2fa3ce4d0180068611","5be2fe28a3ce4d0180068075","5be2fe2ea3ce4d0180068597","5be2fe2da3ce4d01800684c3","5be2fe28a3ce4d0180068075","5be2fe2fa3ce4d0180068611","5be2fe2da3ce4d01800684c3","5be2fe28a3ce4d0180068075","5be2fe2fa3ce4d0180068611","5be2fe2ba3ce4d01800682b5","5be2fe2ba3ce4d018006827a","5be2fe2aa3ce4d01800681ab","5be2fe29a3ce4d0180068171","5be2fe2ea3ce4d01800685d4","5be2fe2ea3ce4d0180068507","5be2fe30a3ce4d01800686f9","5be2fe2ba3ce4d018006829d","5be2fe30a3ce4d01800686ed","5be2fe28a3ce4d0180067ffd","5be2fe29a3ce4d0180068171","5be2fe2fa3ce4d0180068611","5be2fe29a3ce4d0180068171","5be2fe27a3ce4d0180067ff1","5be2fe2aa3ce4d01800681ab","5be2fe27a3ce4d0180067ff1","5be2fe30a3ce4d01800686e1","5be2fe2ca3ce4d01800683a3","5be2fe2ca3ce4d01800683eb","5be2fe2aa3ce4d01800681c3","5be2fe2aa3ce4d01800681b7","5be2fe24a3ce4d0180067ee0","5be2fe2ea3ce4d018006858b","5be2fe2aa3ce4d01800681cf","5be2fe27a3ce4d0180067ff1","5be2fe28a3ce4d018006806a","5be2fe29a3ce4d0180068171","5be2fe28a3ce4d0180068008","5be2fe2ca3ce4d01800683eb","5be2fe2ba3ce4d0180068309","5be2fe2ba3ce4d0180068314","5be2fe2ba3ce4d0180068314","5be2fe28a3ce4d018006805e","5be2fe2ba3ce4d0180068314","5be2fe2fa3ce4d01800686a6","5be2fe2da3ce4d018006847e","5be2fe29a3ce4d018006817c","5be2fe29a3ce4d018006817c","5be2fe2ba3ce4d01800682c0","5be2fe2ba3ce4d01800682c0","5be2fe2ba3ce4d01800682c0","5be2fe2ba3ce4d0180068292","5be2fe2ea3ce4d0180068513","5be2fe2aa3ce4d01800681f1","5be2fe2ba3ce4d01800682d9","5be2fe2ba3ce4d0180068339","5be2fe28a3ce4d01800680a5","5be2fe2ba3ce4d0180068339","5be2fe2da3ce4d01800684ab","5be2fe26a3ce4d0180067f1e","5be2fe30a3ce4d01800686c8","5be2fe26a3ce4d0180067f1e","5be2fe2ca3ce4d0180068369","5be2fe2ca3ce4d0180068369","5be2fe30a3ce4d018006873f","5be2fe2aa3ce4d01800681cf","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068075","5be2fe2ea3ce4d0180068542","5be2fe28a3ce4d0180068075","5be2fe2ba3ce4d01800682b5","5be2fe2ba3ce4d01800682b5","5be2fe28a3ce4d0180068075","5be2fe28a3ce4d0180068075","5be2fe2ea3ce4d01800685d4","5be2fe2fa3ce4d01800686a6","5be2fe2fa3ce4d01800686a6","5be2fe2fa3ce4d0180068611","5be2fe28a3ce4d018006806a","5be2fe28a3ce4d018006806a","5be2fe28a3ce4d0180068008","5be2fe28a3ce4d0180068008","5be2fe28a3ce4d0180068008","5be2fe28a3ce4d0180068008","5be2fe2ca3ce4d01800683eb","5be2fe2ca3ce4d01800683eb","5be2fe2da3ce4d01800684c3","5be2fe2ba3ce4d018006826f","5be2fe2da3ce4d01800684ab","5be2fe28a3ce4d0180068075","5be2fe27a3ce4d0180067f82","5be2fe30a3ce4d018006873f","5be2fe27a3ce4d0180067f82","5be2fe29a3ce4d0180068137","5be2fe28a3ce4d0180068075","5be2fe2fa3ce4d0180068611"],"yaxisData":[1380,1373,1323,1378,1316,1414,833,1232,1158,1127,1113,805,1279,1136,998,1091,784,992,1240,1065,981,768,970,971,1211,1173,1412,1145,926,723,1025,990,1013,1039,917,894,724,886,732,996,920,883,865,831,717,965,864,957,852,806,770,689,755,671,1038,775,779,1073,1273,1179,1186,653,779,725,640,1009,772,709,635,913,751,723,819,733,705,677,605,678,681,586,657,568,944,849,663,1104,933,1071,1001,706,907,743,641,607,553,670,946,1068,897,877,949,672,878,664,633,574,524,635,537,483,767,569,746,872,960,895,833,604,489,479,670,476,630,449,544,411,483,523,427,470,404,429,466,395,452,389,367,338,539,769,739,790,812,374,336,395,329,317,351,324,372,301,294,875,777,835,696,599,321,274,331,266,290,279,240,242,232,238,200,219,175,174,153,154,155,145,132,115,440,650,706,658,613,107,112,104,80,79,570,602,484,484,482,576,482,459,459,464,464,540,187,187,415,267,267,262,262,266,266,290,290,429,487,609,486,555,566,557,536,463,412],"xaxisData":[136,136,135,135,134,134,134,133,133,132,132,132,132,132,131,131,131,130,130,130,129,129,129,129,129,129,129,129,128,128,128,128,128,128,127,127,127,127,127,127,126,126,126,125,125,125,125,125,125,124,124,124,124,124,123,123,123,123,123,123,123,123,123,122,122,122,122,122,122,121,121,121,121,121,120,120,120,120,119,119,119,119,118,118,118,118,118,118,118,118,118,117,117,117,117,117,117,117,117,117,117,117,117,117,116,116,116,116,115,115,115,115,115,115,115,115,115,115,114,114,114,114,114,114,113,113,113,113,113,112,112,112,112,112,112,111,111,110,110,110,110,110,110,110,110,110,109,109,109,109,108,108,108,108,108,108,108,108,108,108,107,107,107,107,107,106,106,106,106,106,105,105,105,105,105,104,104,104,104,104,104,104,104,104,104,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,102,102,102,102,102,101,101,101,101,101],"xAxisDataType":"Decimal"}],
    filters: [],
    xAxisLabel: "Day",
    yAxisLabel: "Plant Height",
    type:"Line",
    json:null
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
    }
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
        map: {
          json: {
            $set: JSON.stringify(action.data)
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
