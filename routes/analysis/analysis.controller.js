//비즈니스 선택 결과를 받아서 DB의 사용자 테이블에 저장
//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.business = (req, res, next) => {
    console.log(req.body.value);
}

//위험도 계산해서 위험도 분류, DB와의 인터렉션 필요
exports.result = (req, res, next) => {
    //차례대로 1등급, 2등급, 3등급, 4등급, 5등급 개수를 보내주면 됨
    const json = '{"1":3, "2":2, "3":5, "4":6, "5":3}';
    const obj = JSON.parse(json);
    //GET /analysis/result?1=3&2=4&3=5&4=6&5=0 이런 식으로 response됨.
    res.send(obj);
}