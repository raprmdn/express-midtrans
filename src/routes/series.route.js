const express = require('express');
const SeriesController = require('../controllers/series.controller');

const router = express.Router();

router.get('/', SeriesController.index);
router.get('/:slug', SeriesController.show);

module.exports = router;
