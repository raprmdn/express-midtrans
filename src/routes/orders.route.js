const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authentication } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.post('/', authentication, OrderController.order);
router.post('/notification', OrderController.notificationHandler);

module.exports = router;
