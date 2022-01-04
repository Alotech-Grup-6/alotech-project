let mysql = require("mysql");
require("dotenv").config();

// Define db info 
let config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
// Connect db 
conn = mysql.createConnection(config);
module.exports = conn;
