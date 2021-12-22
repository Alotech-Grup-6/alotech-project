let mysql = require('mysql');
require('dotenv').config()


let config = {
    host    : process.env.HOST,
    user    : process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  
}
conn = mysql.createConnection(config);
module.exports=conn
