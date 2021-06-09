import React from 'react';

const Audio = ({ url, timestamp }) => {
  const date = new Date(timestamp);
  const postedAt = date.getDate() +
          "/" + (date.getMonth() + 1) +
          "/" + date.getFullYear() +
          " " + date.getHours() +
          ":" + date.getMinutes() +
          ":" + date.getSeconds();

  return (
    <div>
      <div className="timestamp">
        {postedAt}
      </div>
      <audio src={url} controls/>
    </div>
  )
};

export default Audio;
