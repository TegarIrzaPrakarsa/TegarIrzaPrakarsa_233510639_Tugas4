const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "vue_posts", 
});

module.exports = db;
