import {  ADD_AUDIO, ADD_AUDIOS, CHANGE_LIKE } from '../constants/actionTypes';

const initialState = {
  audios: [],
  lastTimestamp: '',
};

const audioReducers = (state = initialState, { type, payload }) => {
  let audios, lastTimestamp, audio;

  switch (type) {
    case ADD_AUDIO:
      audios = [payload].concat(state.audios);

      return {
        ...state,
        audios,
      };
    case ADD_AUDIOS: 
      audios = Array.from(state.audios);
      audios = audios.concat(payload);
      lastTimestamp = audios[audios.length - 1].createdAt;

      return {
        audios,
        lastTimestamp,
      };
    case CHANGE_LIKE:
      debugger
      const { index, changeBy } = payload;
      audios = Array.from(state.audios);
      audios[index].likes += changeBy;
      debugger
      return {
        ...state,
        audios,
      };
    default: 
      return state;
  }
};

export default audioReducers;
