import React, { Component } from 'react';

import Audio from './Audio';

class Audios extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    // GET messages
    console.log('Audios mounted');
  }

  render() {
    const audios = this.state.messages.map((audio, i) => (
      <Audio
        key={`audio${i}`}
        audioUrl={audio.url}
      />
    ));

    return (
      <>
        { audios }
      </>
    )
  }
}

export default Audios;
