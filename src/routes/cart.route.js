const express = require('express');
const CartController = require('../controllers/cart.controller');
const { authentication } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.get('/', authentication, CartController.index);
router.post('/', authentication, CartController.addOrRemove);

module.exports = router;
