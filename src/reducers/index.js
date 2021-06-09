import { combineReducers } from 'redux';

import audioReducers from './audioReducers';

const reducers = combineReducers({
  audios: audioReducers,
});

export default reducers;
