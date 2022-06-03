//문제없이 제대로 들어옴
const express = require('express');
const router = express.Router();
const controller = require('./analysis.controller');

//anal_1.html에서 보낸 값 처리
router.post('/business', controller.business);
/*anal_2.html에서 보낸 값 처리(아직 프론트 완성 안 돼서 못 씀)*/


//anal_3.html by sy
router.get('/vuln',controller.vuln);

router.post('/save_vuln',controller.save_vuln);


//anal_4.html by sy 
router.get('/threat',controller.threat);

router.post('/save_threat',controller.save_threat);


//anal_5.html로 보내줄 값 처리(위험도별로 위험이 몇 개인지)
router.get('/result', controller.result);

//anal_result.html operation
router.get('/risk1', controller.risk1_list);
//router.get('/risk2', controller.risk2_list);
//router.get('/risk3', controller.risk3_list);
//router.get('/risk4', controller.risk4_list);
//router.get('/risk5', controller.risk5_list);

router.get('/test', controller.test);


module.exports = router;