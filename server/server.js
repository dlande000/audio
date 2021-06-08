const express = require('express');
const path = require('path');

// const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;

app.get('/api/david', (req, res) => {
  res.send('this works');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
