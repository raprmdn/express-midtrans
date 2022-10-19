const express = require('express');
const SeriesController = require('../controllers/series.controller');
const VideoController = require('../controllers/video.controller');
const { optionalAuthentication } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.get('/', SeriesController.index);
router.get('/:slug', optionalAuthentication, SeriesController.show);
router.get('/:slug/eps/:episode', optionalAuthentication, VideoController.watch);

module.exports = router;
