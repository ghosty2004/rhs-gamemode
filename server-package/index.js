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

/* SA:MP Commands */
CMD.on("credits", (player, params) => {
    
});

/* SA:MP Events */
samp.OnPlayerConnect((player) => {
    Player.ResetVariables(player);
});

samp.OnPlayerDisconnect((player, reason) => {
    Player.ResetVariables(player);
});

samp.OnPlayerSpawn((player) => {

});

samp.OnPlayerUpdate((player) => {
    return true;
});

samp.OnDialogResponse((player) => {

});

samp.OnPlayerCommandText((player, cmdtext) => {
    cmdtext = cmdtext.toLowerCase(); /* Convert the char to lower case */
    cmdtext = replaceAll(cmdtext, "/", ""); /* Replace slash to empty char */
    let params = cmdtext.split(/[ ]+/);
    let temp_string = params[0];

    if(CMD.eventNames().some(s => s == temp_string)) {
        params.shift();
        CMD.emit(`${temp_string}`, player, params);
    }
    else player.SendClientMessage(0xFF0000, `Comanda {BBFF00}/${temp_string}{FF0000} nu exista! Foloseste {BBFF00}/help{FF0000} sau {BBFF00}/cmds{FF0000}!`);
});