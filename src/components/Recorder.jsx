import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

import Audio from './Audio';
import Audios from './Audios';

const Mp3Recorder = new MicRecorder({ bitRate: 96 });

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
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

    const form = new FormData();
    form.append("audio", file);

    axios.post('/api/messages', data)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const clearRecording = () => setBlobUrl('');

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
      <Audios />
    </>
  )
};

export default Recorder;
