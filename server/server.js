const express = require('express');
const path = require('path'); //TODO: use for serving static files
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const messagesRouter = require('./routes/messages');

dotenv.config();
const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(bodyParser.json());

//! FIGURE OUT THE WAY TO PASS UP ASSETS
// if (process.env.NODE_ENV === 'production') {
//   // statically serve everything in the build folder on the route '/build'
//   app.use('/dist', express.static(path.join(__dirname, '../dist')));
//   // serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, '../index.html'));
//   });
// }

app.use('/messages', messagesRouter);

app.get('*', (req, res) => (
  res.sendStatus(404)
));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {
      err: 'An error occurred',
    },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res
    .status(errorObj.status)
    .send(JSON.stringify(errorObj.message));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${ PORT }...`);
});

module.exports = app;
