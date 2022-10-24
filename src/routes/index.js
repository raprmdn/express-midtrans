const express = require('express');
const AuthRouter = require('./auth.route');
const SeriesRouter = require('./series.route');
const CartRouter = require('./cart.route');
const OrderRouter = require('./orders.route');
const MidtransRouter = require('./midtrans.route');
const UserRouter = require('./user.route');

const router = express.Router();

router.use('/', AuthRouter);
router.use('/', UserRouter);
router.use('/series', SeriesRouter);
router.use('/carts', CartRouter);
router.use('/orders', OrderRouter);
router.use('/midtrans', MidtransRouter);

module.exports = router;
