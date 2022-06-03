const db = require('../serverConfig');
const session=require('express-session');
const md5=require('md5');
const async = require('async');

//DoA를 받아서 DB의 사용자 테이블에 저장
//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.input = (req, res, next) => {
    let id_md5=md5(req.session.userName);
    //연수익
    let anRev = req.body.income;
    //보안예산비율
    let sec_budp = req.body.security;
    //외주비용
    let trnsf_bud = req.body.others;

    const inputSql='UPDATE usr_db.users SET usr_anRev=?, usr_sec_budp=?, usr_trnsf_bud=? WHERE usr_id_md5=?'

    db.query(inputSql, [anRev, sec_budp, trnsf_bud, id_md5], function(err, rows, field){
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            console.log('Annual Revenue, Security Budget Percentage, Transfer Budget update of a user is completed');
        }
    })
}
    