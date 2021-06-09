import { combineReducers } from 'redux';

import audiosReducer from './audiosReducer';

const reducers = combineReducers({
  audios: audiosReducer,
});

export default reducers;
