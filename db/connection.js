const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootr00t!",
  database: "employeetracker",
});

module.exports = connection;
