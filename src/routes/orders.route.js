const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authentication } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.post('/', authentication, OrderController.order);
router.post('/notification', OrderController.notificationHandler);
router.get('/invoice/:identifier', authentication, OrderController.invoice);

module.exports = router;
