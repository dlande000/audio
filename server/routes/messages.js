const express = require('express');
const multer = require('multer');
const audioController = require('../controllers/audioController');

const router = express.Router();
const upload = multer();

router.get(
  '/',
  audioController.getAudios,
  (req, res) => res.status(200).send(res.locals.audios)
);

router.post(
  '/',
  upload.single('audio'),
  audioController.postAudio,
  (req, res) => res.status(200).send(res.locals.audio)
);

router.patch(
  '/',
  audioController.updateLikes,
  (req, res) => res.sendStatus(200)
);

module.exports = router;
