const db = require('../models/audioModel');
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
  // do some work

};

audioController.postAudio = (req, res, next) => {
  const { audioUrl } = req.body;
  
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: Date.now().toString(),
    Body: audioUrl,
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
