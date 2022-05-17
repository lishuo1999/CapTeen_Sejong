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
        req.session.userName=usr_id;
        req.session.save(error=>{if(error) console.log(error)});
        console.log(req.session);
        res.sendFile('Anal_1.html', {root: 'public/htmls'});
    }

    //else if there's a user matches with id info, then show alert "id or pw is incorrect"
    if(queryResult==0){
        res.send(`<script>alert('Please check your ID or PW');location.href=document.referrer;</script>`);
    }

    //else, show alert "please register"
    else{
        res.send(`<script>alert('Please Register');location.href='/Join.html';</script>`);
    }
}

//function which searches whether there's a user matches with the given parameter(id, pw)
isThereUser=(id, pw)=>{
    return new Promise(async (resolve, reject) => {
        const searchSql='SELECT usr_id, usr_pw FROM usr_db.users WHERE usr_id=?';
        db.query(searchSql, id, function(err, rows, field){
            if(err) console.log(err);
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