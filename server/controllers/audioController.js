const aws = require('aws-sdk');

const Audio = require('../models/audioModel');
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const audioController = {};

audioController.getAudios = (req, res, next) => {
  const lastTimestamp = req.query.lastTimestamp ? req.query.lastTimestamp : Date.now();

  Audio.find({ 'createdAt': { "$lt": lastTimestamp }})
    .sort({ 'createdAt': -1 })
    .limit(15)
    .then(audios => {
      res.locals.audios = audios;
      next();
    });
};

audioController.postAudio = (req, res, next) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: Date.now().toString(),
    Body: req.file.buffer,
    ACL: 'public-read',
  };

  s3.upload(params, function(err, data) {
    if (err) throw err;
    console.log(`File uploaded successfully. ${data.Location}`);

    Audio.create({ url: data.Location })
    .then(audio => {
      res.locals.audio = audio;
      next();
    })
    .catch(err => console.log(err));
  });
};

module.exports = audioController;
