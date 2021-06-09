const aws = require('aws-sdk');
const dotenv = require('dotenv');

const Audio = require('../models/audioModel');

dotenv.config();
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
    const audio = await Audio.create({ url, likes: 0 });

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

audioController.updateLikes = async (req, res, next) => {
  try {
    const { url, changeBy } = req.body;

    // const audio = await Audio.findOneAndUpdate(
    //   { url },
    //   { likes: this.likes + parseInt(changeBy) }
    // );
    const audio = await Audio.findOne({ url });
    audio.likes += parseInt(changeBy);
    await audio.save();
    res.locals.likes = audio.likes;
    console.log(audio.likes);
    console.log(res.locals.likes);
    next();
  } catch (e) {
    next({
      log: 'Express error handler caught in audioController.updateLikes',
      status: 400,
      message: {
        err: `An error occurred: ${e}`,
      },
    });
  }
};

module.exports = audioController;
