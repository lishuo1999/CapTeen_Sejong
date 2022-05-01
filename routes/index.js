//can manage urls and api by manipulating this file

const express = require('express');
const router = express.Router();

const main = require('./main/index.js');
const join = require('./join/index.js');
const login = require('./login/index.js');

router.use('/main', main);
router.use('/join', join);
router.use('/login ', login);

//if https://url.com/ then route to /main
router.get('/', function(req, res) {
    res.send(main);
  });


module.exports = router;
