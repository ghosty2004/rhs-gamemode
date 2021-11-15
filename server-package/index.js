/* =============================== */
/* SA:MP RHS GAMEMODE COPY VERSION
/* =============================== */

/* Modules */
const samp = require("samp-node-lib");
const mysql = require("mysql");
const colors = require("colors");
const md5 = require("md5");

/* Custom Modules */
const events = require("./modules/events");
const Player = require("./modules/player");
const Dialog = require("./modules/dialog");
const Streamer = require("./modules/streamer");

/* Server Maps */
require("./maps");

/* Data's */
const data = {
    mysql: require("./data/mysql"),
    settings: require("./data/settings"),
    colors: require("./data/colors")
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
CMD.on("help", (player) => {
    let info = "";
    info += `${data.settings.SERVER_NAME} {00FF00}${Player.Info[player.playerid].Language == 1 ? "este unul din cele mai noi servere de GTA San Andreas MultiPlayer din Romania!" : "is one of the newest GTA San Andreas MultiPlayer servers from Romania!"}\n`;
    info += `{00FF00}${Player.Info[player.playerid].Language == 1 ? "Pe server-ul nostru gasesti o groaza de moduri de joc, care te vor face sa te distrezi ore intregi pe server-ul nostru, precum si" : "On our server you can find lot of Game Modes, wich will let you have fun lot of hours, as well as"}\n`;
    info += `{00FF00}${Player.Info[player.playerid].Language == 1 ? "un Staff capabil ce va asigura 24/24 buna dispozitie a jucatorilor!" : "a capable Staff capabil wich will ensure fun 24/24 for the players!"}\n`;
    info += "\n";
    info += `{00BBF6}Mai jos ai o lista cu cateva comenzi folositoare de pe server!:\n`;
    info += `{00BBF6}/Rules {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "O lista cu regulament-ul server-ului nostru." : "A list with all server's rules."}\n`;
    info += `{00BBF6}/Cmds {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "O lista cu comenzile server-ului nostru." : "A list with all server's commands."}\n`;
    info += `{00BBF6}/Credits {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "O lista cu cei ce au ajutat la crearea server-ului nostru." : "A list with the persons wich helped on server's creating."}\n`;
    info += `{00BBF6}/Teles {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "O lista cu toate teleportarile de pe server." : "A list with all server's teleports."}\n`;
    info += `{00BBF6}/Admins {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "O lista cu toti Adminii Online de pe server." : "A list with all online Admins from the server."}\n`;
    info += `{00BBF6}/Report [ID][Motiv] {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "O comanda ce iti permite sa raportezi un jucator care nu respecta regulamentul!" : "A command wich help you report a player that is not respecting the /Rules!"}\n`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, `${Player.Info[player.playerid].Language == 1 ? "Ajutor" : "Help"}`, info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", "");
});

CMD.on("rules", (player) => {

});

CMD.on("cmds", (player) => {
    let info = "";
    info += `${data.settings.SERVER_NAME} ${Player.Info[player.playerid].Language == 1 ? "{00FF00}- Comenzi!" : ""}\n`;
    info += `{00FF00}${Player.Info[player.playerid].Language == 1 ? "{00FF00}Toate comenzile pot fi folosite apasand T, ` sau F6. Citeste-le pe toate!" : "All the commands can be used by pressing T, ` or F6! Read all of them!"}\n`;
    info += "\n";
    info += `{FFCC00}/CreateClan {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Creaza-ti propriul clan!" : "Create your own clan!"}\n`;
    info += `{FFCC00}/v, /car, /nrg {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Spawneaza un vehicul." : "Spawn a vehicle."}\n`;
    info += `{FFCC00}/ro, /eng {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti limba de afisare a server-ului!" : "Change server's language!"}\n`;
    info += `{FFCC00}/htds {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Ascunde/afisaza TextDraw-urile." : "Show/Hide server's TextDraws."}\n`;
    info += `{FFCC00}/spassword {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Securizeaza-ti cont-ul cu 2 parole!" : "Secure your account with 2 passwords!"}\n`;
    info += `{FFCC00}/skin {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Aceasta comanda te ajuta sa iti schimbi skin-ul." : "This command let you to change your skin."}\n`;
    info += `{FFCC00}/anim {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Fa diferite actiuni interesante!" : "Make some interesting actions!"}\n`;
    info += `{FFCC00}/changename {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti numele fara sa iti pierzi /stats-ul!" : "Change your Nickname without losing your /stats!"}\n`;
    info += `{FFCC00}/trade {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Fa afaceri cu ceilalti jucatori de pe server!" : "Make trades with server's players!"}\n`;
    info += `{FFCC00}/brb, /back {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti modul din BRB in Playing si invers." : "Change your mode from BRB to Playing and reverse."}\n`;
    info += `{FFCC00}/accept, /decline {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Accepta/Respinge orice fel de invitatie." : "Accept/Decline any invitation."}\n`;
    info += `{FFCC00}/vips {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Vezi lista cu VIP-ii conectati." : "View the Online VIPs List."}\n`;
    info += `{FFCC00}/mp3 {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Asculta ceva muzica buna in timp ce te joci!" : "Listen some good music while playling!"}\n`;
    info += `{FFCC00}/kill {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Nu iti place viata ? Sinucide-te! =)" : "You don't like your life ? Kill yourself! =)"}\n`;
    info += `{FFCC00}/jetpack {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Ia-ti gratis un Jetpack." : "Get for free a Jetpack."}\n`;
    info += `{FFCC00}/getid {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Afla ID-ul unui jucator in functie de nume." : "Get player's ID by knowing his name."}\n`;
    info += `{FFCC00}/myint {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti Interiorul." : "Change your Interior."}\n`;
    info += `{FFCC00}/vworld {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti Virtual World-ul." : "Change your Virtual World."}\n`;
    info += `{FFCC00}/GodP {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Vezi ce jucatori au God Mode-ul Activat!" : "View the God Mode On Players List!"}\n`;
    info += `{FFCC00}/house {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Vezi detaliile/setarile casei." : "View House's Details/Settings."}\n`;
    info += `{FFCC00}/Business {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Vezi detaliile/setarile proprietatii." : "View Business's Details/Settings."}\n`;
    info += `{FFCC00}/leave {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Paraseste un DM/Race/Minigame/Job." : "Leave a DM/Race/Minigame/Job."}\n`;
    info += `{FFCC00}/int {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Vezi o lista cu toate interioarele de pe server-ul nostru." : "View a list of all server's interiors."}\n`;
    info += `{FFCC00}/weapons {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Cumpara-ti niste 'jucarii'." : "Buy some 'toys'."}\n`;
    info += `{FFCC00}/fweapons {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Cumpara-ti niste 'jucarii' de copii mici." : "Buy some kids 'toys'."}\n`;
    info += `{FFCC00}/bweapons {00FF00}- ${Player.Info[player.playerid].Language == 1 ? "Cumpara-ti niste 'jucarii' de baieti mari. :))" : "Buy some big boys 'toys'. :))"}\n`;
    player.ShowPlayerDialog(Dialog.CMDS_1, samp.DIALOG_STYLE.MSGBOX, Player.Info[player.playerid].Language == 1 ? "Comenzi - Pagina {FF0000}1" : "Commands - Page {FF0000}1", info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", Player.Info[player.playerid].Language == 1 ? "Pagina 2" : "Page 2");
});

CMD.on("credits", (player) => {
    let info = "";
    info += `{00BBF6}${Player.Info[player.playerid].Language == 1 ? "Mai jos ai o lista cu cei ce au contribuit la crearea acestui server:" : "Before is a list with server's creators:"}\n`;
    info += "\n";
    info += "{FF0000}Scripter:\n";
    info += "{15FF00}Voller.\n";
    info += "\n";
    info += `{0072FF}${Player.Info[player.playerid].Language == 1 ? "Proprietari:" : "Owners:"}\n`;
    info += "{15FF00}Voller.\n";
    info += "\n";
    info += `{FF0000}${Player.Info[player.playerid].Language == 1 ? "Creatorii Hartilor:" : "Maps Creators:"}\n`;
    info += "{15FF00}[9mm]_LimiTLesS_\n";
    info += "{15FF00}+ Alti\n";
    info += "\n";
    info += `{0072FF}Site & Forum ({FFFF00}${data.settings.SERVER_WEB}{0072FF}):\n`;
    info += "{15FF00}L0g1k.\n";
    info += "{15FF00}iuda.\n";
    info += "{15FF00}Invision Power Board Team\n";
    info += "\n";
    info += `{FF0000}${Player.Info[player.playerid].Language == 1 ? "Multumiri Speciale:" : "Special Thanks:"}\n`;
    info += "{15FF00}TheRullZ_\n";
    info += "{15FF00}L0g1k\n";
    info += "{15FF00}[9mm]_LimiTLesS_";
    info += "\n";
    info += `{0072FF}${Player.Info[player.playerid].Language == 1 ? "Cel mai bun jucator:" : "Best Player:"}\n`;
    info += `{15FF00}${player.GetPlayerName(24)}\n`;
    info += "\n";
    info += `{00BBF6}${Player.Info[player.playerid].Language == 1 ? `Multumim, {FF0000}${player.GetPlayerName(24)}{00BBF6}, pentru ca joci pe server-ul nostru!` : `Thank you, {FF0000}${player.GetPlayerName(24)}{00BBF6}, for playing on our server!`}`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, `${Player.Info[player.playerid].Language == 1 ? "Creatori" : "Credits"}`, info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", "");
});

CMD.on("teles", (player) => {

});

CMD.on("admins", (player) => {

});

CMD.on("report", (player, params) => {

});

/* SA:MP Functions */
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function PreparatePlayerLogin(player) {
    con.query("SELECT * FROM users WHERE name = ?", [player.GetPlayerName(24)], function(err, result) {
        if(err) return player.Kick();
        if(result == 0) { /* Register */
            player.ShowPlayerDialog(Dialog.REGISTER, samp.DIALOG_STYLE.PASSWORD, "Inregistreaza-ti numele!", `{FFFF00}Salut, {FF0000}${player.GetPlayerName(24)}{FFFF00}!\n\n{FFCC00}Numele tau nu este inregistrat. Te rugam sa-l inregistrezi pentru a-ti salva statisticile!\n{FFFF00}Introdu o parola grea pe care doar tu sa o stii pentru a te autentifica! ({FF0000}intre 3-25 de caractere{FFFF00}):`, "Register", "Nume Nou");
        }
        else { /* Login */
            player.ShowPlayerDialog(Dialog.LOGIN, samp.DIALOG_STYLE.PASSWORD, "Autentificare", `{FFFF00}Bine ai revenit {FF0000}${player.GetPlayerName(24)}{FFFF00}!\n\n{FFCC00}Trebuie sa te autentifici cu parola acestui cont inainte de a continua!\n{FFFF00}Daca acesta nu este numele contului tau, apasa pe butonul {FF0000}Nume Nou{FFFF00}!`, "Autentificare", "Nume Nou");
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function Call_NewName(player) {
    player.ShowPlayerDialog(Dialog.NEW_NAME, samp.DIALOG_STYLE.INPUT, "Change Name", "{BBFF00}Please enter below new nickname wich you want to have\n{FFFF00}This name need to between {FF0000}3-20{FFFF00} characters long!:", "Change", "Random Name");
}

function LoadPlayerStats(player) {
    con.query("SELECT * FROM users WHERE name = ?", [player.GetPlayerName(24)], function(err, result) {
        if(!err && result) {  
            Player.Info[player.playerid].LoggedIn = true;
            Player.Info[player.playerid].Admin = result[0].admin;

            let info = "";
            info += `{BBFF00}Salut {FF0000}${player.GetPlayerName(24)}{BBFF00}!\n`;
            info += "{BBFF00}Ai fost autentificat cu succes!\n";
            info += "\n";
            info += `{BBFF00}Admin: ${Player.Info[player.playerid].Admin ? "{00FF00}Yes" : "{FF0000}No"}\n`;
            info += "{BBFF00}VIP: {FF0000}No\n";
            info += "{BBFF00}Nota Statistici: {FF0000}0{BBFF00}/{FF0000}10 {BBFF00}- Rank: {FF0000}{42bff4}Noob\n";
            info += "\n";
            info += "{BBFF00}Pentru mai multe statistici, foloseste {FF0000}/stats{BBFF00}.\n";
            info += "\n";
            info += "{FF0000}Mesaj {FF9900}URGENT {FF0000}pentru siguranta contului tau:\n";
            info += "{FFFFFF}In contul tau nu exista o parola secundara!\n";
            info += "{FFFFFF}Pentru a evita pierderea contului tau,\n";
            info += "{FFFFFF}Adauga o parola secundara folosind comanda {FF0000}/Spassword{FFFFFF}!";

            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Contul meu", info, "Ok", "");
        }
        else player.Kick();
    });
}

/* SA:MP Events */
samp.OnPlayerConnect((player) => {
    Player.ResetVariables(player);
    player.ShowPlayerDialog(Dialog.SELECT_LANGUAGE, samp.DIALOG_STYLE.MSGBOX, "{00BBF6}Language {FF0000}/ {00BBF6}Limba", `{FFFF00}Welcome to ${data.settings.SERVER_NAME}{FFFF00}, {00BBF6}${player.GetPlayerName(24)}{FFFF00}!\n{FFFF00}Please select your language to continue!`, "Romana", "English");
});

samp.OnPlayerDisconnect((player, reason) => {
    Player.ResetVariables(player);
});

samp.OnPlayerSpawn((player) => {
    
});

samp.OnPlayerUpdate((player) => {
    return true;
});

samp.OnDialogResponse((player, dialogid, response, listitem, inputtext) => {
    switch(dialogid) {
        case Dialog.NEW_NAME: {
            if(response) {
                if(inputtext.length < 3 || inputtext.length > 20) return Call_NewName(player);
                player.SetPlayerName(inputtext);
                PreparatePlayerLogin(player);
            }
            else {
                let tag = getRandomInt(1, 99999);
                player.SetPlayerName(`[${tag}]TempName`);
                PreparatePlayerLogin(player);
            }
            break;
        }
        case Dialog.LOGIN: {
            if(response) {
                con.query("SELECT * FROM users WHERE name = ? AND password = ?", [player.GetPlayerName(24), md5(inputtext)], function(err, result) {
                    if(!err) {
                        if(result == 0) {
                            Player.Info[player.playerid].Fail_Logins++;
                            if(Player.Info[player.playerid].Fail_Logins == 3) player.Kick();
                        }
                        else LoadPlayerStats(player);
                    }
                    else player.Kick();
                });
            }
            else Call_NewName(player);
            break;
        }
        case Dialog.AFTER_REGISTER: {
            break;
        }
        case Dialog.REGISTER: {
            if(response) {
                con.query("INSERT INTO users (name, password) VALUES(?, ?)", [player.GetPlayerName(24), md5(inputtext)], function(err, result) {
                    if(!err) {
                        player.ShowPlayerDialog(Dialog.AFTER_REGISTER, samp.DIALOG_STYLE.MSGBOX, "Inregistrare {BBFF00}Reusita!", `{BBFF00}Salut {FF0000}${player.GetPlayerName(24)}{BBFF00}!\n{BBFF00}Te-ai inregistrat cu succes pe server-ul ${data.settings.SERVER_NAME}{BBFF00}!\n{BBFF00}Tine minte! De cate ori vei reveni, va trebuii sa te autentifici cu parola: {FF0000}${inputtext}{BBFF00}!\n\n{FFFF00}Pentru mai multe informatii, click pe buton-ul {FF0000}Ajutor{FFFF00}.\n{FFFF00}De asemenea, nu uita sa ne vizitezi si website-ul si forum-ul nostru la adresa {FF0000}${data.settings.SERVER_WEB}{FFFF00}!`, "Inchide", "Ajutor!");
                    }
                    else player.Kick();
                });
            }
            else Call_NewName(player);
            break;
        }
        case Dialog.SELECT_LANGUAGE: {
            Player.Info[player.playerid].Language = response;
            PreparatePlayerLogin(player);
            break;
        }
    }
});

samp.OnPlayerCommandText((player, cmdtext) => {
    if(Player.Info[player.playerid].LoggedIn) {
        cmdtext = cmdtext.toLowerCase(); 
        cmdtext = replaceAll(cmdtext, "/", ""); 
        let params = cmdtext.split(/[ ]+/);
        let temp_string = params[0];
        if(CMD.eventNames().some(s => s == temp_string)) {
            params.shift();
            CMD.emit(`${temp_string}`, player, params);
        }
        else player.SendClientMessage(data.colors.RED, `Comanda {BBFF00}/${temp_string}{FF0000} nu exista! Foloseste {BBFF00}/help{FF0000} sau {BBFF00}/cmds{FF0000}!`);
    }
    return true;
});