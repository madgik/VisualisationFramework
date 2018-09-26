import { combineReducers } from 'redux';

import { configItem } from './configItem.reducers';

const rootReducer = combineReducers({
  configItem
})

export default rootReducer