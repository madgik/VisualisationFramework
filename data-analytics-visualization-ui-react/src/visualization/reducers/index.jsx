import { combineReducers } from 'redux';

import { visualization, data, filters } from './visualization.reducers';
import { document } from './document.reducers';

const rootReducer = combineReducers({
  visualization,
  data,
  document,
  filters
})

export default rootReducer