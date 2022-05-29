//비즈니스 선택 결과를 받아서 DB의 사용자 테이블에 저장
const db = require('../serverConfig');
const session = require("express-session");
const md5=require('md5');
const { get } = require('express/lib/response');
const async=require('async');

//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.business=(req, res, next)=>{
    var business_value=req.body.value.replace("'", "");
    var business_id=0;
    var usr_id=req.session.userName;
    const usr_id_md5=md5(usr_id);
    var update_sql='UPDATE usr_db.users SET usr_business=? WHERE usr_id_md5=?';
    var getBsnsID_sql='SELECT id_business FROM data_db.business WHERE name_business = ?';

    async.waterfall([
        //get business id which name matches req.body.value
        function(){
            db.query(getBsnsID_sql, business_value, function(err, rows, fields){
                business_id=rows[0].id_business
                console.log(business_id);
            })
        },

        //input the id of users' business
        function(){
            var temp=db.query(update_sql, [business_id, usr_id_md5], function(err, rows, fields){
                if(err){
                    console.log(err);

                }
                else{
                    console.log('business value input successed!');
                }
            })
            console.log(temp.sql);
        }
    ])

}

//위험도 계산해서 위험도 분류, DB와의 인터렉션 필요
exports.result = (req, res, next) => {
    //차례대로 1등급, 2등급, 3등급, 4등급, 5등급 개수를 보내주면 됨
    const json = '{"1":3, "2":2, "3":5, "4":6, "5":3}';
    const obj = JSON.parse(json);
    //GET /analysis/result?1=3&2=4&3=5&4=6&5=0 이런 식으로 response됨.
    res.send(obj);
}