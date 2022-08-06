```js
const mysql = require("mysql");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "rhs"
});

con.query("SELECT 1 + 1 AS solution", (error) => {
    con.emit("mysqlConnect", error ? true : false);
});

module.exports = con;
```