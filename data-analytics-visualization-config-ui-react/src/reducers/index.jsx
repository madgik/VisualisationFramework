import { combineReducers } from 'redux';

import { configList } from './configList.reducers';
import { configItem } from './configItem.reducers';

const rootReducer = combineReducers({
  configList,
  configItem
})

export default rootReducer