import React, { Component } from 'react';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioUrl: this.props.audioUrl,
    };
  }

  render() {
    return (
      <>
        <audio src={this.state.audioUrl} controls="controls" />
      </>
    )
  }
}

export default Audio;
