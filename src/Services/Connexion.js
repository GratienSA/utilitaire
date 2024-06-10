
const mysql = require("mysql2/promise");
const dbConfig = require("../Utils/dbConfig");

let connection = null;

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  password: dbConfig.password,
  waitForConnections: true,
  multipleStatements: true
});

function connect(callback) {
  if (connection === null) {
    connection = mysql.createConnection(pool.config.connectionConfig);
    connection.connect((err) => {
      if (err) {
        connection = null;
        callback(err);
      } else {
        callback();
      }
    }); 
  } else {
    callback();
  }
}

function db() {
  if (connection) {
    return connection;
  } else {
    return null;
  }
}

function closeConnect() {
  if (connection) {
    connection.end();
    connection = null;
  }
}

module.exports = { pool, connect, closeConnect };