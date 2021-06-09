import React, { Component } from 'react';

const Audio = ({ url }) => (
  <div>
    <audio src={url} controls/>
  </div>
);

export default Audio;
