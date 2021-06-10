import React from 'react';

import Likes from './Likes';

const Audio = ({
  url,
  timestamp,
  likes,
  index,
  changeLikes,
}) => {
  let postedAt = '';

  if (timestamp) {
    const date = new Date(timestamp);
    const [
      month,
      day,
      year,
      hours,
      minutes,
      seconds
    ] = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ];

    const formattedHours = !hours ? '00' : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
    postedAt = `
      ${ month }/${ day }/${ year } 
      ${ formattedHours }:${ formattedMinutes }:${ formattedSeconds }
    `;
  }

  return (
    <div>
      <div className="timestamp">
        {(likes || likes === 0) ? (
          <Likes
            likes={likes}
            index={index}
            url={url}
            changeLikes={changeLikes}
          />
        ) : (<div/>)}
        {postedAt}
      </div>
      <audio src={url} controls/>
    </div>
  )
};

export default Audio;
