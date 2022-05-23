//문제없이 제대로 들어옴
const express = require('express');
const router = express.Router();

const controller = require('./login.controller');

router.post('/', controller.login);

module.exports = router;