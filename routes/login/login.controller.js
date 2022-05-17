const db= require('../serverConfig');
const crypto=require('crypto');
const session = require('express-session');
const { resolve } = require('path');

exports.login = async(req, res, next) => {
    const usr_id=req.body.userId.replace("'", "");
    const usr_pw=req.body.userPw.replace("'", "");
    const usr_pw_sha512 = crypto.createHash('sha512').update(usr_pw).digest('hex');
    var queryResult=0;
    //find whether there is a user matches id and pw in the mysql.user
    queryResult = await(isThereUser(usr_id, usr_pw_sha512));
    //if there's a user then grant user a session
    if(queryResult==1){
        req.session.displayName=usr_id;
        req.session.loginData=req.session.save(error=>{if(error) console.log(error)});
        res.sendFile('Anal_1.html', {root: 'public/htmls'});
    }

    //else if there's a user matches with id info, then show alert "id or pw is incorrect"
    //else, show alert "please register"

    //로그인이 완료되면 Anal_1.html로 리디렉션
    else;
}

//function which searches whether there's a user matches with the given parameter(id, pw)
isThereUser=(id, pw)=>{
    return new Promise(async (resolve, reject) => {
        const searchSql='SELECT usr_id, usr_pw FROM usr_db.users WHERE usr_id=?';
        db.query(searchSql, id, function(err, rows, field){
            if(err) console.log(err);
            console.log(rows);
            if(rows.length>0) //id exists
            {
                if(rows[0].usr_pw == pw) //user certificated
                {
                    resolve(1);
                }
                else{//password is wrong
                    resolve(0);
                }
            }
            else resolve(-1); //id is not exist
        })
    })

}