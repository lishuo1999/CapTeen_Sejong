//문제없이 제대로 들어옴
const express = require('express');
const router = express.Router();
const controller = require('./analysis.controller');

//anal_1.html에서 보낸 값 처리
router.post('/business', controller.business);
/*anal_2.html에서 보낸 값 처리(아직 프론트 완성 안 돼서 못 씀)*/

//anal_3.html로 보내줄 값 처리(위험도별로 위험이 몇 개인지)
router.get('/result', controller.result);


module.exports = router;