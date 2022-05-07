const db = require('../serverConfig');

exports.getJoinInfo = (req, res, next) => {
    //to remove '' from the body info
    var id=req.body.id.replace("'", "");
    var pw=req.body.pw.replace("'", "");
    var pn=req.body.pn.replace("'", "");
    var em=req.body.em.replace("'", "");

    //creating user on the database(mysql)
    const usrCreate = [id, pw];
    const param = [id, pw, pn, em];
    var create_sql='CREATE USER ?@\'%\' IDENTIFIED BY ?';
    db.query(create_sql, usrCreate, function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else
        {
            console.log("Success!");
        }
    } );

    //input user info into the mysql.user.phoneNum, mysql.user.email (I'll create those columns)
    //db.query('INSERT INTO ');
    //회원가입이 완료되면 login.html 로 리디렉션 해줘야 함.
}