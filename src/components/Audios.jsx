import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Audio from './Audio';

import { getAudiosActionCreator, changeLikeActionCreator } from '../actions/actions';

const mapStateToProps = state => ({
  messages: state.audios.audios,
  lastTimestamp: state.audios.lastTimestamp,
});

const mapDispatchToProps = dispatch => ({
  getAudios: audios => dispatch(getAudiosActionCreator(audios)),
  changeLikes: (index, changeBy) => dispatch(changeLikeActionCreator(index, changeBy)),
});

const Audios = ({
  messages,
  getAudios,
  lastTimestamp,
  changeLikes,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const observer = useRef();

  useEffect(() => {
    if (isLoading) {
      axios.get('/messages', {
        params: { lastTimestamp },
      }).then(({ data }) => {
        getAudios(data);
        setIsLoading(false);

        if (!data.length) setHasMoreMessages(false);
      });
    }
  }, [isLoading]);

  const lastAudioElementRef = useCallback(node => {
    if (isLoading) {
      return;
    } else if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setIsLoading(true);
    });

    if (node) observer.current.observe(node);
  }, [isLoading]);

  const audios = messages.map(({ url, createdAt, likes }, i) => (
    <div
      key={`audio${i}`}
      ref={i === messages.length - 1 ? lastAudioElementRef : null}
      className="audiosContainer"
    >
      <Audio
        url={url}
        timestamp={createdAt}
        index={i}
        likes={likes}
        changeLikes={changeLikes}
      />
    </div>
  ));

  return (
    <>
    <div id="audios">
      {audios}
    </div>
      {(isLoading && hasMoreMessages) && (
        <div id="loading">
          Loading messages ...
        </div>
      )}
      <div id="end">
        That's all, folks!
      </div>
    </>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Audios);
