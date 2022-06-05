//문제없이 제대로 들어옴
const express = require('express');
const router = express.Router();
const controller = require('./assess.controller');

//Assess_1.html에서 보낸 값 처리
// assess/userInput
router.post('/userInput', controller.input);

//Assess_result
router.get('/manage',controller.manage);


module.exports = router;