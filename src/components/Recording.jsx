import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

import Audio from './Audio';
import Audios from './Audios';

const Mp3Recorder = new MicRecorder({ bitRate: 126 });

class Recorder extends Component {
  constructor() {
    super();
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      file: undefined,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.submitAudio = this.submitAudio.bind(this);
    this.clearRecording = this.clearRecording.bind(this);
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
        // debugger
        const file = new File(buffer, 'me-at-thevoice.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        // debugger
        const blobURL = URL.createObjectURL(file);
        this.setState({ blobURL, file, isRecording: false });
      }).catch((e) => console.log(e));
  }

  submitAudio(e) {
    e.preventDefault();
    // debugger;
    const data = new FormData();
    data.append("audio", this.state.file);

    axios.post('/api/messages', data)
    // axios.post('https://httpbin.org/anything', data)
      .then(resp => console.log(resp))
      .catch(err => console.log('fuuukc'));

    // fetch('/api/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: data,
    // }).then(resp => console.log(resp)).catch(err => console.log('you fucked up'));
  }

  clearRecording() {
    this.setState({ blobURL: '' });
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
        {this.state.blobURL ? (
          <div>
            <Audio
              audioUrl={this.state.blobURL}
            />
            <button onClick={this.submitAudio}>
              Submit audio
            </button>
            <button onClick={this.clearRecording}>
              Record new audio
            </button>
          </div>
        ) : (
          <button onClick={onClick}>
            { buttonText }
          </button>
        )}
        <Audios />
      </>
    )
  }
}

export default Recorder;
