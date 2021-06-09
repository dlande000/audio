import { ADD_AUDIO, ADD_AUDIOS, CHANGE_LIKE } from '../constants/actionTypes';

export const addAudioActionCreator = audio => ({
  type: ADD_AUDIO,
  payload: audio,
});

export const getAudiosActionCreator = audios => ({
  type: ADD_AUDIOS,
  payload: audios,
});

export const changeLikeActionCreator = (index, changeBy) => ({
  type: CHANGE_LIKE,
  payload: {
    index,
    changeBy,
  },
});
