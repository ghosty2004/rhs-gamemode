const mysql = require("mysql");

const con = mysql.createPool({
    host: "host",
    user: "user",
    password: "password",
    database: "database"
});

con.query("SELECT 1 + 1 AS solution", (error) => {
    con.emit("mysqlConnect", error ? true : false);
});

module.exports = con;