const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../utils/validation/auth.validation');
const { authentication, refreshToken } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.post('/register', registerValidation, AuthController.register);
router.post('/login', loginValidation, AuthController.login);
router.get('/me', authentication, AuthController.me);
router.post('/logout', authentication, AuthController.logout);

router.get('/refresh-token', refreshToken, AuthController.refreshToken);

module.exports = router;
