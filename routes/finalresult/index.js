//문제없이 제대로 들어옴
const express = require('express');
const router = express.Router();
const controller = require('./finalresult.controller');


//Final_result1에서 버튼 클릭하면 등급별로 계산해서 뿌려!
router.get('/count',controller.count);

// chart1 
router.get('/chart1',controller.chart1);

//chart2
router.get('/chart2',controller.chart2);

module.exports = router;
