const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database:'play',
  });
con.connect((err) => {
   if (err) {
     return console.log(err);
   }
   console.log("connected");
 });

module.exports = con;
