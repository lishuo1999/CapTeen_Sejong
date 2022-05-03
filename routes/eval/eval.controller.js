//DoA를 받아서 DB의 사용자 테이블에 저장
//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.doa = (req, res, next) => {
    //first, second, third, fourth
    console.log(req.body.value);
}
