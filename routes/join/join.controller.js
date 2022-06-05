const db = require('../serverConfig');
const md5=require('md5');
const crypto=require('crypto');

exports.getJoinInfo = (req, res, next) => {
    //to remove '' from the body info
    var id=req.body.id.replace("'", "");
    const pw=req.body.pw.replace("'", "");
    var pn=req.body.pn.replace("'", "");
    var em=req.body.em.replace("'", "");
    var id_md5=md5(id);
    const pw_SHA512 = crypto.createHash('sha512').update(pw).digest('hex');
    const usrInsert = [id, pw_SHA512, pn, em, id_md5];
    
    //inserting user into the usr_db.users table
    var insert_sql = 'INSERT INTO usr_db.users (usr_id, usr_pw, usr_phoneNum, usr_email, usr_id_md5) VALUES (?, ?, ?, ?, ?)';

     db.query(insert_sql, usrInsert, function(err, rows, fields){
        if(err){
               console.log(err);
         }
         else{
              console.log("User information input success!");
         }
     })

    //Create a table with the name md5(user_id)
    var create_table_sql=`CREATE TABLE usr_db.table_`+id_md5+`(
    usr_risk_id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    big_assets_id int DEFAULT 0, FOREIGN KEY(big_assets_id) REFERENCES data_db.big_category_assets(id_b_cat_ass) ON UPDATE CASCADE,
    assets_id int DEFAULT 0, FOREIGN KEY(assets_id) REFERENCES data_db.assets(id_assets) ON UPDATE CASCADE,
    usr_assets_imp int DEFAULT 0,
    usr_assets_rate int DEFAULT 0,
    vulns_id int DEFAULT 0, FOREIGN KEY(vulns_id) REFERENCES data_db.vulns(id_vulns) ON UPDATE CASCADE,
    usr_vulns_rate int DEFAULT 0,
    threats_id int DEFAULT 0, FOREIGN KEY(threats_id) REFERENCES data_db.threats(id_threats) ON UPDATE CASCADE,
    usr_threats_spend int DEFAULT 0,
    usr_threats_rate int DEFAULT 0,
    usr_risk_rate int DEFAULT 0,
    usr_risk_mng_id int DEFAULT 0
    ) DEFAULT CHARSET UTF8 COMMENT 'newTable';`;
    db.query(create_table_sql, function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            console.log("User table is successfully made!");
        }
    })

    //회원가입이 완료되면 login.html 로 리디렉션 해줘야 함.
    res.sendFile('Login.html', {root: 'public/htmls'});
}