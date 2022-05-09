const mysql = require('mysql');

//should change below after the real world implementation
const db = mysql.createConnection({
    host : "localhost",
    user : 'root', //for now it is the root user, but gotta make a new user with limited privileged role 
    password:'password',
    port:3306,
    database:'usr_db'
})

db.connect();

module.exports = db;