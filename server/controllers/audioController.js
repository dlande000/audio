const aws = require('aws-sdk');
const Audio = require('../models/audioModel');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();
const audioController = {};

audioController.getAudios = async (req, res, next) => {
  try {
    const lastTimestamp = req.query.lastTimestamp ?
      req.query.lastTimestamp :
      Date.now();

    const audios = await Audio.find({ 'createdAt': { "$lt": lastTimestamp }})
      .sort({ 'createdAt': -1 })
      .limit(10);
    
    res.locals.audios = audios;
    next();
  } catch (e) {
    next({
      log: 'Express error handler caught in audioController.getAudios',
      status: 400,
      message: {
        err: `An error occurred: ${e}`,
      },
    });
  }
};

audioController.postAudio = async (req, res, next) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: Date.now().toString(),
      Body: req.file.buffer,
      ACL: 'public-read',
    };

    const { Location: url } = await s3.upload(params).promise();
    const audio = await Audio.create({ url });

    res.locals.audio = audio;
    next();
  } catch (e) {
    next({
      log: 'Express error handler caught in audioController.postAudio',
      status: 400,
      message: {
        err: `An error occurred: ${e}`,
      },
    });
  }
};

module.exports = audioController;
