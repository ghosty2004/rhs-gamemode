/* =============================== */
/* SA:MP RHS GAMEMODE COPY VERSION
/* =============================== */

/* Modules */
const samp = require("samp-node-lib");
const mysql = require("mysql");
const colors = require("colors");
const md5 = require("md5");

/* Custom Modules */
const Clan = require("./modules/clan");
const Dialog = require("./modules/dialog");
const Errors = require("./modules/errors");
const events = require("./modules/events");
const Player = require("./modules/player");
const Streamer = require("./modules/streamer");

/* Server Maps */
const Maps = require("./maps");

/* Server TextDraws */
const TextDraws = require("./textdraws");

/* Data's */
const data = {
    mysql: require("./data/mysql"),
    settings: require("./data/settings"),
    colors: require("./data/colors"),
}

/* Create MYSQL Connection */
const con = mysql.createConnection({
    host: data.mysql.host,
    user: data.mysql.user,
    password: data.mysql.password,
    database: data.mysql.database
});
con.connect((err) => {
    if(!err) {
        console.log("MYSQL:".yellow + ` Connection successfully established.`.green);
        LoadFromDB();
    }
    else {
        console.log("MYSQL:".yellow + ` Connection have been refused.`.red);
        process.exit();
    }
});

/* ============== */
/* SA:MP Commands */
/* ============== */
const CMD = new events.Command();

/* Player's Commands */
CMD.on("buyvip", (player) => {
    let info = `${Lang(player, "Item\tPret\tValabilitate", "Item\tPrice\tValidity")}\n`;
    info += `${Lang(player, "{FF0000}Rosu\t{00BBF6}Gratis!\t{00FF00}Permanent!", "{FF0000}Red\t{00BBF6}Free!\t{00FF00}Permanent!")}\n`;
    info += `${Lang(player, "{FFFF00}Galben\t{BBFF00}20.000 Coins + 20 Ore\t{00FF00}Permanent!", "{FFFF00}Yellow\t{BBFF00}20.000 Coins + 20 Hours\t{00FF00}Permanent!")}\n`;
    info += `${Lang(player, "{0077FF}Albastru\t{BBFF00}80.000 Coins + 80 Ore\t{00FF00}Permanent!", "{0077FF}Blue\t{BBFF00}80.000 Coins + 80 Hours\t{00FF00}Permanent!")}\n`;
    info += `${Lang(player, "{FFFFFF}Alb\t{BBFF00}150.000 Coins + 150 Ore\t{00BBF6}30 Zile!", "{FFFFFF}White\t{BBFF00}150.000 Coins + 150 Hours\t{00BBF6}30 Days!")}`;
    player.ShowPlayerDialog(Dialog.BUYVIP, samp.DIALOG_STYLE.TABLIST_HEADERS, Lang(player, "Cumpara VIP - Scrie {FF0000}/vcmds {D1D1D1}pentru comenzi.", "Buy VIP - Type {FF0000}/vcmds {D1D1D1}for commands."), info, Lang(player, "Cumpara", "Buy"), Lang(player, "Inchide", "Close"));
});

CMD.on("ranks", (player) => {
    let info = "";
    info += "{FFFFFF}Rank\t{FF0000}Kills\t\t{FF0000}Drift points\t{FF0000}Race points\t{FF0000}Stunt points\n";
    info += "{FF6600}Beginner\t{FFFFFF}1+\t\t{FFFFFF}1+\t{FFFFFF}1+\t{FFFFFF}1+\n";
    info += "{FF9900}Advanced\t{FFFFFF}500+\t\t{FFFFFF}1500+\t{FFFFFF}100+\t{FFFFFF}100+\n";
    info += "{FFFF00}Specialist\t{FFFFFF}3000+\t\t{FFFFFF}10000+\t{FFFFFF}1000+\t{FFFFFF}1000+\n";
    info += "{00FF00}Master\t{FFFFFF}10000+\t\t{FFFFFF}100000+\t{FFFFFF}4000+\t{FFFFFF}2000+\n";
    info += "{0072FF}King\t{FFFFFF}20000+\t\t{FFFFFF}300000+\t{FFFFFF}8000+\t{FFFFFF}5000+";
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Stats Ranks", info, "Close", "");
});

CMD.on("ro", (player) => {
    player.SendClientMessage(data.colors.YELLOW, "Ti-ai schimbat limba in {FF0000}Romana{FFFF00}!");
    Player.Info[player.playerid].Language = 1;
});

CMD.on("eng", (player) => {
    player.SendClientMessage(data.colors.YELLOW, "You changed your language in {FF0000}English{FFFF00}!");
    Player.Info[player.playerid].Language = 2;
});

CMD.on("stats", (player) => {
    let info = "";
    info += "{FF4800}General statistics\n";
    info += `{BBFF00}Money: {49FFFF}$${Player.Info[player.playerid].Money}\n`;
    info += `{BBFF00}Coins: {49FFFF}${Player.Info[player.playerid].Money}\n`;
    info += `{BBFF00}Respect: {49FFFF}+${Player.Info[player.playerid].Respect.Positive} {BBFF00}/ {49FFFF}-${Player.Info[player.playerid].Respect.Negative}\n`;
    info += `{BBFF00}Online time: {49FFFF}0 {BBFF00}hrs, {49FFFF}0 {BBFF00}mins, {49FFFF}0 {BBFF00}secs\n`;
    info += `{BBFF00}Admin: ${Player.Info[player.playerid].Admin ? `{49FFFF}Yes{BBFF00}- ${getAdminRank(Player.Info[player.playerid].Admin)}` : "{FF0000}No"}\n`;
    info += `{BBFF00}VIP: ${Player.Info[player.playerid].VIP ? `{49FFFF}Yes {BBFF00}- ${getVIPRank(Player.Info[player.playerid].VIP)}` : "{FF0000}No"}\n`;
    info += "\n";
    info += "{FF4800}Killer statistics\n";
    info += `{BBFF00}Kills: {49FFFF}${Player.Info[player.playerid].Kills_Data.Kills} {BBFF00}| Headshots: {49FFFF}${Player.Info[player.playerid].Kills_Data.HeadShots}\n`;
    info += `{BBFF00}Killing Spree: {49FFFF}${Player.Info[player.playerid].Kills_Data.KillingSpree} {BBFF00}| Best Killing Spree: {49FFFF}${Player.Info[player.playerid].Kills_Data.BestKillingSpree}\n`;
    info += `{BBFF00}Deaths: {49FFFF}${Player.Info[player.playerid].Kills_Data.Deaths}\n`;
    info += `{BBFF00}Killer Rank: ${getRanksRankName("kills", Player.Info[player.playerid].Kills_Data.Kills)}\n`;
    info += "\n";
    info += `{FF4800}Driving skills\n`;
    info += `{BBFF00}Drift Points: {49FFFF}${Player.Info[player.playerid].Driving_Data.DriftPoints} {BBFF00}(${getRanksRankName("drift", Player.Info[player.playerid].Driving_Data.DriftPoints)}{BBFF00})\n`;
    info += `{BBFF00}Stunt Points: {49FFFF}${Player.Info[player.playerid].Driving_Data.StuntPoints} {BBFF00}(${getRanksRankName("stunt", Player.Info[player.playerid].Driving_Data.StuntPoints)}{BBFF00})\n`;
    info += `{BBFF00}Race Points: {49FFFF}${Player.Info[player.playerid].Driving_Data.RacePoints} {BBFF00}(${getRanksRankName("race", Player.Info[player.playerid].Driving_Data.RacePoints)}{BBFF00})\n`;
    info += "\n";
    info += "{FF4800}Properties\n";
    info += `{BBFF00}Business: ${Player.Info[player.playerid].Properties.Business ? "{49FFFF}Yes" : "{FF0000}No"}\n`;
    info += `{BBFF00}House: ${Player.Info[player.playerid].Properties.House ? "{49FFFF}Yes" : "{FF0000}No"}\n`;
    info += `{BBFF00}Personal Vehicle: {FF0000}No\n`;
    info += "\n";
    info += `{FF4800}Statistics note: {49FFFF}0{BBFF00}/{FF0000}10 {BBFF00}- Rank: {FF0000}{42bff4}Noob`
    player.ShowPlayerDialog(Dialog.STATS, samp.DIALOG_STYLE.MSGBOX, `{FF0000}${player.GetPlayerName(24)}{BBFF00}'s stats!`, info, "Ok", "Description");
});

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
CMD.on("ajutor", (player) => { CMD.emit("help", player); });

CMD.on("rules", (player) => {
    let info = "";
    info += `${Lang(player, "{FFEB7B}REGULAMENT {FF0000}- Ce iti este interzis sa faci pe server!", "{FFEB7B}RULES {FF0000}- What you are forbidden to do on server!")}\n`;
    info += "\n";
    info += `{FF0000}1 - {00BBF6}${Lang(player, "Utilizarea programelor/modurilor ce iti ofera avantaje fata de restul jucatorilor este strict interizsa!", "Use of programs/mods that gives you advantages in front of other players are forbidden!")}\n`;
    info += `{FF0000}2 - {00BBF6}${Lang(player, "Te rugam sa pastrezi un limbaj decent pe chat si respecta pe ceilalti altfel vei primii /mute sau chiar /ban.", "We ask you to keep a decent language on chat and respect others otherwise you will get muted or banned!")}\n`;
    info += `{FF0000}3 - {00BBF6}${Lang(player, "Nu ai voie sa faci spam in chat!Pentru anunturi te rog sa folosesti doar /ad /vad.", "You are not allowed to spam the chat!For announces use /ad or /vad only.")}\n`;
    info += `{FF0000}4 - {00BBF6}${Lang(player, "Nu abuzati de buguri. Daca ai gasit un bug, raporteaza-l imediat unui Owner.", "Dont abuse of server bugs.If you find any bug,please report it as fast as you can to a Owner.")}\n`;
    info += `{FF0000}5 - {00BBF6}${Lang(player, "Nu faceti DM/Death Match in zonele cu mod de joc diferit fata de deathmatch.(ex:/aa /plaja /drag...etc)", "Dont kill players outside the deatmatch zones like /aa /beach /drag...and so on.")}\n`;
    info += `{FF0000}6 - {00BBF6}${Lang(player, "Nu ai voie sa faci reclama altor servere comunitati sau canale de youtube unde jucatorii pot fi indrumati spre alte servere.", "You are not allowed to advertise other servers,communities or youtube channels that might lead players to other servers.")}\n`;
    info += "\n";
    info += `{FFFF00}${Lang(player, "Acestea sunt doar cateva din regulile generale ale serverului!", "Those are only a few rules that you should know!")}\n`;
    info += `{FFFF00}${Lang(player, "Pentru mai multe reguli si informatii despre ce ai si ce nu ai voie sa faci pe server foloseste comanda {FFEB7B}/important{FFFF00}.", "For more rules and infos about what you are allowed to do and not, use {FFEB7B}/important {FFFF00}cmd.")}\n`;
    info += "\n";
    info += `{FFEB7B}${Lang(player, "Iti multumim pentru ca ti-ai dedicat un minut din viata citind aceste reguli! Iti dorim distractie placuta!", "Thank you for dedicating a minute of your life to read these rules! Have fun!")}`;
    player.ShowPlayerDialog(Dialog.RULES, samp.DIALOG_STYLE.MSGBOX, `${data.settings.SERVER_NAME} {FFEB7B}- ${Lang(player, "Reguli", "Rules")}!`, info, Lang(player, "Inchide", "Close"), "Important");
});

CMD.on("tutorial", (player) => {
    let info = "";
    switch(Player.Info[player.playerid].Language) {
        case 1: {
            info += "{FFFFFF}Bine ai venit!\n";
            info += "{0072FF}Scopul tau pe server este sa atingi Stats Note 10/10.\n";
            info += "{0072FF}Pentru a-ti atinge scopul este nevoie ca tu sa ai urmatoarele lucruri:\n";
            info += "\n";
            info += "{BBFF00}1000 Stunt Points {00BBF6}- /ss pentru a face Stunt Points.\n";
            info += "{BBFF00}1000 Drift Points {00BBF6}- /Drifts pentru a face Drift Points.\n";
            info += "{BBFF00}1000 Race Points {00BBF6}- /Races pentru a face Race Points.\n";
            info += "{BBFF00}1000 Kills {00BBF6}- /DM pentru a face killuri.\n";
            info += "{BBFF00}100 Best Killing Spree {00BBF6}- /DM pentru a face Killing Spree.\n";
            info += "{BBFF00}100 Ore jucate pe server {00BBF6}- /Stats pentru a vedea cate ore ai.\n";
            info += "{BBFF00}50 Respect Points {00BBF6}- Roaga jucatorii sa-ti ofere puncte de respect.\n";
            info += "{BBFF00}O proprietate personala {00BBF6}- /Howto pentru a afla cum iti cumperi una.\n";
            info += "{BBFF00}O casa {00BBF6}- /Howto pentru a afla cum iti cumperi una.\n";
            info += "{BBFF00}25.000 de coins {00BBF6}- /Jobs sau /Minigames pentru a face coins.\n";
            info += "\n";
            info += "{0072FF}Pentru mai multe informatii scrie /Howto sau /Help.";
            break;
        }
        case 2: {
            info += "{FFFFFF}Welcome!\n";
            info += "{0072FF}Your purpose on our server is to make 10/10 Stats Note.\n";
            info += "{0072FF}To achieve that you must have the following items:\n";
            info += "\n";
            info += "{BBFF00}1000 Stunt Points {00BBF6}- /ss for Stunt Points\n";
            info += "{BBFF00}1000 Drift Points {00BBF6}- /Drifts for Drift Points.\n";
            info += "{BBFF00}1000 Race Points {00BBF6}- /Races for Race Points.\n";
            info += "{BBFF00}1000 Kills {00BBF6}- /DM to make kills.\n";
            info += "{BBFF00}100 Best Killing Spree {00BBF6}- /DM for Killing Spree.\n";
            info += "{BBFF00}100 hours played {00BBF6}- /Stats to see your hours.\n";
            info += "{BBFF00}50 Respect Points {00BBF6}- Politely ask players to /respect you.\n";
            info += "{BBFF00}A good business {00BBF6}- /Howto to find out how to buy one.\n";
            info += "{BBFF00}A decent house {00BBF6}- /Howto to find out how to buy one.\n";
            info += "{BBFF00}25.000 de coins {00BBF6}- /Jobs or /Minigames to make them.\n";
            info += "\n";
            info += "{0072FF}For more info please type /Howto or /Help.";
            break;
        }
    }
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, Lang(player, "Tutorial - Cum poti face 10/10 stats!", "Tutorial - How to make 10/10 stats!"), info, "Ok", "");
});

CMD.on("important", (player) => { ShowImportant(player, 1); });

CMD.on("cmds", (player) => {
    ShowCMDS(player, 1);
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
    let info = "Command\tDescription\n";
    info += "{49FFFF}/Stunts\t{BBFF00}Stunt Zones\n";
    info += "{49FFFF}/Jumps\t{BBFF00}Jumps Zones\n";
    info += "{49FFFF}/Dm\t{BBFF00}Death Match\n";
    info += "{49FFFF}/Int\t{BBFF00}Interiors\n";
    info += "{49FFFF}/Drifts\t{BBFF00}Drifts\n";
    info += "{49FFFF}/Races\t{BBFF00}Races\n";
    info += "{49FFFF}/Jobs\t{BBFF00}Jobs\n";
    info += "{49FFFF}/Minigames\t{BBFF00}MiniGames\n";
    info += "{49FFFF}/Challenges\t{BBFF00}Car Challenges\n";
    info += "{49FFFF}/Parkours\t{BBFF00}Parkours\n";
    info += "{49FFFF}/Partys\t{BBFF00}Party Places\n";
    info += "{49FFFF}/Splaces\t{BBFF00}Special Places\n";
    info += "{49FFFF}/Others\t{BBFF00}Other Places\n";
    info += "{49FFFF}/Sstunts\t{BBFF00}Simple Stunts";
    player.ShowPlayerDialog(Dialog.TELES, samp.DIALOG_STYLE.TABLIST_HEADERS, "Teleports category", info, "Select", "Close");
});

CMD.on("admins", (player) => {

});

CMD.on("report", (player, params) => {

});

/* VIPS Commands */
CMD.on("vcmds", (player, params) => {
    let info = "";

    let RED = "";
    RED += "{FF0000}/aStats, /Time, /Weather, /vAD\n";
    RED += "{FF0000}/Goto, /SpawnMe, /vClub, /vDisarm, /Fire\n";
    RED += "{FF0000}/Get, /CarColor, /GetID, /LockCar, /vCC\n";
    RED += "{FF0000}/CmyChat, /DoS, /MyColor, /vBike, /vAccount";

    let YELLOW = "";
    YELLOW += "{FFFF00}/S2, /L2, /S3, /L3, /Admins, /cHint, /ReNew\n";
    YELLOW += "{FFFF00}/Ignore, /MaxAmmo, /wSet, /Wgm, /VipChat\n";
    YELLOW += "{FFFF00}/Weaps, /GodMode, /(In)Visible, /vCar";

    let BLUE = "";
    BLUE += "{0072FF}/GodCar, /VipIsland, /ArmHel, /WriteColor\n";
    BLUE += "{0072FF}/Spec(Off), /vHeli, /vTank, /vHydra, /vMinigun, /Eject";

    let WHITE = "";
    WHITE += "{FFFFFF}/Highlight, /vHunter, /vRustler, /vSatchel, /vTag(Off)\n";
    WHITE += "{FFFFFF}/vWeapons, /CarText, /Tags, /SongForAll";

    switch(Player.Info[player.playerid].Language) {
        case 1: {
            info += "{FF0000}Rosu:\n";
            info += `${RED}\n`;
            info += "{00FF00}+ Apare in dreptul numelui tag-ul {FF0000}(VIP){00FF00}!\n";
            info += "\n";
            info += "{FFFF00}Galben:\n";
            info += `${YELLOW}\n`;
            info += "{00FF00}+ Apare in dreptul numelui tag-ul {FFFF00}(VIP){00FF00}!\n";
            info += "{00FF00}+ {00BBF6}Anti-Spam {00FF00}la chat scazut la 2 secunde.\n";
            info += "{00FF00}+ {00BBF6}Anti-Spam {00FF00}la comenzi scazut la 2 secunde.\n";
            info += "{00FF00}+ Limita de la {00BBF6}Speed Boost {00FF00}redusa la 10 secunde, puterea ridicata!\n";
            info += "{00FF00}+ {00BBF6}Imunitate {00FF00}la Anti-DriveBy.\n";
            info += "\n";
            info += "{0072FF}Albastru:\n";
            info += `${BLUE}\n`;
            info += "{00FF00}+ Apare in dreptul numelui tag-ul {0072FF}(VIP){00FF00}!\n";
            info += "{00FF00}+ Acces la {00BBF6}VUP Level 4{00FF00}!\n";
            info += "{00FF00}+ {00BBF6}Anti-Spam {00FF00}la chat scazut la o secunda.\n";
            info += "{00FF00}+ {00BBF6}Anti-Spam {00FF00}la comenzi scazut la o secunda.\n";
            info += "{00FF00}+ Limita de la {00BBF6}Speed Boost {00FF00}redusa la 5 secunde, puterea ridicata!\n";
            info += "\n";
            info += "{FFFFFF}Alb:\n";
            info += `${WHITE}\n`;
            info += "{00FF00}+ Apare in dreptul numelui tag-ul {FF0000}({FFFFFF}VIP{FF0000}){00FF00}!\n";
            info += "{00FF00}+ Acces la {00BBF6}Teleport pe mapa prin marker{00FF00}!\n";
            info += "{00FF00}+ {00BBF6}Anti-Spam {00FF00}la chat revocat.\n";
            info += "{00FF00}+ {00BBF6}Anti-Spam {00FF00}la comenzi revocat.\n";
            info += "{00FF00}+ Limita de la {00BBF6}Speed Boost {00FF00}redusa la 3 secunde, puterea ridicata la maxim!\n";
            info += "\n";
            info += "{FFFF00}Foloseste {FF0000}#Text {FFFF00}pentru a scrie in {FF0000}VIP Chat{FFFF00}!";
            break;
        }
        case 2: {
            info += "{FF0000}Red:\n";
            info += `${RED}\n`;
            info += "{00FF00}+ The {FF0000}(VIP){00FF00} tag shown ahead the name!\n";
            info += "\n";
            info += "{FFFF00}Yellow:\n";
            info += `${YELLOW}\n`;
            info += "{00FF00}+ The {FFFF00}(VIP){00FF00} tag shown ahead the name!\n";
            info += "{00FF00}+ Chat {00BBF6}Anti-Spam {00FF00}reduced to 2 seconds.\n";
            info += "{00FF00}+ Commands {00BBF6}Anti-Spam {00FF00}reduced to 2 seconds.\n";
            info += "{00FF00}+ {00BBF6}Speed Boost {00FF00}limit reduced to 10 seconds, power increased!\n";
            info += "{00FF00}+ {00BBF6}Immunity {00FF00}to Anti-DriveBy.\n";
            info += "\n";
            info += "{0072FF}Blue:\n";
            info += `${BLUE}\n`
            info += "{00FF00}+ The {0072FF}(VIP){00FF00} tag shown ahead the name!\n";
            info += "{00FF00}+ Access to {00BBF6}VUP Level 4{00FF00}!\n";
            info += "{00FF00}+ Chat {00BBF6}Anti-Spam {00FF00}reduced to 1 second.\n";
            info += "{00FF00}+ Commands {00BBF6}Anti-Spam {00FF00}reduced to 1 second.\n";
            info += "{00FF00}+ {00BBF6}Speed Boost {00FF00}limit reduced to 5 seconds, power increased!\n";
            info += "\n";
            info += "{FFFFFF}White:\n";
            info += `${WHITE}\n`;
            info += "{00FF00}+ The {FF0000}({FFFFFF}VIP{FF0000}){00FF00} tag shown ahead the name!\n";
            info += "{00FF00}+ Access to {00BBF6}Teleport to marker on the map{00FF00}!\n";
            info += "{00FF00}+ Chat {00BBF6}Anti-Spam {00FF00}removed.\n";
            info += "{00FF00}+ Commands {00BBF6}Anti-Spam {00FF00}removed.\n";
            info += "{00FF00}+ {00BBF6}Speed Boost {00FF00}limit reduced to 3 seconds, power increased to maximum!\n";
            info += "\n";
            info += "{FFFF00}Type {FF0000}#Text {FFFF00}to use the {FF0000}VIP Chat{FFFF00}!";
            break;
        }
    }

    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, Lang(player, "{FFCC00}Comenzi VIP - {FF0000}/BuyVIP, /Vips.", "{FFCC00}VIP Commands - {FF0000}/BuyVIP, /Vips."), info, Lang(player, "Inchide", "Close"), "");
});

/* Clans Commands */
CMD.on("chelp", (player) => {
    let info = "";
    info += "{FF0000}Founders/Owners Commands\n";
    info += "{BBFF00}/setrank {FFFF00}- To set the rank of a member of the clan!\n";
    info += "{BBFF00}/setspawn {FFFF00}- To set the clan spawn!\n";
    info += "{BBFF00}/setcskin {FFFF00}- To set the skin of a member/leader of the clan!\n";
    info += "\n";
    info += "{FF0000}Leaders Commands\n";
    info += "{BBFF00}/mkick {FFFF00}- To give off a member of the clan!\n";
    info += "{BBFF00}/invite {FFFF00}- Invite new members to the clan!\n";
    info += "\n";
    info += "{FF0000}Members Commands\n";
    info += "{BBFF00}/cad {FFFF00}- To give a notice to the members of the clan!\n";
    info += "{BBFF00}/cm {FFFF00}- To view online clan members.\n";
    info += "{BBFF00}/lclan {FFFF00}- To leave a clan!\n";
    info += "\n";
    info += "{FF0000}Simple Players Commands\n";
    info += "{BBFF00}/createclan {FFFF00}- To create a clan!\n";
    info += "{BBFF00}/clan {FFFF00}- To view clan commands!\n";
    info += "{BBFF00}/cinfo {FFFF00}- To see a member of a clan!";
    info += "\n";
    info += '{BBFF00}Use {FF0000}"!" {BBFF00}to use Clan Chat!';
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "{FFFFFF}Clan {FF0000}Commands", info, "Ok", "");
});

CMD.on("cinfo", async (player, params) => {
    let target = player;
    if(params[0]) target = getPlayer(params[0]);
    if(target) {
        let info = "";
        info += `{FF0000}${target.GetPlayerName(24)}{FFFF00}'s clan informations\n`;
        info += "\n";
        info += "{FFFF00}Informations\n";
        info += "{BBFF00}Total kills: {49FFFF}0\n";
        info += "{BBFF00}Total deaths: {49FFFF}0\n";
        info += `{BBFF00}Leaders skin: {49FFFF}${Clan.Info[Player.Info[target.playerid].Clan].skin.leader}\n`;
        info += `{BBFF00}Members skin: {49FFFF}${Clan.Info[Player.Info[target.playerid].Clan].skin.member}\n`;
        info += `{BBFF00}Creator: {33FFFF}${await getNameByAccID(Clan.Info[Player.Info[target.playerid].Clan].owner)}\n`;
        info += `{BBFF00}${player.GetPlayerName(24)}'s Rank: {33FFFF}${getClanRank(Player.Info[target.playerid].Clan_Rank)}\n`;
        info += "{BBFF00}Weapons:\n";
        info += "{FFFFFF}none, none, none, none, none, none\n";
        info += "\n";
        info += "{FFFF00}Type {FF0000}/cinfo [ID/Name]{FFFF00} to see others Clan Stats!";
        player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Clan Info", info, "Ok", "");
    }
    else SendError(player, Errors.PLAYER_NOT_CONNECTED);
});

CMD.on("lclan", (player) => {
    if(Player.Info[player.playerid].Clan) {
        if(Clan.Info[Player.Info[player.playerid].Clan].owner == Player.Info[player.playerid].AccID) {
            con.query("DELETE FROM clans WHERE id = ?", [Player.Info[player.playerid].Clan]);
            con.query("UPDATE users SET clan = 0 WHERE clan = ?", [Player.Info[player.playerid].Clan]);
            Clan.Delete(Player.Info[player.playerid].Clan);
            samp.getPlayers().filter(f => Player.Info[f.playerid].Clan == Player.Info[player.playerid].Clan).forEach((i) => {
                Player.Info[i.playerid].Clan = 0;
                SetupPlayerForSpawn(i);
            });
        } 
        else {
            Player.Info[i.playerid].Clan = 0;
            SetupPlayerForSpawn(player);
        }  
    }
    else SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
});

CMD.on("createclan", (player) => {
    if(Player.Info[player.playerid].Clan) return SendError(player, "You already have a Clan. Type /lclan to leave your current clan!");
    player.GameTextForPlayer("~n~~n~~n~~n~~n~~n~~n~~n~~r~~h~Create ~w~~h~your own ~g~~h~clan!", 4000, 4);
    player.ShowPlayerDialog(Dialog.CREATE_CLAN, samp.DIALOG_STYLE.INPUT, "{BBFF00}Create Clan", "{0072FF}You are now creating a clan!\nEnter below the name of your clan to continue...", "Continue", "Close");
});

/* Admins Commands */
CMD.on("gotop", (player, params) => {
    if(Player.Info[player.playerid].Admin >= 1) {
        if(!isNaN(params[0]) && !isNaN(params[1]) && !isNaN(params[2])) {
            const position = {
                x: parseInt(params[0]),
                y: parseInt(params[1]),
                z: parseInt(params[2])
            }
            player.SetPlayerPos(position.x, position.y, position.z);
        }
        else SendUsage(player, "/gotop [X] [Y] [Z]");
    }
    else SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

/* =============== */
/* SA:MP Functions */
/* =============== */
function getClanRank(RankID) {
    let string = "";
    switch(RankID) {
        case 1: string = "Member"; break;
        case 2: string = "Leader"; break;
        case 3: string = "Founder"; break;
    }
    return string;
}

function getPlayer(IDOrName) {
    let result = samp.getPlayers().filter(f => f.GetPlayerName(24) == IDOrName || f.playerid == IDOrName)[0];
    if(result) return result;
    else return 0;
}

function getNameByAccID(AccID) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM users WHERE id = ?", [AccID], function(err, result) {
            if(err || !result) return resolve("none");
            resolve(result[0].name);
        });
    });
}

function savePlayer(player) {
    if(Player.Info[player.playerid].LoggedIn) {
        con.query("UPDATE users SET mail = ?, admin = ?, VIP = ?, VIP_Expire = ?, clan = ?, clan_rank = ?, gang = ? WHERE ID = ?", [
            Player.Info[player.playerid].Mail, Player.Info[player.playerid].Admin, Player.Info[player.playerid].VIP, Player.Info[player.playerid].VIP_Expire, 
            Player.Info[player.playerid].Clan, Player.Info[player.playerid].Clan_Rank, Player.Info[player.playerid].Gang, Player.Info[player.playerid].AccID
        ]);
    }
}

function ResetPlayerClanCreateVariables(player) {
    Player.Info[player.playerid].Creating_Clan.name = "";
    Player.Info[player.playerid].Creating_Clan.skin.member = 0;
    Player.Info[player.playerid].Creating_Clan.skin.leader = 0;
    Player.Info[player.playerid].Creating_Clan.color = 0xFFFFFFAA;
    for(let i = 1; i <= 6; i++) {
        Player.Info[player.playerid].Creating_Clan.weapon[i] = 0;
    }
}

function UpdatePlayerDB(player, column, value) {
    con.query(`UPDATE users SET ${column} = ? WHERE id = ?`, [value, Player.Info[player.playerid].AccID]);
}

function SetupPlayerForSpawn(player, type=0) { 
    player.SetPlayerColor(0xFFFFFFAA);
    player.SetPlayerSkin(0);
    player.ResetPlayerWeapons();

    /* Type 0 = Check if the player is in a clan or gang */
    /* Type else = Set auto random spawn position */
    if(type == 0) {
        if(Player.Info[player.playerid].Clan) { /* Clan Spawn */
            player.SetPlayerPos(Clan.Info[Player.Info[player.playerid].Clan].position.x, Clan.Info[Player.Info[player.playerid].Clan].position.y, Clan.Info[Player.Info[player.playerid].Clan].position.z);
            player.SetPlayerFacingAngle(Clan.Info[Player.Info[player.playerid].Clan].position.angle);
            player.SetPlayerColor(Clan.Info[Player.Info[player.playerid].Clan].color);
            player.SetPlayerSkin(Player.Info[player.playerid].Clan_Rank == 3 || Player.Info[player.playerid].Clan_Rank == 2 ? Clan.Info[Player.Info[player.playerid].Clan].skin.leader : Clan.Info[Player.Info[player.playerid].Clan].skin.member);
            for(let i = 1; i <= 6; i++) {
                player.GivePlayerWeapon(Clan.Info[Player.Info[player.playerid].Clan].weapon[i], 9999);
            }
        }
        else if(Player.Info[player.playerid].Gang) { /* Gang Spawn */
            player.SetPlayerPos(0, 0, 0);
        }
        else SetupPlayerForSpawn(player, 1);
    }
    else { /* Random Spawn */
        player.SetPlayerPos(2127.5049, 2377.1042, 10.8203);
        player.SetPlayerFacingAngle(179.6744);
    }
}

function LoadFromDB() {
    LoadClans();
}

function LoadClans() {
    con.query("SELECT * FROM clans", function(err, result) {
        for(let i = 0; i < result.length; i++) {
            let position = JSON.parse(result[i].position);
            let weapon = JSON.parse(result[i].weapon);
            Clan.Create(result[i].ID, result[i].name, result[i].owner, {x: position.x, y: position.y, z: position.z}, {"1": weapon[0], "2": weapon[1], "3": weapon[2], "4": weapon[3], "5": weapon[4], "6": weapon[5]}, parseInt(result[i].color), {member: result[i].member_skin, leader: result[i].leader_skin}, result[i].kills, result[i].deaths);
        }
        console.log(`Loaded ${result.length} clans.`);
    });
}

function Updater() {

}

function getRanksRankName(rank_name, rank) {
    let string = "";
    switch(rank_name) {
        case "kills": {
            if(rank >= 20000) string = "{0072FF}King";
            else if(rank >= 10000) string = "{00FF00}Master";
            else if(rank >= 3000) string = "{FFFF00}Specialist";
            else if(rank >= 500) string = "{FF9900}Advanced";
            else if(rank >= 1) string = "{FF6600}Beginner";
            else string = "{FF0000}Noob";
            break;
        }
        case "drift": {
            if(rank >= 300000) string = "{0072FF}King";
            else if(rank >= 100000) string = "{00FF00}Master";
            else if(rank >= 10000) string = "{FFFF00}Specialist";
            else if(rank >= 1500) string = "{FF9900}Advanced";
            else if(rank >= 1) string = "{FF6600}Beginner";
            else string = "{FF0000}Noob";
            break;
        }
        case "race": {
            if(rank >= 8000) string = "{0072FF}King";
            else if(rank >= 4000) string = "{00FF00}Master";
            else if(rank >= 1000) string = "{FFFF00}Specialist";
            else if(rank >= 100) string = "{FF9900}Advanced";
            else if(rank >= 1) string = "{FF6600}Beginner";
            else string = "{FF0000}Noob";
            break;
        }
        case "stunt": {
            if(rank >= 5000) string = "{0072FF}King";
            else if(rank >= 2000) string = "{00FF00}Master";
            else if(rank >= 1000) string = "{FFFF00}Specialist";
            else if(rank >= 100) string = "{FF9900}Advanced";
            else if(rank >= 1) string = "{FF6600}Beginner";
            else string = "{FF0000}Noob";
            break;
        }
    }
    return string;
}

function getAdminRank(rank) {
    let string = "";
    switch(rank) {
        case 1: break;
        case 2: break;
        case 3: string = "{0072FF}Master"; break;
    }
    return string;
}

function getVIPRank(rank) {
    let string = "";
    switch(rank) {
        case 1: string = "{FF0000}Red"; break;
        case 2: string = "{FFFF00}Yellow"; break;
        case 3: string = "{0077FF}Blue"; break;
        case 4: string = "{FFFFFF}White"; break;
    }
    return string;
}

function ShowSpawnTextDraw(player) {
    for(let i = 0; i <= 3; i++) player.TextDrawShowForPlayer(TextDraws.server.spawn[i]);
    player.PlayerTextDrawShow(TextDraws.player.date);
}

function HideSpawnTextDraw(player) {
    for(let i = 0; i <= 3; i++) player.TextDrawHideForPlayer(TextDraws.server.spawn[i]);
}

function ShowConnectTextDraw(player) {
    for(let i = 0; i <= 12; i++) player.TextDrawShowForPlayer(TextDraws.server.connect[i]);
}

function HideConnectTextDraw(player) {
    for(let i = 0; i <= 12; i++) player.TextDrawHideForPlayer(TextDraws.server.connect[i]);
}

function validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function Lang(player, ro_string, en_string) {
    return Player.Info[player.playerid].Language == 1 ? ro_string : en_string;
}

function SendUsage(player, text) {
    player.SendClientMessage(0xFF0000AA, `USAGE: {49FFFF}${text}`);
}

function SendError(player, ro_error, en_error=ro_error /* Set default value for en error if it's missing */) {
    player.SendClientMessage(0xFF0000AA, "ERROR:" + Player.Info[player.playerid].Language == 1 ? ro_error : en_error);
}

function ShowImportant(player, page) {
    let info = "";
    switch(page) {
        case 1: {
            switch(Player.Info[player.playerid].Language) {
                case 1: {
                    info += "{FF0000}1 - {00BBF6}Pe langa regulile de mai sus,iti este interzis sa ceri status unui Admin/RCON\n";
                    info += "{00BBF6}asta incluzand chiar Admin sau Vip,nu este cinstit ca tu sa primesti Admin sau Vip gratuit\n";
                    info += "{00BBF6}in timp ce alti jucatori stau pe server si asteapta sa faca cele necesare pentru a isi cumpara status\n";
                    info += "{00BBF6}unii jucatori platesc chiar si bani reali.\n";
                    info += "\n";
                    info += "{FF0000}2 - {00BBF6}Nu ai voie sa abuzezi de buguri,bugurile fiind mici probleme aparute in diverse sisteme deoarece\n";
                    info += "{00BBF6}ca si un medicament,acesta poate avea reactii adverse/buguri\n";
                    info += "{00BBF6}nefiind testat/e in conditii reale pe server cu jucatorii.\n";
                    info += "\n";
                    info += "{FF0000}3 - {00BBF6}Nu ai voie sa folosesti moduri/hackuri ce iti ofera anumite avantaje in fata celorlalti,\n";
                    info += "{00BBF6}jucatorii cinstiti se straduiesc din greu pentru a face coins bani si alte lucruri necesare pentru status\n";
                    info += "{00BBF6}in timp ce tu zbori,sari foarte departe fata de un jucator normal sau escaladezi\n";
                    info += "{00BBF6}cladiri uriase in cateva secunde fiind clar in avantaj fata de ceilalti.";
                    break;
                }
                case 2: {
                    info += "{FF0000}1 - {00BBF6}Beside the rules above,you are forbidden to ask/beg for status a Admin/RCON,that includes even Admin or Vip\n";
                    info += "{00BBF6}is not fair that you receive free things while other player stay on the server and work hard for their status\n";
                    info += "{00BBF6}some players even donate real money.\n";
                    info += "\n";
                    info += "{FF0000}2 - {00BBF6}You are not allowed to abuse of bugs,bugs are small problems that appear in some systems because like drugs/medicine\n";
                    info += "{00BBF6}they have adverse effects/bugs because they need to be tested in real conditions with humans/players.\n";
                    info += "\n";
                    info += "{FF0000}3 - {00BBF6}You are not allowed to use hacks/mods that gives you advantages in front of other players\n";
                    info += "{00BBF6}honest players are working hard to make coins and money and rest of the things needed for status while you\n";
                    info += "{00BBF6}fly,jump very far or climb tall buildings in seconds...and so on\n";
                    info += "{00BBF6}that means you have advantages in frontn of the other players.";
                    break;
                }
            }
            player.ShowPlayerDialog(Dialog.IMPORTANT_1, samp.DIALOG_STYLE.MSGBOX, `${data.settings.SERVER_NAME} {FFEB7B}- Important!`, info, Lang(player, "Pagina 2", "Page 2"), Lang(player, "Reguli", "Rules"));
            break;
        }
        case 2: {
            switch(Player.Info[player.playerid].Language) {
                case 1: {
                    info += "{FF0000}4 - {00BBF6}Nu ai voie sa faci reclama altor servere si comunitati,nu ai voie sa faci reclama la servere de jocuri\n";
                    info += "{00BBF6}unde jucatorii pot fi indrumati spre alte servere,de asemenea nu ai voie sa faci reclama la canale de yotube\n";
                    info += "{00BBF6}unde jucatorii pot fi indrumati spre alte servere,echipa serverului a muncit din greu pentru a avea jucatorii prezenti.\n";
                    info += "\n";
                    info += "{FF0000}5 - {00BBF6}Serverul,pe langa faptul ca este server de stunt,poti face si deathmatch,insa,\n";
                    info += "{00BBF6}acest lucru nu iti da dreptul sa omori jucatorii in zonele protejate precum spawnurile gen\n";
                    info += "{00BBF6}/aa /sfair /lsair /lvair /jizzy /plaja /beach si asa mai departe\n";
                    info += "{00BBF6}de asemenea,in zonele unde iti sunt scoase armele dar totusi poti folosii comenzi si iti poti cumpara armele inapoi\n";
                    info += "{00BBF6}nu o face,armele iti sunt scoase in acele locuri tocmai pentru a oferii jucatorilor locuri linistite\n";
                    info += "{00BBF6}pe unde se pot plimba,juca,filma si etc...\n";
                    info += "{00BBF6}daca ai chef sa omori pe cineva o poti face doar in locurile special amenajate de la /dm.\n";
                    info += "\n";
                    info += "{FF0000}6 - {00BBF6}Pe criteriul {FF0000}''Respecta si vei fi respectat'', {00BBF6}te rugam sa respecti jucatorii si echipa de administratie a serverului\n";
                    info += "{00BBF6}altfel vom fi fortati sa luam masuri ce nu cred ca iti vor place.";
                    break;
                }
                case 2: {
                    info += "{FF0000}4 - {00BBF6}You are not allowed to advertise servers,communities,web sites,other games servers,youtube channels that might\n";
                    info += "{00BBF6}lead players to other servers,our team worked and works hard to bring and keep players on server.\n";
                    info += "\n";
                    info += "{FF0000}5 - {00BBF6}You are not allowed to kill players in protected zones/spawn zones like\n";
                    info += "{00BBF6}/aa /lsair /sfair /lvair /jizzy /beach and so on,also,in the places where your weapons are being removed\n";
                    info += "{00BBF6}but you still can use commandsto get your weapons back,dont do it,those places are made to take your weapons\n";
                    info += "{00BBF6}so others and even you can play in peace...if you want to kill players,you can use /dm and choose from there.\n";
                    info += "\n";
                    info += "{FF0000}6 - {00BBF6}Respect others and others will respect you ! Please respect other players and server Administration Team !\n";
                    info += "{00BBF6}otherwise we will be forced to take measures that we dont think you will like.";
                    break;
                }
            }
            player.ShowPlayerDialog(Dialog.IMPORTANT_2, samp.DIALOG_STYLE.MSGBOX, `${data.settings.SERVER_NAME} {FFEB7B}- Important!`, info, "Accept", Lang(player, "Pagina 1", "Page 1"));
            break;
        }
    }
}

function ShowCMDS(player, page) {
    let info = "";
    switch(page) {
        case 1: {
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
            break;
        }
        case 2: {
            info += `{FF0000}/para {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti o parasuta." : "Get a parachute."}\n`;
            info += `{FF0000}/camera {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti un aparat foto." : "Get a camera."}\n`;
            info += `{FF0000}/dick {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti un penis (daca n-ai deja unul)." : "Get a penis (if you don't already have one)."}\n`;
            info += `{FF0000}/pee {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Faci treaba mica." : "If you need to piss..."}\n`;
            info += `{FF0000}/beer {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti o bere." : "Get a beer."}\n`;
            info += `{FF0000}/wine {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti o sticla de vin." : "Get a bottle of wine."}\n`;
            info += `{FF0000}/soda {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti un suc." : "Get a juice."}\n`;
            info += `{FF0000}/cigar {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Primesti o tigara." : "Get a cigarette."}\n`;
            info += `{FF0000}/drunkoff {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Scapi de betie." : "Lose intoxication."}\n`;
            info += `{FF0000}/day, /night, /morning, /evening {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Iti schimbi ora de pe server cu una predefinita." : "Change your hour on server with a pre-deffined one."}\n`;
            info += `{FF0000}/dance {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Activezi un stil de dans." : "Activate a Dance Style."}\n`;
            info += `{FF0000}/count {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Porneste o numaratoare inversa." : "Start a Count Down."}\n`;
            info += `{FF0000}/fpd {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Activeaza Modul First Person Driver." : "Activate First Person Driver Mode."}\n`;
            info += `{FF0000}/tune {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Tuneaza-ti masina intr-un fel unic!" : "Tune your vehicle in a unique style!"}\n`;
            info += `{FF0000}/tcar {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Spawneaza-ti o masina gata tunata!" : "Spawn a tunned vehicle!"}\n`;
            info += `{FF0000}/neon {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Iti plac masinile cu neoane ? Aceasta comanda ii va adauga si masinii tale unele!" : "Use this command if you like cars with neons!"}\n`;
            info += `{FF0000}/respect {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Arata-i altui jucator cat de mult il respecti!" : "Show to another player how much do you respect him!"}\n`;
            info += `{FF0000}/speed {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Ai chef de distractie ? Atunci foloseste aceasta comanda!" : "Would you like some fun ? Then use this command!"}\n`;
            info += `{FF0000}/clan {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Vezi comenzile sistemului de Clanuri." : "View Clan System's Commands."}\n`;
            info += `{FF0000}/gang {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Vezi comenzile sistemului de Gang-uri." : "View Gang System's Commands."}\n`;
            info += `{FF0000}/fix {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Repara motorul masinii, lasand caroseria intacta." : "Fix Car's engine, leaving the body intact."}\n`;
            info += `{FF0000}/happy, /sad {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Arata-le jucatorilor cum te simti." : "Let the palyers know how you fell."}\n`;
            info += `{FF0000}/tow {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Tracteaza o masina cu ajutorul acestei comenzi!" : "Tow a car with this command!"}\n`;
            info += `{FF0000}/vcontrol {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Controleaza-ti anumite parti ale vehiculului." : "Control some parts of your vehicle."}\n`;
            info += `{FF0000}/ad {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Trimite un anunt pe 'Radioul Public'." : "Send an announce on 'Public Radio'."}\n`;
            info += `{FF0000}/hidetag {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Ascunde-ti tie sau celorlalti jucatori tag-ul!" : "Hide your/others' tag."}\n`;
            info += `{FF0000}/vCmds {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Vezi o lista cu comenzile de VIP." : "View a list with all VIP Commands."}\n`;
            info += `{FF0000}/vup {49FFFF}- ${Player.Info[player.playerid].Language == 1 ? "Activeaza/Dezactiveaza functia de VUP a vehiculului." : "Activate/Deactivate Vehicle's VUP Function."}\n`;
            player.ShowPlayerDialog(Dialog.CMDS_2, samp.DIALOG_STYLE.MSGBOX, Player.Info[player.playerid].Language == 1 ? "Comenzi - Pagina {FF0000}2" : "Commands - Page {FF0000}2", info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", Player.Info[player.playerid].Language == 1 ? "Pagina 2" : "Page 2");
            break;
        }
        case 3: {
            info += `{FF0000}/pm {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a trimite un Mesaj Privat." : "To send a Private Message."}\n`;
            info += `{FF0000}/hold {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Adauga-ti/Scoate-ti/Salveaza-ti/Sterge-ti Hold-urile." : "Add/Remove/Save/Delete your Holds."}\n`;
            info += `{FF0000}/report {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Raporteaza un jucator care nu respecta regulile!" : "Report a player that is not respecting the rules!"}\n`;
            info += `{FF0000}/up {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Teleporteaza-te in aer cu ajutorul acestei comenzi." : "Teleport yourself in the air with this command."}\n`;
            info += `{FF0000}/dive {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Ti-ai dorit vreodata sa sari cu parasuta ? Acum ai ocazia sa incerci!" : "Would you like to jump with the parachute ? Try this command!"}\n`;
            info += `{FF0000}/rw, /ww {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Cumpara-ti un set de arme predefinit." : "Buy a pre-deffined weapon set."}\n`;
            info += `{FF0000}/walks {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti stilul de mers." : "Change your Walk Style."}\n`;
            info += `{FF0000}/fstyles {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti stilul de bataie." : "Change your Fight Style."}\n`;
            info += `{FF0000}/np {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Schimba-ti numarul de inmatriculare." : "Change your number plate."}\n`;
            info += `{FF0000}/s, /l {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Salveaza-ti o pozitie favorita si revino mai tarziu la ea!" : "Save a Favorite Position and come back later to it!"}\n`;
            info += `{FF0000}/c4 {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Cumpara C4 si detoneaza-l!" : "Buy C4 and detonate it!"}\n`;
            info += `{FF0000}/top {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Vezi cei mai buni jucatori de pe server!" : "See the best players on server!"}\n`;
            info += `{FF0000}/holdoff {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Dezactiveaza-ti Hold-urile." : "Deactivate your Holds."}\n`;
            info += `{FF0000}/session {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Vezi de cat timp esti conectat pe server." : "See how mouch time passed since you are connect."}\n`;
            info += `{FF0000}/ostats {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Vezi statisticele unui jucator offline." : "See status of player while they are offline."}\n`;
            info += `{FF0000}/skill {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Modifica-ti skill-ul de tragere!" : "Modify your shooting skills!"}\n`;
            info += `{FF0000}/ramp {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a activa rampa, apasa pe click stanga pentru a creea o rampa!" : "To Activate Ramp and press left click to creeate a ramp!"}\n`;
            info += `{FF0000}/statsserver {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a vedea statisticle server-ului!" : "To view server statistics!"}\n`;
            info += `{FF0000}/howto {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a te ajuta in cunoasterea server-ului!" : "To help you know the server!"}\n`;
            info += `{FF0000}/important {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a vedea ce iti este interzis sa faci pe server!" : "To see what you are forbidden to do on server!"}\n`;
            info += `{FF0000}/duel {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Invita un prieten intr-un duel!" : "Invite a friend to a duel!"}\n`;
            info += `{FF0000}/ranks {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Afla rank-urile pe baza de statistici!" : "Find rankings based on statistics!"}\n`;
            info += `{FF0000}/wtime {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a vedea cat este ceasul!" : "To see what the clock is!"}\n`;
            info += `{FF0000}/blacklisted {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a vedea cine se afla pe lista neagra!" : "To see who is blacklisted!"}\n`;
            info += `{FF0000}/email {05C81F}- ${Player.Info[player.playerid].Language == 1 ? "Pentru a schimba sau adauga un e-mail in contul tau!" : "To change or add a e-mail to your account!"}\n`;
            player.ShowPlayerDialog(Dialog.CMDS_3, samp.DIALOG_STYLE.MSGBOX, Player.Info[player.playerid].Language == 1 ? "Comenzi - Pagina {FF0000}3" : "Commands - Page {FF0000}3", info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", Player.Info[player.playerid].Language == 1 ? "Pagina 1" : "Page 1");
            break;
        }
    }
}

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

            Player.Info[player.playerid].AccID = result[0].ID;
            Player.Info[player.playerid].Mail = result[0].mail;
            Player.Info[player.playerid].Admin = result[0].admin;
            Player.Info[player.playerid].VIP = result[0].VIP;
            Player.Info[player.playerid].VIP_Expire = result[0].VIP_Expire;
            Player.Info[player.playerid].Clan = result[0].clan;
            Player.Info[player.playerid].Clan_Rank = result[0].clan_rank;
            Player.Info[player.playerid].Gang = result[0].gang;

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
samp.OnGameModeInit(() => {
    console.log("\n");
    console.log("Romania HarD Stunt GameMode successfully loaded.");
    console.log("Gamemode creator: Ghosty2004");
    console.log("Have Fun with this shit :)");

    Maps.Load();
    TextDraws.server.Load(); /* Load Server TextDraws */
});

samp.OnGameModeExit(() => {
    return true;
});

samp.OnPlayerConnect((player) => {
    ShowConnectTextDraw(player); 
    Player.ResetVariables(player);
    player.ShowPlayerDialog(Dialog.SELECT_LANGUAGE, samp.DIALOG_STYLE.MSGBOX, "{00BBF6}Language {FF0000}/ {00BBF6}Limba", `{FFFF00}Welcome to ${data.settings.SERVER_NAME}{FFFF00}, {00BBF6}${player.GetPlayerName(24)}{FFFF00}!\n{FFFF00}Please select your language to continue!`, "Romana", "English");
    
    Maps.RemoveBuildings(player);
    TextDraws.player.Load(player); /* Load Player TextDraws */

    return true;
});

samp.OnPlayerDisconnect((player, reason) => {
    Player.ResetVariables(player);
    HideConnectTextDraw(player);
    HideSpawnTextDraw(player);
    savePlayer(player);
    return true;
});

samp.OnPlayerSpawn((player) => {
    if(!Player.Info[player.playerid].LoggedIn) return player.Kick();
    HideConnectTextDraw(player);
    ShowSpawnTextDraw(player);
    if(Player.Info[player.playerid].Mail == "none") {
        player.ShowPlayerDialog(Dialog.ADD_MAIL, samp.DIALOG_STYLE.INPUT, "E-Mail", Lang(player, "{FFFF00}Se pare ca nu ai un {FF0000}E-Mail {FFFF00}in cont!\n{FFCC00}In cazul in care iti vei uita parola, nu o vei putea recupera!\n\n{FF0000}Daca doresti sa iti adaugi un E-Mail in cont, te rugam sa il introduci mai jos:", "{FFFF00}It looks like you don't have any {FF0000}E-Mail {FF0000}in your account!\n{FFCC00}If you will forgot your password, you will be not able to recover it!\n\n{FF0000}If you want to add an E-Mail in your account, please type it before:"), Lang(player, "Adauga", "Add"), Lang(player, "Mai tarziu", "Later"));
    }
    SetupPlayerForSpawn(player);
    return true;
});

samp.OnPlayerUpdate((player) => {
    return true;
});

samp.OnDialogResponse((player, dialogid, response, listitem, inputtext) => {
    switch(dialogid) {
        case Dialog.CREATE_CLAN: {
            if(response) {
                if(!Clan.ExistsName(inputtext)) {
                    if(inputtext.length < 3 || inputtext.length > 20) return player.ShowPlayerDialog(Dialog.CREATE_CLAN, samp.DIALOG_STYLE.INPUT, "{00FF00}Create Clan", "{FF0000}ERROR:\n\n{00FF00}The clan name must be lower that {FF0000}20 {00FF00}characters and biggest that {FF0000}3{00FF00}!\n{00FF00}Please re-type it:", "Continue", "Close");
                    Player.Info[player.playerid].Creating_Clan.name = inputtext;
                    player.ShowPlayerDialog(Dialog.CREATE_CLAN_SKIN_MEMBERS, samp.DIALOG_STYLE.INPUT, "{00FF00}Create Clan", "{0072FF}Now choose a Skin for members!\nEnter below the Skin ID for members:", "Continue", "Close");
                }
                else player.ShowPlayerDialog(Dialog.CREATE_CLAN, samp.DIALOG_STYLE.INPUT, "{00FF00}Create Clan", `{0072FF}A clan named {00FF00}'${inputtext}'{0072FF} already exists!\nPlease try again with another name...`, "Continue", "Close");
            }
            break;
        }
        case Dialog.CREATE_CLAN_SKIN_MEMBERS: {
            if(response) {
                inputtext = parseInt(inputtext);
                if(inputtext < 0 || inputtext > 299) return player.ShowPlayerDialog(Dialog.CREATE_CLAN_SKIN_MEMBERS, samp.DIALOG_STYLE.INPUT, "{00FF00}Create Clan - {FF0000}ERROR!", "{0072FF}Invalid Skin ID (0-299)!\nEnter below the Skin ID for members:", "Continue", "Close");
                Player.Info[player.playerid].Creating_Clan.skin.member = inputtext;
                player.ShowPlayerDialog(Dialog.CREATE_CLAN_SKIN_LEADERS, samp.DIALOG_STYLE.INPUT, "{00FF00}Create Clan", "{0072FF}Now choose a Skin for leaders!\nEnter below the Skin ID for leaders:", "Continue", "Close");
            }
            break;
        }
        case Dialog.CREATE_CLAN_SKIN_LEADERS: {
            if(response) {
                inputtext = parseInt(inputtext);
                if(inputtext < 0 || inputtext > 299) return player.ShowPlayerDialog(Dialog.CREATE_CLAN_SKIN_LEADERS, samp.DIALOG_STYLE.INPUT, "{00FF00}Create Clan - {FF0000}ERROR!", "{0072FF}Invalid Skin ID (0-299)!\nEnter below the Skin ID for leaders:", "Continue", "Close");
                Player.Info[player.playerid].Creating_Clan.skin.leader = inputtext;
                let info = "";
                info += "{FF0000}RED\n";
                info += "{F4A460}Brown\n";
                info += "{FF9900}Orange\n";
                info += "{FFFF00}Yellow\n";
                info += "{BBFF00}Lime\n";
                info += "{55FF00}Light green\n";
                info += "{00FFAA}Aqua\n";
                info += "{00DDFF}Light blue\n";
                info += "{0044FF}Blue\n";
                info += "{8000FF}Purple\n";
                info += "{CC00FF}Indigo\n";
                info += "{FF00EE}Pink\n";
                info += "{FFFFFF}White\n";
                info += "{FFEB7B}Crem";
                player.ShowPlayerDialog(Dialog.CREATE_CLAN_COLOR, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Close");
            }
            break;
        }
        case Dialog.CREATE_CLAN_COLOR: {
            if(response) {
                switch(listitem) {
                    case 0: Player.Info[player.playerid].Creating_Clan.color = 0xFF0000AA; break; /* RED */
                    case 1: Player.Info[player.playerid].Creating_Clan.color = 0xF4A460AA; break; /* Brown */
                    case 2: Player.Info[player.playerid].Creating_Clan.color = 0xFF9900AA; break; /* Orange */
                    case 3: Player.Info[player.playerid].Creating_Clan.color = 0xFFFF00AA; break; /* Yellow */
                    case 4: Player.Info[player.playerid].Creating_Clan.color = 0xBBFF00AA; break; /* Lime */
                    case 5: Player.Info[player.playerid].Creating_Clan.color = 0x55FF00AA; break; /* Light green */
                    case 6: Player.Info[player.playerid].Creating_Clan.color = 0x00FFAAAA; break; /* Aqua */
                    case 7: Player.Info[player.playerid].Creating_Clan.color = 0x00DDFFAA; break; /* Light blue */
                    case 8: Player.Info[player.playerid].Creating_Clan.color = 0x0044FFAA; break; /* Blue */
                    case 9: Player.Info[player.playerid].Creating_Clan.color = 0x8000FFAA; break; /* Purple */
                    case 10: Player.Info[player.playerid].Creating_Clan.color = 0xCC00FFAA; break; /* Indigo */
                    case 11: Player.Info[player.playerid].Creating_Clan.color = 0xFF00EEAA; break; /* Pink */
                    case 12: Player.Info[player.playerid].Creating_Clan.color = 0xFFFFFFAA; break; /* White */
                    case 13: Player.Info[player.playerid].Creating_Clan.color = 0xFFEB7BAA; break; /* Crem */
                }
                let info = "";
                info += "{0072FF}Brass Knuckles\n";
                info += "{0072FF}Golf Club\n";
                info += "{0072FF}Nightstick\n";
                info += "{0072FF}Knife\n";
                info += "{0072FF}Baseball Bat\n";
                info += "{0072FF}Shovel\n";
                info += "{0072FF}Pool Cue\n";
                info += "{0072FF}Katana\n";
                info += "{0072FF}Chainsaw";
                player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_1, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
            }
            break;
        }
        case Dialog.CREATE_CLAN_WEAPON_1: {
            if(response) {
                let start = 1;
                Player.Info[player.playerid].Creating_Clan.weapon[1] = start + listitem;
            }

            let info = "";
            info += "{0072FF}Pistol\n";
            info += "{0072FF}Silenced Pistol\n";
            info += "{0072FF}Desert Eagle";
            player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_2, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
            break;
        }
        case Dialog.CREATE_CLAN_WEAPON_2: {
            if(response) {
                let start = 22;
                Player.Info[player.playerid].Creating_Clan.weapon[2] = start + listitem;
            }

            let info = "";
            info += "{0072FF}ShotGun\n";
            info += "{0072FF}Sawn-Off-Shotgune\n";
            info += "{0072FF}SPAZ-12";
            player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_3, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
        }
        case Dialog.CREATE_CLAN_WEAPON_3: {
            if(response) {
                let start = 25;
                Player.Info[player.playerid].Creating_Clan.weapon[3] = start + listitem;
            }

            let info = "";
            info += "{0072FF}Micro UZI\n";
            info += "{0072FF}MP5\n";
            info += "{0072FF}TEC-9";
            player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_4, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
            break;
        }
        case Dialog.CREATE_CLAN_WEAPON_4: {
            if(response) {
                switch(listitem) {
                    case 0: Player.Info[player.playerid].Creating_Clan.weapon[4] = 28; break;
                    case 1: Player.Info[player.playerid].Creating_Clan.weapon[4] = 29; break;
                    case 2: Player.Info[player.playerid].Creating_Clan.weapon[4] = 32; break;
                }
            }

            let info = "";
            info += "{0072FF}AK-47\n";
            info += "{0072FF}M4-A1";
            player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_5, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
            break;
        }
        case Dialog.CREATE_CLAN_WEAPON_5: {
            if(response) {
                let start = 30;
                Player.Info[player.playerid].Creating_Clan.weapon[5] = start + listitem; 
            }

            let info = "";
            info += "{0072FF}Country Rifle\n";
            info += "{0072FF}Sniper Rifle";
            player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_6, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
            break;
        }
        case Dialog.CREATE_CLAN_WEAPON_6: {
            if(response) {
                let start = 33;
                Player.Info[player.playerid].Creating_Clan.weapon[6] = start + listitem; 
            }

            /* Send Informations in Dialog */
            let info = "";
            info += `{0072FF}Congratulations {00FF00}${player.GetPlayerName(24)}{0072FF} for creating {00FF00}${Player.Info[player.playerid].Creating_Clan.name}{0072FF} clan!\n`;
            info += "If you need help with your clan, type {00FF00}/chelp{0072FF} and {00FF00}/ctop{0072FF} for clan top!";
            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "{00FF00}Clan Created!", info, "Close", "");

            /* Create row in SQL */
            con.query("INSERT INTO clans (name, owner, position, weapon, color, member_skin, leader_skin) VALUES(?, ?, ?, ?, ?, ?, ?)", [Player.Info[player.playerid].Creating_Clan.name, Player.Info[player.playerid].AccID, JSON.stringify({x: player.position.x, y: player.position.y, z: player.position.z, angle: player.position.angle}), JSON.stringify(Object.values(Player.Info[player.playerid].Creating_Clan.weapon)), `${Player.Info[player.playerid].Creating_Clan.color}`, Player.Info[player.playerid].Creating_Clan.skin.member, Player.Info[player.playerid].Creating_Clan.skin.leader], function(err, result) {
                if(!err) {
                    Clan.Create(result.insertId, Player.Info[player.playerid].Creating_Clan.name, Player.Info[player.playerid].AccID, {x: player.position.x, y: player.position.y, z: player.position.z, angle: player.position.angle}, {"1": Player.Info[player.playerid].Creating_Clan.weapon[1], "2": Player.Info[player.playerid].Creating_Clan.weapon[2], "3": Player.Info[player.playerid].Creating_Clan.weapon[3], "4": Player.Info[player.playerid].Creating_Clan.weapon[4], "5": Player.Info[player.playerid].Creating_Clan.weapon[5], "6": Player.Info[player.playerid].Creating_Clan.weapon[6]}, Player.Info[player.playerid].Creating_Clan.color, {member: Player.Info[player.playerid].Creating_Clan.skin.member, leader: Player.Info[player.playerid].Creating_Clan.skin.leader}, 0, 0);
                    Player.Info[player.playerid].Clan = result.insertId;
                    Player.Info[player.playerid].Clan_Rank = 3;
                    UpdatePlayerDB(player, "clan", Player.Info[player.playerid].Clan);
                    UpdatePlayerDB(player, "clan_rank", Player.Info[player.playerid].Clan_Rank);
                    player.SetPlayerColor(Player.Info[player.playerid].Creating_Clan.color);
                    player.SetPlayerSkin(Player.Info[player.playerid].Creating_Clan.skin.leader);
                    for(let i = 1; i <= 6; i++) {
                        player.GivePlayerWeapon(Clan.Info[Player.Info[player.playerid].Clan].weapon[i], 9999);
                    }
                    ResetPlayerClanCreateVariables(player);
                }
                else ResetPlayerClanCreateVariables(player);
            });
            break;
        }
        case Dialog.TELES: {
            if(response) {
                switch(listitem) {
                    case 0: { /* Stunts */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Aa\t{BBFF00}Old Airport\n";
                        info += "{49FFFF}/LsAir\t{BBFF00}Los Santos Airport\n";
                        info += "{49FFFF}/SfAir\t{BBFF00}San Fierro Airport\n";
                        info += "{49FFFF}/Jizzy\t{BBFF00}Jizzy Stunt\n";
                        info += "{49FFFF}/Chrome\t{BBFF00}Stunt Chrome\n";
                        info += "{49FFFF}/Rc\t{BBFF00}Roller Coaster\n";
                        info += "{49FFFF}/Bmx\t{BBFF00}Stunt BMX\n";
                        info += "{49FFFF}/Mc\t{BBFF00}Monster Crash\n";
                        info += "{49FFFF}/Sstunts\t{BBFF00}Simple Stunts";
                        player.ShowPlayerDialog(Dialog.TELES_STUNTS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Stunts", info, "Teleport", "Back");
                        break;
                    }
                    case 1: { /* Jumps */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Basejump\t{BBFF00}Base Jump\n";
                        info += "{49FFFF}/Gdj\t{BBFF00}Glass and Dance Jump\n";
                        info += "{49FFFF}/Wj\t{BBFF00}Water Jump\n";
                        info += "{49FFFF}/Jj\t{BBFF00}Jizzy Jump\n";
                        info += "{49FFFF}/Tr\t{BBFF00}Trampoline Jump\n";
                        info += "{49FFFF}/AaTube\t{BBFF00}Old Airport Tube\n";
                        info += "{49FFFF}/Tj\t{BBFF00}Tube Jump\n";
                        info += "{49FFFF}/Bcar\t{BBFF00}Basket Car\n";
                        info += "{49FFFF}/Bj\t{BBFF00}Building Jump";
                        player.ShowPlayerDialog(Dialog.TELES_JUMPS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Jumps Zones", info, "Teleport", "Back");
                        break;
                    }
                    case 2: { /* Death Matchs */
                        let info = "Command\tDescription\tPlaying\n";
                        info += `{49FFFF}/Minigun\t{BBFF00}Minigun DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/De\t{BBFF00}Desert Eagle DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/M4\t{BBFF00}M4 DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/Os\t{BBFF00}One Shot DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/Sniper\t{BBFF00}Sniper DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/Mrf\t{BBFF00}Minigun-Rocket-Flame\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/GArena\t{BBFF00}Gang Arena DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/Oh\t{BBFF00}One Hit DeathMatch\t{00BBF6}1 Players\n`;
                        info += `{49FFFF}/Prodm\t{BBFF00}Pro DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/Helldm\t{BBFF00}Hell DeathMatch\t{00BBF6}0 Players\n`;
                        info += `{49FFFF}/GunWar\t{BBFF00}Gun War DeathMatch\t{00BBF6}0 Players`;
                        player.ShowPlayerDialog(Dialog.TELES_DM, samp.DIALOG_STYLE.TABLIST_HEADERS, "Death match zone", info, "Teleport", "Back");
                        break;
                    }
                    case 3: { /* Interiors */
                        break;
                    }
                    case 4: { /* Drifts */
                        let info = "";
                        info += "{0072FF}/Drift 1\n";
                        info += "{0072FF}/Drift 2\n";
                        info += "{FF0000}/Drift 3\n";
                        info += "{FF0000}/Drift 4\n";
                        info += "{FF0000}/Drift 5\n";
                        info += "{FFFF00}/Drift 6\n";
                        info += "{FFFF00}/LvAir";
                        player.ShowPlayerDialog(Dialog.TELES_DRIFTS, samp.DIALOG_STYLE.LIST, "Drifts", info, "Teleport", "Back");
                        break;
                    }
                    case 5: { /* Races */
                        break;
                    }
                    case 6: { /* Jobs */
                        let info = "";
                        info += "{BBFF00}Truck Driver\n";
                        info += "{BBFF00}Air Pilot\n";
                        info += "{BBFF00}Pizza Boy\n";
                        info += "{BBFF00}Ambulance Driver\n";
                        info += "{BBFF00}Policeman\n";
                        info += "{BBFF00}Fisherman\n";
                        info += "{BBFF00}Hunterman";
                        player.ShowPlayerDialog(Dialog.TELES_JOBS, samp.DIALOG_STYLE.LIST, "Jobs", info, "Teleport", "Back");
                        break;
                    }
                    case 7: { /* Minigames */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Gifts\t{BBFF00}The Gifts(Reward VIP Blue)\n";
                        info += "{49FFFF}/LastMan\t{BBFF00}The Last Man Standing Alive!\n";
                        info += "{49FFFF}/Hns\t{BBFF00}Hide'n Seek\n";
                        info += "{49FFFF}/GParkour\t{BBFF00}Grove Parkour\n";
                        info += "{49FFFF}/SfParkour\t{BBFF00}San Fierro Parkour\n";
                        info += "{49FFFF}/Targets\t{BBFF00}Targets Training\n";
                        info += "{49FFFF}/SkyClimb\t{BBFF00}The Sky Climb\n";
                        info += "{49FFFF}/Derby\t{BBFF00}The Derby\n";
                        info += "{49FFFF}/Football\t{BBFF00}Play Football\n";
                        info += "{49FFFF}/Zm\t{BBFF00}Zombies vs Humans";
                        player.ShowPlayerDialog(Dialog.TELES_MINIGAMES, samp.DIALOG_STYLE.TABLIST_HEADERS, "Minigames", info, "Teleport", "Back");
                        break;
                    }
                    case 8: { /* Challenges */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Derby\t{BBFF00}Derby\n";
                        info += "{49FFFF}/Bmx\t{BBFF00}Bmx\n";
                        info += "{49FFFF}/Quad\t{BBFF00}Quad\n";
                        info += "{49FFFF}/Karting\t{BBFF00}Karting\n";
                        info += "{49FFFF}/Monster\t{BBFF00}Monster Crash";
                        player.ShowPlayerDialog(Dialog.TELES_CHALLANGES, samp.DIALOG_STYLE.TABLIST_HEADERS, "Challenges", info, "Teleport", "Back");
                        break;
                    }
                    case 9: { /* Parkours */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/proparkour\t{BBFF00}Pro Parkour\n";
                        info += "{49FFFF}/gparkour\t{BBFF00}Grove Parkour\n";
                        info += "{49FFFF}/sfparkour\t{BBFF00}San Fierro Parkour\n";
                        info += "{49FFFF}/cpk\t{BBFF00}City Parkour";
                        player.ShowPlayerDialog(Dialog.TELES_PARKOURS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Parkours Teleports", info, "Teleport", "Back");
                        break;
                    }
                    case 10: { /* Partys */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Party\t{BBFF00}Party\n";
                        info += "{49FFFF}/Bamboo\t{BBFF00}Bamboo Club\n";
                        info += "{49FFFF}/Bar\t{BBFF00}Party Bar\n";
                        info += "{49FFFF}/Minecraft\t{BBFF00}Party Minecraft\n";
                        info += "{49FFFF}/Island\t{BBFF00}Island";
                        player.ShowPlayerDialog(Dialog.TELES_PARTYS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Partys", info, "Teleport", "Back");
                        break;
                    }
                    case 11: { /* Special Places */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Bamboo\t{BBFF00}Bamboo Club\n";
                        info += "{49FFFF}/Drag\t{BBFF00}Drag Race\n";
                        info += "{49FFFF}/Airship\t{BBFF00}Airship\n";
                        info += "{49FFFF}/Jungle\t{BBFF00}Jungle\n";
                        info += "{49FFFF}/Paradise\t{BBFF00}Paradise\n";
                        info += "{49FFFF}/Bahamas\t{BBFF00}Bahamas\n";
                        info += "{49FFFF}/VipIsland\t{BBFF00}VIP Island\n";
                        info += "{49FFFF}/Drag2\t{BBFF00}Drag Race 2\n";
                        info += "{49FFFF}/Pirateland\t{BBFF00}Pirateland\n";
                        info += "{49FFFF}/Planes\t{BBFF00}Planes Airport\n";
                        info += "{49FFFF}/Atlantis\t{BBFF00}Atlantis\n";
                        info += "{49FFFF}/Rec\t{BBFF00}Recruitment Zone\n";
                        info += "{49FFFF}/Th\t{BBFF00}Tree House\n";
                        info += "{49FFFF}/Spiral\t{BBFF00}Spiral\n";
                        info += "{49FFFF}/Smash\t{BBFF00}Smash\n";
                        info += "{49FFFF}/Showroom\t{BBFF00}Show Room\n";
                        info += "{49FFFF}/Market\t{BBFF00}Market\n";
                        info += "{49FFFF}/Justglass\t{BBFF00}Just Glass\n";
                        info += "{49FFFF}/Drag3\t{BBFF00}Drag Race 3";
                        player.ShowPlayerDialog(Dialog.TELES_SPECIAL_PLACES, samp.DIALOG_STYLE.TABLIST_HEADERS, "Special Places", info, "Teleport", "Back");
                        break;
                    }
                    case 12: { /* Others */
                        let info = "Command\tDescription\n";
                        info += "{49FFFF}/Ls\t{BBFF00}Los Santos\n";
                        info += "{49FFFF}/Sf\t{BBFF00}San Fierro\n";
                        info += "{49FFFF}/Lv\t{BBFF00}Las Venturas\n";
                        info += "{49FFFF}/Lvps\t{BBFF00}Las Venturas Pay and Spray\n";
                        info += "{49FFFF}/Lv4d\t{BBFF00}Four Dragos Casino\n";
                        info += "{49FFFF}/Lvstrip\t{BBFF00}Las Venturas Strip\n";
                        info += "{49FFFF}/Lvpd\t{BBFF00}Las Venturas Police Dep\n";
                        info += "{49FFFF}/Lvtrans\t{BBFF00}Las Venturas Transfender\n";
                        info += "{49FFFF}/Sfps\t{BBFF00}San Fierro Pay and Spray\n";
                        info += "{49FFFF}/Sftrain\t{BBFF00}San Fierro Train\n";
                        info += "{49FFFF}/Lspool\t{BBFF00}Los Santos Pool\n";
                        info += "{49FFFF}/Maddog\t{BBFF00}Madd Dog's House\n";
                        info += "{49FFFF}/Vinewood\t{BBFF00}Vinewood\n";
                        info += "{49FFFF}/Beach\t{BBFF00}Santa Maria Beach\n";
                        info += "{49FFFF}/Grove\t{BBFF00}Grove Street\n";
                        info += "{49FFFF}/Pimps\t{BBFF00}Pimps\n";
                        info += "{49FFFF}/Chilliad\t{BBFF00}Mount Chilliad\n";
                        info += "{49FFFF}/Lvpd\t{BBFF00}Las Venturas PD\n";
                        info += "{49FFFF}/Lspd\t{BBFF00}Los Santos PD\n";
                        info += "{49FFFF}/Sfpd\t{BBFF00}San Fierro PD\n";
                        info += "{49FFFF}/Dam\t{BBFF00}Dam\n";
                        info += "{49FFFF}/Hut\t{BBFF00}Forest Hut\n";
                        info += "{49FFFF}/Desertramp\t{BBFF00}Desert Ramp\n";
                        info += "{49FFFF}/Disco\t{BBFF00}Alhambra Club\n";
                        info += "{49FFFF}/Lssp\t{BBFF00}Los Santos Spawn Place\n";
                        info += "{49FFFF}/Lst\t{BBFF00}Los Santos Trains\n";
                        info += "{49FFFF}/Lvt\t{BBFF00}Las Venturas Trains\n";
                        info += "{49FFFF}/Sft\t{BBFF00}San Fierro Trains\n";
                        info += "{49FFFF}/Sffire\t{BBFF00}SF Fire Departament\n";
                        info += "{49FFFF}/Lsammu\t{BBFF00}Los Santos Ammunation\n";
                        info += "{49FFFF}/Lvammu\t{BBFF00}Las Venturas Ammunation\n";
                        info += "{49FFFF}/Sfammu\t{BBFF00}San Fierro Ammunation\n";
                        info += "{49FFFF}/Sfh\t{BBFF00}San Fierro Hospital\n";
                        info += "{49FFFF}/Quarry\t{BBFF00}Quarry\n";
                        info += "{49FFFF}/a51\t{BBFF00}A51\n";
                        info += "{49FFFF}/lvchina\t{BBFF00}Las Venturas China\n";
                        info += "{49FFFF}/lvsp\t{BBFF00}Las Venturas Spawn Place";
                        player.ShowPlayerDialog(Dialog.TELES_OTHERS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Other Teleports", info, "Teleport", "Back");
                        break;
                    }
                    case 13: { /* Simple Stunts */
                        let info = "";
                        info += "{0072FF}Simple Stunt 1\n";
                        info += "{0072FF}Simple Stunt 2\n";
                        info += "{0072FF}Simple Stunt 3\n";
                        info += "{0072FF}Simple Stunt 4\n";
                        info += "{0072FF}Simple Stunt 5\n";
                        info += "{0072FF}Simple Stunt 6\n";
                        info += "{0072FF}Simple Stunt 7\n";
                        info += "{0072FF}Simple Stunt 8\n";
                        info += "{0072FF}Simple Stunt 9\n";
                        info += "{FFFF00}Simple Stunt 10\n";
                        info += "{FFFF00}Simple Stunt 11\n";
                        info += "{FFFF00}Simple Stunt 12\n";
                        info += "{FFFF00}Simple Stunt 13\n";
                        info += "{FFFF00}Simple Stunt 14\n";
                        info += "{FFFF00}Simple Stunt 15\n";
                        info += "{FFFF00}Simple Stunt 16\n";
                        info += "{FFFF00}Simple Stunt 17\n";
                        info += "{FFFF00}Simple Stunt 18\n";
                        info += "{FFFF00}Simple Stunt 19\n";
                        info += "{FFFF00}Simple Stunt 20\n";
                        info += "{FFFF00}Simple Stunt 21\n";
                        info += "{FF0000}Simple Stunt 22\n";
                        info += "{FF0000}Simple Stunt 23\n";
                        info += "{FF0000}Simple Stunt 24\n";
                        info += "{FF0000}Simple Stunt 25\n";
                        info += "{FF0000}Simple Stunt 26\n";
                        info += "{FF0000}Simple Stunt 27\n";
                        info += "{FF0000}Simple Stunt 28\n";
                        info += "{FF0000}Simple Stunt 29";
                        player.ShowPlayerDialog(Dialog.TELES_SIMPLE_STUNTS, samp.DIALOG_STYLE.LIST, "Simple Stunts", info, "Teleport", "Back");
                        break;
                    }
                }
            }
            break;
        }
        case Dialog.TELES_STUNTS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_JUMPS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_DM: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_DRIFTS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_JOBS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_MINIGAMES: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_CHALLANGES: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_PARKOURS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_PARTYS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_SPECIAL_PLACES: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_OTHERS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.TELES_SIMPLE_STUNTS: {
            if(response) {

            }
            else CMD.emit("teles", player);
            break;
        }
        case Dialog.STATS: {
            if(!response) {
                let info = "";
                info += `{0072FF}${Lang(player, "Descriere Linia 1", "Description Line 1")}\n`;
                info += `{FFFF00}${Lang(player, "Descriere Linia 2", "Description Line 2")}\n`;
                info += `{FF0000}${Lang(player, "Descriere Linia 3", "Description Line 3")}`;
                player.ShowPlayerDialog(Dialog.STATS_DESCRIPTION, samp.DIALOG_STYLE.LIST, Lang(player, "Descriere", "Description"), info, Lang(player, "Selecteaza", "Select"), Lang(player, "Inapoi", "Back"));
            }
            break;
        }
        case Dialog.STATS_DESCRIPTION: {
            if(response) {
                Player.Info[player.playerid].Editing_Stats_Description_Line = listitem + 1;
                player.ShowPlayerDialog(Dialog.STATS_DESCRIPTION_INPUT, samp.DIALOG_STYLE.INPUT, Lang(player, "Descriere", "Description"), "", Lang(player, "Ok", "Update"), Lang(player, "Renunta", "Cancel"));
            }
            else CMD.emit("stats", player);
            break;
        }
        case Dialog.STATS_DESCRIPTION_INPUT: {
            if(response) {
                Player.Info[player.playerid].Description[Player.Info[player.playerid].Editing_Stats_Description_Line] = inputtext;
                player.SendClientMessage(data.colors.YELLOW, Lang(player, "Ti-ai modificat Descrierea! Scrie {FF0000}/Stats {FFFF00}pentru a o vedea!", "You have updated your Description! Type {FF0000}/Stats {FFFF00}to see it!"));
            }
            Player.Info[player.playerid].Editing_Stats_Description_Line = 0;
            break;
        }
        case Dialog.BUYVIP: {
            if(response) {
                switch(listitem) {
                    case 0: {
                        let info = "";
                        info += "{00FF00}Ai cumparat cu succes {FF0000}VIP Red{00FF00} Gratis!\n";
                        info += "{00FF00}Scrie {00BBF6}/vCmds {00FF00}pentru a vedea {FF0000}Comenzile de VIP{00FF00}!";
                        player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, Lang(player, "VIP {FF0000}Cumparat{AFAFAF}!", ""), info, "Ok", "VCmds");
                        break;
                    }
                    case 1: {
                        break;
                    }
                    case 2: {
                        break;
                    }
                    case 3: {
                        break;
                    }
                }
            }
            break;
        }
        case Dialog.IMPORTANT_1: {
            if(response) ShowImportant(player, 2);
            else CMD.emit("rules", player);
            break;
        }
        case Dialog.IMPORTANT_2: {
            if(!response) ShowImportant(player, 1);
            break;
        }
        case Dialog.RULES: {
            if(!response) ShowImportant(player, 1);
            break;
        }
        case Dialog.ADD_MAIL: {
            if(response) {
                if(validateEmail(inputtext)) {
                    player.SendClientMessage(player, data.colors.YELLOW, Lang(player, `Ti-ai adaugat cu succes E-Mail-ul {FF0000}${inputtext} {FFFF00}in Cont!`, `You have successfully added the {FF0000}${inputtext} {FFFF00}E-Mail in your Account!`));
                }
                else player.ShowPlayerDialog(Dialog.ADD_MAIL, samp.DIALOG_STYLE.INPUT, "E-Mail", Lang(player, "{FFFF00}Se pare ca nu ai un {FF0000}E-Mail {FFFF00}in cont!\n{FFCC00}In cazul in care iti vei uita parola, nu o vei putea recupera!\n\n{FF0000}Daca doresti sa iti adaugi un E-Mail in cont, te rugam sa il introduci mai jos:", "{FFFF00}It looks like you don't have any {FF0000}E-Mail {FF0000}in your account!\n{FFCC00}If you will forgot your password, you will be not able to recover it!\n\n{FF0000}If you want to add an E-Mail in your account, please type it before:"), Lang(player, "Adauga", "Add"), Lang(player, "Mai tarziu", "Later"));
            }
            else player.SendClientMessage(data.colors.YELLOW, Lang(player, "Ai refuzat sa iti adaugi un {FF0000}E-Mail {FFFF00}in cont! Cont-ul tau este vulnerabil!", "You refused to add an {FF0000}E-Mail {FFFF00}in your Account! Your Account is vulnerable!"));
            break;
        }
        case Dialog.CMDS_1: {
            if(!response) ShowCMDS(player, 2);
            break;
        }
        case Dialog.CMDS_2: {
            if(!response) ShowCMDS(player, 3);
            break;
        }
        case Dialog.CMDS_3: {
            if(!response) ShowCMDS(player, 1);
            break;
        }
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
    return true;
});

samp.OnPlayerText((player, text) => {
    samp.SendClientMessageToAll(player.GetPlayerColor(), `${player.GetPlayerName(24)}{00CC00}(${player.playerid}){FFFFFF}: ${text}`);
    return false;
});

samp.OnPlayerCommandText((player, cmdtext) => {
    if(Player.Info[player.playerid].LoggedIn) {
        cmdtext = cmdtext.toLowerCase(); 
        cmdtext = replaceAll(cmdtext, "/", ""); 
        let params = cmdtext.split(/[ ]+/);
        let temp_string = params[0];
        params.shift();
        if(CMD.eventNames().some(s => s == temp_string)) {
            CMD.emit(`${temp_string}`, player, params);
        }
        else player.SendClientMessage(data.colors.RED, `Comanda {BBFF00}/${temp_string}{FF0000} nu exista! Foloseste {BBFF00}/help{FF0000} sau {BBFF00}/cmds{FF0000}!`);
    }
    return true;
});  