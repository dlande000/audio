import { ADD_AUDIO, ADD_AUDIOS } from '../constants/actionTypes';

const initialState = {
  audios: [],
  lastTimestamp: '',
};

const audioReducers = (state = initialState, { type, payload }) => {
  let audios, lastTimestamp;

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
    default: {
      return state;
    }
  }
};

export default audioReducers;
