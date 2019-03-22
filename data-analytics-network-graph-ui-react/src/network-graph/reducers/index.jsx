import { combineReducers } from 'redux';

import { configGraph } from './configGraph.reducers';
import { controlGraph } from './controlGraph.reducers';


const rootReducer = combineReducers({
  configGraph,
  controlGraph
})

export default rootReducer