import React from 'react';
import axios from 'axios';

const Likes = ({
  index,
  url,
  likes,
  changeLikes,
}) => {
  const handleClick = e => {
    e.preventDefault();
    const upOrDown = e.target.id;
    const changeBy = upOrDown === 'up' ? 1 : -1;

    axios.patch('/api/messages', { changeBy, url })
      .then(() => changeLikes(index, changeBy));
  };

  return (
    <div>
      {likes}
      <button
        id="up"
        onClick={handleClick}
      >
        Up
      </button>
      <button
        id="down"
        onClick={handleClick}
      >
        Down
      </button>
    </div>
  )
};

export default Likes;
