//can manage urls and api by manipulating this file

const express = require('express');
const router = express.Router();

const main = require('./main/index.js');
const user = require('./users/index.js');

router.use('/main', main);
router.use('/user', user);

module.exports = router;
