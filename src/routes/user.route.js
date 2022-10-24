const express = require('express');
const UserController = require('../controllers/user.controller');
const { authentication } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.get('/library', authentication, UserController.myLibrary);

module.exports = router;
