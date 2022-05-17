const db= require('../serverConfig');
const crypto=require('crypto');
const session = require('express-session');

exports.login = (req, res, next) => {
    const usr_id=req.body.userId.replace("'", "");
    const usr_pw=req.body.userPw.replace("'", "");
    const usr_pw_sha512 = crypto.createHash('sha512').update(usr_pw).digest('hex');
    var queryResult=0;
    //find whether there is a user matches id and pw in the mysql.user
    queryResult = isThereUser(usr_id, usr_pw_sha512);
    //if there's a user then grant user a session
    if(queryResult==1){
        req.session.displayName=usr_id;
        req.session.loginData=req.session.save(error=>{if(error) console.log(error)});
        res.json({message : 'login success'});
    }

    //else if there's a user matches with id info, then show alert "id or pw is incorrect"
    //else, show alert "please register"

    //로그인이 완료되면 Anal_1.html로 리디렉션
    else;
}

//function which searches whether there's a user matches with the given parameter(id, pw)
function isThereUser(id, pw){
    const searchSql='SELECT usr_id, usr_pw FROM usr_db.users WHERE usr_id=?';
    db.query(searchSql, id, function(err, rows, field){
        if(err) console.log(err);
        else if(rows.length>0) //id exists
        {
            if(rows.usr_pw == pw) //user certificated
            {
                return 1;
            }
            else{//password is wrong
                return 0;
            }
        }
        else return -1; //id is not exist
    })
}