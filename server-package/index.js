/* =============================== */
/* SA:MP RHS GAMEMODE COPY VERSION
/* =============================== */

/* Modules */
const samp = require("samp-node-lib");
const mysql = require("mysql");
const colors = require("colors");
const md5 = require("md5");

/* Custom Modules */
const Dialog = require("./modules/dialog");
const Errors = require("./modules/errors");
const events = require("./modules/events");
const Player = require("./modules/player");
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

/* ============== */
/* SA:MP Commands */
/* ============== */

/* Player's Commands */
CMD.on("ro", (player) => {
    player.SendClientMessage(data.colors.YELLOW, "Ti-ai schimbat limba in {FF0000}Romana{FFFF00}!");
    Player.Info[player.playerid].Language = 1;
});

CMD.on("eng", (player) => {
    player.SendClientMessage(data.colors.YELLOW, "You changed your language in {FF0000}English{FFFF00}!");
    Player.Info[player.playerid].Language = 2;
});

CMD.on("stats", (player, params) => {
    let info = "";
    info += "{FF4800}General statistics\n";
    info += `{BBFF00}Money: {49FFFF}$${player.GetPlayerMoney()}\n`;
    info += `{BBFF00}Coins: {49FFFF}0\n`;
    info += `{BBFF00}Respect: {49FFFF}+0 {BBFF00}/ {49FFFF}-0`;
    info += `{BBFF00}Online time: {49FFFF}0 {BBFF00}hrs, {49FFFF}0 {BBFF00}mins, {49FFFF}0 {BBFF00}secs\n`;
    info += `{BBFF00}Admin: ${Player.Info[player.playerid].Admin ? "{00FF00}Yes" : "{FF0000}No"}\n`;
    info += `{BBFF00}VIP: {FF0000}No\n`;
    info += "\n";
    info += "{FF4800}Killer statistics\n";
    info += `{BBFF00}Kills: {49FFFF}0 {BBFF00}| Headshots: {49FFFF}0\n`;
    info += `{BBFF00}Killing Spree: {49FFFF}0 {BBFF00}| Best Killing Spree: {49FFFF}0\n`;
    info += `{BBFF00}Deaths: {49FFFF}0\n`;
    info += `{BBFF00}Killer Rank: {FF0000}Noob\n`;
    info += "\n";
    info += `{FF4800}Driving skills\n`;
    info += `{BBFF00}Drift Points: {49FFFF}0 {BBFF00}({FF0000}Noob{BBFF00})\n`;
    info += `{BBFF00}Stunt Points: {49FFFF}0 {BBFF00}({FF0000}Noob{BBFF00})\n`;
    info += `{BBFF00}Race Points: {49FFFF}0 {BBFF00}({FF0000}Noob{BBFF00})\n`;
    info += "\n";
    info += "{FF4800}Properties\n";
    info += `{BBFF00}Business: {FF0000}No\n`;
    info += `{BBFF00}House: {FF0000}No\n`;
    info += `{BBFF00}Personal Vehicle: {FF0000}No\n`;
    info += "\n";
    info += `{FF4800}Statistics note: {49FFFF}0{BBFF00}/{FF0000}10 {BBFF00}- Rank: {FF0000}{42bff4}Noob`
    player.ShowPlayerDialog(Dialog.STATS, samp.DIALOG_STYLE.MSGBOX, `{FF0000}${player.GetPlayerName(24)}{BBFF00}'s stats!`, info, "Ok");
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

CMD.on("rules", (player) => {

});

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

});

CMD.on("admins", (player) => {

});

CMD.on("report", (player, params) => {

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
function validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function Lang(player, ro_string, en_string) {
    return Player.Info[player.playerid].Language == 1 ? ro_string : en_string;
}

function SendUsage(player, text) {
    player.SendClientMessage(0xFF0000AA, `USAGE: {49FFFF}${text}`);
}

function SendError(player, ro_error, en_error) {
    player.SendClientMessage(0xFF0000AA, "ERROR:" + Player.Info[player.playerid].Language == 1 ? ro_error : en_error);
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
            player.ShowPlayerDialog(Dialog.CMDS_2, samp.DIALOG_STYLE.MSGBOX, Player.Info[player.playerid].Language == 1 ? "Comenzi - Pagina {FF0000}2" : "Commands - Page {FF0000}1", info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", Player.Info[player.playerid].Language == 1 ? "Pagina 2" : "Page 2");
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
            player.ShowPlayerDialog(Dialog.CMDS_3, samp.DIALOG_STYLE.MSGBOX, Player.Info[player.playerid].Language == 1 ? "Comenzi - Pagina {FF0000}3" : "Commands - Page {FF0000}1", info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", Player.Info[player.playerid].Language == 1 ? "Pagina 1" : "Page 1");
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

            Player.Info[player.playerid].Mail = result[0].mail;
            Player.Info[player.playerid].Admin = result[0].admin;
            Player.Info[player.playerid].VIP = result[0].VIP;

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
});

samp.OnGameModeExit(() => {

});

samp.OnPlayerConnect((player) => {
    Player.ResetVariables(player);
    player.ShowPlayerDialog(Dialog.SELECT_LANGUAGE, samp.DIALOG_STYLE.MSGBOX, "{00BBF6}Language {FF0000}/ {00BBF6}Limba", `{FFFF00}Welcome to ${data.settings.SERVER_NAME}{FFFF00}, {00BBF6}${player.GetPlayerName(24)}{FFFF00}!\n{FFFF00}Please select your language to continue!`, "Romana", "English");
});

samp.OnPlayerDisconnect((player, reason) => {
    Player.ResetVariables(player);
});

samp.OnPlayerSpawn((player) => {
    if(!Player.Info[player.playerid].LoggedIn) return player.Kick();
    if(Player.Info[player.playerid].Mail == "none") {
        player.ShowPlayerDialog(Dialog.ADD_MAIL, samp.DIALOG_STYLE.INPUT, "E-Mail", Lang(player, "{FFFF00}Se pare ca nu ai un {FF0000}E-Mail {FFFF00}in cont!\n{FFCC00}In cazul in care iti vei uita parola, nu o vei putea recupera!\n\n{FF0000}Daca doresti sa iti adaugi un E-Mail in cont, te rugam sa il introduci mai jos:", "{FFFF00}It looks like you don't have any {FF0000}E-Mail {FF0000}in your account!\n{FFCC00}If you will forgot your password, you will be not able to recover it!\n\n{FF0000}If you want to add an E-Mail in your account, please type it before:"), Lang(player, "Adauga", "Add"), Lang(player, "Mai tarziu", "Later"));
    }
});

samp.OnPlayerUpdate((player) => {
    return true;
});

samp.OnDialogResponse((player, dialogid, response, listitem, inputtext) => {
    switch(dialogid) {
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