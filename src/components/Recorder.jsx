import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';

import Audio from './Audio';

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
            lastModified: Date.now(),
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
      .post('/messages', form)
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
          <div id="buttonContainer">
            <button
              className="button"
              id="submit"
              onClick={submitAudio}
              disabled={isSendingAudio}
            >
              Submit audio
            </button>
            <button
              className="button"
              id="redo"
              onClick={clearRecording}
              disabled={isSendingAudio}
            >
              Record new audio
            </button>
          </div>
          </div>
      ) : (
        <div id="recordingButtonContainer">
          <button
            className="button"
            id={buttonText.toLowerCase()}
            onClick={onClick}
            >
            { buttonText }
          </button>
        </div>
      )}
      {isSendingAudio && (
        <div id="uploadingContainer">
          <div>
            Uploading your message, please wait ...
          </div>
        </div>
      )}
    </>
  )
};

export default connect(null, mapDispatchToProps)(Recorder);
