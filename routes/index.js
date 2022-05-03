//can manage urls and api by manipulating this file

const express = require('express');
const router = express.Router();

const main = require('./main/index');
//const join = require('./join/index');
const login = require('./login/index');

router.use('/main', main);
router.use('/login', login);
//router.use('/join', join);

module.exports = router;
