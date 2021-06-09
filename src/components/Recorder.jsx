import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';

import Audio from './Audio';
import Audios from './Audios';

import { addAudioActionCreator } from '../actions/actions';

const Mp3Recorder = new MicRecorder({ bitRate: 96 });

const mapDispatchToProps = dispatch => ({
  addAudio: audio => dispatch(addAudioActionCreator(audio)),
});

const Recorder = ({ addAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSendingAudio, setIsSendingAudio] = useState(false);
  const [file, setFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setIsBlocked(true);
      }
    );
  }, []);

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => setIsRecording(true))
        .catch((err) => console.error(err));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(
          buffer,
          'audio-message.mp3',
          {
            type: blob.type,
            lastModified: Date.now()
          }
        );

        setFile(file);
        setBlobUrl(URL.createObjectURL(file));
        setIsRecording(false);
      }).catch((err) => console.log(err));
  };

  const submitAudio = e => {
    e.preventDefault();
    setIsSendingAudio(true);

    const form = new FormData();
    form.append("audio", file);

    axios
      .post('/api/messages', form)
      .then(({ data: audio }) => {
        addAudio(audio);
        setFile(null);
        setBlobUrl('');
        setIsSendingAudio(false);
      })
      .catch(err => console.log(err));
  };

  const clearRecording = () => {
    setBlobUrl('');
    setFile(null);
  };

  const buttonText = isRecording ? 'Stop' : 'Record';
  const onClick = isRecording ? stop : start;

  return (
    <>
      {blobUrl ? (
        <div>
          <Audio url={blobUrl}/>
          <button onClick={submitAudio}>
            Submit audio
          </button>
          <button onClick={clearRecording}>
            Record new audio
          </button>
        </div>
      ) : (
        <button onClick={onClick}>
          { buttonText }
        </button>
      )}
      {isSendingAudio && ("Sending audio!")}
    </>
  )
};

export default connect(null, mapDispatchToProps)(Recorder);
