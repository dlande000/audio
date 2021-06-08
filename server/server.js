const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const audioController = require('./controllers/audioController');

// const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.json());

app.get(
  '/api/messages',
  audioController.getAudios,
  (req, res) => {
    res.send(res.locals.audios);
  }
);

app.post(
  '/api/messages',
  audioController.postAudio,
  (req, res) => {
    console.log(res.locals);
    res.send(res.locals.audio);
  }
);

// app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
