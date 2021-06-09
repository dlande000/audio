import React from 'react';

import Recorder from './components/Recorder';
import Audios from './components/Audios';

const App = () => (
  <>
    <h1>audiyo</h1>
    <div>
      Send strangers short audio messages, and listen what the world has to say.
    </div>
    <div>
      Audiyo was build by David Anderson using React Hooks, Redux, Node, Express, and AWS S3.
    </div>
    <div>
      Please do not actually use Audiyo, as I do not want to pay the AWS charges.
    </div>
    <nav>
      <a href="google.com">Github</a>
    </nav>
    <Recorder />
    <Audios />
  </>
);

export default App;
