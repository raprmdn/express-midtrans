const express = require('express');
const AuthRouter = require('./auth.route');
const SeriesRouter = require('./series.route');
const CartRouter = require('./cart.route');

const router = express.Router();

router.use('/', AuthRouter);
router.use('/series', SeriesRouter);
router.use('/carts', CartRouter);

module.exports = router;
