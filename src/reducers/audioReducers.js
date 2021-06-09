const initialState = {
  audios: [],
};

const audioReducer = (state = initialState, ({ type, payload })) => {
  let audios;

  switch (type) {
    case 'ADD_AUDIO':
      audios = [payload].concat(state.audios);
      return { audios };
    case 'ADD_AUDIOS': 
      audios = payload;
      return { audios };
    default: {
      return state;
    }
  }
};

export default marketsReducer;
