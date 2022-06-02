//문제없이 제대로 들어옴
const express = require('express');
const router = express.Router();
const controller = require('./eval.controller');

//anal_1.html에서 보낸 값 처리
// eval/doaSelect
router.post('/doaSelect', controller.doaSelect);


module.exports = router;