const express = require('express');
const MidtransController = require('../controllers/midtrans.controller');
const { authentication } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.get('/', authentication, MidtransController.index);
router.get('/:order_id', authentication, MidtransController.show);

module.exports = router;
