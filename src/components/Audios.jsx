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
    fetch('/api/messages')
      .then(res => res.json())
      .then(messages => {
        console.log(messages);
        this.setState({ messages });
      });
  }

  render() {
    const audios = this.state.messages.map((audio, i) => {
      // debugger
      return (
      <Audio
        key={`audio${i}`}
        audioUrl={audio.url}
      />
    )});

    return (
      <>
        { audios }
      </>
    )
  }
}

export default Audios;
