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

    axios.patch('/messages', { changeBy, url })
      .then(() => changeLikes(index, changeBy))
      .catch(err => console.log(err));
  };

  let likesId = 'zero';

  if (likes) {
    if (likes > 0) {
      likesId = 'positive';
    } else if (likes < 0) {
      likesId = 'negative';
    }
  }

  return (
    <div className="likeButtonContainer">
      <span id={likesId}>
        {likes}
      </span>
      <button
        id="up"
        onClick={handleClick}
      >
        &#128077;
      </button>
      <button
        id="down"
        onClick={handleClick}
      >
        &#128078;
      </button>
    </div>
  )
};

export default Likes;
