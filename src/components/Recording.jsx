import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

import Audio from './Audio.jsx';

const Mp3Recorder = new MicRecorder({ bitRate: 126 });

class Recorder extends Component {
  constructor() {
    super();
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  }

  stop() {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  }

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true });
      }
    );
  }

  render() {
    const buttonText = this.state.isRecording ? 'Stop' : 'Record';
    const onClick = this.state.isRecording ? this.stop : this.start;
    
    return (
      <>
        <button onClick={onClick}>
          { buttonText }
        </button>
        {this.state.blobURL && (
          <Audio
            audioUrl={this.state.blobURL}
          />
        )}
      </>
    )
  }
}

export default Recorder;
