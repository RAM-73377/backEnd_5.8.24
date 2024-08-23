const mysql = require('mysql2');
const config = require('./config.json');

const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.log("error db");
    return;
  }
  console.log("connected");
});

module.exports = db;
