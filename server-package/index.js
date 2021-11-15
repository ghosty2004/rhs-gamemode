/* =============================== */
/* SA:MP RHS GAMEMODE COPY VERSION
/* =============================== */

/* Modules */
const mysql = require("mysql");
const colors = require("colors");

/* Data's */
const data = {
    mysql: require("./data/mysql.js")
}

/* Create MYSQL Connection */
const con = mysql.createConnection({
    host: data.mysql.host,
    user: data.mysql.user,
    password: data.mysql.password,
    database: data.mysql.database
});
con.connect((err) => {
    if(!err) console.log("MYSQL:".yellow + ` Connection successfully established.`.green);
    else {
        console.log("MYSQL:".yellow + ` Connection have been refused.`.red);
        process.exit();
    }
});