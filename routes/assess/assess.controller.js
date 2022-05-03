//DoA를 받아서 DB의 사용자 테이블에 저장
//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.input = (req, res, next) => {
    //연수익
    console.log(req.body.income);
    //보안예산비율
    console.log(req.body.security);
    //외주비용
    console.log(req.body.others);
}
    