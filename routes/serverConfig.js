const mysql = require('mysql');

//should change below after the real world implementation
const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password:'root',
    port:3306,
    database:'dbs'
})

db.connect();

module.exports = db;