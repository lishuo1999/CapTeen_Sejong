// 문제없이 잘 돌아감
const express = require('express');
const router = express.Router();
const controller = require('./main.controller');

// GET home page request
// you can use functions in other file like this
router.get('/', controller.main);

module.exports = router;