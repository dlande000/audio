import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Audio from './Audio';

import { getAudiosActionCreator } from '../actions/actions';

const mapStateToProps = state => ({
  messages: state.audios.audios,
});

const mapDispatchToProps = dispatch => ({
  getAudios: audios => dispatch(getAudiosActionCreator(audios)),
});

const Audios = ({ messages, getAudios }) => {
  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => getAudios(data));
  }, []);

  const audios = messages.map(({ url }, i) => (
    <Audio
      key={`audio${i}`}
      url={url}
    />
  ));

  return (
    <>
      {audios.length ? audios : (
        "Loading ..."
      )}
    </>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Audios);
