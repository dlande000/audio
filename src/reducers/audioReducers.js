import { ADD_AUDIO, ADD_AUDIOS } from '../constants/actionTypes';

const initialState = {
  audios: [],
};

const audioReducers = (state = initialState, { type, payload }) => {
  let audios;

  switch (type) {
    case ADD_AUDIO:
      audios = [payload].concat(state.audios);
      debugger
      return { audios };
    case ADD_AUDIOS: 
      audios = payload;
      return { audios };
    default: {
      return state;
    }
  }
};

export default audioReducers;
