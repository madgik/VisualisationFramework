import { combineReducers } from 'redux';

import { configGraph } from './configGraph.reducers';
import { controlGraph } from './controlGraph.reducers';
import { loadingBarReducer } from 'react-redux-loading-bar'



const rootReducer = combineReducers({
  configGraph,
  controlGraph,
  loadingBar: loadingBarReducer
})

export default rootReducer