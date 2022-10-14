const express = require('express');
const SeriesController = require('../controllers/series.controller');
const VideoController = require('../controllers/video.controller');

const router = express.Router();

router.get('/', SeriesController.index);
router.get('/:slug', SeriesController.show);
router.get('/:slug/eps/:episode', VideoController.watch);

module.exports = router;
