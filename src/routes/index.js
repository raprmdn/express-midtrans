const express = require('express');
const AuthRouter = require('./auth.route');

const router = express.Router();

router.use('/', AuthRouter);

module.exports = router;
