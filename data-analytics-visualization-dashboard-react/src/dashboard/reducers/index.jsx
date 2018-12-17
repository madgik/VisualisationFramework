import { combineReducers } from 'redux';

import { visualization, data, filters } from './visualization.reducers';

const rootReducer = combineReducers({
  visualization,
  data,
  filters
})

export default rootReducer