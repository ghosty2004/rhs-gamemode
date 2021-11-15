/* =============================== */
/* SA:MP RHS GAMEMODE COPY VERSION
/* =============================== */

/* Modules */
const samp = require("samp-node-lib");
const mysql = require("mysql");
const colors = require("colors");

/* Custom Modules */
const events = require("./modules/events");
const Player = require("./modules/player");
const Dialog = require("./modules/dialog");

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

/* Command Handler */
const CMD = new events.Command();

/* SA:MP Events */
samp.OnPlayerConnect((player) => {

});

samp.OnPlayerDisconnect((player, reason) => {

});

samp.OnPlayerSpawn((player) => {

});

samp.OnPlayerUpdate((player) => {
    return true;
});

samp.OnDialogResponse((player) => {

});