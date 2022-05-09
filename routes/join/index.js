//문제없이 값 제대로 받아옴
const express = require("express");
const router = express.Router();
const controller = require('./join.controller');

//to get new user info
router.post('/', controller.getJoinInfo);


module.exports = router;