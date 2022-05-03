//can manage urls and api by manipulating this file

const express = require('express');
const router = express.Router();

const main = require('./main/index');
const join = require('./join/index');
const login = require('./login/index');
const logout = require('./logout/index');
const analysis = require('./analysis/index');
const eval=require('./eval/index');

router.use('/main', main);
router.use('/login', login);
router.use('/logout', logout);
router.use('/join', join);
router.use('/analysis', analysis);
router.use('/eval', eval);

module.exports = router;
