import React, { useState, useEffect } from 'react';

import Audio from './Audio';

const Audios = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const audios = messages.map(({ url }, i) => (
    <Audio
      key={`audio${i}`}
      url={url}
    />
  ));

  return (
    <>
      {audios}
    </>
  )
};

export default Audios;
