import { combineReducers } from 'redux';

import { configGraph } from './configGraph.reducers';

const rootReducer = combineReducers({
  configGraph
})

export default rootReducer