import { ADD_AUDIO, ADD_AUDIOS } from '../constants/actionTypes';

export const addAudioActionCreator = audio => ({
  type: ADD_AUDIO,
  payload: audio,
});

export const getAudiosActionCreator = audios => ({
  type: ADD_AUDIOS,
  payload: audios,
});
