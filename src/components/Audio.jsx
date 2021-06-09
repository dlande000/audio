import React from 'react';

import Likes from './Likes';

const Audio = ({
  url,
  timestamp,
  likes,
  index,
  changeLikes,
}) => {
  const date = new Date(timestamp);
  const postedAt = !timestamp ? '' : date.getDate() +
          "/" + (date.getMonth() + 1) +
          "/" + date.getFullYear() +
          " " + date.getHours() +
          ":" + date.getMinutes() +
          ":" + date.getSeconds();

  return (
    <div>
      {(likes || likes === 0) && (
        <Likes
          likes={likes}
          index={index}
          url={url}
          changeLikes={changeLikes}
        />
      )}
      <div className="timestamp">
        {postedAt}
      </div>
      <audio src={url} controls/>
    </div>
  )
};

export default Audio;
