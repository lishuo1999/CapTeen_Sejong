//문제없이 값 제대로 받아옴
const express = require("express");
const router = express.Router();
const controller = require('./join.controller');

//Login.html에서 회원가입 버튼을 누르면 Join.html으로 다이렉션.
//Join.html에서 회원가입 버튼을 누르면 폼에 작성한 데이터가 post로 옴.
//app.js에서 /를 가지고 router로 보내줬고
//router에서 /join을 가지고 여기로 보내줬으니까
//이제 남은 건 / 뿐이겠죠
//들어온 URL이 /join 즉 /join/이니까 (앞에서부터 차근차근 떼어가면서 판별=라우팅 하는 개념)
router.post('/', controller.getJoinInfo);


module.exports = router;