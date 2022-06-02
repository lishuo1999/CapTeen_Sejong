const db = require('../serverConfig');
const session=require('express-session');
const md5=require('md5');
const async = require('async');

//DoA를 받아서 DB의 사용자 테이블에 저장
//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.doaSelect = (req, res, next) => {
    //'1', '2', '3', '4', '5'
    let doaValue= Number(req.body.value);
    let usr_id_md5=md5(req.session.userName);
    let doaUpdateSql='UPDATE usr_db.users SET usr_doa=? WHERE usr_id_md5=?';
    db.query(doaUpdateSql, [doaValue, usr_id_md5], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            console.log('User DoA update completed');
        }
    })
}
