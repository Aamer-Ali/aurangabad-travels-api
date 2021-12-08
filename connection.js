const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "db_aurangabad_travles",
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Databse Connection Extablished Successfully");
});

module.exports = connection;
