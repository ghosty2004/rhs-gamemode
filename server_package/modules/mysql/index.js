const mysql = require("mysql");
const { config } = require("dotenv");
config();

const con = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

con.query("SELECT 1 + 1 AS solution", (error) => {
    con.emit("mysqlConnect", error ? true : false);
});

module.exports = con;