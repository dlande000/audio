const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.json());

app.post('/api/david', (req, res) => {
  console.log(req.body);
  res.send('got it');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
