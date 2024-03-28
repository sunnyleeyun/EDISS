const express = require('express');
const router = express.Router();
const bookRouter = require('./books');

router.use('/', bookRouter);

module.exports = router;
