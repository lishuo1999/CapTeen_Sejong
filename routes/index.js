const express = require('express');
const router = express.Router();

const main = require('./main/main.js');
const user = require('./users/users.js');

router.use('/main', main);
router.use('/user', user);

module.exports = router;
