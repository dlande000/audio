import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Audio from './Audio';

import { getAudiosActionCreator } from '../actions/actions';

const mapStateToProps = state => ({
  messages: state.audios.audios,
  lastTimestamp: state.audios.lastTimestamp,
});

const mapDispatchToProps = dispatch => ({
  getAudios: audios => dispatch(getAudiosActionCreator(audios)),
});

const Audios = ({
  messages,
  getAudios,
  lastTimestamp,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const observer = useRef();

  useEffect(() => {
    if (isLoading) {
      axios.get('/api/messages', {
        params: { lastTimestamp },
      }).then(({ data }) => {
        getAudios(data);
        setIsLoading(false);
        setHasMoreMessages(Boolean(data.length));
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

  const audios = messages.map(({ url, createdAt }, i) => (
    <div
      key={`audio${i}`}
      ref={i === messages.length - 1 ? lastAudioElementRef : null}
      className="audiosContainer"
    >
      <Audio
        url={url}
        timestamp={createdAt}
      />
    </div>
  ));

  return (
    <>
      {audios}
      {(isLoading && hasMoreMessages) && (
        <div id="loading">
          Loading messages ...
        </div>
      )}
    </>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Audios);
