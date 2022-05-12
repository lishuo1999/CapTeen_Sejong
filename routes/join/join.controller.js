const db = require('../serverConfig');
const md5=require('md5');

exports.getJoinInfo = (req, res, next) => {
    //to remove '' from the body info
    var id=req.body.id.replace("'", "");
    var pw=req.body.pw.replace("'", "");
    var pn=req.body.pn.replace("'", "");
    var em=req.body.em.replace("'", "");
    var id_md5=md5(id);

    //creating user on the database(mysql)
    //password will be hashed naturally
    const usrCreate = [id, pw];
    const usrInsert = [id, pn, em, id_md5];
    var create_sql='CREATE USER ?@\'%\' IDENTIFIED BY ?';
    var checker =0;
    db.query(create_sql, usrCreate, function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else
        {
            console.log("User create success!");
            checker=1;
        }
    } );


    //input user info into the mysql.user.phoneNum, mysql.user.email (I'll create those columns)
    //plus, for the user table creation, hash(md5) users' id and save it in a column
    var insert_sql = 'INSERT INTO usr_db.users (usr_id, usr_phoneNum, usr_email, usr_id_md5) VALUES (?, ?, ?, ?)';
    if(checker==1) //to ban inputting information though can't create the user
    {
        db.query(insert_sql, usrInsert, function(err, rows, fields){
            if(err){
                console.log(err);
            }
            else{
                console.log("User information input success!");
            }
        })
    }

    //Create a table with the name md5(user_id)
    var create_table_sql=`CREATE TABLE table_`+id_md5+`(
    usr_risk_id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    assets_id int DEFAULT 0, FOREIGN KEY(assets_id) REFERENCES data_db.assets(id_assets) ON UPDATE CASCADE,
    vulns_id int DEFAULT 0, FOREIGN KEY(vulns_id) REFERENCES data_db.vulns(id_vulns) ON UPDATE CASCADE,
    threats_id int DEFAULT 0, FOREIGN KEY(threats_id) REFERENCES data_db.threats(id_threats) ON UPDATE CASCADE,
    usr_risk_rate int DEFAULT 0
    ) DEFAULT CHARSET UTF8 COMMENT 'newTable';`;
    db.query(create_table_sql, function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            console.log("User table is successfully made!");
        }
    })


    //granting user privileges only on the user's table
    var grant_sql=`GRANT SELECT, INSERT, DELETE, UPDATE ON usr_db.table_`+id_md5+` TO ?@'%';`;
    db.query(grant_sql, id, function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            console.log("Granting privileges on user is successed!");
        }
    })
    db.query(`FLUSH PRIVILEGES;`, function(err,rows,fields){
        if(err){
            console.log(err);
        }
        else{
            console.log("flushing privileges is successed!");
        }
    })

    //회원가입이 완료되면 login.html 로 리디렉션 해줘야 함.
    res.sendFile('Login.html', {root: 'public/htmls'});
}