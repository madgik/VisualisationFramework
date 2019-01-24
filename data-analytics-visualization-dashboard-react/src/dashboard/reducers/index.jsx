import { combineReducers } from 'redux';

import { visualization, data, filters } from './visualization.reducers';
import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
  visualization,
  data,
  filters,
  loadingBar: loadingBarReducer})

export default rootReducer