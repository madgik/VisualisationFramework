import { combineReducers } from 'redux';

import { configItem } from './configItem.reducers';
import { visualization, data, filters } from './visualization.reducers';
import { document } from './document.reducers';

const rootReducer = combineReducers({
  configItem,
  visualization,
  data,
  document,
  filters
})

export default rootReducer