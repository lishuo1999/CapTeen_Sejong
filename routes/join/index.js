const express = require("express");
const router = express.Router();
const controller = require('./join.controller');

//회원가입 요청은 POST로 온다.
//통신은 https로 해주고
//가입요청으로 들어온 유저 정보(비밀번호, 아이디 등)은 DB에 저장하되 비번은 해시해서 저장 SHA-256?

//POST로 들어온 요청 중 /join url을 요청하면 request의 body에 저장된 데이터를 가져오는 함수로 연결
router.post('/join', controller.getJoinInfo);


module.exports = router;