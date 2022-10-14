const express = require('express');
const AuthRouter = require('./auth.route');
const SeriesRouter = require('./series.route');

const router = express.Router();

router.use('/', AuthRouter);
router.use('/series', SeriesRouter);

module.exports = router;
