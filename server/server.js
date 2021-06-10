const express = require('express');
const path = require('path'); //TODO: use for serving static files
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');

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

app.use(express.json());
app.use(favicon(path.join(__dirname, '../src/assets/images/favicon.png')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

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
