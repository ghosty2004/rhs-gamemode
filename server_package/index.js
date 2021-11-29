/* =============================== */
/* SA:MP RHS GAMEMODE COPY VERSION */
/*      Made by Ghosty2004 <3      */
/* =============================== */

/* Modules */
const samp = require("samp-node-lib");
const colors = require("colors");
const md5 = require("md5");
const YouTubeSearch = require("youtube-search-without-api-key");
const hastebin = require("hastebin-gen");

/* YouTube Audio Stream Module */
require("youtube-audio-server").listen(7777);

/* Custom Modules */
const Clan = require("./modules/clan");
const Dialog = require("./modules/dialog");
const Errors = require("./modules/errors");
const events = require("./modules/events");
const Function = require("./modules/functions");
const Gang = require("./modules/gang");
const Minigames = require("./modules/minigames");
const con = require("./modules/mysql"); 
const Player = require("./modules/player");
const Server = require("./modules/server");
const SpawnZone = require("./modules/spawnzone");
const Streamer = require("./modules/streamer");
const Teleport = require("./modules/teleport");
const Discord = require("./modules/discordbot");

/* Server Maps */
const Maps = require("./maps");

/* Server TextDraws */
const TextDraws = require("./textdraws");

const ServerLogs = ["", "", ""];

/* Functions */
const { getPlayer } = require("./modules/functions");

/* Data's */
const data = {
    colors: require("./data/colors"),
    position: require("./data/positions"),
    settings: require("./data/settings"),
}

/* MYSQL Connect Event */
con.on("mysqlConnect", (err) => {
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

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

/* ===================== */
/* Discord Login Command */
/* ===================== */
CMD.on("acceptlogin", (player) => {
    if(!Player.Info[player.playerid].DiscordLoginRequest.From) return SendError(player, "You don't have a login request from discord!");
    let code = Function.getRandomInt(10000, 99999);
    Player.Info[player.playerid].DiscordLoginRequest.Code = code;
    let user = Discord.bot.users.cache.get(Player.Info[player.playerid].DiscordLoginRequest.From);
    user.send(`Login request from **${player.GetPlayerName(24)}(${player.playerid})**\nType here the code from server.`).then(() => {
        player.SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}Now use code {5865F2}${code} {FFFFFF}in your DM with bot!`);
    }).catch(() => {
        player.SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}Upps! I can't send {5865F2}Direct Message {FFFFFF}to you. Please verify {5865F2}Privacy & Safety{FFFFFF}!`);
    });
});

CMD.on("declinelogin", (player) => {
    if(!Player.Info[player.playerid].DiscordLoginRequest.From) return SendError(player, "You don't have a login request from discord!");
    player.SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}You have declined the login request.`);
    Player.Info[player.playerid].DiscordLoginRequest.From = null;
});

CMD.on("discordsignout", (player) => {
    if(!Player.Info[player.playerid].Discord) return SendError(player, "You don't have a discord login session in your account.");
    let user = Discord.bot.users.cache.get(Player.Info[player.playerid].Discord);
    player.SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}You have signed out from your account: {5865F2}${user ? `${user.tag}` : "null"}{FFFFFF}!`);
    user.send(`You have signed out from account **${player.GetPlayerName(24)}**`).catch(() => {});
    Player.Info[player.playerid].Discord = 0;
});

/* ================ */
/* Players Commands */
/* ================ */
CMD.on("cmds", (player) => {
    ShowCMDS(player, 1);
});

CMD.on("createclan", (player) => {
    if(Player.Info[player.playerid].Clan) return SendError(player, "You already have a Clan. Type /lclan to leave your current clan!");
    player.GameTextForPlayer("~n~~n~~n~~n~~n~~n~~n~~n~~r~~h~Create ~w~~h~your own ~g~~h~clan!", 4000, 4);
    player.ShowPlayerDialog(Dialog.CREATE_CLAN, samp.DIALOG_STYLE.INPUT, "{BBFF00}Create Clan", "{0072FF}You are now creating a clan!\nEnter below the name of your clan to continue...", "Continue", "Close");
});

CMD.on("car", (player, params) => {
    if(!params[0]) return SendUsage(player, "/car [Name/Model] [Color1] [Color2]");
    let index, color1 = Function.getRandomInt(0, 255), color2 = Function.getRandomInt(0, 255);
    if(isNaN(params[0])) index = samp.vehicleNames.findIndex(f => f.toLowerCase().includes(params[0].toLowerCase()));
    else index = parseInt(params[0]) - 400;
    if(index <= -1) return SendError(player, "Invalid vehicle name!");
    if(!isNaN(params[1])) color1 = parseInt(params[1]);
    if(!isNaN(params[2])) color2 = parseInt(params[2]);
    SpawnCar(player, (400+index), color1, color2);
});

CMD.on("v", (player, params) => { 

});

CMD.on("nrg", (player) => { SpawnCar(player, 522); });

CMD.on("ro", (player) => {
    player.SendClientMessage(data.colors.YELLOW, "Ti-ai schimbat limba in {FF0000}Romana{FFFF00}!");
    Player.Info[player.playerid].Language = 1;
});

CMD.on("eng", (player) => {
    player.SendClientMessage(data.colors.YELLOW, "You changed your language in {FF0000}English{FFFF00}!");
    Player.Info[player.playerid].Language = 2;
});

CMD.on("htds", (player) => {
    Player.Info[player.playerid].HideTextDraws =! Player.Info[player.playerid].HideTextDraws;
    player.GameTextForPlayer(`~w~~h~Hide Textdraws ${Player.Info[player.playerid].HideTextDraws ? "~g~~h~~h~On" : "~r~~h~Off"}`, 4000, 4);
    switch(Player.Info[player.playerid].HideTextDraws) {
        case false: {
            player.TextDrawShowForPlayer(TextDraws.server.spawn[3]);
            player.PlayerTextDrawShow(TextDraws.player.date[player.playerid]);
            break;
        }
        case true: {
            player.TextDrawHideForPlayer(TextDraws.server.spawn[3]);
            player.PlayerTextDrawHide(TextDraws.player.date[player.playerid]);
            break;
        }
    }
});

CMD.on("spassword", (player) => {
    con.query("SELECT spassword FROM users WHERE ID = ?", [Player.Info[player.playerid].AccID], function(err, result) {
        let info = "";
        if(result[0].spassword == "null") {
            info += `${Lang(player, "{FF0000}Atentie!:", "{FF0000}Attention!:")}\n`;
            info += "\n";
            info += `${Lang(player, "{FFCC00}Adaugandu-ti o Parola Secundara in cont, vei ridica cu mult gradul de securitate al acestuia!", "{FFCC00}By adding a Secondary Password in your Account, you will rise up it's security!")}\n`;
            info += `${Lang(player, "{FFCC00}De cate ori vei intra pe server, va trebuii sa te loghezi cu ambele parole.", "{FFCC00}Each time you will join our server, you must login with both passwords.")}\n`;
            info += "\n";
            info += `${Lang(player, "{BBFF00}Te rugam sa introduci {FF0000}Parola Secundara{BBFF00}:", "{BBFF00}Please enter before the {FF0000}Secondary Password{BBFF00}:")}`;
            player.ShowPlayerDialog(Dialog.SPASSWORD, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Parola Secundara", "Secondary Password"), info, "Ok", Lang(player, "Renunta", "Cancel"));
        }
        else {
            info += `${Lang(player, "{49FFFF}Schimba Parola Secundara", "{49FFFF}Change Secondary Password")}\n`;
            info += `${Lang(player, "{FF0000}Dezactiveaza Parola Secundara", "{FF0000}Remove Secondary Password")}\n`;
            player.ShowPlayerDialog(Dialog.SPASSWORD_OPTIONS, samp.DIALOG_STYLE.LIST, Lang(player, "Parola Secundara", "Secondary Password"), info, Lang(player, "Selecteaza", "Select"), Lang(player, "Renunta", "Cancel"));
        }
    });
});

CMD.on("skin", (player, params) => {
    if(!params[0]) return player.SendClientMessage(data.colors.RED, `Your current Skin ID is: ${player.GetPlayerSkin()}`);
    params[0] = parseInt(params[0]);
    if(params[0] < 0 || params[0] > 311) SendError(player, "Skin invalid!", "Invalid Skin!");
    player.SendClientMessage(data.colors.GREEN, `Ti-ai schimbat {00BBF6}Skin-ul {00FF00}cu succes! ({00BBF6}Skin: ${params[0]}{00FF00})`);
    player.SetPlayerSkin(params[0]);
});

CMD.on("anim", (player, params) => {
    if(!params[0]) return SendUsage(player, "/anim [List/Anim]");
    switch(params[0]) {
        case "list": {
            let info = "";
            info += "{BBFF00}The following {00BBF6}Anims {BBFF00}can be used with the command {00BBF6}/Anim [Anim]{BBFF00}!\n";
            info += "{00BBF6}Example: {BBFF00}/Anim wave\n";
            info += "\n";
            info += "{BBFF00}Wave{00BBF6}, {BBFF00}Wank{00BBF6}, {BBFF00}Fall{00BBF6}, {BBFF00}Fall2{00BBF6}, {BBFF00}Relax{00BBF6}, {BBFF00}Hup{00BBF6}, {BBFF00}Bomb{00BBF6}, {BBFF00}Rob{00BBF6}, {BBFF00}Taichi{00BBF6}, {BBFF00}Spank{00BBF6},{BBFF00}CJ{00BBF6},\n";
            info += "{BBFF00}Sick{00BBF6}, {BBFF00}Talk{00BBF6}, {BBFF00}Kiss{00BBF6}, {BBFF00}Sit{00BBF6}, {BBFF00}FuckU{00BBF6}, {BBFF00}Coc{00BBF6}, {BBFF00}Rocky{00BBF6}, {BBFF00}Smoke{00BBF6}, {BBFF00}Beach{00BBF6}, {BBFF00}Look{00BBF6}, {BBFF00}Gro{00BBF6},\n";
            info += "{BBFF00}Circ{00BBF6}, {BBFF00}Med{00BBF6}, {BBFF00}Chat{00BBF6}, {BBFF00}Die{00BBF6}, {BBFF00}Slap{00BBF6}, {BBFF00}Roll{00BBF6}, {BBFF00}Glitch{00BBF6}, {BBFF00}Fire{00BBF6}, {BBFF00}Vomit{00BBF6}, {BBFF00}Drunk{00BBF6}, {BBFF00}Lbp{00BBF6},\n";
            info += "{BBFF00}GetIn{00BBF6}, {BBFF00}Pee{00BBF6}, {BBFF00}Piss{00BBF6}, {BBFF00}Kick{00BBF6}, {BBFF00}Cell{00BBF6}, {BBFF00}Phone{00BBF6}, {BBFF00}Laugh{00BBF6}, {BBFF00}Eat{00BBF6}, {BBFF00}Inj{00BBF6}, {BBFF00}SlapAss{00BBF6}, {BBFF00}Deal{00BBF6},\n";
            info += "{BBFF00}Lay{00BBF6}, {BBFF00}Arrest{00BBF6}, {BBFF00}ScaRED{00BBF6}, {BBFF00}BJ{00BBF6}, {BBFF00}BJ2{00BBF6}, {BBFF00}BJ3{00BBF6}, {BBFF00}Swat{00BBF6}, {BBFF00}Swat2{00BBF6}, {BBFF00}Swat3{00BBF6}, {BBFF00}Swat4{00BBF6}, {BBFF00}Swat5{BBFF00},\n";
            info += "{BBFF00}Swat6{00BBF6}, {BBFF00}Shout{00BBF6}, {BBFF00}Strip{00BBF6}, {BBFF00}Strip2{00BBF6}, {BBFF00}Strip3{00BBF6}, {BBFF00}Strip4{00BBF6}, {BBFF00}Strip5{00BBF6}, {BBFF00}BaseBall{00BBF6}, {BBFF00}BaseBall2{00BBF6}.\n";
            info += "\n";
            info += "{00BBF6}Pont: {BBFF00}To stop an {00BBF6}Anim {BBFF00}, type {00BBF6}/Anim {FF0000}stop{BBFF00}.\n";
            info += "{BBFF00}Total Anims: {FF0000}64";
            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Anim {FF0000}List", info, "Close", "");
            break;
        }
    }
});

CMD.on("changename", (player) => {
    
});

CMD.on("atrade", (player, params) => {
    if(!params[0]) return SendUsage(player, "/aTrade [Off/ID]");
    if(params[0] == "off") {
        player.SendClientMessage(data.colors.YELLOW, `Trade succesfully {FF0000}Disabled{FFFF00}!`);
        Player.Info[player.playerid].Atrade = -1;
    }
    else {
        let target = getPlayer(params[0]);
        if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
        player.SendClientMessage(data.colors.YELLOW, `Trade succesfully {FF0000}Enabled{FFFF00} on {FF0000}${target.GetPlayerName(24)}(${target.playerid}){FFFF00}!`);
        Player.Info[player.playerid].Atrade = target.playerid;
    }
});

CMD.on("trade", (player) => {
    let info = "";
    info += "{BBFF00}Using this command you will be able to exchange things from /stats with other players!\n";
    info += "{BBFF00}Please enter below {FF0000}Name/ID {BBFF00}of the player you want to trade with.\n";
    info += "\n";
    info += "{BBFF00}Use {FF0000}/Market{BBFF00} to see prices for trade.";
    player.ShowPlayerDialog(Dialog.TRADE, samp.DIALOG_STYLE.INPUT, "Trade", info, "Next", "Cancel");
});

CMD.on("market", (player) => {
    
});

CMD.on("brb", (player) => { AfkBrb(player, 0); });

CMD.on("afk", (player) => { AfkBrb(player, 1); });

CMD.on("back", (player) => {
    if(!Player.Info[player.playerid].AFK) return;
    samp.GameTextForAll(`~n~~n~~n~~n~~n~~n~~r~~h~${player.GetPlayerName(24)} ~w~~h~is ~g~~h~Back`, 5000, 5);
    player.SetPlayerVirtualWorld(0);
    player.SetCameraBehindPlayer();
    for(let i = 0; i < 4; i++) player.TextDrawHideForPlayer(TextDraws.server.afk_brb[i]);
    Player.Info[player.playerid].AFK = false;
});

CMD.on("accept", (player) => {

});

CMD.on("decline", (player) => {

});

CMD.on("vips", (player) => {
    let info = "Name\tRank\n";
    let result = samp.getPlayers().filter(f => Player.Info[f.playerid].VIP);
    result.forEach((i) => {
        info += `{49FFFF}${i.GetPlayerName(24)}(${i.playerid})\t${getVIPRank(Player.Info[i.playerid].VIP)}\n`;
    });
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.TABLIST_HEADERS, `{00FF00}There are {00BBF6}${result.length} {00FF00}Online VIP(s)!`, info, "Close", "");
});

CMD.on("mp3", (player) => {

});

CMD.on("kill", (player) => {
    player.SetPlayerHealth(0);
    player.SetPlayerArmour(0);
});

CMD.on("jetpack", (player) => {
    player.SetPlayerSpecialAction(2);
    player.GameTextForPlayer("~b~~h~JetPack Spawned!", 1000, 6);
});

CMD.on("myint", (player, params) => {
    if(isNaN(params[0])) return SendUsage(player, "/myint [InteriorID]");
    params[0] = parseInt(params[0]);
    player.SetPlayerInterior(params[0]);
    player.SendClientMessage(data.colors.LIGHT_BLUE, `You have setted your interior to ${params[0]}.`);
});

CMD.on("vworld", (player, params) => {
    if(isNaN(params[0])) return SendUsage(player, "/vworld [WorldID]");
    params[0] = parseInt(params[0]);
    player.SetPlayerVirtualWorld(params[0]);
    player.SendClientMessage(data.colors.LIGHT_BLUE, `You have setted your virtual world to ${params[0]}.`);
    let info = "";
    info += `${Lang(player, "Commanda /vw te ajuta sa schimbi lumea in care te joci!", "Command /vw help you to change the world where you play!")}\n`;
    info += `${Lang(player, "In aceasta lume esti singur! Toate vehiculele au disparut de pe harta!", "In this new world you are alone! All vehicles have disappeared off the map!")}\n`;
    info += `${Lang(player, "Pentru alte vehicule foloseste /car <numele masini>!", "For other vehicle use the command /car <car name>!")}\n`;
    info += "\n";
    info += `${Lang(player, "Iti poti invita prietenii in aceasta lume folosind /pm pentru a avea un duel sau o cursa!", "You can invite your friends with /pm in this world for have a duel or a race!")}\n`;
    info += "\n";
    info += `${Lang(player, "Pentru a te intoarce inapoi in lumea normala cu toti jucatori foloseste /vw 0 sau teleporteazate! Exemplu /lv", "To return to the normal world with other players use /vw 0 or teleport in one place! For example /lv")}`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, Lang(player, "Lumea mea virtuala", "My Virutal World"), info, "Ok", "");
});
CMD.on("vw", (player, params) => { CMD.emit("vworld", player, params); });

CMD.on("godp", (player) => {
    let info = "";
    let result = samp.getPlayers().filter(f => Player.Info[f.playerid].GodMode);
    result.forEach((i) => {
        info += `{00FF00}${i.GetPlayerName(24)} {00BBF6}(ID:${i.playerid}) {00FF00}- GodMode`;
    });
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.LIST, `{00FF00}There are {00BBF6}${result.length} {00FF00}players with God Mode On!`, info, "Close", "");
});

CMD.on("house", (player) => {

});

CMD.on("business", (player) => {

});

CMD.on("leave", (player) => {
    if(isPlayerInSpecialZone(player)) {
        if(Player.Info[player.playerid].SpecialZone.Targets) {
            player.PlayerTextDrawHide(TextDraws.player.targets_points[player.playerid]);
            player.PlayerTextDrawSetString(TextDraws.player.targets_points[player.playerid], "~r~~h~Points: ~w~~h~0");
            let coins = Math.round(Player.Info[player.playerid].TargetsPoints / 2);
            let money = Math.round(Player.Info[player.playerid].TargetsPoints * 50);
            player.GameTextForPlayer(`~r~~h~you won ${coins} coins and $${money}~n~~w~~h~for making ~g~~h~${Player.Info[player.playerid].TargetsPoints} ~w~~h~points`, 5000, 3);
            Player.Info[player.playerid].SpecialZone.Targets = false;
            Player.Info[player.playerid].TargetsPoints = 0;
        }
        player.SpawnPlayer();
    }
});

CMD.on("int", (player) => {

});

CMD.on("weapons", (player) => {

});
CMD.on("arme", (player) => { CMD.emit("weapons", player); });

CMD.on("fweapons", (player) => {

});

CMD.on("bweapons", (player) => {

});

CMD.on("para", (player) => {
    player.GivePlayerWeapon(46, 1);
    player.SendClientMessage(data.colors.GREEN, Lang(player, "Ai primit o {00BBF6}Parasuta{00FF00}!", "You took a {00BBF6}Parachute{00FF00}!"));
});

CMD.on("camera", (player) => {
    player.GivePlayerWeapon(43, 9999);
    player.SendClientMessage(data.colors.GREEN, Lang(player, "Ai primit un {00BBF6}Aparat foto{00FF00}!", "You took a {00BBF6}Camera{00FF00}!"));
});

CMD.on("dick", (player) => {

});

CMD.on("pee", (player) => {

});

CMD.on("beer", (player) => {

});

CMD.on("wine", (player) => {

});

CMD.on("soda", (player) => {

});

CMD.on("cigar", (player) => {

});

CMD.on("drunkoff", (player) => {

});

CMD.on("day", (player) => {

});
CMD.on("zi", (player) => { CMD.emit("day", player); });

CMD.on("night", (player) => {

});
CMD.on("noapte", (player) => { CMD.emit("night", player); });

CMD.on("morning", (player) => {

});

CMD.on("evening", (player) => {

});

CMD.on("dance", (player, params) => {

});

CMD.on("count", (player) => {

});

CMD.on("fpd", (player) => {

});

CMD.on("tune", (player) => {

});

CMD.on("tcar", (player, params) => {

});

CMD.on("neon", (player) => {

});

CMD.on("respect", (player, params) => {

});

CMD.on("speed", (player) => {

});

CMD.on("fix", (player) => {

});

CMD.on("happy", (player) => {

});

CMD.on("sad", (player) => {

});

CMD.on("tow", (player) => {

});

CMD.on("vcontrol", (player) => {

});

CMD.on("ad", (player, params) => {

});

CMD.on("hidetag", (player) => {

});

CMD.on("vup", (player) => {

});

CMD.on("pm", (player, params) => {

});

CMD.on("hold", (player) => {

});

CMD.on("report", (player, params) => {
    if(params[0] && params.slice(1).join(" ")) {
        let target = getPlayer(params[0]);
        if(target) {
            if(Player.Info[target.playerid].Reported.By != -1) return SendError(player, "This player already have been reported!");
            player.SendClientMessage(data.colors.RED, `/REPORT: {BBFF00}${target.GetPlayerName(24)}(${target.playerid}) was reported at administrators online. Reason: ${params.slice(1).join(" ")}`);
            Player.Info[target.playerid].Reported.By = player.playerid;
            Player.Info[target.playerid].Reported.Reason = params.slice(1).join(" ");
            checkReportsTD();
        }
        else SendError(player, Errors.PLAYER_NOT_CONNECTED);
    }
    else SendUsage(player, "/Report [ID/Name] [Reason]");
});

CMD.on("up", (player, params) => {
    if(isNaN(params[0])) return SendUsage(player, "");
    params[0] = parseInt(params[0]);
    player.SetPlayerPos(player.position.x, player.position.y, player.position.z + params[1]);
    player.SendClientMessage(data.colors.GREEN, Lang(player, `Te-ai teleportat la {00BBF6}${params[0]} metri {00FF00}altitudine!`, `You have been teleported to {00BBF6}${params[0]} meters {00FF00}altitude!`));
});

CMD.on("dive", (player) => {

});

CMD.on("rw", (player) => {

});

CMD.on("ww", (player) => {

});

CMD.on("walks", (player) => {

});

CMD.on("fstyles", (player) => {

});

CMD.on("np", (player) => {

});

CMD.on("s", (player) => {

});

CMD.on("l", (player) => {

});

CMD.on("c4", (player) => {

});

CMD.on("top", (player) => {
    let info = "";
    info += "{BBFF00}Top Gangs\n";
    info += "{BBFF00}Top Clans\n";
    info += "{BBFF00}Top Admins\n";
    info += "{BBFF00}Top 10 players in this month\n";
    info += `{FFEB7B}Top 100 and many more, only on{FF0000} ${data.settings.SERVER_WEB}`;
    player.ShowPlayerDialog(Dialog.TOP, samp.DIALOG_STYLE.LIST, "Top 10", info, "Select", "Close");
});

CMD.on("holdoff", (player) => {

});

CMD.on("session", (player) => {

});

CMD.on("ostats", (player, params) => {

});

CMD.on("skill", (player) => {

});

CMD.on("ramp", (player) => {

});

CMD.on("statsserver", async (player) => {
    let OnlineTime = Function.timestampToHMS(Server.Info.StartTime);

    let info = "";
    info += `{BBFF00}Server has been started for{00BBF6} ${OnlineTime.hours} {BBFF00}hours, {00BBF6}${OnlineTime.minutes} {BBFF00}minutes {00BBF6}${OnlineTime.seconds} {BBFF00}seconds\n`;
    info += `{BBFF00}Players joined to the server{00BBF6} ${Server.Info.NewJoinedPlayers}\n`;
    info += `{BBFF00}New players registered on server{00BBF6} ${Server.Info.NewRegistredPlayers}\n`;
    info += `{BBFF00}Total players registered on server{00BBF6} ${await getRegistredPlayersCount()}\n`;
    info += `{BBFF00}Messages has been sent{00BBF6} ${Server.Info.Messages}`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Server Stats", info, "Close", "");
});

CMD.on("howto", (player) => {

});

CMD.on("important", (player) => { ShowImportant(player, 1); });

CMD.on("duel", (player, params) => {

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

CMD.on("wtime", (player, params) => {

});

CMD.on("blacklisted", (player) => {

});

CMD.on("email", (player) => {

});

CMD.on("buyvip", (player) => {
    let info = `${Lang(player, "Item\tPret\tValabilitate", "Item\tPrice\tValidity")}\n`;
    info += `${Lang(player, "{FF0000}Rosu\t{00BBF6}Gratis!\t{00FF00}Permanent!", "{FF0000}Red\t{00BBF6}Free!\t{00FF00}Permanent!")}\n`;
    info += `${Lang(player, "{FFFF00}Galben\t{BBFF00}20.000 Coins + 20 Ore\t{00FF00}Permanent!", "{FFFF00}Yellow\t{BBFF00}20.000 Coins + 20 Hours\t{00FF00}Permanent!")}\n`;
    info += `${Lang(player, "{0077FF}Albastru\t{BBFF00}80.000 Coins + 80 Ore\t{00FF00}Permanent!", "{0077FF}Blue\t{BBFF00}80.000 Coins + 80 Hours\t{00FF00}Permanent!")}\n`;
    info += `${Lang(player, "{FFFFFF}Alb\t{BBFF00}150.000 Coins + 150 Ore\t{00BBF6}30 Zile!", "{FFFFFF}White\t{BBFF00}150.000 Coins + 150 Hours\t{00BBF6}30 Days!")}`;
    player.ShowPlayerDialog(Dialog.BUYVIP, samp.DIALOG_STYLE.TABLIST_HEADERS, Lang(player, "Cumpara VIP - Scrie {FF0000}/vcmds {D1D1D1}pentru comenzi.", "Buy VIP - Type {FF0000}/vcmds {D1D1D1}for commands."), info, Lang(player, "Cumpara", "Buy"), Lang(player, "Inchide", "Close"));
});

CMD.on("stats", (player, params) => {
    let target = player;
    if(params[0]) target = getPlayer(params[0]);
    if(target) {
        let OnlineTime = TotalGameTime(target);
        let info = "";
        info += "{FF4800}General statistics\n";
        info += `{BBFF00}Money: {49FFFF}$${Player.Info[target.playerid].Money}\n`;
        info += `{BBFF00}Coins: {49FFFF}${Player.Info[target.playerid].Coins}\n`;
        info += `{BBFF00}Respect: {49FFFF}+${Player.Info[target.playerid].Respect.Positive} {BBFF00}/ {49FFFF}-${Player.Info[player.playerid].Respect.Negative}\n`;
        info += `{BBFF00}Online time: {49FFFF}${OnlineTime.hours} {BBFF00}hrs, {49FFFF}${OnlineTime.minutes} {BBFF00}mins, {49FFFF}${OnlineTime.seconds} {BBFF00}secs\n`;
        info += `{BBFF00}Admin: ${Player.Info[target.playerid].Admin ? `{49FFFF}Yes {BBFF00}- ${getAdminRank(Player.Info[player.playerid].Admin)}` : "{FF0000}No"}\n`;
        info += `{BBFF00}VIP: ${Player.Info[target.playerid].VIP ? `{49FFFF}Yes {BBFF00}- ${getVIPRank(Player.Info[player.playerid].VIP)}` : "{FF0000}No"}\n`;
        info += "\n";
        info += "{FF4800}Killer statistics\n";
        info += `{BBFF00}Kills: {49FFFF}${Player.Info[target.playerid].Kills_Data.Kills} {BBFF00}| Headshots: {49FFFF}${Player.Info[target.playerid].Kills_Data.HeadShots}\n`;
        info += `{BBFF00}Killing Spree: {49FFFF}${Player.Info[target.playerid].Kills_Data.KillingSpree} {BBFF00}| Best Killing Spree: {49FFFF}${Player.Info[target.playerid].Kills_Data.BestKillingSpree}\n`;
        info += `{BBFF00}Deaths: {49FFFF}${Player.Info[target.playerid].Kills_Data.Deaths}\n`;
        info += `{BBFF00}Killer Rank: ${getRanksRankName("kills", Player.Info[target.playerid].Kills_Data.Kills)}\n`;
        info += "\n";
        info += `{FF4800}Driving skills\n`;
        info += `{BBFF00}Drift Points: {49FFFF}${Player.Info[target.playerid].Driving_Data.DriftPoints} {BBFF00}(${getRanksRankName("drift", Player.Info[target.playerid].Driving_Data.DriftPoints)}{BBFF00})\n`;
        info += `{BBFF00}Stunt Points: {49FFFF}${Player.Info[target.playerid].Driving_Data.StuntPoints} {BBFF00}(${getRanksRankName("stunt", Player.Info[target.playerid].Driving_Data.StuntPoints)}{BBFF00})\n`;
        info += `{BBFF00}Race Points: {49FFFF}${Player.Info[target.playerid].Driving_Data.RacePoints} {BBFF00}(${getRanksRankName("race", Player.Info[target.playerid].Driving_Data.RacePoints)}{BBFF00})\n`;
        info += "\n";
        info += "{FF4800}Properties\n";
        info += `{BBFF00}Business: {FF0000}No\n`;
        info += `{BBFF00}House: {FF0000}No\n`;
        info += `{BBFF00}Personal Vehicle: {FF0000}No\n`;
        info += "\n";
        info += `{FF4800}Statistics note: {49FFFF}${getPlayerStatsNote(target)}{BBFF00}/{FF0000}10 {BBFF00}- Rank: {FF0000}{42bff4}Noob`
        player.ShowPlayerDialog(Dialog.STATS, samp.DIALOG_STYLE.MSGBOX, `{FF0000}${target.GetPlayerName(24)}{BBFF00}'s stats!${Player.Info[target.playerid].Kicks ? ` - {FF0000}${Player.Info[target.playerid].Kicks}/3 {BBFF00}kicks` : ""}`, info, "Ok", `${target == player ? "Description" : ""}`);
    }
    else SendError(player, Errors.PLAYER_NOT_CONNECTED);
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
    info += "{15FF00}[9mm]_LimiTLesS_\n";
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

CMD.on("stunts", (player) => {
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
});

CMD.on("jumps", (player) => {
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
});

CMD.on("dm", (player) => {
    let info = "Command\tDescription\tPlaying\n";
    info += `{49FFFF}/Minigun\t{BBFF00}Minigun DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/De\t{BBFF00}Desert Eagle DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/M4\t{BBFF00}M4 DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/Os\t{BBFF00}One Shot DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/Sniper\t{BBFF00}Sniper DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/Mrf\t{BBFF00}Minigun-Rocket-Flame\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/GArena\t{BBFF00}Gang Arena DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/Oh\t{BBFF00}One Hit DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/Prodm\t{BBFF00}Pro DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/Helldm\t{BBFF00}Hell DeathMatch\t{00BBF6}0 Players\n`;
    info += `{49FFFF}/GunWar\t{BBFF00}Gun War DeathMatch\t{00BBF6}0 Players`;
    player.ShowPlayerDialog(Dialog.TELES_DM, samp.DIALOG_STYLE.TABLIST_HEADERS, "Death match zone", info, "Teleport", "Back");
});

CMD.on("int", (player) => {

});

CMD.on("drifts", (player) => {
    let info = "";
    info += "{0072FF}/Drift 1\n";
    info += "{0072FF}/Drift 2\n";
    info += "{FF0000}/Drift 3\n";
    info += "{FF0000}/Drift 4\n";
    info += "{FF0000}/Drift 5\n";
    info += "{FFFF00}/Drift 6\n";
    info += "{FFFF00}/LvAir";
    player.ShowPlayerDialog(Dialog.TELES_DRIFTS, samp.DIALOG_STYLE.LIST, "Drifts", info, "Teleport", "Back");
});

CMD.on("races", (player) => {

});

CMD.on("jobs", (player) => {
    let info = "";
    info += "{BBFF00}Truck Driver\n";
    info += "{BBFF00}Air Pilot\n";
    info += "{BBFF00}Pizza Boy\n";
    info += "{BBFF00}Ambulance Driver\n";
    info += "{BBFF00}Policeman\n";
    info += "{BBFF00}Fisherman\n";
    info += "{BBFF00}Hunterman";
    player.ShowPlayerDialog(Dialog.TELES_JOBS, samp.DIALOG_STYLE.LIST, "Jobs", info, "Teleport", "Back");
});

CMD.on("minigames", (player) => {
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
});

CMD.on("gifts", (player) => {

});

CMD.on("lastman", (player) => {

});

CMD.on("hns", (player) => {

});

CMD.on("gparkour", (player) => {

});

CMD.on("sfparkour", (player) => {

});

CMD.on("targets", (player) => {
    Player.Info[player.playerid].SpecialZone.Targets = true;
    player.ResetPlayerWeapons();
    player.GivePlayerWeapon(Minigames.Targets.Weapon, 9999);
    player.SetPlayerVirtualWorld(1000);
    TelePlayer(player, "targets", "Targets", -498.7933, -2675.3245, 1081.9259, 271.9457);
    player.PlayerTextDrawShow(TextDraws.player.targets_points[player.playerid]);
});

CMD.on("skyclimb", (player) => {

});

CMD.on("derby", (player) => {

});

CMD.on("football", (player) => {

});

CMD.on("zm", (player) => {

});

CMD.on("challanges", (player) => {
    let info = "Command\tDescription\n";
    info += "{49FFFF}/Derby\t{BBFF00}Derby\n";
    info += "{49FFFF}/Bmx\t{BBFF00}Bmx\n";
    info += "{49FFFF}/Quad\t{BBFF00}Quad\n";
    info += "{49FFFF}/Karting\t{BBFF00}Karting\n";
    info += "{49FFFF}/Monster\t{BBFF00}Monster Crash";
    player.ShowPlayerDialog(Dialog.TELES_CHALLANGES, samp.DIALOG_STYLE.TABLIST_HEADERS, "Challenges", info, "Teleport", "Back");
});

CMD.on("parkours", (player) => {
    let info = "Command\tDescription\n";
    info += "{49FFFF}/proparkour\t{BBFF00}Pro Parkour\n";
    info += "{49FFFF}/gparkour\t{BBFF00}Grove Parkour\n";
    info += "{49FFFF}/sfparkour\t{BBFF00}San Fierro Parkour\n";
    info += "{49FFFF}/cpk\t{BBFF00}City Parkour";
    player.ShowPlayerDialog(Dialog.TELES_PARKOURS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Parkours Teleports", info, "Teleport", "Back");
});

CMD.on("partys", (player) => {
    let info = "Command\tDescription\n";
    info += "{49FFFF}/Party\t{BBFF00}Party\n";
    info += "{49FFFF}/Bamboo\t{BBFF00}Bamboo Club\n";
    info += "{49FFFF}/Bar\t{BBFF00}Party Bar\n";
    info += "{49FFFF}/Minecraft\t{BBFF00}Party Minecraft\n";
    info += "{49FFFF}/Island\t{BBFF00}Island";
    player.ShowPlayerDialog(Dialog.TELES_PARTYS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Partys", info, "Teleport", "Back");
});

CMD.on("splaces", (player) => {
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
});

CMD.on("others", (player) => {
    let info = "Command\tDescription\n";
    Teleport.Get().filter(f => f.type == "others").forEach((i) => {
        info += `{49FFFF}/${capitalizeFirstLetter(i.command)}\t{BBFF00}${i.name}\n`;
    });
    player.ShowPlayerDialog(Dialog.TELES_OTHERS, samp.DIALOG_STYLE.TABLIST_HEADERS, "Other Teleports", info, "Teleport", "Back");
});

CMD.on("sstunts", (player) => {
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
});

/* ============= */
/* VIPS Commands */
/* ============= */
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

/* ================ */
/* VIP RED COMMANDS */
/* ================ */
CMD.on("astats", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1 && Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("time", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("weather", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vad", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("goto", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1 && Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
    if(!params[0]) return SendUsage(player, "/Goto [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    player.SendClientMessage(data.colors.LIGHT_BLUE, `You have teleported to player ${target.GetPlayerName(24)}.`);
    target.SendClientMessage(data.colors.LIGHT_BLUE, `${player.GetPlayerName(24)} have been teleported to you.`);
    player.SetPlayerPos(target.position.x, target.position.y, target.position.z);
    SendACMD(player, "Goto");
});

CMD.on("spawnme", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vclub", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vdisarm", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("fire", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("get", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1 && Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
    if(!params[0]) return SendUsage(player, "/Get [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    player.SendClientMessage(data.colors.LIGHT_BLUE, `You have teleported player ${target.GetPlayerName(24)} to your location.`);
    target.SendClientMessage(data.colors.LIGHT_BLUE, `${player.GetPlayerName(24)} have teleported you to his location.`);
    target.SetPlayerPos(player.position.x, player.position.y, player.position.z);
    SendACMD(player, "Get");
});

CMD.on("carcolor", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("getid", (player, params) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("lockcar", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vcc", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("cmychat", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("dos", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("mycolor", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vbike", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vaccount", (player) => {
    if(Player.Info[player.playerid].VIP < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

/* =================== */
/* VIP YELLOW COMMANDS */
/* =================== */
CMD.on("admins", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return player.SendClientMessage(data.colors.RED, "Use /report [id/name] [reason] | if you see a hacker or if you have a problem!");
    let info = "Name\tRank\n";
    let result = samp.getPlayers().filter(f => Player.Info[f.playerid].Admin);
    result.forEach((i) => {
        info += `{49FFFF}${i.GetPlayerName(24)}(${i.playerid})\t${getAdminRank(Player.Info[i.playerid].Admin)}\n`;
    });
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.TABLIST_HEADERS, `{00FF00}There are {00BBF6}${result.length} {00FF00}Online Admin(s)!`, info, "Close", "");
});

CMD.on("s2", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("l2", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("s3", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("l3", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("chint", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("renew", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("ignore", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("maxammo", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("wset", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("wgm", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vipchat", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("weaps", (player, params) => {
    if(Player.Info[player.playerid].VIP < 2 && Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
    if(!params[0]) return SendUsage(player, "/Weaps [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
});

CMD.on("godmode", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("invisible", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("visible", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
}); 

CMD.on("vcar", (player) => {
    if(Player.Info[player.playerid].VIP < 2) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

/* ================= */
/* VIP BLUE COMMANDS */
/* ================= */
CMD.on("godcar", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vipisland", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("armhel", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("writecolor", (player, params) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
}); 

CMD.on("spec", (player, params) => {
    if(Player.Info[player.playerid].VIP < 3 && Player.Info[player.playerid].Admin < 1) return SendError(player, "You must have VIP Blue or Admin Junior to use this command!");
    if(!params[0]) return SendUsage(player, "/Spec [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    if(target.GetPlayerState() == samp.PLAYER_STATE.SPECTATING) return SendError(player, "Player spectating someone else!");
    player.GameTextForPlayer("~w~now~g~~h~ spectating~n~~w~type~r~~h~ /spec off~w~ to stop", 4000, 3);
    if(Player.Info[player.playerid].Admin) SendMessageToAdmins(data.colors.BLUE, `Admin: {FFFF00}${player.GetPlayerName(24)} {0000FF}has started spectating player {FFFF00}#${target.playerid}`);
    StartSpectate(player, target);
});

CMD.on("specoff", (player) => {
    if(Player.Info[player.playerid].VIP < 3 && Player.Info[player.playerid].Admin < 1) return SendError(player, "You must have VIP Blue or Admin Junior to use this command!");
    if(Player.Info[player.playerid].Spectating == -1) return SendError(player, "You are not spectating!");
    player.GameTextForPlayer("~w~spectate~r~~h~ off", 1000, 4);
    if(Player.Info[player.playerid].Admin) SendMessageToAdmins(data.colors.BLUE, `Admin: {FFFF00}${player.GetPlayerName(24)} {0000FF}has stopped spectating player {FFFF00}#${Player.Info[player.playerid].Spectating}`);
    StopSpectate(player);
});

CMD.on("vheli", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vtank", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vhydra", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vminigun", (player) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("eject", (player, params) => {
    if(Player.Info[player.playerid].VIP < 3) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

/* ================== */
/* VIP WHITE COMMANDS */
/* ================== */
CMD.on("highlight", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vhunter", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vrustler", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vsatchel", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vtag", (player, params) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vtagoff", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("vweapons", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("cartext", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("tags", (player) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
});

CMD.on("songforall", (player, params) => {
    if(Player.Info[player.playerid].VIP < 4) return SendError(player, Errors.NOT_ENOUGH_VIP.RO, Errors.NOT_ENOUGH_VIP.ENG);
    if(!params.slice(0).join(" ")) return SendUsage(player, "/SongForAll [YouTube Title]");
    player.SendClientMessage(-1, "Searching for YouTube results...");
    Player.Info[player.playerid].YouTubeSearchResults = [];
    YouTubeSearch.search(params.slice(0).join(" ")).then((result) => {
        let info = "Title\tTime\n";
        for(let i = 0; i < result.length; i++) {
            info += `${result[i].snippet.title}\t${result[i].snippet.duration}\n`;
            Player.Info[player.playerid].YouTubeSearchResults.push(result[i].id.videoId);
        }
        player.ShowPlayerDialog(Dialog.YOUTUBE_SEARCH, samp.DIALOG_STYLE.TABLIST_HEADERS, `{FFFFFF}YouTube Search - found {FF0000}${result.length} {FFFFFF}results`, info, "Play", "Close");
    });
});

CMD.on("songforme", (player, params) => {
    if(!params[0]) return SendUsage(player, "/SongForMe [URL]");
    player.PlayAudioStreamForPlayer(params[0]);
});

/* ============== */
/* Gangs Commands */
/* ============== */
CMD.on("gcmds", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    let info = "";
    info += "{BBFF00}OWNER Commands:\n";
    info += "{FFFFFF}/settings /setrank /alliance /stopalliance /refreshall\n";
    info += "\n";
    info += "{BBFF00}Leader Commands:\n";
    info += "{FFFFFF}/gwarn /gwar /gresetwarns\n";
    info += "\n";
    info += "{BBFF00}Co-Leader Commands:\n";
    info += "{FFFFFF}/invite /gangkick /gscreen /refresh /setgskin /giveacces\n";
    info += "\n";
    info += "{BBFF00}All members:\n";
    info += "{FFFFFF}/gm /gstats /lgang /c4 /garena /capture /refreshme /gtank /base\n";
    info += "\n";
    info += "{FFFF00}Type !text in chat for gang chat!\n";
    info += "{FFFF00}Type &text in chat for ally gang chat!";
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, `Gang - ${Gang.Info[Player.Info[player.playerid].Gang].name} ({FFFF00}${getGangRank(Player.Info[player.playerid].Gang_Data.Rank)}{AAAAAA})`, info, "Close", "");
});

/* =================== */
/* Gang Owner Commands */
/* =================== */
CMD.on("settings", (player) => {

});

CMD.on("setrank", (player, params) => {

});

CMD.on("alliance", (player, params) => {

});

CMD.on("stopalliance", (player) => {

});

CMD.on("refreshall", (player) => {

});

/* ==================== */
/* Gang Leader Commands */
/* ==================== */
CMD.on("gwarn", (player, params) => {

});

CMD.on("gwar", (player) => {

});

CMD.on("gresetwarns", (player, params) => {

});

/* ======================= */
/* Gang Co-Leader Commands */
/* ======================= */
CMD.on("invite", (player, params) => {

});

CMD.on("gangkick", (player, params) => {

});

CMD.on("gscreen", (player, params) => {

});

CMD.on("refresh", (player, params) => {
    
});

CMD.on("setgskin", (player, params) => {

});

CMD.on("giveacces", (player, params) => {

});

/* ===================== */
/* Gang Members Commands */
/* ===================== */
CMD.on("gm", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    let info = "Name\tRank\n";
    let result = samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == Player.Info[player.playerid].Gang);
    result.forEach((i) => {
        info += `{49FFFF}${i.GetPlayerName(24)}(${i.playerid})\t{00BBF6}${getGangRank(Player.Info[i.playerid].Gang_Data.Rank)} ${Player.Info[i.playerid].Gang_Data.Capturing ? "{FF0000}(Capturing)" : ""}\n`;
    });
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.TABLIST_HEADERS, `{AFAFAF}Gang Members: {FF0000}${result.length}{AFAFAF} online - {FF0000}${Gang.Info[Player.Info[player.playerid].Gang].name}`, info, "Close", "");
});

CMD.on("gstats", (player, params) => {
    let target = player;
    if(params[0]) target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    if(!Player.Info[target.playerid].Gang) return SendError(player, target == player ? Errors.NOT_MEMBER_OF_ANY_GANG : Errors.PLAYER_NOT_IN_ANY_GANG);
    let OnlineTimeGang = TotalGameTimeGang(target);
    let info = "";
    info += `{BBFF00}Gang: {49FFFF}${Gang.Info[Player.Info[target.playerid].Gang].name}\n`;
    info += `{BBFF00}Kills: {49FFFF}${Player.Info[target.playerid].Gang_Data.Kills}\n`;
    info += `{BBFF00}Deaths: {49FFFF}${Player.Info[target.playerid].Gang_Data.Deaths}\n`;
    info += `{BBFF00}Captures: {49FFFF}${Player.Info[target.playerid].Gang_Data.Captures}\n`;
    info += `{BBFF00}Points: {49FFFF}${Player.Info[target.playerid].Gang_Data.Points}\n`;
    info += `{BBFF00}Warnings: {49FFFF}${Player.Info[target.playerid].Gang_Data.Warns}/3\n`;
    info += `{BBFF00}Rank: {49FFFF}${getGangRank(Player.Info[target.playerid].Gang_Data.Rank)}\n`;
    info += `{BBFF00}Time: {49FFFF}${OnlineTimeGang.hours} {BBFF00}hrs, {49FFFF}${OnlineTimeGang.minutes} {BBFF00}mins, {49FFFF}${OnlineTimeGang.seconds} {BBFF00}secs\n`;
    info += "\n";
    info += `{FFFF99}Gang member since, {49FFFF}${Player.Info[target.playerid].Gang_Data.MemberSince}{FFFF99}!`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, `{FF0000}${target.GetPlayerName(24)}{BBFF00}'s Gang Stats!`, info, "Ok", "");
});

CMD.on("lgang", (player) => {

});

CMD.on("c4", (player) => {

});

CMD.on("garena", (player) => {

});

CMD.on("capture", (player, params) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.PLAYER_NOT_IN_ANY_GANG);
    switch(params[0]) {
        case "start": {
            if(Player.Info[player.playerid].Gang_Data.Rank < 3) return SendError(player, "You need to be leader to use this command!");
            if(Gang.Info[Player.Info[player.playerid].Gang].capturing.turf != -1) return SendError(player, "Your gang is already capturing a territory!");
            let zone = GetPlayerGangZone(player);
            if(!zone) return SendError(player, "You are not in a Gang Territory!");
            if(zone.owner == Player.Info[player.playerid].Gang) return SendError(player, "This Territory is already owned by your Gang!");
            if(Gang.Get().filter(f => f.capturing.turf == zone.GangZone)[0]) return SendError(player, "This territory is in war!");
            if(Gang.Info[zone.owner].capturing.turf != -1) return SendError(player, "This territory owner is in another war!");
            if(Gang.Get().filter(f => Gang.GetOwnedGangZones(Player.Info[zone.owner].Gang).some(s => s == f.capturing.turf) && f.capturing.turf != -1)[0]) return SendError(player, "This territory owner is in another war!");
            startCapture(player, zone.GangZone);
            break;
        }
        case "stop": {
            if(player.GetPlayerVirtualWorld() != 0) return SendError(player, "You can capture stop a gang only being in /vw 0!");
            let zone = GetPlayerGangZone(player);
            if(!zone) return SendError(player, "You are not in a Gang Territory!");
            let DefendGangZone = Gang.Get().filter(f => f.capturing.turf == zone.GangZone)[0];
            if(!DefendGangZone) return SendError(player, "This territory is not attacked!");
            if(Player.Info[player.playerid].Gang != zone.owner) return SendError(player, "You are not member of this territory owner Gang!");
            if(samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == DefendGangZone.id && GetPlayerGangZone(f) == zone).length != 0) return SendError(player, "Eliminate all players from this territory and try again!");
            loseCapture(DefendGangZone.id);
            break;
        }
        case "join": {
            if(Player.Info[player.playerid].Gang_Data.Capturing) return SendError(player, "You are already joined in a territory war!");
            if(Gang.Info[Player.Info[player.playerid].Gang].capturing.turf == -1) return SendError(player, "Your gang is not in a territory war!");
            let zone = GetPlayerGangZone(player);
            if(!zone) return SendError(player, "You are not in a Gang Territory!");
            if(zone.GangZone != Gang.Info[Player.Info[player.playerid].Gang].capturing.turf) return SendError(player, "You are not in the war territory!");
            player.GameTextForPlayer("~g~~h~Start killing!~n~~r~~h~don't leave the territory!", 3000, 3);
            Player.Info[player.playerid].Gang_Data.Capturing = true;
            ShowCapturingLabelFor(player);
            break;
        }
        case "leave": {
            if(Player.Info[player.playerid].Gang_Data.Capturing) return SendError(player, "You are already joined in a territory war!");
            Player.Info[player.playerid].Gang_Data.Capturing = false;
            HideCapturingLabelFor(player);
            break;
        }
        case "info": {
            let AttackGangZone = Gang.Get().filter(f => f.territory.GangZone == Gang.Info[Player.Info[player.playerid].Gang].capturing.turf)[0];
            let DefendGangZone = Gang.Get().filter(f => Gang.GetOwnedGangZones(Player.Info[player.playerid].Gang).some(s => s == f.capturing.turf) && f.capturing.turf != -1)[0];

            if(AttackGangZone) { 
                player.SendClientMessage(0x00BBF6AA, `Gang-ul tau ataca un teritoriu al gang-ului: {FFFFFF}${Gang.Info[AttackGangZone.territory.owner].name}`); 
                player.SendClientMessage(0x00BBF6AA, "Daca gang-ul inamic alunga membrii alaturati de pe teritoriu si foloseste /capture stop, gang-ul tau va esua in a captura teritoriul!");
                player.SendClientMessage(0x00BBF6AA, `Timp ramas: {FF0000}${Function.secondsToMinutesAndSeconds(Gang.Info[Player.Info[player.playerid].Gang].capturing.time)}`);
            }
            else if(DefendGangZone) {
                player.SendClientMessage(0x00BBF6AA, `Un teritoriu al gangului tau este in curs de capturare de catre: {FFFFFF}${DefendGangZone.name}`);
                player.SendClientMessage(0x00BBF6AA, "Alunga inamicii de pe teritoriu si foloseste /capture stop pentru a nu pierde teritoriul!");
                player.SendClientMessage(0x00BBF6AA, `Timp ramas: {FF0000}${Function.secondsToMinutesAndSeconds(DefendGangZone.capturing.time)}`);
            }
            else SendError(player, "There is no capture in progress!");
            break;
        }
        default: SendUsage(player, "/Capture [Start/Stop/Join/Leave/Info]"); break;
    }
});

CMD.on("refreshme", (player) => {

});

CMD.on("gtank", (player) => {

});

CMD.on("base", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    if(Gang.Get().filter(f => f.territory.owner == Player.Info[player.playerid].Gang).length == 0) return SendError(player, "Your Gang don't own any teritories!");
    let info = "";
    for(let i = 0; i < Gang.Get().length; i++) {
        if(Gang.Get()[i].territory.owner == Player.Info[player.playerid].Gang) {
            info += `{33CC00}${Gang.Get()[i].name}\n`;
        }
    }
    player.ShowPlayerDialog(Dialog.BASE_TELEPORT, samp.DIALOG_STYLE.LIST, "Base Teleport", info, "Teleport", "Cancel");
});

CMD.on("og", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    let gang = Gang.Get().filter(f => player.IsPlayerInRangeOfPoint(10, f.gate.position[0], f.gate.position[1], f.gate.position[2]) && f.gate.object)[0];
    if(!gang) return SendError(player, "You are not close to a gang gate!");
    if(gang.id != Player.Info[player.playerid].Gang) return SendError(player, "You are not member of this gang gate!");
    openGate(gang.id);
});

CMD.on("cg", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    let gang = Gang.Get().filter(f => player.IsPlayerInRangeOfPoint(10, f.gate.position[0], f.gate.position[1], f.gate.position[2]) && f.gate.object)[0];
    if(!gang) return SendError(player, "You are not close to a gang gate!");
    if(gang.id != Player.Info[player.playerid].Gang) return SendError(player, "You are not member of this gang gate!");
    closeGate(gang.id);
});

CMD.on("g", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    let gang = Gang.Get().filter(f => player.IsPlayerInRangeOfPoint(10, f.gate.position[0], f.gate.position[1], f.gate.position[2]) && f.gate.object)[0];
    if(!gang) return SendError(player, "You are not close to a gang gate!");
    if(gang.id != Player.Info[player.playerid].Gang) return SendError(player, "You are not member of this gang gate!");
    openGate(gang.id);
    setTimeout(closeGate, 5000, gang.id);  
});

CMD.on("blow", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
});

CMD.on("repair", (player) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
});

CMD.on("gang", (player) => {
    let info = "";
    info += "{49FFFF}Gang Info - {BBFF00}/ginfo\n";
    info += "{49FFFF}My Gang Stats - {BBFF00}/gstats\n";
    info += "{49FFFF}Online Members - {BBFF00}/gm\n";
    info += "{49FFFF}Gang Commands - {BBFF00}/gcmds\n";
    info += "{49FFFF}Top Gang - {BBFF00}/gtop";
    player.ShowPlayerDialog(Dialog.GANG, samp.DIALOG_STYLE.LIST, "{FF0000}My Gang", info, "Select", "");
});

CMD.on("ginfo", async (player, params) => {
    if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
    let gang = Player.Info[player.playerid].Gang;
    if(params[0]) gang = parseInt(params[0]);
    if(!Gang.Exists(gang)) return SendError(player, "Invalid Gang ID!");
    let info = "";
    info += `{FFFF00}Showing {33CCFF}${Gang.Info[gang].name}{FFFF00}'s Stats:\n`;
    info += "\n";
    info += `{BBFF00}Gang won {33CCFF}${Gang.Info[gang].points}{BBFF00} points.\n`;
    info += `{BBFF00}Total Captures {33CCFF}${Gang.Info[gang].captures}\n`;
    info += `{BBFF00}There are {33CCFF}${await getTotalUsersInThisGang(gang)}{BBFF00} members in this gang ({FF0000}${samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == gang).length} {BBFF00}Online).\n`;
    info += `{BBFF00}Gang has {33CCFF}${Gang.Info[gang].kills}{BBFF00} kills.\n`;
    info += `{BBFF00}Gang has {33CCFF}${Gang.Info[gang].deaths}{BBFF00} deaths.\n`;
    info += `{BBFF00}Gang Weapons: {33CCFF}${getGangWeapons(gang)}\n`;
    info += `{BBFF00}Gang Founders: {33CCFF}${await getGangFounders(gang)}\n`;
    info += "\n";
    info += "{BBFF00}If you want to view other gang's stats, type {FFFF00}/GInfo [GangID]";
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Gang Info", info, "Ok", "");
});

CMD.on("gtop", (player) => {
    let info = "{FFFFFF}Our best Gangs are here!\n";
    info += "\n";
    let count = 0;
    Gang.Get().sort(function(a, b){return b.points-a.points}).forEach((i) => {
        count++;
        info += `{FF0000}${count}. {${Function.decimalToHexString(i.color)}}${i.name}: {00BBF6}${i.points} {BBFF00}Points\n`;
    });
    info += "\n";
    info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Gangs", info, "Ok", "");
});

/* ============== */
/* Clans Commands */
/* ============== */
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
CMD.on("clan", (player) => { CMD.emit("chelp", player); });

CMD.on("setrank", (player, params) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    if(Player.Info[player.playerid].Clan_Rank < 3) return SendError(player, "You need to be Gang Owner or Clan Founder to use this command!");
    if(params[0] && !isNaN(params[1])) {
        let target = getPlayer(params[0]);
        if(target) {
            if(Player.Info[target.playerid].Clan != Player.Info[player.playerid].Clan) return SendError(player, "This player need to be member in your clan!");
            params[1] = parseInt(params[1]);
            if(params[1] < 0 || params[1] > 3) return SendError(player, "");
        }
        else SendError(player, Errors.PLAYER_NOT_CONNECTED);
    }
    else SendUsage(player, "/SetRank [ID/Name] [Rank: 1-3]");
});

CMD.on("setspawn", (player, params) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    if(Player.Info[player.playerid].Clan_Rank < 3) return SendError(player, "You need to be Gang Owner or Clan Founder to use this command!");
    if(!params[0]) return SendUsage(player, "/SetSpawn [Off/On]");
    switch(params[0]) {
        case "off": {
            player.GameTextForPlayer("~w~~h~Clan spawn have been ~n~~g~~h~resetted~w~~h~!", 3000, 4);
            Clan.Info[Player.Info[player.playerid].Clan].position[0] = 0;
            Clan.Info[Player.Info[player.playerid].Clan].position[1] = 0;
            Clan.Info[Player.Info[player.playerid].Clan].position[2] = 0;
            Clan.Info[Player.Info[player.playerid].Clan].position[3] = 0;
            break;
        }
        case "on": {
            player.GameTextForPlayer("~w~~h~Clan spawn have been ~n~~g~~h~setted~w~~h~!", 3000, 4);
            Clan.Info[Player.Info[player.playerid].Clan].position[0] = player.position.x;
            Clan.Info[Player.Info[player.playerid].Clan].position[1] = player.position.y;
            Clan.Info[Player.Info[player.playerid].Clan].position[2] = player.position.z;
            Clan.Info[Player.Info[player.playerid].Clan].position[3] = player.position.angle;
            break;
        }
    }
    saveClan(Player.Info[player.playerid].Clan);
});

CMD.on("setcskin", (player, params) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    if(Player.Info[player.playerid].Clan_Rank < 3) return SendError(player, "You need to be Gang Owner or Clan Founder to use this command!");
});

CMD.on("mkick", (player, params) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    if(Player.Info[player.playerid].Clan_Rank < 2) return SendError(player, "You need to be Gang Owner or Clan Founder to use this command!");
    if(!params[0]) return SendUsage(player, "/MKick [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
});

CMD.on("invite", (player, params) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    if(!params[0]) return SendUsage(player, "/Invite [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
});

CMD.on("cm", (player) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    let info = "Name\tRank\n";
    let result = samp.getPlayers().filter(f => Player.Info[f.playerid].Clan == Player.Info[player.playerid].Clan);
    result.forEach((i) => {
        info += `{49FFFF}${i.GetPlayerName(24)}(${i.playerid})\t{00BBF6}${getClanRank(Player.Info[i.playerid].Clan_Rank)}\n`;
    });
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.TABLIST_HEADERS, `{AFAFAF}Clan Members: {FF0000}${result.length}{AFAFAF} online - {FF0000}${Clan.Info[Player.Info[player.playerid].Clan].name}`, info, "Close", "");
});

CMD.on("cinfo", async (player, params) => {
    let target = player;
    if(params[0]) target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    if(!Player.Info[target.playerid].Clan) return SendError(player, Errors.PLAYER_NOT_IN_ANY_CLAN);
    let info = "";
    info += `{FF0000}${Clan.Info[Player.Info[target.playerid].Clan].name}{FFFF00}'s clan informations\n`;
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
});

CMD.on("lclan", (player) => {
    if(!Player.Info[player.playerid].Clan) return SendError(player, Errors.NOT_MEMBER_OF_ANY_CLAN);
    SendMessageToClan(Player.Info[player.playerid].Clan, data.colors.YELLOW, `${player.GetPlayerName(24)}(${player.playerid}) has left the clan!`);
    if(Clan.Info[Player.Info[player.playerid].Clan].owner == Player.Info[player.playerid].AccID) {
        con.query("DELETE FROM clans WHERE ID = ?", [Player.Info[player.playerid].Clan]);
        con.query("UPDATE users SET clan = 0 WHERE clan = ?", [Player.Info[player.playerid].Clan]);
        Clan.Delete(Player.Info[player.playerid].Clan);
        samp.getPlayers().filter(f => Player.Info[f.playerid].Clan == Player.Info[player.playerid].Clan).forEach((i) => {
            Player.Info[i.playerid].Clan = 0;
            i.SpawnPlayer();
            i.SendClientMessage(data.colors.LIGHT_BLUE, "INFO: The Our Clan has been deleted by Creator!");
        });
    } 
    else {
        Player.Info[i.playerid].Clan = 0;
        player.SpawnPlayer();
    }  
});

/* =============== */
/* Admins Commands */
/* =============== */
CMD.on("acmds", (player) => {
    let info = "";
    info += "{FF0000}Junior:\n";
    info += "{FF0000}/Reports, /Res, /Muted, /Mute, /UnMute, /Kick, /Warn, /Jailed, /GetInfo\n";
    info += "{FF0000}/Jail, /UnJail, /Explode, /IP, /Aka, /GiveCar, /AdminLand\n";
    info += "{FF0000}/Goto, /Get, /God, /GodCar, /ASay, /Weaps, /Spec(Off), /Caps\n";
    info += "{FF0000}/Disarm, /Set [Interior / Weather / Time / World / Skin], /LastOn\n";
    info += "{FF0000}/Spawn, /Question, /Reaction, /Eject, /Clearchat(/Cc)\n";
    info += "\n";
    info += "{FFFF00}Senior:\n";
    info += "{FFFF00}/Ban, /Event, /StarEvent, /EndStarEvent, /GiveWeapon, /Write, /AHAll\n";
    info += "{FFFF00}/Slap, /Freeze, /UnFreeze, /Frozen, /Announce, /Read, /Rac\n";
    info += "{FFFF00}/DMEvent, /StopDMEvent, /AnnounceDMEvent, /SongForAllOff, /Teleplayer\n";
    info += "{FFFF00}/Set [Wanted / Health / Armour / Color], /CarHealth, /Screen\n";
    info += "\n";
    info += "{0072FF}Master:\n";
    info += "{0072FF}/GetHere, /GetAll, /AKill, /LWeaps, /GiveAllWeapon\n";
    info += "{0072FF}/Set [Money], /SpawnAll, /MuteAll, /UnMuteAll, /DisarmAll\n";
    info += "{0072FF}/FreezeAll, /UnFreezeAll, /SlapAll, /ExplodeAll\n";
    info += "{0072FF}/GiveAll [Money], /SetAll [Money / Weather / Time / World /Wanted]\n";
    info += "\n";
    info += "{00FF00}Use: {FF0000}'@' {00FF00}to talk in {FF0000}Admin Chat{00FF00}!\n";
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Admin {FF0000}Commands", info, "Close", "");
});

/* ===================== */
/* ADMIN JUNIOR COMMANDS */
/* ===================== */
CMD.on("gotop", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!isNaN(params[0]) && !isNaN(params[1]) && !isNaN(params[2])) {
        const position = {
            x: parseInt(params[0]),
            y: parseInt(params[1]),
            z: parseInt(params[2])
        }
        player.SetPlayerPos(position.x, position.y, position.z);
    }
    else SendUsage(player, "/GotoP [X] [Y] [Z]");
});

CMD.on("reports", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(getReportsCount() == 0) return SendError(player, "No available reports!");
    let info = "Reported ID\tPlayer who reported\tPlayer reported\tReason\n";
    samp.getPlayers().filter(f => Player.Info[f.playerid].Reported.By != -1).forEach((i) => {
        let reporter = samp.IsPlayerConnected(Player.Info[i.playerid].Reported.By) ? samp.GetPlayerName(Player.Info[i.playerid].Reported.By, 24) : "Server";
        info += `{0072FF}#${i.playerid}\t{FF0000}${reporter}\t{FF0000}${i.GetPlayerName(24)}\t{FFFF00}${Player.Info[i.playerid].Reported.Reason}\n`;
    });
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.TABLIST_HEADERS, `{FF0000}Active reports {FFFFFF}- Use {00FF00}/res [id] [Checked]`, info, "Close", "");
});

CMD.on("res", (player, params) => {
    if(!isNaN(params[0]) && !isNaN(params[1])) {
        params[0] = parseInt(params[0]);
        params[1] = parseInt(params[1]);
        if(!isReportIdExists(params[0])) return SendError(player, "This report ID not exists!");
        if(params[1] != 1 && params[1] != 0) return SendError(player, "Invalid hack check value!");
        Player.Info[params[0]].Reported.By = -1;
        checkReportsTD();
    }
    else SendUsage(player, "/Res [ID] [Checked(1/0)]");
}); 

CMD.on("muted", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("mute", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("unmute", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("kick", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0] && !params.slice(1).join(" ")) return SendUsage(player, "/Kick [ID/Name] [Reason]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    Player.Info[target.playerid].Kicks++;
    if(Player.Info[target.playerid].Kicks < 3) {
        samp.SendClientMessageToAll(data.colors.RED, `${target.GetPlayerName(24)} {D1D1D1}has been kicked by Admin {00A6FF}${player.GetPlayerName(24)}{D1D1D1}!`);
        samp.SendClientMessageToAll(0x00A6FFAA, `Reason: {D1D1D1}${params.slice(1).join(" ")} {FF0000}(Kicks: ${Player.Info[target.playerid].Kicks}/3)`);
        kickPlayer(target);
    }
    else {
        Player.Info[target.playerid].Kicks = 0;
        banPlayer(target, player, 1, "3/3 Kicks");
    }
});

CMD.on("warn", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("jailed", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("getinfo", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/GetInfo [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    let info = "Name\tValue\n";
    info += `Name\t${target.GetPlayerName(24)}\n`;
    info += `ID\t${target.playerid}\n`;
    info += `IP\t${target.GetPlayerIp(16)}\n`;
    info += `Position\t${JSON.stringify(target.GetPlayerPos())}`;
    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.TABLIST_HEADERS, "Get Info", info, "Close", "");
});

CMD.on("jail", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(params[0] && !isNaN(params[1]) && params.slice(2).join(" ")) {
        let target = getPlayer(params[0]);
        if(target) {
            if(Player.Info[target.playerid].Jailed) return SendError(player, "Acest jucator este deja in inchisoare.", "This player already jailed.");
            params[1] = parseInt(params[1]);
            if(params[1] < 1 || params[1] > 30) return SendError(player, "Invalid minutes. Minim is 1 maxim is 30.");
            samp.SendClientMessageToAll(data.colors.RED, `${target.GetPlayerName(24)} {D1D1D1}has been jailed for ${params[1]} minutes by Admin {00A6FF}${player.GetPlayerName(24)}{D1D1D1}!`);
            samp.SendClientMessageToAll(0x00A6FFAA, `Reason: {D1D1D1}${params.slice(2).join(" ")}`);
            Player.Info[target.playerid].Jailed = params[1] * 60;
            target.SetPlayerPos(data.position.JAIL.x, data.position.JAIL.y, data.position.JAIL.z);
        }
        else SendError(player, Errors.PLAYER_NOT_CONNECTED);
    }
    else SendUsage(player, "/Jail [ID/Name] [Minutes] [Reason]");
});

CMD.on("unjail", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(params[0]) {
        let target = getPlayer(params[0]);
        if(target) {
            if(!Player.Info[target.playerid].Jailed) return SendError(player, "Jucatorul respectiv nu este in inchisoare.", "The specific player is not in jail.");
            samp.SendClientMessageToAll(data.colors.RED, `${target.GetPlayerName(24)} {D1D1D1}has been unjailed by Admin {00A6FF}${player.GetPlayerName(24)}{D1D1D1}!`);
            Player.Info[target.playerid].Jailed = 0;
            target.SpawnPlayer();
        }
        else SendError(player, Errors.PLAYER_NOT_CONNECTED);
    }
    else SendUsage(player, "/UnJail [ID/Name]");
});

CMD.on("cage", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(params[0] && !isNaN(params[1]) && params.slice(2).join(" ")) {
        let target = getPlayer(params[0]);
        if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
        if(Player.Info[target.playerid].Caged) return SendError(player, "This player is already in cage.");
        params[1] = parseInt(params[1]);
        samp.SendClientMessageToAll(data.colors.RED, `${target.GetPlayerName(24)} {D1D1D1}has been put in the cage for ${params[1]} minutes by Admin {00A6FF}${player.GetPlayerName(24)}{D1D1D1}!`);
        samp.SendClientMessageToAll(0x00A6FFAA, `Reason: {D1D1D1}${params.slice(2).join(" ")}`);
        Player.Info[target.playerid].Caged = params[1] * 60;
        CagePlayer(target);
    }
    else SendUsage(player, "/Cage [ID/Name] [Minutes] [Reason]");
});

CMD.on("uncage", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/UnCage [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    if(!Player.Info[target.playerid].Caged) return SendError(player, "This player is not in cage.");
    samp.SendClientMessageToAll(data.colors.RED, `${target.GetPlayerName(24)} {D1D1D1}has been removed from cage by Admin {00A6FF}${player.GetPlayerName(24)}{D1D1D1}!`);
    UnCagePlayer(target);
});

CMD.on("explode", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/Explode [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    samp.CreateExplosion(target.position.x, target.position.y, target.position.z, 7, 5);
    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has exploded you{FFFF00}!`);
    player.SendClientMessage(data.colors.YELLOW, `You have exploded {FF0000}${target.GetPlayerName(24)}{FFFF00}!`);
    SendACMD(player, "Explode");
});

CMD.on("ip", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/Ip [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    player.SendClientMessage(data.colors.YELLOW, `Player {FF0000}${target.GetPlayerName(24)}{FFFF00}'s IP: {FF0000}${target.GetPlayerIp(16)}{FFFF00}.`);
    SendACMD(player, "Ip");
});

CMD.on("aka", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(params[0]) {
        let target = getPlayer(params[0]);
        if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
        con.query("SELECT * FROM akas WHERE ip = ?", [target.GetPlayerIp(16)], function(err, result) {
            if(err || result == 0) return SendError(player, Errors.UNEXPECTED);
            let names = JSON.parse(result[0].names);
            player.SendClientMessage(data.colors.LIGHT_BLUE, `${target.GetPlayerName(24)}'s aka:`);
            player.SendClientMessage(data.colors.LIGHT_BLUE, `${replaceAll(names.toString(), ",", ", ")}`);
            SendACMD(player, "Aka");
        });
    }
    else SendUsage(player, "/Aka [ID/Name]");
});

CMD.on("givecar", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("adminland", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("god", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("asay", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("caps", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("disarm", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendError(player, "/Disarm [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    target.ResetPlayerWeapons();
    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has disarmed you!`);
    player.SendClientMessage(data.colors.YELLOW, `You have disarmed {FF0000}${target.GetPlayerName(24)}{FFFF00}!`);
    SendACMD(player, "Disarm");
});

CMD.on("set", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1 && Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(params[0] && params[1] && !isNaN(params[2])) {
        let target = getPlayer(params[1]);
        if(target) {
            params[2] = parseInt(params[2]);
            switch(params[0]) {
                case "time": {
                    if(params[2] < 0 || params[2] > 23) return SendError(player, "Invalid time (0-23)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Time to {FF0000}${params[2]}:00{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Time to {FF0000}${params[2]}:00{FFFF00}!`);
                    target.SetPlayerTime(params[2], 0);
                    SendACMD(player, "Set Time");
                    break;
                }
                case "weather": {
                    if(params[2] < 0 || params[2] > 20) return SendError(player, "Invalid weather (0-20)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Weather to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Weather to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerWeather(params[2]);
                    SendACMD(player, "Set Weather");
                    break;
                }
                case "world": {
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your World to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s World to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerVirtualWorld(params[2]);
                    SendACMD(player, "Set World");
                    break;
                }
                case "admin": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 3) return SendError(player, "Invalid admin level (0-3)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Admin level to {FF0000}${getAdminRank(params[2], false)}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Admin level to {FF0000}${getAdminRank(params[2], false)}{FFFF00}!`);
                    Player.Info[target.playerid].Admin = params[2];
                    checkReportsTD(target);
                    UpdateRankLabelFor(target);
                    SendACMD(player, "Set Admin");
                    break;
                }
                case "vip": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 4) return SendError(player, "Invalid vip level (0-3)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Vip level to {FF0000}${getVIPRank(params[2], false)}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Vip level to {FF0000}${getVIPRank(params[2], false)}{FFFF00}!`);
                    Player.Info[target.playerid].VIP = params[2];
                    UpdateRankLabelFor(target);
                    SendACMD(player, "Set Vip");
                    break;
                }
                case "health": {
                    if(Player.Info[player.playerid].Admin < 2 && Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 100) return SendError(player, "Invalid health (0-100)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Health to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Health to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerHealth(params[2]);
                    SendACMD(player, "Set Health");
                    break;
                }
                case "armour": {
                    if(Player.Info[player.playerid].Admin < 2 && Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 100) return SendError(player, "Invalid armour (0-100)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Armour to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Armour to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerArmour(params[2]);
                    SendACMD(player, "Set Armour");
                    break;
                }
                case "coins": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid coins (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Coins to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Coins to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Coins = params[2];
                    SendACMD(player, "Set Coins");
                    break;
                }
                case "kills": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid kills (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Kills to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Kills to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Kills_Data.Kills = params[2];
                    SendACMD(player, "Set Kills");
                    break;
                }
                case "deaths": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid deaths (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Deaths to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Deaths to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Kills_Data.Deaths = params[2];
                    SendACMD(player, "Set Deaths");
                    break;
                }
                case "color": {
                    if(Player.Info[player.playerid].Admin < 2 && Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    break;
                }
                case "skin": {
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Skin to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Skin to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerSkin(params[2]);
                    SendACMD(player, "Set Skin");
                    break;
                }
                case "interior": {
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Interior to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Interior to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerInterior(params[2]);
                    SendACMD(player, "Set Interior");
                    break;
                }
                case "wanted": {
                    if(Player.Info[player.playerid].Admin < 2 && Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 6) return SendError(player, "Invalid wanted level (0-6)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Wanted level to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Wanted level to {FF0000}${params[2]}{FFFF00}!`);
                    target.SetPlayerWantedLevel(params[2]);
                    SendACMD(player, "Set Wanted");
                    break;
                }
                case "respect+": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid respect+ (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Respect+ to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Respect+ to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Respect.Positive = params[2];
                    SendACMD(player, "Set Respect+");
                    break;
                }
                case "respect-": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid respect- (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Respect- to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Respect- to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Respect.Negative = params[2];
                    SendACMD(player, "Set Respect-");
                    break;
                }
                case "online": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid online (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Online Hours to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Online Hours to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].OnlineTime.Hours = params[2];
                    SendACMD(player, "Set Online");
                    break;
                }
                case "money": {
                    if(Player.Info[player.playerid].Admin < 3 && Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid money (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Money to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Money to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Money = params[2];
                    target.ResetPlayerMoney();
                    target.GivePlayerMoney(Player.Info[target.playerid].Money);
                    SendACMD(player, "Set Money");
                    break;
                }
                case "drifts": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid drift (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Drift to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Drift to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Driving_Data.DriftPoints = params[2];
                    SendACMD(player, "Set Drift");
                    break;
                }
                case "race": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid race (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Race to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Race to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Driving_Data.RacePoints = params[2];
                    SendACMD(player, "Set Race");
                    break;
                }
                case "stunt": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid stunt (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Stunt to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Stunt to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Driving_Data.StuntPoints = params[2];
                    SendACMD(player, "Set Stunt");
                    break;
                }
                case "bestkilling": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 999999999) return SendError(player, "Invalid best killing (0-999999999)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Best Killing to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Best Killing to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Kills_Data.BestKillingSpree = params[2];
                    SendACMD(player, "Set BestKilling");
                    break;
                }
                case "kicks": {
                    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > 2) return SendError(player, "Invalid kicks (0-2)!");
                    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set your Kicks to {FF0000}${params[2]}{FFFF00}!`);
                    player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Kicks to {FF0000}${params[2]}{FFFF00}!`);
                    Player.Info[target.playerid].Kicks = params[2];
                    SendACMD(player, "Set Kicks");
                    break;
                }
                case "founder": {
                    if(Player.Info[player.playerid].RconType < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
                    if(params[2] < 0 || params[2] > Gang.Get().length) return SendError(player, `Invalid Gang ID (0-${Gang.Get().length})!`);
                    if(params[2] == 0) {
                        if(!Player.Info[target.playerid].Gang) return SendError(player, Errors.PLAYER_NOT_IN_ANY_GANG);
                        target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has Removed you from gang {FF0000}${Gang.Info[Player.Info[target.playerid].Gang].name}{FFFF00}!`);
                        player.SendClientMessage(data.colors.YELLOW, `You have Removed {FF0000}${target.GetPlayerName(24)}{FFFF00}'s from gang {FF0000}${Gang.Info[Player.Info[target.playerid].Gang].name}{FFFF00}!`); 
                        LeaveGang(target);
                    }
                    else {
                        target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has set you Founder in gang {FF0000}${Gang.Info[params[2]].name}{FFFF00}!`);
                        player.SendClientMessage(data.colors.YELLOW, `You have set {FF0000}${target.GetPlayerName(24)}{FFFF00}'s Founder in gang {FF0000}${Gang.Info[params[2]].name}{FFFF00}!`); 
                        if(Player.Info[target.playerid].Gang) LeaveGang(target);
                        JoinGang(target, params[2], 5);
                    }
                    SendACMD(player, "Set Founder");
                    break;
                }
                default: SendError(player, "Invalid item!"); break;
            }
        }
        else SendError(player, Errors.PLAYER_NOT_CONNECTED);
    }
    else {
        SendUsage(player, "/Set [Option] [ID/Name] [Amount]");
        player.SendClientMessage(data.colors.RED, "Options: {FFFFFF}Time, Weather, World, Admin, VIP, Health, Armour, Coins, Kills, Deaths, Color");
        player.SendClientMessage(data.colors.RED, "Options: {FFFFFF}Skin, Interior, Wanted, Respect(-/+), Online, Money, Drift, Race, Stunt, BestKilling, Kicks");
    }
});

CMD.on("laston", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("spawn", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/Spawn [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    target.SpawnPlayer();
    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has spawned you{FFFF00}!`);
    player.SendClientMessage(data.colors.YELLOW, `You have spawned {FF0000}${target.GetPlayerName(24)}{FFFF00}!`);
});

CMD.on("question", (player, params) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("reaction", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
}); 

CMD.on("clearchat", (player) => {
    if(Player.Info[player.playerid].Admin < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    for(let i = 0; i < 30; i++) samp.SendClientMessageToAll(-1, "");
    SendACMD(player, "ClearChat");
});
CMD.on("cc", (player) => { CMD.emit("clearchat", player); });

/* ===================== */
/* ADMIN SENIOR COMMANDS */
/* ===================== */
CMD.on("ban", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(params[0] && !isNaN(params[1]) && params.slice(2).join(" ")) {
        let target = getPlayer(params[0]);
        if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
        if(!Player.Info[target.playerid].LoggedIn) return SendError(player, Errors.PLAYER_NOT_LOGGED);
        params[1] = parseInt(params[1]);
        if(params[1] < 1 || params[1] > 99) return SendError(player, "Invalid day(s) (1-99)!");
        banPlayer(target, player, params[1], params.slice(2).join(" "));
    }
    else SendUsage(player, "/Ban [ID/Name] [Day(s)] [Reason]");
});

CMD.on("event", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    let info = "";
    info += "{0077FF}Star Event\n";
    info += "{FF0000}Death Match Events\n";
    info += "{FFFF00}Reaction Test\n";
    info += "{00FF00}Reaction Maths\n";
    info += "{00BBF6}Question";
    player.ShowPlayerDialog(Dialog.EVENT, samp.DIALOG_STYLE.LIST, "Events", info, "Select", "Cancel");
});

CMD.on("starevent", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("endstarevent", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("giveweapon", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("write", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params.slice(0).join(" ")) return SendUsage(player, "/Write [Text]");
    samp.SendClientMessageToAll(-1, params.slice(0).join(" "));
    SendACMD(player, "Write");
});

CMD.on("ahall", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("slap", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/Slap [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    target.SetPlayerPos(target.position.x, target.position.y, target.position.z+2);
    target.SetPlayerHealth(target.GetPlayerHealth() - 10);
    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has slapped you{FFFF00}!`);
    player.SendClientMessage(data.colors.YELLOW, `You have slapped {FF0000}${target.GetPlayerName(24)}{FFFF00}!`);
    SendACMD(player, "Slap");
});

CMD.on("freeze", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("unfreeze", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("frozen", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("announce", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(isNaN(params[0]) && isNaN(params[1]) && !params.slice(2).join(" ")) return SendUsage(player, "/Announce [Style(0-6)] [Seconds] [Text]");
    params[0] = parseInt(params[0]);
    params[1] = parseInt(params[1]);
    if(params[0] < 0 || params[0] > 6) return SendError(player, "Invalid style (0-6)!");
    samp.GameTextForAll(params.slice(2).join(" "), params[1]*60, params[0]);
    SendACMD(player, "Announce");
});

CMD.on("read", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("rac", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getAllVehicle().filter(f => !isVehicleOccupied(f)).forEach((i) => { samp.SetVehicleToRespawn(i); })
    samp.SendClientMessageToAll(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has respawned all unused cars!`);
    SendACMD(player, "Rac");
});

CMD.on("dmevent", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("stopdmevent", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("announcedmevent", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("songforalloff", (player) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().forEach((i) => { i.StopAudioStreamForPlayer(); });
    SendACMD(player, "SongForAllOff");
});

CMD.on("teleplayer", (player, params) => {
    if(Player.Info[player.playerid].Admin < 2) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0] && !params[1]) return SendUsage(player, "/TelePlayer [Player 1 ID/Name] [Player 2 ID/Name]");
    let target1 = getPlayer(params[0]);
    let target2 = getPlayer(params[1]);
    if(!target1 || !target2) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    target1.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has teleported you to player {FF0000}${target2.GetPlayerName(24)}{FFFF00}!`);
    target2.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has teleported {FF0000}${target1.GetPlayerName(24)} {FFFF00}to your location!`);
    player.SendClientMessage(data.colors.YELLOW, `You have teleported player {FF0000}${target1.GetPlayerName(24)} {FFFF00} to {FF0000}${target2.GetPlayerName(24)} {FFFF00}location!`);
    SendACMD(player, "TelePlayer");
});

/* ===================== */
/* ADMIN MASTER COMMANDS */
/* ===================== */
CMD.on("gethere", (player, params) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    CMD.emit("get", player, params);
});

CMD.on("getall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
        i.SetPlayerPos(player.position.x, player.position.y, player.position.z);
        i.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has teleported all players to his location{FFFF00}!`);
    });
    SendACMD(player, "GetAll");
});

CMD.on("akill", (player, params) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/AKill [ID/Name]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
    target.SetPlayerHealth(0);
    target.SetPlayerArmour(0);
    target.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has killed you{FFFF00}!`);
    player.SendClientMessage(data.colors.YELLOW, `You have killed {FF0000}${target.GetPlayerName(24)}{FFFF00}!`);
    SendACMD(player, "AKill");
});

CMD.on("lweaps", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("giveallweapon", (player, params) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
}); 

CMD.on("spawnall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
        i.SpawnPlayer();
        i.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has spawned all players{FFFF00}!`);
    });
    SendACMD(player, "SpawnAll");
});

CMD.on("muteall", (player, params) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("unmuteall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("disarmall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
        i.ResetPlayerWeapons();
        i.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has disarmed all players{FFFF00}!`);
    });
    SendACMD(player, "DisarmAll");
});

CMD.on("freezeall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("unfreezeall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("slapall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
        i.SetPlayerPos(i.position.x, i.position.y, i.position.z+2);
        i.SetPlayerHealth(i.GetPlayerHealth() - 10);
        i.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has slapped all players{FFFF00}!`);
    });
    SendACMD(player, "SlapAll");
});

CMD.on("explodeall", (player) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
        samp.CreateExplosion(i.position.x, i.position.y, i.position.z, 7, 5);
        i.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has exploded all players{FFFF00}!`);
    });
    SendACMD(player, "ExplodeAll");
});

CMD.on("giveall", (player, params) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

CMD.on("setall", (player, params) => {
    if(Player.Info[player.playerid].Admin < 3) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
});

/* ============== */
/* Rcons Commands */
/* ============== */
CMD.on("saveall", (player) => {
    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
        savePlayer(i);
        i.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has saved your {FF0000}account{FFFF00}!`);
    });
    Clan.Get().forEach((i) => { saveClan(i.id); });
    Gang.Get().forEach((i) => { saveGang(i.id); });
    SendACMD(player, "SaveAll");
});

CMD.on("unban", async (player, params) => {
    if(Player.Info[player.playerid].RconType < 1) return SendError(player, Errors.NOT_ENOUGH_ADMIN.RO, Errors.NOT_ENOUGH_ADMIN.ENG);
    if(!params[0]) return SendUsage(player, "/UnBan [Name]");
    let acc_id = await getIDByAccName(params[0]);
    if(acc_id) {
        con.query("SELECT ID FROM bans WHERE acc_id = ?", [acc_id], function(err, result) {
            if(!err && result != 0) {
                con.query("DELETE FROM bans WHERE ID = ?", [result[0].ID]);
                player.SendClientMessage(data.colors.YELLOW, `Player {FF0000}${params[0]} {FFFF00}was successfully unbanned!`);
                SendACMD(player, "UnBan");
            }
            else player.SendClientMessage(data.colors.YELLOW, `Player {FF0000}${params[0]} {FFFF00}is not banneed!`);
        });
    }
    else player.SendClientMessage(data.colors.YELLOW, `Player {FF0000}${params[0]} {FFFF00}is not exists in database!`);
});

/* =============== */
/* SA:MP Functions */
/* =============== */
function isVehicleOccupied(vehicleid) {
    return samp.getPlayers().filter(f => f.IsPlayerInVehicle(vehicleid))[0];
}

function openGate(GangID) {
    samp.MoveObject(Gang.Info[GangID].gate.object, Gang.Info[GangID].gate.position[0], Gang.Info[GangID].gate.position[1], Gang.Info[GangID].gate.position[2]-6, 9);
}

function closeGate(GangID) {
    samp.MoveObject(Gang.Info[GangID].gate.object, Gang.Info[GangID].gate.position[0], Gang.Info[GangID].gate.position[1], Gang.Info[GangID].gate.position[2], 9);
}

function ShowRankLabelFor(player) {
    if(Player.Info[player.playerid].Rank_Label) return
    Player.Info[player.playerid].Rank_Label = Streamer.CreateDynamic3DTextLabel(getPlayerRankInLabel(player), -1, 0, 0, 0.40000000596046, 50, player.playerid);
}

function HideRankLabelFor(player) {
    if(!Player.Info[player.playerid].Rank_Label) return;
    Streamer.DestroyDynamic3DTextLabel(Player.Info[player.playerid].Rank_Label);
    Player.Info[player.playerid].Rank_Label = null;
}

function UpdateRankLabelFor(player) {
    if(!Player.Info[player.playerid].Rank_Label) return;
    Streamer.UpdateDynamic3DTextLabelText(Player.Info[player.playerid].Rank_Label, -1, getPlayerRankInLabel(player));
}

function AfkBrb(player, type) {
    /* Types: 0 = brb | 1 = afk */
    samp.GameTextForAll(`~n~~n~~n~~n~~n~~n~~r~~h~${player.GetPlayerName(24)} ~w~~h~will ~y~~h~${type == 0 ? "BRB" : "AFK"}`, 5000, 5);
    player.SetPlayerVirtualWorld(player.playerid);
    player.SetPlayerCameraPos(320.22311401367, -1874.7312011719, 63.627601623535);
    player.SetPlayerCameraLookAt(319.22338867188, -1874.7430419922, 63.60758972168);
    for(let i = 0; i < 4; i++) player.TextDrawShowForPlayer(TextDraws.server.afk_brb[i]);
    Player.Info[player.playerid].AFK = true;
}

function startCapture(player, zone) {
    let GangID = Player.Info[player.playerid].Gang;
    let PlayerID = player.playerid;

    Player.Info[PlayerID].Gang_Data.Capturing = true;

    ShowCapturingLabelFor(player);

    samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == GangID).forEach((i) => {
        i.GameTextForPlayer(`~h~~h~Territory war started by~n~~r~~h~${player.GetPlayerName(24)}~n~~y~~h~/capture join~n~~y~~h~/capture info`, 4000, 3);
        i.TextDrawShowForPlayer(TextDraws.server.attack_territory);
    });

    samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == Gang.Get().filter(f => f.territory.GangZone == zone)[0].territory.owner).forEach((i) => {
        i.GameTextForPlayer(`~g~~h~Your territory~n~~g~~h~is under attack by~n~~r~~h~${Gang.Info[GangID].name}~n~~y~~h~/capture info`, 4000, 3);
        i.TextDrawShowForPlayer(TextDraws.server.under_attack_territory);
    });

    Gang.Info[GangID].capturing.turf = zone;
    samp.GangZoneFlashForAll(zone, Gang.Info[GangID].color);

    Gang.Info[GangID].capturing.interval = setInterval(() => {
        if(!samp.IsPlayerConnected(PlayerID)) return loseCapture(GangID);
        //if(Player.Info[PlayerID].Gang != GangID) return loseCapture(GangID);
        if(Gang.Info[GangID].capturing.time == 0) winCapture(GangID);
        else Gang.Info[GangID].capturing.time--;
    }, 1000);
}

function winCapture(GangID) {
    let zone = Gang.Info[GangID].capturing.turf;
    samp.GangZoneStopFlashForAll(zone);
    samp.GangZoneShowForAll(zone, Gang.Info[GangID].color);

    Gang.Info[GangID].capturing.time = 10;
    Gang.Info[GangID].capturing.turf = -1;
    clearInterval(Gang.Info[GangID].capturing.interval);
    Gang.Info[GangID].capturing.interval = null;
    Gang.Info[GangID].captures++;
    Gang.Info[GangID].points += 10;

    let turf_owner = Gang.Get().filter(f => f.territory.GangZone == zone)[0];
    if(turf_owner) {
        samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == turf_owner.territory.owner).forEach((i) => {
            i.GameTextForPlayer("~g~~h~Your gang has~n~~r~~h~lost the territory!", 4000, 3);
            i.TextDrawHideForPlayer(TextDraws.server.under_attack_territory);
        });
        turf_owner.territory.owner = GangID;  
    }

    samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == GangID).forEach((i) => {
        i.GameTextForPlayer("~g~~h~Your Gang has~n~~r~~h~succesfully captured~n~~w~~h~the territory!~n~~y~~h~+10 gang points", 4000, 3);
        i.TextDrawHideForPlayer(TextDraws.server.attack_territory);
        if(Player.Info[i.playerid].Gang_Data.Capturing) {
            Player.Info[i.playerid].Gang_Data.Captures++;
            Player.Info[i.playerid].Gang_Data.Points += 10;
            Player.Info[i.playerid].Gang_Data.Capturing = false;
            HideCapturingLabelFor(i);
        }
    }); 
}

function loseCapture(GangID) {
    let zone = Gang.Info[GangID].capturing.turf;
    samp.GangZoneStopFlashForAll(zone);
    samp.GangZoneShowForAll(zone, Gang.Get().filter(f => f.territory.GangZone == zone)[0].color);

    Gang.Info[GangID].capturing.time = 10;
    Gang.Info[GangID].capturing.turf = -1;
    clearInterval(Gang.Info[GangID].capturing.interval);
    Gang.Info[GangID].capturing.interval = null;

    let turf_owner = Gang.Get().filter(f => f.territory.GangZone == zone)[0];
    if(turf_owner) {
        samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == turf_owner.territory.owner).forEach((i) => {
            i.GameTextForPlayer("~w~~h~Your gang protected~n~~r~~h~the territory succesfully!", 4000, 3);
            i.TextDrawHideForPlayer(TextDraws.server.under_attack_territory);
        });
    }

    samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == GangID).forEach((i) => {
        i.GameTextForPlayer("~w~~h~Your Gang has~n~~r~~h~failed capturing~n~~w~~h~the territory!", 4000, 3);
        i.TextDrawHideForPlayer(TextDraws.server.attack_territory);
        if(Player.Info[i.playerid].Gang_Data.Capturing) Player.Info[i.playerid].Gang_Data.Capturing = false;
        HideCapturingLabelFor(i);
    });
}

function ShowCapturingLabelFor(player) {
    if(Player.Info[player.playerid].Gang_Data.Capturing_Label) return;
    Player.Info[player.playerid].Gang_Data.Capturing_Label = Streamer.CreateDynamic3DTextLabel("Capturing...", -16776961, 0, 0, 0, 50, player.playerid);
}

function HideCapturingLabelFor(player) {
    if(!Player.Info[player.playerid].Gang_Data.Capturing_Label) return;
    Streamer.DestroyDynamic3DTextLabel(Player.Info[player.playerid].Gang_Data.Capturing_Label);
    Player.Info[player.playerid].Gang_Data.Capturing_Label = null;
}

function ShowGangZonesForPlayer(player) {
    Gang.Get().forEach((i) => {
        player.GangZoneShowForPlayer(i.territory.GangZone, Gang.Get().filter(f => f.territory.owner == i.territory.owner)[0].color);
        let capturing = Gang.Get().filter(f => f.capturing.turf == i.territory.GangZone)[0];
        if(capturing) player.GangZoneFlashForPlayer(i.territory.GangZone, capturing.color);
    });
}

function GetPlayerGangZone(player) {
    const data = Gang.Get().filter(f => player.position.x >= f.territory.MinX && player.position.x <= f.territory.MaxX && player.position.y >= f.territory.MinY && player.position.y <= f.territory.MaxY)[0];
    if(data) return data.territory;
    else return null;
} 

function getGangFounders(GangID) {
    return new Promise((resolve, reject) => {
        con.query("SELECT name FROM users WHERE gang = ? AND gang_rank = ?", [GangID, 5], function(err, result) {
            if(err || result == 0) resolve("None");
            else {
                let names = [];
                for(let i = 0; i < result.length; i++) names.push(result[i].name);
                resolve(`${replaceAll(names.toString(), ",", ", ")}`)
            }
        });
    });
}

function getGangWeapons(GangID) {
    let names = [];
    for(let i = 0; i < Gang.Info[GangID].weapons.length; i++) names.push(Gang.Info[GangID].weapons[i] == 0 ? "Fist" : samp.GetWeaponName(Gang.Info[GangID].weapons[i], 32));
    return `${replaceAll(names.toString(), ",", ", ")}`;
}

function getTotalUsersInThisGang(GangID) {
    return new Promise((resolve, reject) => {
        con.query("SELECT COUNT(*) AS count FROM users WHERE gang = ?", [GangID], function(err, result) {
            if(err || result == 0) resolve(0);
            else resolve(result[0].count);
        });
    });
}

function JoinGang(player, GangID, Rank) {
    Player.Info[player.playerid].Gang = GangID;
    Player.Info[player.playerid].Gang_Data.Rank = Rank;
    Player.Info[player.playerid].Gang_Data.MemberSince = Function.getBeatifulDate();
    Player.Info[player.playerid].Gang_Data.ConnectTime = Math.floor(Date.now() / 1000);

    player.GameTextForPlayer(`~y~~h~You have joined~n~~r~~h~${Gang.Info[GangID].name} ~y~~h~gang!~n~~y~~h~type~r~~h~ /gm ~y~~h~to view the~n~~y~~h~gang members!`, 4000, 4);

    player.SpawnPlayer();
}

function LeaveGang(player) {
    let AttackGangZone = Gang.Get().filter(f => f.territory.GangZone == Gang.Info[Player.Info[player.playerid].Gang].capturing.turf)[0];
    let DefendGangZone = Gang.Get().filter(f => Gang.GetOwnedGangZones(Player.Info[player.playerid].Gang).some(s => s == f.capturing.turf) && f.capturing.turf != -1)[0];

    if(AttackGangZone) {
        player.TextDrawHideForPlayer(TextDraws.server.attack_territory);
    }
    if(DefendGangZone) {
        player.TextDrawHideForPlayer(TextDraws.server.under_attack_territory);
    }

    Player.Info[player.playerid].Gang = 0;
    Player.Info[player.playerid].Gang_Data.Rank = 0;
    Player.Info[player.playerid].Gang_Data.Kills = 0;
    Player.Info[player.playerid].Gang_Data.Deaths = 0;
    Player.Info[player.playerid].Gang_Data.Captures = 0;
    Player.Info[player.playerid].Gang_Data.Points = 0;
    Player.Info[player.playerid].Gang_Data.Warns = 0;
    Player.Info[player.playerid].Gang_Data.OnlineTime.Hours = 0;
    Player.Info[player.playerid].Gang_Data.OnlineTime.Minutes = 0;
    Player.Info[player.playerid].Gang_Data.OnlineTime.Seconds = 0;
    Player.Info[player.playerid].Gang_Data.MemberSince = Function.getBeatifulDate();
    Player.Info[player.playerid].Gang_Data.ConnectTime = Math.floor(Date.now() / 1000);
    Player.Info[player.playerid].Gang_Data.Capturing = false;

    player.SpawnPlayer();
}

function IsNosVehicle(vehicleid) {
    let array = [
        581,523,462,521,463,522,461,448,468,586,
     	509,481,510,472,473,493,595,484,430,453,
   		452,446,454,590,569,537,538,570,449
    ];
    return !array.some(s => s == vehicleid);
}

function CagePlayer(player) {
    Player.Info[player.playerid].CageObjects.forEach((object) => { samp.DestroyObject(object); });
    Player.Info[player.playerid].CageObjects = [];
    Player.Info[player.playerid].CageObjects = [
        samp.CreateObject(985, player.position.x, player.position.y-4, player.position.z, 0.000000, 0.000000, 0.000000), // Left
        samp.CreateObject(985, player.position.x, player.position.y+4, player.position.z, 0.000000, 0.000000, 180.000000), // Right
        samp.CreateObject(985, player.position.x+4, player.position.y, player.position.z, 0.000000, 0.000000, 90.000000),  // Front
        samp.CreateObject(985, player.position.x-4, player.position.y, player.position.z, 0.000000, 0.000000, 270.000000) // Back
    ]
    player.TogglePlayerControllable(false);
}

function UnCagePlayer(player) {
    Player.Info[player.playerid].Caged = 0;
    Player.Info[player.playerid].CageObjects.forEach((object) => { samp.DestroyObject(object); });
    Player.Info[player.playerid].CageObjects = [];
    player.TogglePlayerControllable(true);
}

function getGangRank(RankID) {
    let string = "";
    switch(RankID) {
        case 1: string = "Member"; break;
        case 2: string = "Co-Leader"; break;
        case 3: string = "Leader"; break;
        case 4: string = "Owner"; break;
        case 5: string = "Founder"; break;
    }
    return string;
}

function StartSpectate(player, target) {
    Player.Info[player.playerid].Spectating = target.playerid;
    player.TogglePlayerSpectating(true);
    player.SetPlayerVirtualWorld(target.GetPlayerVirtualWorld());
    player.SetPlayerInterior(target.GetPlayerInterior());
    if(target.IsPlayerInAnyVehicle()) player.PlayerSpectateVehicle(target.vehicleId);
    else player.PlayerSpectatePlayer(target.playerid);
    CheckSpecTextDraw(player);
}

function StopSpectate(player) {
    player.TogglePlayerSpectating(false);
    Player.Info[player.playerid].Spectating = -1;
    player.SpawnPlayer();
    CheckSpecTextDraw(player);
}

function CheckSpecTextDraw(player) {
    if(Player.Info[player.playerid].Spectating != -1) {
        let target = samp.getPlayers().filter(f => f.playerid == Player.Info[player.playerid].Spectating)[0];
        if(target) {
            player.PlayerTextDrawSetString(TextDraws.player.spec[player.playerid], `Spectating~g~~h~ ${target.GetPlayerName(24)}~n~HP: ~r~~h~${target.GetPlayerHealth()}~w~~h~ - AR: ~r~~h~${target.GetPlayerArmour()}~w~~h~ - ID: ~r~~h~${target.playerid}~n~~y~~h~<~w~~h~ SPACE~y~~h~ - ~w~~h~LSHIFT~y~~h~ >`);
            player.PlayerTextDrawShow(TextDraws.player.spec[player.playerid]);
        }
    }
    else {
        player.PlayerTextDrawHide(TextDraws.player.spec[player.playerid]);
    }
}

function SpawnCar(player, model, color1=Function.getRandomInt(0, 255), color2=Function.getRandomInt(0, 255)) {
    if(player.IsPlayerInAnyVehicle()) return SendError(player, "Ai deja un vehicul!", "You are already in a vehicle!");
    if(Player.Info[player.playerid].SpawnedCar) {
        samp.DestroyVehicle(Player.Info[player.playerid].SpawnedCar);
        Player.Info[player.playerid].SpawnedCar = null;
    }
    Player.Info[player.playerid].SpawnedCar = samp.CreateVehicle(model, player.position.x, player.position.y, player.position.z, player.position.angle, color1, color2);
    player.PutPlayerInVehicle(Player.Info[player.playerid].SpawnedCar, 0);
    player.SendClientMessage(data.colors.LIGHT_YELLOW, `You have spawned a {00BBF6}${samp.vehicleNames[model-400]} (ID: ${model}){BBFF00} with colors: {00BBF6}${color1} & ${color2}{BBFF00}!`);
}

function isReportIdExists(id) {
    let value = true;
    if(!Player.Info[id]) value = false;
    else if(Player.Info[id].Reported.By == -1) value = false;
    return value;
}

function getReportsCount() {
    return samp.getPlayers().filter(f => Player.Info[f.playerid].Reported.By != -1).length;
}

function checkReportsTD(player=false) {
    samp.TextDrawSetString(TextDraws.server.reports, `/reports: ~w~~h~${getReportsCount()}`);

    if(!player) {
        samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
            if(Player.Info[i.playerid].Admin && getReportsCount() != 0) i.TextDrawShowForPlayer(TextDraws.server.reports);
            else i.TextDrawHideForPlayer(TextDraws.server.reports);
        });
    }
    else {
        if(Player.Info[player.playerid].Admin && getReportsCount() != 0) player.TextDrawShowForPlayer(TextDraws.server.reports);
        else player.TextDrawHideForPlayer(TextDraws.server.reports);
    }
}

function resetTradeVariables(player) {
    Player.Info[player.playerid].Trade.Sell.Item = -1;
    Player.Info[player.playerid].Trade.Sell.Value = 0;
    Player.Info[player.playerid].Trade.Buy.Item = -1;
    Player.Info[player.playerid].Trade.Buy.Value = 0;

    let result = samp.getPlayers().filter(f => Player.Info[f.playerid].TradeRequestFrom == player.playerid)[0];
    if(result) Player.Info[result.playerid].TradeRequestFrom = -1;
}   

function getTradeItemAmount(player, item) {
    let amount = 0;
    switch(item) {
        case 0: amount = Player.Info[player.playerid].Money; break;
        case 1: amount = Player.Info[player.playerid].OnlineTime.Hours; break;
        case 2: amount = Player.Info[player.playerid].Coins; break;
        case 4: amount = Player.Info[player.playerid].Driving_Data.StuntPoints; break;
        case 5: amount = Player.Info[player.playerid].Driving_Data.DriftPoints; break;
        case 6: amount = Player.Info[player.playerid].Driving_Data.RacePoints; break;
    }
    return amount;
}

function getTradeItemName(item) {
    let name = "";
    switch(item) {
        case 0: name = "Money"; break;
        case 1: name = "Hours"; break;
        case 2: name = "Coins"; break;
        case 3: name = "Kills & Deaths"; break;
        case 4: name = "Stunt Points"; break;
        case 5: name = "Drift Points"; break;
        case 6: name = "Race Points"; break;
    }
    return name;
}

function isTradeItemNeedValue(item) {
    let need = true;
    switch(item) {
        case 3: need = false; break;
    }
    return need;
}

function getRegistredPlayersCount() {
    return new Promise((resolve, reject) => {
        con.query("SELECT COUNT(*) AS count FROM users", function(err, result) {
            if(!err && result != 0) resolve(result[0].count);
            else resolve(0);
        });
    });
}

function Updater() {
    /* Server HostName Changer */
    samp.SendRconCommand(`hostname ${data.settings.RANDOM_SERVER_NAMES[Function.getRandomInt(0, data.settings.RANDOM_SERVER_NAMES.length)]}`);
    //samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => { savePlayer(i); });
}

function banPlayer(player, admin, days, reason) {
    samp.SendClientMessageToAll(data.colors.LIGHT_BLUE, "================(Ban Details)================");
    samp.SendClientMessageToAll(data.colors.RED, `${player.GetPlayerName(24)} {CEC8C8}has been banned by Admin {00BBF6}${admin.GetPlayerName(24)} {CEC8C8}for {FF0000}${days} {CEC8C8}day(s)!`);
    samp.SendClientMessageToAll(data.colors.GRAY, `Reason: {00BBF6}${reason}`);
    samp.SendClientMessageToAll(data.colors.LIGHT_BLUE, "==========================================");

    for(let i = 0; i < 30; i++) player.SendClientMessage(-1, "");
    player.SendClientMessage(data.colors.LIGHT_BLUE, `============(${Lang(player, "Detalii Ban", "Ban Details")})============`);
    player.SendClientMessage(data.colors.GRAY, `${Lang(player, `Ai primit interdictie de la Admin {00BBF6}${admin.GetPlayerName(24)} {CEC8C8}pentru {FF0000}${days} {CEC8C8}zile!`, `You have been banned by Admin {00BBF6}${admin.GetPlayerName(24)} {CEC8C8}for {FF0000}${days} {CEC8C8}days!`)}`);
    player.SendClientMessage(data.colors.GRAY, `${Lang(player, "Motiv", "Reason")}: {00BBF6}${reason}`);
    player.SendClientMessage(data.colors.LIGHT_BLUE, "=======================================");
    
    SendACMD(admin, "Ban");

    con.query("SELECT * FROM bans WHERE acc_id = ?", [Player.Info[player.playerid].AccID], function(err, result) {
        if(!err && result == 0) con.query("INSERT INTO bans (acc_id, ip, admin_acc_id, from_timestamp, to_timestamp, reason) VALUES(?, ?, ?, ?, ?, ?)", [Player.Info[player.playerid].AccID, player.GetPlayerIp(16), Player.Info[admin.playerid].AccID, getTimestamp(), getTimestamp(days), reason]);
        else con.query("UPDATE bans SET ip = ?, admin_acc_id = ?, from_timestamp = ?, to_timestamp = ?, reason = ?", [player.GetPlayerIp(16), Player.Info[admin.playerid].AccID, getTimestamp(), getTimestamp(days), reason]);
    });

    kickPlayer(player);
}

function checkPlayerBanStatus(player, check_acc_id=true) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM bans WHERE ${check_acc_id ? `acc_id = '${Player.Info[player.playerid].AccID}' OR ip = '${player.GetPlayerIp(16)}'` : `ip = '${player.GetPlayerIp(16)}'`}`, async function(err, result) {
            if(!err && result != 0) {
                if(getTimestamp() < result[0].to_timestamp) {
                    HideConnectTextDraw(player);
                    player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "", "", "", "");
                    let difference = timeDifference(result[0].to_timestamp);
                    player.SendClientMessage(data.colors.LIGHT_BLUE, "================(Ban Details)================");
                    player.SendClientMessage(data.colors.GRAY, `Sorry, but {FF0000}${await getNameByAccID(result[0].acc_id)} {CEC8C8}is banned on our server!`);
                    player.SendClientMessage(data.colors.GRAY, `By Admin {00BBF6}${await getNameByAccID(result[0].admin_acc_id)}. {CEC8C8}Reason: {00BBF6}${result[0].reason}`);
                    player.SendClientMessage(data.colors.GRAY, `This ban will expire in {FF0000}${difference.value} {CEC8C8}${difference.type}!`);
                    player.SendClientMessage(data.colors.LIGHT_BLUE, "==========================================");
                    resolve(true);
                }
                else {
                    con.query("DELETE FROM bans WHERE acc_id = ?", [Player.Info[player.playerid].AccID]);
                    resolve(false);
                }
            }
            else resolve(false);
        });
    });
}

function timeDifference(timestamp) {
    let dateFuture = new Date(timestamp * 1000);
    let dateNow = new Date(Date.now());
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    let days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    let hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    let minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    let seconds = Math.trunc(diffInMilliSeconds);
    let difference = {value: 0, type: ""};
    if(days != 0) { 
        difference.value = days; 
        difference.type = "Days(s)";
    }
    else if(days == 0 && hours != 0) { 
        difference.value = hours;
        difference.type = "Hour(s)";
    }
    else if(hours == 0 && minutes != 0) { 
        difference.value = minutes;
        difference.type = "Minute(s)";
    }
    else if(minutes == 0 && seconds != 0) { 
        difference.value = seconds;
        difference.type = "Second(s)";
    }
    return difference;
}

function getTimestamp(days=0) {
    return days == 0 ? Math.round(new Date() / 1000) : Math.round(new Date() / 1000) + (days * 86400);
}

function CheckPlayerAka(player) {
    con.query("SELECT * FROM akas WHERE ip = ?", [player.GetPlayerIp(16)], function(err, result) {
        if(err) return;
        if(result != 0) {
            let names = JSON.parse(result[0].names);
            if(!names.some(s => s == player.GetPlayerName(24))) {
                names.push(player.GetPlayerName(24));
            }
            con.query("UPDATE akas SET names = ? WHERE ip = ?", [JSON.stringify(names), player.GetPlayerIp(16)]);
        }
        else con.query("INSERT INTO akas (names, ip) VALUES(?, ?)", [JSON.stringify([player.GetPlayerName(24)]), player.GetPlayerIp(16)]);
    });
}

function SendMessageToClan(clanId, color, message) {
    samp.getPlayers().filter(f => Player.Info[f.playerid].Clan == clanId).forEach((i) => {
        i.SendClientMessage(color, message);
    });
}

function SendMessageToAdmins(color, message) {
    samp.getPlayers().filter(f => Player.Info[f.playerid].Admin).forEach((i) => {
        i.SendClientMessage(color, message);
    });
}

function getPlayerStatsNote(player) {
    let note = 0;
    if(Player.Info[player.playerid].Driving_Data.StuntPoints >= 1000) note += 1;
    if(Player.Info[player.playerid].Driving_Data.DriftPoints >= 1000) note += 1;
    if(Player.Info[player.playerid].Driving_Data.RacePoints >= 100) note += 1;
    if(Player.Info[player.playerid].Kills_Data.BestKillingSpree >= 100) note += 1;
    if(TotalGameTime(player).hours >= 100) note += 1;
    if(Player.Info[player.playerid].Respect.Positive >= 50) note += 1;
    if(Player.Info[player.playerid].Coins >= 25000) note += 1;
    return note;
}

function TotalGameTimeMonth(player) {
    let total_time = ((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].ConnectTime) + (Player.Info[player.playerid].Month.OnlineTime.Hours*60*60) + (Player.Info[player.playerid].Month.OnlineTime.Minutes*60) + (Player.Info[player.playerid].Month.OnlineTime.Seconds));
    let hours = Math.floor(total_time / 3600);
    let minutes = Math.floor(total_time / 60) % 60;
    let seconds = Math.floor(total_time % 60);
    return {hours: hours, minutes: minutes, seconds: seconds};
}

function TotalGameTimeGang(player) {
    let total_time = ((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Gang_Data.ConnectTime) + (Player.Info[player.playerid].Gang_Data.OnlineTime.Hours*60*60) + (Player.Info[player.playerid].Gang_Data.OnlineTime.Minutes*60) + (Player.Info[player.playerid].Gang_Data.OnlineTime.Seconds));
    let hours = Math.floor(total_time / 3600);
    let minutes = Math.floor(total_time / 60) % 60;
    let seconds = Math.floor(total_time % 60);
    return {hours: hours, minutes: minutes, seconds: seconds};
}

function TotalGameTime(player) {
    let total_time = ((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].ConnectTime) + (Player.Info[player.playerid].OnlineTime.Hours*60*60) + (Player.Info[player.playerid].OnlineTime.Minutes*60) + (Player.Info[player.playerid].OnlineTime.Seconds));
    let hours = Math.floor(total_time / 3600);
    let minutes = Math.floor(total_time / 60) % 60;
    let seconds = Math.floor(total_time % 60);
    return {hours: hours, minutes: minutes, seconds: seconds};
}

function kickPlayer(player) {
    setTimeout(() => {
        try { player.Kick(); }
        catch {}
    }, 200);
}

function SendACMD(player, cmdtext) {
    if(Player.Info[player.playerid].Admin >= 1) {
        samp.getPlayers().filter(f => Player.Info[f.playerid].Admin).forEach((i) => {
            i.SendClientMessage(data.colors.BLUE, `Admin: {FFFF00}${player.GetPlayerName(24)} {0000FF}has used the command: {FFFF00}${cmdtext}`);
        });
    }
}

function isPlayerInSpecialZone(player) {
    let value = false;
    if(Player.Info[player.playerid].SpecialZone.Targets) value = true;
    return value;
}

function AddToTDLogs(string) {
    ServerLogs[2] = ServerLogs[1];
    ServerLogs[1] = ServerLogs[0];
    ServerLogs[0] = string;
    samp.TextDrawSetString(TextDraws.server.logs, `${ServerLogs[0]}~n~${ServerLogs[1]}~n~${ServerLogs[2]}`);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function TelePlayer(player, cmdtext, name, x, y, z, angle) {
    player.GameTextForPlayer(`~y~~h~Welcome to~n~~g~~h~${name}`, 4000, 3);
    player.SetPlayerPos(x, y, z);
    player.SetPlayerFacingAngle(angle);
    AddToTDLogs(`~b~~h~${player.GetPlayerName(24)} ~y~~h~has gone to ~r~~h~${name} ~b~~h~- /${cmdtext}`);
}

function CheckCustomChat(player, text) {
    if(text[0] == "!") {
        if(Player.Info[player.playerid].Clan) {
            text = text.replace("!", "");
            samp.getPlayers().filter(f => Player.Info[f.playerid].Clan == Player.Info[player.playerid].Clan).forEach((i) => {
                i.SendClientMessage(data.colors.ORANGE, `Clan Chat: {FF4400}${player.GetPlayerName(24)}(${player.playerid}): {15FF00}${text}`);
            });
            return false;
        }
        if(Player.Info[player.playerid].Gang) {
            text = text.replace("!", "");
            samp.getPlayers().filter(f => Player.Info[f.playerid].Gang == Player.Info[player.playerid].Gang).forEach((i) => {
                i.SendClientMessage(data.colors.ORANGE, `Gang Chat: {FF4400}${player.GetPlayerName(24)}(${player.playerid}): {15FF00}${text}`);
            });
            return false;
        }
    }
    else if(text[0] == "@") {
        if(Player.Info[player.playerid].Admin) {
            text = text.replace("@", "");
            samp.getPlayers().filter(f => Player.Info[f.playerid].Admin).forEach((i) => {
                i.SendClientMessage(data.colors.ORANGE, `Admin Chat: {FF4400}${player.GetPlayerName(24)}(${player.playerid}): {15FF00}${text}`);
            });
            return false;
        }
    }
    else if(text[0] == "#") {
        if(Player.Info[player.playerid].VIP) {
            text = text.replace("#", "");
            samp.getPlayers().filter(f => Player.Info[f.playerid].VIP).forEach((i) => {
                i.SendClientMessage(data.colors.ORANGE, `VIP Chat: {FF4400}${player.GetPlayerName(24)}(${player.playerid}): {15FF00}${text}`);
            });
            return false;
        }
    }
   return true;
}

function replaceAll(string, search, replace) {
    return string.replace(new RegExp(search, 'g'), replace);
}

function SendAntiSpam(player, time) {
    player.SendClientMessage(data.colors.LIGHT_YELLOW, Lang(player, `ANTI-SPAM: {BBFF00}Te rugam asteapta {00BBF6}${time}{BBFF00} secunde pentru a scrie ceva din nou!`, `ANTI-SPAM: {BBFF00}Please wait {00BBF6}${time}{BBFF00} seconds to write something again!`));
}

function checkAntiSpam(player) {
    /* Unlimited */
    if(Player.Info[player.playerid].Admin >= 1 || Player.Info[player.playerid].VIP == 4) return true;
    /* 1 Second */
    else if(Player.Info[player.playerid].VIP == 3) {
        if((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message) < 1) {
            let time;
            if(Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message == 0) time = 1;
            SendAntiSpam(player, time);
            return false;
        }
    }
    /* 2 Seconds */
    else if(Player.Info[player.playerid].VIP == 2) {
        if((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message) < 2) {
            let time;
            if(Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message == 0) time = 2;
            else if(Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message == 1) time = 1;
            SendAntiSpam(player, time);
            return false;
        } 
    }
    /* 3 Seconds */
    else {
        if((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message) < 3) {
            let time;
            if(Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message == 0) time = 3;
            else if(Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message == 1) time = 2;
            else if(Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Last_Chat_Message == 2) time = 1;
            SendAntiSpam(player, time);
            return false;
        }
    }
    return true;
}

function getClanRank(RankID) {
    let string = "";
    switch(RankID) {
        case 1: string = "Member"; break;
        case 2: string = "Leader"; break;
        case 3: string = "Founder"; break;
    }
    return string;
}

function getNameByAccID(AccID) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM users WHERE ID = ?", [AccID], function(err, result) {
            if(err || !result) return resolve("none");
            resolve(result[0].name);
        });
    });
}

function getIDByAccName(AccName) {
    return new Promise((resolve, reject) => {
        con.query("SELECT ID FROM users WHERE name = ?", [AccName], function(err, result) {
            if(!err && result != 0) resolve(result[0].ID);
            else resolve(null);
        });
    });
}

function saveClan(clanId) {
    if(!Clan.Exists(clanId)) return;
    con.query("UPDATE clans SET name = ?, owner = ?, position = ?, weapon = ?, color = ?, member_skin = ?, leader_skin = ?, kills = ?, deaths = ? WHERE ID = ?", [
        Clan.Info[clanId].name, Clan.Info[clanId].owner, JSON.stringify(Clan.Info[clanId].position), JSON.stringify(Clan.Info[clanId].weapons), Clan.Info[clanId].color,
        Clan.Info[clanId].skin.member, Clan.Info[clanId].skin.leader, Clan.Info[clanId].kills, Clan.Info[clanId].deaths, clanId
    ]);
}

function saveGang(gangId) {
    if(!Gang.Exists(gangId)) return;
    con.query("UPDATE gangs SET name = ?, position = ?, weapon = ?, color = ?, alliance = ?, points = ?, captures = ?, kills = ?, deaths = ?, territory_position = ? WHERE ID = ?", [
        Gang.Info[gangId].name, JSON.stringify(Gang.Info[gangId].position), JSON.stringify(Gang.Info[gangId].weapons), Gang.Info[gangId].color, Gang.Info[gangId].alliance, Gang.Info[gangId].points, Gang.Info[gangId].captures, 
        Gang.Info[gangId].kills, Gang.Info[gangId].deaths, JSON.stringify([Gang.Info[gangId].territory.MinX, Gang.Info[gangId].territory.MinY, Gang.Info[gangId].territory.MaxX, Gang.Info[gangId].territory.MaxY]), gangId
    ], function(err, result) {
        if(err) console.log(err);
    });
}

function savePlayer(player) {
    if(!Player.Info[player.playerid].LoggedIn) return;
    let OnlineTime = TotalGameTime(player);
    let OnlineTimeGang = TotalGameTimeGang(player);
    let OnlineTimeMonth = TotalGameTimeMonth(player);

    con.query("UPDATE users SET mail = ?, money = ?, coins = ?, respect_positive = ?, respect_negative = ?, hours = ?, minutes = ?, seconds = ?, admin = ?, VIP = ?, VIP_Expire = ?, clan = ?,\
    clan_rank = ?, gang = ?, gang_rank = ?, gang_kills = ?, gang_deaths = ?, gang_captures = ?, gang_points = ?, gang_warns = ?, gang_hours = ?, gang_minutes = ?, gang_seconds = ?, gang_membersince = ?,\
    kills = ?, headshots = ?, killingspree = ?, bestkillingspree = ?, deaths = ?, driftpoints = ?, stuntpoints = ?, racepoints = ?, adminpoints = ?, month_hours = ?, month_minutes = ?, month_seconds = ?,\
    month_kills = ?, month_headshots = ?, month_killingspree = ?, month_bestkillingspree = ?, month_deaths = ?, month_driftpoints = ?, month_stuntpoints = ?, month_racepoints = ?, jailed = ?,\
    caged = ?, kicks = ?, discord = ? WHERE ID = ?", [
        Player.Info[player.playerid].Mail, Player.Info[player.playerid].Money, Player.Info[player.playerid].Coins, Player.Info[player.playerid].Respect.Positive, Player.Info[player.playerid].Respect.Negative, 
        OnlineTime.hours, OnlineTime.minutes, OnlineTime.seconds, Player.Info[player.playerid].Admin, Player.Info[player.playerid].VIP, Player.Info[player.playerid].VIP_Expire, Player.Info[player.playerid].Clan, 
        Player.Info[player.playerid].Clan_Rank, Player.Info[player.playerid].Gang, Player.Info[player.playerid].Gang_Data.Rank, Player.Info[player.playerid].Gang_Data.Kills, Player.Info[player.playerid].Gang_Data.Deaths, 
        Player.Info[player.playerid].Gang_Data.Captures, Player.Info[player.playerid].Gang_Data.Points, Player.Info[player.playerid].Gang_Data.Warns, OnlineTimeGang.hours, OnlineTimeGang.minutes, OnlineTimeGang.seconds, 
        Player.Info[player.playerid].Gang_Data.MemberSince, Player.Info[player.playerid].Kills_Data.Kills, Player.Info[player.playerid].Kills_Data.HeadShots, Player.Info[player.playerid].Kills_Data.KillingSpree, 
        Player.Info[player.playerid].Kills_Data.BestKillingSpree, Player.Info[player.playerid].Kills_Data.Deaths, Player.Info[player.playerid].Driving_Data.DriftPoints, Player.Info[player.playerid].Driving_Data.StuntPoints, 
        Player.Info[player.playerid].Driving_Data.RacePoints, Player.Info[player.playerid].AdminPoints, OnlineTimeMonth.hours, OnlineTimeMonth.minutes, OnlineTimeMonth.seconds, Player.Info[player.playerid].Month.Kills_Data.Kills, 
        Player.Info[player.playerid].Month.Kills_Data.HeadShots, Player.Info[player.playerid].Month.Kills_Data.KillingSpree, Player.Info[player.playerid].Month.Kills_Data.BestKillingSpree, Player.Info[player.playerid].Month.Kills_Data.Deaths, 
        Player.Info[player.playerid].Driving_Data.DriftPoints, Player.Info[player.playerid].Driving_Data.StuntPoints, Player.Info[player.playerid].Driving_Data.RacePoints, Player.Info[player.playerid].Jailed, Player.Info[player.playerid].Caged, 
        Player.Info[player.playerid].Kicks, Player.Info[player.playerid].Discord, Player.Info[player.playerid].AccID
    ]);
}

function ResetPlayerClanCreateVariables(player) {
    Player.Info[player.playerid].Creating_Clan.name = "";
    Player.Info[player.playerid].Creating_Clan.skin.member = 0;
    Player.Info[player.playerid].Creating_Clan.skin.leader = 0;
    Player.Info[player.playerid].Creating_Clan.color = 0xFFFFFFAA;
    for(let i = 0; i < 6; i++) {
        Player.Info[player.playerid].Creating_Clan.weapons[i] = 0;
    }
}

function UpdatePlayerDB(player, column, value) {
    con.query(`UPDATE users SET ${column} = ? WHERE ID = ?`, [value, Player.Info[player.playerid].AccID]);
}

function SetupPlayerForSpawn(player, type=0) { 
    player.SetPlayerColor(0xFFFFFFAA);
    player.SetPlayerVirtualWorld(0);
    player.SetPlayerInterior(0);
    player.ResetPlayerWeapons();

    /* Check if the player is jailed */
    if(Player.Info[player.playerid].Jailed) return player.SetPlayerPos(data.position.JAIL.x, data.position.JAIL.y, data.position.JAIL.z);

    /* Type 0 = Check if the player is in a clan or gang */
    /* Type else = Set auto random spawn position */
    if(type == 0) {
        if(Player.Info[player.playerid].Clan) { /* Clan Spawn */
            let position = Clan.Info[Player.Info[player.playerid].Clan].position;
            if(position[0] == 0 && position[1] == 0 && position[2] == 0 && position[3] == 0) {
                let position = SpawnZone.Random();
                player.SetPlayerPos(position[0], position[1], position[2]);
                player.SetPlayerFacingAngle(position[3]);
            }
            else {
                player.SetPlayerPos(position[0], position[1], position[2]);
                player.SetPlayerFacingAngle(position[3]);
            }
            player.SetPlayerColor(Clan.Info[Player.Info[player.playerid].Clan].color);
            player.SetPlayerSkin(Player.Info[player.playerid].Clan_Rank == 3 || Player.Info[player.playerid].Clan_Rank == 2 ? Clan.Info[Player.Info[player.playerid].Clan].skin.leader : Clan.Info[Player.Info[player.playerid].Clan].skin.member);
            Clan.Info[Player.Info[player.playerid].Clan].weapons.forEach((i) => {
                player.GivePlayerWeapon(i, 9999);
            });
        }
        else if(Player.Info[player.playerid].Gang) { /* Gang Spawn */
            let position = Gang.Info[Player.Info[player.playerid].Gang].position;
            player.SetPlayerPos(position[0], position[1], position[2]);
            player.SetPlayerFacingAngle(position[3]);
            player.SetPlayerColor(Gang.Info[Player.Info[player.playerid].Gang].color);
            Gang.Info[Player.Info[player.playerid].Gang].weapons.forEach((i) => {
                player.GivePlayerWeapon(i, 9999);
            });

            let AttackGangZone = Gang.Get().filter(f => f.territory.GangZone == Gang.Info[Player.Info[player.playerid].Gang].capturing.turf)[0];
            let DefendGangZone = Gang.Get().filter(f => Gang.GetOwnedGangZones(Player.Info[player.playerid].Gang).some(s => s == f.capturing.turf) && f.capturing.turf != -1)[0];

            if(AttackGangZone) {
                player.TextDrawShowForPlayer(TextDraws.server.attack_territory);
            }
            else if(DefendGangZone) {
                player.TextDrawShowForPlayer(TextDraws.server.under_attack_territory);
            }
        }
        else SetupPlayerForSpawn(player, 1);
    }
    else { /* Random Spawn */
        let position = SpawnZone.Random();
        player.SetPlayerPos(position[0], position[1], position[2]);
        player.SetPlayerFacingAngle(position[3]);
    }

    /* Check if the players is Caged */
    if(Player.Info[player.playerid].Caged) CagePlayer(player);
}

function LoadFromDB() {
    LoadGangs();
    LoadSpawnZones();
    LoadTeleports();
    LoadClans();
}

function LoadGangs() {
    con.query("SELECT * FROM gangs", function(err, result) {
        for(let i = 0; i < result.length; i++) {
            let position = JSON.parse(result[i].position);
            let weapons = JSON.parse(result[i].weapon);
            let base_position = JSON.parse(result[i].base_position);
            let gate_position = JSON.parse(result[i].gate_position);
            let territory_position = JSON.parse(result[i].territory_position);
            Gang.Create(result[i].ID, result[i].name, position, weapons, result[i].color, result[i].alliance, result[i].points, result[i].captures, result[i].kills, result[i].deaths, base_position, result[i].gate_objectid, gate_position, territory_position);  
        }
        console.log(`Loaded ${result.length} gangs.`);
    });
}

function LoadSpawnZones() {
    con.query("SELECT * FROM spawnzones", function(err, result) {
        for(let i = 0; i < result.length; i++) {
            SpawnZone.Create(result[i].ID, result[i].name, JSON.parse(result[i].position));
        }
        console.log(`Loaded ${result.length} spawn zones.`);
    });
}

function LoadTeleports() {
    con.query("SELECT * FROM teleports", function(err, result) {
        for(let i = 0; i < result.length; i++) {
            Teleport.Create(result[i].ID, result[i].type, result[i].command, result[i].name, JSON.parse(result[i].position));
        } 
        console.log(`Loaded ${result.length} teleports.`);
    });
}

function LoadClans() {
    con.query("SELECT * FROM clans", function(err, result) {
        for(let i = 0; i < result.length; i++) {
            let position = JSON.parse(result[i].position);
            let weapons = JSON.parse(result[i].weapon);
            Clan.Create(result[i].ID, result[i].name, result[i].owner, position, weapons, parseInt(result[i].color), {member: result[i].member_skin, leader: result[i].leader_skin}, result[i].kills, result[i].deaths);
        }
        console.log(`Loaded ${result.length} clans.`);
    });
}

setInterval(CheckPlayers, 1000);
function CheckPlayers() {
    try {
        samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
            if(Player.Info[i.playerid].Jailed) {
                Player.Info[i.playerid].Jailed--; 
                if(Player.Info[i.playerid].Jailed == 0) {
                    i.SpawnPlayer();
                }
            }
            if(Player.Info[i.playerid].Caged) {
                Player.Info[i.playerid].Caged--;
                if(Player.Info[i.playerid].Caged == 0) {
                    UnCagePlayer(i);
                }
            }
        });
    }
    catch {}
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

function getRconRank(rank) {
    let string = "";
    switch(rank) {
        case 1: string = "RCON"; break;
        case 2: string = "Caretaker"; break;
        case 3: string = "Founder"; break;
    }
    return string;
}

function getAdminRank(rank, hex=true) {
    let string = "";
    switch(rank) {
        case 0: string = `Demote`; break;
        case 1: string = `${hex ? "{FF0000}" : ""}Junior`; break;
        case 2: string = `${hex ? "{FFFF00}" : ""}Senior`; break;
        case 3: string = `${hex ? "{0072FF}" : ""}Master`; break;
    }
    return string;
}

function getVIPRank(rank, hex=true) {
    let string = "";
    switch(rank) {
        case 1: string = `${hex ? "{FF0000}" : ""}Red`; break;
        case 2: string = `${hex ? "{FFFF00}" : ""}Yellow`; break;
        case 3: string = `${hex ? "{0077FF}" : ""}Blue`; break;
        case 4: string = `${hex ? "{FFFFFF}" : ""}White`; break;
    }
    return string;
}

function getPlayerRankInLabel(player) {
    let tag = "";
    if(Player.Info[player.playerid].RconType == 3) tag = `{FFFFFF}${getRconRank(3)}`;
    else if(Player.Info[player.playerid].RconType == 2) tag = `{FFFFFF}${getRconRank(2)}`;
    else if(Player.Info[player.playerid].RconType == 1) tag = `{FFFFFF}${getRconRank(1)}`;
    else if(Player.Info[player.playerid].Admin == 3) tag = "{0072FF}Master";
    else if(Player.Info[player.playerid].Admin == 2) tag = "{FFFF00}Senior";
    else if(Player.Info[player.playerid].Admin == 1) tag = "{FF0000}Junior";
    else if(Player.Info[player.playerid].VIP == 4) tag = "{FFFFFF}VIP";
    else if(Player.Info[player.playerid].VIP == 3) tag = "{0077FF}VIP";
    else if(Player.Info[player.playerid].VIP == 2) tag = "{FFFF00}VIP";
    else if(Player.Info[player.playerid].VIP == 1) tag = "{FF0000}VIP";
    return tag;
}

function getPlayerRankInChat(player) {
    let tag = "";
    if(Player.Info[player.playerid].RconType == 3) tag = `{FF0000}({FFFFFF}${getRconRank(3)}{FF0000})`;
    else if(Player.Info[player.playerid].RconType == 2) tag = `{FF0000}({FFFFFF}${getRconRank(2)}{FF0000})`;
    else if(Player.Info[player.playerid].RconType == 1) tag = `{FF0000}({FFFFFF}${getRconRank(1)}{FF0000})`;
    else if(Player.Info[player.playerid].Admin == 3) tag = "{0072FF}(Master)";
    else if(Player.Info[player.playerid].Admin == 2) tag = "{FFFF00}(Senior)";
    else if(Player.Info[player.playerid].Admin == 1) tag = "{FF0000}(Junior)";
    else if(Player.Info[player.playerid].VIP == 4) tag = "{FF0000}({FFFFFF}VIP{FF0000})";
    else if(Player.Info[player.playerid].VIP == 3) tag = "{0077FF}(VIP)";
    else if(Player.Info[player.playerid].VIP == 2) tag = "{FFFF00}(VIP)";
    else if(Player.Info[player.playerid].VIP == 1) tag = "{FF0000}(VIP)";
    return tag;
}

function ShowSpawnTextDraw(player) {
    for(let i = 0; i <= 3; i++) player.TextDrawShowForPlayer(TextDraws.server.spawn[i]);
    player.PlayerTextDrawShow(TextDraws.player.date[player.playerid]);
    player.TextDrawShowForPlayer(TextDraws.server.logs);
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
    player.SendClientMessage(0xFF0000AA, `ERROR: ${Lang(player, ro_error, en_error)}`);
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
            player.ShowPlayerDialog(Dialog.CMDS_1, samp.DIALOG_STYLE.MSGBOX, Lang(player, "Comenzi - Pagina {FF0000}1", "Commands - Page {FF0000}1"), info, Player.Info[player.playerid].Language == 1 ? "Inchide" : "Close", Player.Info[player.playerid].Language == 1 ? "Pagina 2" : "Page 2");
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
            player.ShowPlayerDialog(Dialog.CMDS_2, samp.DIALOG_STYLE.MSGBOX, Lang(player, "Comenzi - Pagina {FF0000}2", "Commands - Page {FF0000}2"), info, Lang(player, "Pagina 1", "Page 1"), Lang(player, "Pagina 3", "Page 3"));
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
            player.ShowPlayerDialog(Dialog.CMDS_3, samp.DIALOG_STYLE.MSGBOX, Lang(player, "Comenzi - Pagina {FF0000}3", "Commands - Page {FF0000}3"), info, Lang(player, "Inchide", "Close"), Lang(player, "Pagina 2", "Page 2"));
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
            let info = "";
            info += `{FFFF00}${Lang(player, `Salut, {FF0000}${player.GetPlayerName(24)}{FFFF00}!`, `Hi, {FF0000}${player.GetPlayerName(24)}{FFFF00}!`)}\n`;
            info += "\n";
            info += `{FFCC00}${Lang(player, "Numele tau nu este inregistrat. Te rugam sa-l inregistrezi pentru a-ti salva statisticile!", "Your name is not registered. Please register it to save your statistics!")}\n`;
            info += `{FFFF00}${Lang(player, "Introdu o parola grea pe care doar tu sa o stii pentru a te autentifica! ({FF0000}intre 3-25 de caractere{FFFF00}):", "Enter a hard password before ({FF0000}Min. 3 - Max. 25 characters{FFFF00}):")}`;
            player.ShowPlayerDialog(Dialog.REGISTER, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Inregistreaza-ti numele!", "Register your name!"), info, "Register", Lang(player, "Nume Nou", "New Name"));
        }
        else { /* Login */
            let info = "";
            info += `{FFFF00}${Lang(player, `Bine ai revenit {FF0000}${player.GetPlayerName(24)}{FFFF00}!`, `Welcome back {FF0000}${player.GetPlayerName(24)}{FFFF00}!`)}\n`;
            info += "\n";
            info += `{FFCC00}${Lang(player, "Trebuie sa te autentifici cu parola acestui cont inainte de a continua!", "Please login password for this account before continuing!")}\n`;
            info += `{FFFF00}${Lang(player, "Daca acesta nu este numele contului tau, apasa pe butonul {FF0000}Nume Nou{FFFF00}!", "If this is not your account name, click on the {FF0000}New Name{FFFF00}!")}`;
            player.ShowPlayerDialog(Dialog.LOGIN, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Autentificare", "Login"), info, Lang(player, "Autentificare", "Login"), Lang(player, "Nume Nou", "New Name"));
        }
    });
}

function Call_NewName(player) {
    player.ShowPlayerDialog(Dialog.NEW_NAME, samp.DIALOG_STYLE.INPUT, "Change Name", "{BBFF00}Please enter below new nickname wich you want to have\n{FFFF00}This name need to between {FF0000}3-20{FFFF00} characters long!:", "Change", "Random Name");
}

function LoadPlayerStats(player) {
    con.query("SELECT * FROM users WHERE name = ?", [player.GetPlayerName(24)], async function(err, result) {
        if(!err && result) {  
            Player.Info[player.playerid].LoggedIn = true;
            Player.Info[player.playerid].AccID = result[0].ID;

            if(await checkPlayerBanStatus(player)) kickPlayer(player);
            else {
                Player.Info[player.playerid].Mail = result[0].mail;
                Player.Info[player.playerid].Money = result[0].money;
                Player.Info[player.playerid].Coins = result[0].coins;
                Player.Info[player.playerid].Respect.Positive = result[0].respect_positive;
                Player.Info[player.playerid].Respect.Negative = result[0].respect_negative;
                Player.Info[player.playerid].OnlineTime.Hours = result[0].hours;
                Player.Info[player.playerid].OnlineTime.Minutes = result[0].minutes;
                Player.Info[player.playerid].OnlineTime.Seconds = result[0].seconds;
                Player.Info[player.playerid].Admin = result[0].admin;
                Player.Info[player.playerid].VIP = result[0].VIP;
                Player.Info[player.playerid].VIP_Expire = result[0].VIP_Expire;
                Player.Info[player.playerid].Clan = result[0].clan;
                Player.Info[player.playerid].Clan_Rank = result[0].clan_rank;
                Player.Info[player.playerid].Gang = result[0].gang;
                Player.Info[player.playerid].Gang_Data.Rank = result[0].gang_rank;
                Player.Info[player.playerid].Gang_Data.Kills = result[0].gang_kills;
                Player.Info[player.playerid].Gang_Data.Deaths = result[0].gang_deaths;
                Player.Info[player.playerid].Gang_Data.Captures = result[0].gang_captures;
                Player.Info[player.playerid].Gang_Data.Points = result[0].gang_points;
                Player.Info[player.playerid].Gang_Data.Warns = result[0].gang_warns;
                Player.Info[player.playerid].Gang_Data.OnlineTime.Hours = result[0].gang_hours;
                Player.Info[player.playerid].Gang_Data.OnlineTime.Minutes = result[0].gang_minutes;
                Player.Info[player.playerid].Gang_Data.OnlineTime.Seconds = result[0].gang_seconds;
                Player.Info[player.playerid].Gang_Data.MemberSince = result[0].gang_membersince;
                Player.Info[player.playerid].Kills_Data.Kills = result[0].kills; 
                Player.Info[player.playerid].Kills_Data.HeadShots = result[0].headshots;
                Player.Info[player.playerid].Kills_Data.KillingSpree = result[0].killingspree;
                Player.Info[player.playerid].Kills_Data.BestKillingSpree = result[0].bestkillingspree;
                Player.Info[player.playerid].Kills_Data.Deaths = result[0].deaths;
                Player.Info[player.playerid].Driving_Data.DriftPoints = result[0].driftpoints;
                Player.Info[player.playerid].Driving_Data.StuntPoints = result[0].stuntpoints;
                Player.Info[player.playerid].Driving_Data.RacePoints = result[0].racepoints;
                Player.Info[player.playerid].AdminPoints = result[0].adminpoints;
                Player.Info[player.playerid].Month.OnlineTime.Hours = result[0].month_hours;
                Player.Info[player.playerid].Month.OnlineTime.Minutes = result[0].month_minutes;
                Player.Info[player.playerid].Month.OnlineTime.Seconds = result[0].month_seconds;
                Player.Info[player.playerid].Month.Kills_Data.Kills = result[0].month_kills;
                Player.Info[player.playerid].Month.Kills_Data.HeadShots = result[0].month_headshots;
                Player.Info[player.playerid].Month.Kills_Data.KillingSpree = result[0].month_killingspree;
                Player.Info[player.playerid].Month.Kills_Data.BestKillingSpree = result[0].month_bestkillingspree;
                Player.Info[player.playerid].Month.Kills_Data.Deaths = result[0].month_deaths;
                Player.Info[player.playerid].Driving_Data.DriftPoints = result[0].month_driftpoints;
                Player.Info[player.playerid].Driving_Data.StuntPoints = result[0].month_stuntpoints;
                Player.Info[player.playerid].Driving_Data.RacePoints = result[0].month_racepoints;
                Player.Info[player.playerid].Jailed = result[0].jailed;
                Player.Info[player.playerid].Caged = result[0].caged;
                Player.Info[player.playerid].Kicks = result[0].kicks;
                Player.Info[player.playerid].Discord = result[0].discord;

                player.GivePlayerMoney(Player.Info[player.playerid].Money);
                player.SetPlayerScore(getPlayerStatsNote(player));

                /* Gang */
                if(Player.Info[player.playerid].Gang) {
                    Player.Info[player.playerid].Gang_Data.ConnectTime = Math.floor(Date.now() / 1000);
                }

                checkReportsTD(player);

                let info = "";
                info += `{BBFF00}Salut {FF0000}${player.GetPlayerName(24)}{BBFF00}!\n`;
                info += "{BBFF00}Ai fost autentificat cu succes!\n";
                info += "\n";
                info += `{BBFF00}Admin: ${Player.Info[player.playerid].Admin ? `{49FFFF}Yes {BBFF00}- ${getAdminRank(Player.Info[player.playerid].Admin)}` : "{FF0000}No"}\n`;
                info += `{BBFF00}VIP: ${Player.Info[player.playerid].VIP ? `{49FFFF}Yes {BBFF00}- ${getVIPRank(Player.Info[player.playerid].VIP)}` : "{FF0000}No"}\n`;
                info += "{BBFF00}Nota Statistici: {FF0000}0{BBFF00}/{FF0000}10 {BBFF00}- Rank: {FF0000}{42bff4}Noob\n";
                info += "\n";
                info += "{BBFF00}Pentru mai multe statistici, foloseste {FF0000}/stats{BBFF00}.\n";
                if(result[0].spassword == "null") {
                    info += "\n";
                    info += "{FF0000}Mesaj {FF9900}URGENT {FF0000}pentru siguranta contului tau:\n";
                    info += "{FFFFFF}In contul tau nu exista o parola secundara!\n";
                    info += "{FFFFFF}Pentru a evita pierderea contului tau,\n";
                    info += "{FFFFFF}Adauga o parola secundara folosind comanda {FF0000}/Spassword{FFFFFF}!";
                }
                player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Contul meu", info, "Ok", "");
            }
        }
        else player.Kick();
    });
}

/* SA:MP Custom Events */
/*samp.registerEvent("findPositionZResponse", "sfff");
samp.on("findPositionZResponse", (RequestID, x, y, z) => {
    Server.Info.Reuqest.FindPosZ[`${RequestID}`] = {x: x, y: y, z: z};
});
function getPositionZ(x, y) {
    let RequestID = `${x},${y}`;
    samp.callPublic("findPositionZ", "sff", RequestID, x, y);
    return new Promise((resolve, reject) => {
        let temp_interval = setInterval(() => {
            if(Server.Info.Reuqest.FindPosZ[`${RequestID}`]) {
                resolve(Server.Info.Reuqest.FindPosZ[`${RequestID}`]);
                clearInterval(temp_interval);
                delete Server.Info.Reuqest.FindPosZ[`${RequestID}`];
            }
        }, 1);
    });
}*/

/* SA:MP Events */
samp.OnGameModeInit(() => {
    console.log("\n");
    console.log("Romania HarD Stunt GameMode successfully loaded.");
    console.log("Gamemode creator: Ghosty2004");
    console.log("Have Fun with this shit :)");
    console.log(`NodeJS Version: ${process.version}`);

    Maps.Load(); /* Load Server Maps */
    TextDraws.server.Load(); /* Load Server TextDraws */
    Minigames.Load(); /* Load Server Minigames */

    setInterval(Updater, 10000); /* An interval */

    samp.AddPlayerClass(217, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // stunt man
    samp.AddPlayerClass(122, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // pirate
    samp.AddPlayerClass(23, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // skater
    samp.AddPlayerClass(28, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // nigga
    samp.AddPlayerClass(101, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // civil
    samp.AddPlayerClass(115, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // mafia
    samp.AddPlayerClass(116, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // mafia
    samp.AddPlayerClass(53, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // killer
    samp.AddPlayerClass(78, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // pops
    samp.AddPlayerClass(134, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // killer
    samp.AddPlayerClass(135, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // killer
    samp.AddPlayerClass(137, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // zombie
    samp.AddPlayerClass(93, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // girl
    samp.AddPlayerClass(192, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // girl
    samp.AddPlayerClass(193, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // girl
    samp.AddPlayerClass(12, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // girl
    samp.AddPlayerClass(55, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // girl
    samp.AddPlayerClass(91, 485.7206, -1532.5042, 19.4601, 213.3013, 0, 0, 0, 0, 0, 0); // girl
    
    samp.DisableInteriorEnterExits();
    samp.UsePlayerPedAnims();
    samp.EnableStuntBonusForAll(false);

    for(let i = 0; i < 1000; i++) Player.ResetVariables(i);

    return true;
});

samp.OnGameModeExit(() => {
    return true;
});

samp.OnRconLoginAttempt((ip, password, success) => {
    if(success) {
        samp.getPlayers().filter(f => f.GetPlayerIp(16) == ip && Player.Info[f.playerid].LoggedIn).forEach((i) => {
            con.query("SELECT rcontype FROM users WHERE id = ?", [Player.Info[i.playerid].AccID], function(err, result) {
                if(err) return i.Kick();
                Player.Info[i.playerid].RconType = result[0].rcontype;
                if(Player.Info[i.playerid].RconType == 0) {
                    SendMessageToAdmins(-1, `RCON LOGIN: ${i.GetPlayerName(24)}(${i.playerid}) has tried to login without RCON PERMISSION!`);
                    kickPlayer(i);
                }
                else {
                    SendMessageToAdmins(-1, `RCON LOGIN: ${i.GetPlayerName(24)}(${i.playerid}) has logged in as a ${getRconRank(Player.Info[i.playerid].RconType)} successfully with permission enabled!`);
                    UpdateRankLabelFor(i);
                }
            });
        });
    }
    return true;
});

samp.OnPlayerKeyStateChange((player, newkeys, oldkeys) => {
    if(newkeys & samp.KEY.FIRE) {
        if(!player.IsPlayerInAnyVehicle()) return;
        if(IsNosVehicle(player.vehicleId)) samp.AddVehicleComponent(player.vehicleId, 1010);
    }
    if(newkeys & samp.KEY.YES) {
        if(!player.IsPlayerInAnyVehicle()) return;
        if(player.GetPlayerState() != samp.PLAYER_STATE.DRIVER) return;
        let angle = samp.GetVehicleZAngle(player.vehicleId);
        samp.SetVehiclePos(player.vehicleId, player.position.x, player.position.y, player.position.z);
        samp.SetVehicleZAngle(player.vehicleId, angle);
        player.GameTextForPlayer("~n~~n~~n~~n~~n~~n~~n~~n~~y~~h~Vehicle Flipped", 2000, 3);
    }
    if(newkeys & samp.KEY.SUBMISSION) {
        if(!player.IsPlayerInAnyVehicle()) return;
        samp.RepairVehicle(player.vehicleId);
        player.PlayerPlaySound(1133, 0.0, 0.0, 0.0);
    }
    return true;
});

samp.OnPlayerRequestClass((player, classid) => {
    let string = "";
    switch(classid) {
        case 0: string = "~y~~h~Stunt man"; break;
        case 1: string = "~r~~h~Pirate"; break;
        case 2: string = "~y~~h~Skater"; break;
        case 3: string = "~r~~h~Nigga"; break;
        case 4: string = "~y~~h~Civil"; break;
        case 5: string = "~r~~h~Mafia"; break;
        case 6: string = "~y~~h~Mafia"; break;
        case 7: string = "~r~~h~Killer"; break;
        case 8: string = "~y~~h~Pops"; break;
        case 9: string = "~r~~h~Killer"; break;
        case 10: string = "~y~~h~Killer"; break;
        case 11: string = "~y~~h~Z~r~~h~o~y~~h~m~r~~h~b~y~~h~i~r~~h~e"; break;
        case 12: case 13: case 14: case 15: case 16: case 17: string = "~p~~h~Girl"; break;
    }
    player.GameTextForPlayer(string, 3000, 6);
    player.SetPlayerInterior(14);
    player.SetPlayerVirtualWorld(1000 + player.playerid);
    player.SetPlayerPos(-1486.6014, 1641.9365, 1060.6945);
    player.SetPlayerFacingAngle(44.9541);
    player.SetPlayerSpecialAction(5);
    player.SetPlayerCameraPos(-1490.8479003906, 1646.2893066406, 1062.2905273438);
    player.SetPlayerCameraLookAt(-1490.1550292969, 1645.5900878906, 1062.1146240234);
    return true;
});

samp.OnPlayerRequestSpawn((player) => {
    if(!Player.Info[player.playerid].LoggedIn) return false;
    Maps.Custom.PlayerObj_Class_Select.UnLoad(player);
    return true;
});

samp.OnPlayerClickPlayer((player, clickedplayer) => {
    Player.Info[player.playerid].ClickedPlayer = clickedplayer.playerid;

    let info = "";
    info += `{0072FF}${Lang(player, "Vezi statistici", "Show Stats")} - {00FF00}/stats\n`;
    info += `{0072FF}${Lang(player, "Vezi statistici gang", "Show Gang Stats")} - {00FF00}/gstats\n`;
    info += `{0072FF}${Lang(player, "Vezi statistici clan", "Show Clan Stats")} - {00FF00}/cinfo\n`;
    info += `{0072FF}${Lang(player, "Vezi statistici admin", "Show Admin Stats")} - {00FF00}/astats\n`;
    info += `{0072FF}${Lang(player, "Trimite PM", "Send PM")} - {00FF00}/PM\n`;
    info += `{0072FF}${Lang(player, "Urmareste jucator", "Spectate him")} - {00FF00}/spec`;
    player.ShowPlayerDialog(Dialog.PLAYER_CLICK, samp.DIALOG_STYLE.LIST, Lang(player, `{AAAAAA}Ai dat click pe {FF0000}${clickedplayer.GetPlayerName(24)}{AAAAAA}!`, `{AAAAAA}You have clicked {FF0000}${clickedplayer.GetPlayerName(24)}{AAAAAA}!`), info, "Select", "Close");
    return true;
});

samp.OnPlayerDeath((player, killerid, reason) => {
    if(killerid) samp.SendDeathMessage(killerid.playerid, player.playerid, killerid.GetPlayerWeapon());
    return true;
});

samp.OnPlayerTakeDamage((player, issuerid, amount, weaponid, bodypart) => {
    return true;
});

samp.OnPlayerEnterVehicle((player, vehicleid, ispassenger) => {
    player.GameTextForPlayer(`${samp.vehicleNames[samp.GetVehicleModel(vehicleid)-400]}`, 500, 1);
    return true;
});

samp.OnPlayerWeaponShot((player, weaponid, hittype, hitid, fX, fY, fZ) => {
    /* Targets Minigame */
    if(Player.Info[player.playerid].SpecialZone.Targets) {
        if(weaponid == Minigames.Targets.Weapon) {
            if(hittype == samp.BULLET_HIT_TYPE.OBJECT) {
                if(hitid == Minigames.Targets.HitObject) {
                    if((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].TargetsLastShot) < 0.5) return player.Kick();
                    Player.Info[player.playerid].TargetsPoints++;
                    Player.Info[player.playerid].TargetsLastShot = Math.floor(Date.now() / 1000);
                    Minigames.Targets.Hit(player);
                    player.GameTextForPlayer("~h~~h~+1 Point!", 1000, 3);
                    player.PlayerTextDrawSetString(TextDraws.player.targets_points[player.playerid], `~r~~h~Points: ~w~~h~${Player.Info[player.playerid].TargetsPoints}`);
                }
            }
        }
    }
    return true;
});

samp.OnPlayerConnect(async(player) => {
    Player.ResetVariables(player.playerid);
    if(await checkPlayerBanStatus(player, false)) kickPlayer(player);
    else {
        ShowConnectTextDraw(player); 

        /* Language Select */
        player.ShowPlayerDialog(Dialog.SELECT_LANGUAGE, samp.DIALOG_STYLE.MSGBOX, "{00BBF6}Language {FF0000}/ {00BBF6}Limba", `{FFFF00}Welcome to ${data.settings.SERVER_NAME}{FFFF00}, {00BBF6}${player.GetPlayerName(24)}{FFFF00}!\n{FFFF00}Please select your language to continue!`, "Romana", "English");
        
        Maps.RemoveBuildings(player); /* Remove Player GTA:SA Objects */
        TextDraws.player.Load(player); /* Load Player TextDraws */
        CheckPlayerAka(player);

        Server.Info.NewJoinedPlayers++;

        AddToTDLogs(`~r~~h~${player.GetPlayerName(24)}(${player.playerid}) ~y~~h~joined the server!`);

        Maps.Custom.PlayerObj_Class_Select.Load(player);
    }
    return true;
});

samp.OnPlayerDisconnect((player, reason) => {
    savePlayer(player);

    HideRankLabelFor(player);
    HideCapturingLabelFor(player);

    Player.ResetVariables(player.playerid);
    checkReportsTD();

    HideConnectTextDraw(player);
    HideSpawnTextDraw(player);

    let reason_string = "";
    switch(reason) {
        case 0: reason_string = "~p~~h~(Timeout)"; break;
        case 1: reason_string = "~r~~h~(Leaving)"; break;
        case 2: reason_string = "~r~~h~(Kick/Ban)"; break;
    }
    AddToTDLogs(`~r~~h~${player.GetPlayerName(24)}(${player.playerid}) ~w~~h~has left the server ${reason_string}!`);
    return true;
});

samp.OnPlayerUpdate((player) => {
    return true;
});

samp.OnDialogResponse((player, dialogid, response, listitem, inputtext) => {
    switch(dialogid) {
        case Dialog.BASE_TELEPORT: {
            if(response) {
                if(!Player.Info[player.playerid].Gang) return SendError(player, Errors.NOT_MEMBER_OF_ANY_GANG);
                let count = 0;
                for(let i = 0; i < Gang.Get().length; i++) {
                    if(Gang.Get()[i].territory.owner == Player.Info[player.playerid].Gang) {
                        if(count == listitem) {
                            player.SetPlayerPos(Gang.Get()[i].base_position[0], Gang.Get()[i].base_position[1], Gang.Get()[i].base_position[2]);
                            player.SetPlayerFacingAngle(Gang.Get()[i].base_position[3]);
                            player.GameTextForPlayer("~g~~h~Teleported to~n~~r~~h~gang base", 3000, 3);
                            break;
                        }
                        else count++;
                    }
                }
            }
            break;
        }
        case Dialog.YOUTUBE_SEARCH: {
            if(response) {
                for(let i = 0; i < Player.Info[player.playerid].YouTubeSearchResults.length; i++) {
                    if(i == listitem) {
                        samp.getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((players) => {
                            players.PlayAudioStreamForPlayer(`http://45.14.236.12:7777/${Player.Info[player.playerid].YouTubeSearchResults[i]}`);
                            players.SendClientMessage(data.colors.YELLOW, `Admin {FF0000}${player.GetPlayerName(24)} {FFFF00}has started an audio stream.`);
                        });
                        break;
                    }
                }
            }
            break;
        }
        case Dialog.GANG: {
            if(response) {
                switch(listitem) {
                    case 0: CMD.emit("ginfo", player, []); break;
                    case 1: CMD.emit("gstats", player, []); break;
                    case 2: CMD.emit("gm", player); break;
                    case 3: CMD.emit("gcmds", player); break;
                    case 4: CMD.emit("gtop", player); break;
                }
            }
            break;
        }
        case Dialog.EVENT: {
            switch(listitem) {
                case 0: { /* Star Event */
                    CMD.emit("starevent", player); 
                    break;
                }
                case 1: { /* Death Math Events */
                    break;
                }
                case 2: { /* Reaction Test */
                    break;
                }
                case 3: { /* Reaction Maths */
                    break;
                }
                case 4: { /* Question */
                    break;
                }
            }
            break;
        }
        case Dialog.TRADE: {
            if(response) {
                let target = getPlayer(inputtext);
                if(!target || target.playerid == player.playerid) return SendError(player, Errors.PLAYER_NOT_CONNECTED);
                if(Player.Info[target.playerid].Atrade != player.playerid) return SendError(player, "That player has no Trade activated on you!");
                let info = "";
                info += "{00FF00}Sell {FF0000}Money\n";
                info += "{00FF00}Sell {FF0000}Hours\n";
                info += "{00FF00}Sell {FF0000}Coins\n";
                info += "{00FF00}Sell {FF0000}Kills & Deaths\n";
                info += "{00FF00}Sell {FF0000}Stunt Points\n";
                info += "{00FF00}Sell {FF0000}Drift Points\n";
                info += "{00FF00}Sell {FF0000}Race Points";
                player.ShowPlayerDialog(Dialog.TRADE_SELL, samp.DIALOG_STYLE.LIST, "Trade", info, "Select", "Cancel");
            }
            break;
        }
        case Dialog.TRADE_SELL: {
            if(response) {
                Player.Info[player.playerid].Trade.Sell.Item = listitem;
                player.ShowPlayerDialog(Dialog.TRADE_VALIDATE_SELL_ITEM, isTradeItemNeedValue(Player.Info[player.playerid].Trade.Sell.Item) ? samp.DIALOG_STYLE.INPUT : samp.DIALOG_STYLE.MSGBOX, `Trade {FF0000}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}`, `{FFFF94}You have selected to sell {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}{FF9900}!${isTradeItemNeedValue(Player.Info[player.playerid].Trade.Sell.Item) ? `\n{FFFF94}Enter the amount of {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}{FFFF94} which you want to sell!` : ""}`, "Next", "Cancel");
            }
            else resetTradeVariables(player);
            break;
        }
        case Dialog.TRADE_VALIDATE_SELL_ITEM: {
            if(response) {
                inputtext = parseInt(inputtext);
                if(getTradeItemAmount(player, Player.Info[player.playerid].Trade.Sell.Item) >= inputtext || !isTradeItemNeedValue(Player.Info[player.playerid].Trade.Sell.Item)) {
                    Player.Info[player.playerid].Trade.Sell.Value = inputtext;
                    let info = "";
                    info += "{00FF00}Buy {FF0000}Money\n";
                    info += "{00FF00}Buy {FF0000}Hours\n";
                    info += "{00FF00}Buy {FF0000}Coins\n";
                    info += "{00FF00}Buy {FF0000}Kills & Deaths\n";
                    info += "{00FF00}Buy {FF0000}Stunt Points\n";
                    info += "{00FF00}Buy {FF0000}Drift Points\n";
                    info += "{00FF00}Buy {FF0000}Race Points";
                    player.ShowPlayerDialog(Dialog.TRADE_BUY, samp.DIALOG_STYLE.LIST, "Trade", info, "Select", "Cancel");
                }
                else player.ShowPlayerDialog(Dialog.TRADE_VALIDATE_SELL_ITEM, isTradeItemNeedValue(Player.Info[player.playerid].Trade.Sell.Item) ? samp.DIALOG_STYLE.INPUT : samp.DIALOG_STYLE.MSGBOX, `Trade {FF0000}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}`, `{FFFF94}You have selected to sell {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}{FF9900}!${isTradeItemNeedValue(Player.Info[player.playerid].Trade.Sell.Item) ? `\n{FFFF94}Enter the amount of {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}{FFFF94} which you want to sell!` : ""}`, "Next", "Cancel");
            }
            else resetTradeVariables(player);
            break;
        }
        case Dialog.TRADE_BUY: {
            if(response) {
                Player.Info[player.playerid].Trade.Buy.Item = listitem;
                player.ShowPlayerDialog(Dialog.TRADE_VALIDATE_BUY_ITEM, isTradeItemNeedValue(Player.Info[player.playerid].Trade.Buy.Item) ? samp.DIALOG_STYLE.INPUT : samp.DIALOG_STYLE.MSGBOX, `Trade {FF0000}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}`, `{FFFF94}You have selected to buy {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}{FF9900}!${isTradeItemNeedValue(Player.Info[player.playerid].Trade.Buy.Item) ? `\n{FFFF94}Enter the amount of {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}{FFFF94} which you want to sell!` : ""}`, "Next", "Cancel");
            }
            else resetTradeVariables(player);
            break;
        }
        case Dialog.TRADE_VALIDATE_BUY_ITEM: {
            if(response) {
                inputtext = parseInt(inputtext);
                let target = samp.getPlayers().filter(f => Player.Info[f.playerid].Atrade == player.playerid)[0];
                if(!target) return SendError(player, Errors.UNEXPECTED);
                inputtext = parseInt(inputtext);
                if(getTradeItemAmount(target, Player.Info[player.playerid].Trade.Buy.Item) >= inputtext || !isTradeItemNeedValue(Player.Info[player.playerid].Trade.Buy.Item)) {
                    Player.Info[player.playerid].Trade.Buy.Value = inputtext;
                    let info = "";
                    info += `{FFFF94}You have completed all the steps before sending a{FF0000} Trade Request{FFFF94} to {FF0000}${target.GetPlayerName(24)} (ID:${target.playerid}){FFFF94}!\n`;
                    info += `{FFFF94}Are you sure ? You want to send a {FF0000}Trade Request{FFFF94} to {FF0000}${target.GetPlayerName(24)} (ID:${target.playerid}){FFFF94} ?`;
                    player.ShowPlayerDialog(Dialog.TRADE_SEND, samp.DIALOG_STYLE.MSGBOX, "Trade {FF0000}completed", info, "Continue", "Close");
                }
                else player.ShowPlayerDialog(Dialog.TRADE_VALIDATE_BUY_ITEM, isTradeItemNeedValue(Player.Info[player.playerid].Trade.Buy.Item) ? samp.DIALOG_STYLE.INPUT : samp.DIALOG_STYLE.MSGBOX, `Trade {FF0000}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}`, `{FFFF94}You have selected to buy {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}{FF9900}!${isTradeItemNeedValue(Player.Info[player.playerid].Trade.Buy.Item) ? `\n{FFFF94}Enter the amount of {11FF00}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}{FFFF94} which you want to sell!` : ""}`, "Next", "Cancel");
            }
            else resetTradeVariables(player);
            break;
        }
        case Dialog.TRADE_SEND: {
            if(response) {
                let target = samp.getPlayers().filter(f => Player.Info[f.playerid].Atrade == player.playerid)[0];
                if(!target) return SendError(player, Errors.UNEXPECTED);
                player.SendClientMessage(data.colors.YELLOW, "Trade request was sent successfully! Please wait while player Accepts or Rejects the Trade Request!");
                Player.Info[target.playerid].TradeRequestFrom = player.playerid;
                let info = "";
                info += `{FFFF00}Hi {11FF00}${target.GetPlayerName(24)}{FFFF00}!\n`;
                info += `{11FF00}${player.GetPlayerName(24)}{FFFF00} wants to sell you {11FF00}${isTradeItemNeedValue(Player.Info[player.playerid].Trade.Sell.Item) ? `${Player.Info[player.playerid].Trade.Sell.Value} ` : ""}${getTradeItemName(Player.Info[player.playerid].Trade.Sell.Item)}{FFFF00} for your {11FF00}${isTradeItemNeedValue(Player.Info[player.playerid].Trade.Buy.Item) ? `${Player.Info[player.playerid].Trade.Buy.Value} ` : ""}${getTradeItemName(Player.Info[player.playerid].Trade.Buy.Item)}{FFFF00}!`;
                target.ShowPlayerDialog(Dialog.TRADE_REQUEST, samp.DIALOG_STYLE.MSGBOX, "Trade {FF0000}Request", info, "Decline", "Accept");
            }
            else resetTradeVariables(player);
            break;
        }
        case Dialog.TRADE_REQUEST: {
            let target = samp.getPlayers().filter(f => f.playerid == Player.Info[player.playerid].TradeRequestFrom)[0];
            if(!target) return SendError(player, Errors.UNEXPECTED);
            if(response) {
                player.SendClientMessage(data.colors.YELLOW, "You have successfully declined the Trade Request!");
                target.SendClientMessage(data.colors.YELLOW, `{11FF00}${player.GetPlayerName(24)}{FFFF00} Declined your Trade Request!`);
                resetTradeVariables(player);
            }
            else {
                /* ========== */
                /* Target Buy */
                /* ========== */
                switch(getTradeItemName(Player.Info[target.playerid].Trade.Buy.Item)) {
                    case "Money": {
                        Player.Info[target.playerid].Money += Player.Info[target.playerid].Trade.Buy.Value;
                        Player.Info[player.playerid].Money -= Player.Info[target.playerid].Trade.Buy.Value;
                        break;
                    }
                    case "Hours": {
                        Player.Info[target.playerid].OnlineTime.Hours += Player.Info[target.playerid].Trade.Buy.Value;
                        Player.Info[player.playerid].OnlineTime.Hours -= Player.Info[target.playerid].Trade.Buy.Value;
                        break;
                    }
                    case "Coins": {
                        Player.Info[target.playerid].Coins += Player.Info[target.playerid].Trade.Buy.Value;
                        Player.Info[player.playerid].Coins -= Player.Info[target.playerid].Trade.Buy.Value;
                        break;
                    }
                    case "Kills & Deaths": {
                        Player.Info[target.playerid].Kills_Data.Kills += Player.Info[player.playerid].Kills_Data.Kills;
                        Player.Info[target.playerid].Kills_Data.Deaths += Player.Info[player.playerid].Kills_Data.Deaths;
                        Player.Info[player.playerid].Kills_Data.Kills = 0;
                        Player.Info[player.playerid].Kills_Data.Deaths = 0;
                        break;
                    }
                    case "Stunt Points": {
                        Player.Info[target.playerid].Driving_Data.StuntPoints += Player.Info[target.playerid].Trade.Buy.Value;
                        Player.Info[player.playerid].Driving_Data.StuntPoints -= Player.Info[target.playerid].Trade.Buy.Value;
                        break;
                    }
                    case "Drift Points": {
                        Player.Info[target.playerid].Driving_Data.DriftPoints += Player.Info[target.playerid].Trade.Buy.Value;
                        Player.Info[player.playerid].Driving_Data.DriftPoints -= Player.Info[target.playerid].Trade.Buy.Value;
                        break;
                    }
                    case "Race Points": {
                        Player.Info[target.playerid].Driving_Data.RacePoints += Player.Info[target.playerid].Trade.Buy.Value;
                        Player.Info[player.playerid].Driving_Data.RacePoints -= Player.Info[target.playerid].Trade.Buy.Value;
                        break;
                    }
                }
                /* =========== */
                /* Target Sell */
                /* =========== */
                switch(getTradeItemName(Player.Info[target.playerid].Trade.Sell.Item)) {
                    case "Money": {
                        Player.Info[player.playerid].Money += Player.Info[target.playerid].Trade.Sell.Value;
                        Player.Info[target.playerid].Money -= Player.Info[target.playerid].Trade.Sell.Value;
                        break;
                    }
                    case "Hours": {
                        Player.Info[player.playerid].OnlineTime.Hours += Player.Info[target.playerid].Trade.Sell.Value;
                        Player.Info[target.playerid].OnlineTime.Hours -= Player.Info[target.playerid].Trade.Sell.Value;
                        break;
                    }
                    case "Coins": {
                        Player.Info[player.playerid].Coins += Player.Info[target.playerid].Trade.Sell.Value;
                        Player.Info[target.playerid].Coins -= Player.Info[target.playerid].Trade.Sell.Value;
                        break;
                    }
                    case "Kills & Deaths": {
                        Player.Info[player.playerid].Kills_Data.Kills += Player.Info[target.playerid].Kills_Data.Kills;
                        Player.Info[player.playerid].Kills_Data.Deaths += Player.Info[target.playerid].Kills_Data.Deaths;
                        Player.Info[target.playerid].Kills_Data.Kills = 0;
                        Player.Info[target.playerid].Kills_Data.Deaths = 0;
                        break;
                    }
                    case "Stunt Points": {
                        Player.Info[player.playerid].Driving_Data.StuntPoints += Player.Info[target.playerid].Trade.Sell.Value;
                        Player.Info[target.playerid].Driving_Data.StuntPoints -= Player.Info[target.playerid].Trade.Sell.Value;
                        break;
                    }
                    case "Drift Points": {
                        Player.Info[player.playerid].Driving_Data.DriftPoints += Player.Info[target.playerid].Trade.Sell.Value;
                        Player.Info[target.playerid].Driving_Data.DriftPoints -= Player.Info[target.playerid].Trade.Sell.Value;
                        break;
                    }
                    case "Race Points": {
                        Player.Info[player.playerid].Driving_Data.RacePoints += Player.Info[target.playerid].Trade.Sell.Value;
                        Player.Info[target.playerid].Driving_Data.RacePoints -= Player.Info[target.playerid].Trade.Sell.Value;
                        break;
                    }
                }
                player.SendClientMessage(data.colors.YELLOW, "You have successfully accepted the Trade Request!");
                target.SendClientMessage(data.colors.YELLOW, `{11FF00}${player.GetPlayerName(24)}{FFFF00} Accepted your Trade Request!`);
                resetTradeVariables(player);
            }
            break;
        }
        case Dialog.PLAYER_CLICK: {
            if(response) {
                switch(listitem) {
                    case 0: CMD.emit("stats", player, Player.Info[player.playerid].ClickedPlayer); break;
                    case 1: CMD.emit("gstats", player, Player.Info[player.playerid].ClickedPlayer); break;
                    case 2: CMD.emit("cinfo", player, Player.Info[player.playerid].ClickedPlayer); break;
                    case 3: CMD.emit("astats", player, Player.Info[player.playerid].ClickedPlayer); break;
                    case 4: CMD.emit("pm", player, Player.Info[player.playerid].ClickedPlayer); break;
                    case 5: CMD.emit("spec", player, Player.Info[player.playerid].ClickedPlayer); break;
                }
            }
            break;
        }
        case Dialog.TOP_MONTH: {
            if(response) {
                switch(listitem) {
                    case 0: {
                        con.query("SELECT name, month_hours FROM users ORDER BY month_hours DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Most active players are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}.: {00BBF6}${result[i].month_hours} {BBFF00}Hours\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Most active players", info, "Ok", "");
                        });
                        break;
                    }
                    case 1: {
                        con.query("SELECT name, month_kills FROM users ORDER BY month_kills DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Killers are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}: {00BBF6}${result[0].month_kills} {BBFF00}Kills\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Killers", info, "Ok", "");
                        });
                        break;
                    }
                    case 2: {
                        con.query("SELECT name, month_stuntpoints FROM users ORDER BY month_stuntpoints DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Stunters are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}: {00BBF6}${result[i].month_stuntpoints} {BBFF00}Stunt Points\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Stunters", info, "Ok", "");
                        });
                        break;
                    }
                    case 3: {
                        con.query("SELECT name, month_driftpoints FROM users ORDER BY month_driftpoints DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Drifters are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}: {00BBF6}${result[i].month_driftpoints} {BBFF00}Drift Points\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Drifters", info, "Ok", "");
                        });
                        break;
                    }
                    case 4: {
                        con.query("SELECT name, month_racepoints FROM users ORDER BY month_racepoints DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Racers are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}: {00BBF6}${result[i].month_racepoints} {BBFF00}Race Points\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Racers", info, "Ok", "");
                        });
                        break;
                    }
                    case 5: {
                        break;
                    }
                    case 6: {
                        player.GameTextForPlayer("~w~~h~you need to ~g~~h~/quit~n~~w~~h~the~r~~h~ server~w~~h~ in order to~n~~y~~h~update tops with your stats!", 4000, 3);
                        break;
                    }
                }
            }
            break;
        }
        case Dialog.TOP: {
            if(response) {
                switch(listitem) {
                    case 0: CMD.emit("gtop", player); break;
                    case 1: {
                        con.query("SELECT name, kills FROM clans ORDER BY kills DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Clans are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}: {00BBF6}${result[i].kills} {BBFF00}Kills\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Clans", info, "Ok", "");
                        });
                        break;
                    }
                    case 2: {
                        con.query("SELECT name, adminpoints FROM users WHERE admin >= 1 ORDER BY adminpoints DESC LIMIT 10", function(err, result) {
                            let info = "{FFFFFF}Our best Admins are here!\n";
                            if(!err && result) {
                                info += "\n";
                                for(let i = 0; i < result.length; i++) {
                                    info += `{FF0000}${i+1}. {BBFF00}${result[i].name}: {00BBF6}${result[i].adminpoints} {BBFF00}Activity Points\n`;
                                }
                            }
                            info += "\n";
                            info += `{FFFFFF}Visit {FF0000}${data.settings.SERVER_WEB} {FFFFFF}for more!`;
                            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "Top 10 Admins", info, "Ok", "");
                        });
                        break;
                    }
                    case 3: {
                        let info = "";
                        info += "{BBFF00}Top Online\n";
                        info += "{BBFF00}Top Killers\n";
                        info += "{BBFF00}Top Stunters\n";
                        info += "{BBFF00}Top Drifters\n";
                        info += "{BBFF00}Top Racers\n";
                        info += "{BBFF00}Top Gang Members\n";
                        info += "{FFEB7B}Your stats will be updated after each {FF0000}disconnect";
                        player.ShowPlayerDialog(Dialog.TOP_MONTH, samp.DIALOG_STYLE.LIST, "Top 10 players in this month", info, "Select", "Close");
                        break;
                    }
                    case 4: {
                        player.GameTextForPlayer("~w~~h~visit ~g~~h~now~n~~w~~h~www.~r~~h~RHS-Server.~w~~h~com/top~n~~y~~h~to more tops and others!", 4000, 3);
                        break;
                    }
                }
            }
            break;
        }
        case Dialog.BUYVIP_AFTER: {
            if(!response) CMD.emit("vcmds", player);
            break;
        }
        case Dialog.LOGIN_SPASSWORD: {
            if(response) {
                con.query("SELECT * FROM users WHERE name = ? AND spassword = ?", [player.GetPlayerName(24), md5(inputtext)], function(err, result) {
                    if(!err) {
                        if(result == 0) {
                            Player.Info[player.playerid].Fail_Logins++;
                            if(Player.Info[player.playerid].Fail_Logins == 4) player.Kick();
                            else {
                                let info = "";
                                info += `{FF0000}${Lang(player, `Autentificare esuata (${Player.Info[player.playerid].Fail_Logins}/4)!`, `Login failed (${Player.Info[player.playerid].Fail_Logins}/4)!`)}\n`;
                                info += "\n";
                                info += `{FFCC00}${Lang(player, "Ai introdus o parola secundara gresita! Te rugam sa incerci din nou!", "You have entered a wrong secondary password! Please try again!")}\n`;
                                info += `{FFFF00}${Lang(player, `Daca ti-ai uitat parola secundara, viziteaza {FF0000}${data.settings.SERVER_WEB} {FFFF00}pentru a o reseta!`, `If you forgot your secondary password, visit {FF0000}${data.settings.SERVER_WEB} {FFFF00}to reset it!`)}`
                                player.ShowPlayerDialog(Dialog.LOGIN_SPASSWORD, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Autentificare - Parola Secundara", "Login - Secondary Password"), info, Lang(player, "Autentificare", "Login"), Lang(player, "Nume Nou", "New Name"));
                            }
                        }
                        else {
                            LoadPlayerStats(player);
                        }
                    }
                    else player.Kick();
                });
            }
            else Call_NewName(player);
            break;
        }
        case Dialog.SPASSWORD: {
            if(response) {
                con.query("UPDATE users SET spassword = ? WHERE ID = ?", [md5(inputtext), Player.Info[player.playerid].AccID], function(err, result) {
                    if(!err) {
                        player.SendClientMessage(-1, Lang(player, "{FF0000}Parola Secundara {FFFF00}a fost inregistrata! Scrie {FF0000}/SPassword {FFFF00}pentru detalii si optiuni!", "{FFFF00}The {FF0000}Secondary Password {FFFF00}was registered! Type {FF0000}/SPassword {FFFF00}for details and options!"));
                    }
                });
            }
            break;
        }
        case Dialog.SPASSWORD_OPTIONS: {
            if(response) {
                switch(listitem) {
                    case 0: {
                        player.ShowPlayerDialog(Dialog.SPASSWORD, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Parola Secundara", "Secondary Password"), Lang(player, "{FFFF00}Te rugam sa introduci {FF0000}Parola Secundara{FFFF00}:", "{FFFF00}Please enter below the {FF0000}Secondary Password{FFFF00}:"), "Ok", Lang(player, "Renunta", "Cancel"));
                        break;
                    }
                    case 1: {
                        try {
                            con.query("UPDATE users SET spassword = ? WHERE ID = ?", ["null", Player.Info[player.playerid].AccID], function(err, result) {
                                if(!err) {
                                    player.SendClientMessage(-1, Lang(player, "{FF0000}Parola Secundara {FFFF00}a fost scoasa! Scrie {FF0000}/SPassword {FFFF00}pentru a adauga alta!", "{FFFF00}The {FF0000}Secondary Password {FFFF00}was removed! Type {FF0000}/SPassword {FFFF00}to add another!"));
                                }
                            });
                        }
                        catch(e) {
                            console.log(e.stack);
                        }
                        break;
                    }
                }
            }
            break;
        }
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
                Player.Info[player.playerid].Creating_Clan.weapons[0] = start + listitem;
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
                Player.Info[player.playerid].Creating_Clan.weapons[1] = start + listitem;
            }

            let info = "";
            info += "{0072FF}ShotGun\n";
            info += "{0072FF}Sawn-Off-Shotgune\n";
            info += "{0072FF}SPAZ-12";
            player.ShowPlayerDialog(Dialog.CREATE_CLAN_WEAPON_3, samp.DIALOG_STYLE.LIST, "{00FF00}Create Clan", info, "Continue", "Skip");
            break;
        }
        case Dialog.CREATE_CLAN_WEAPON_3: {
            if(response) {
                let start = 25;
                Player.Info[player.playerid].Creating_Clan.weapons[2] = start + listitem;
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
                    case 0: Player.Info[player.playerid].Creating_Clan.weapons[3] = 28; break;
                    case 1: Player.Info[player.playerid].Creating_Clan.weapons[3] = 29; break;
                    case 2: Player.Info[player.playerid].Creating_Clan.weapons[3] = 32; break;
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
                Player.Info[player.playerid].Creating_Clan.weapons[4] = start + listitem; 
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
                Player.Info[player.playerid].Creating_Clan.weapons[5] = start + listitem; 
            }

            /* Send Informations in Dialog */
            let info = "";
            info += `{0072FF}Congratulations {00FF00}${player.GetPlayerName(24)}{0072FF} for creating {00FF00}${Player.Info[player.playerid].Creating_Clan.name}{0072FF} clan!\n`;
            info += "If you need help with your clan, type {00FF00}/chelp{0072FF} and {00FF00}/ctop{0072FF} for clan top!";
            player.ShowPlayerDialog(Dialog.EMPTY, samp.DIALOG_STYLE.MSGBOX, "{00FF00}Clan Created!", info, "Close", "");

            /* Create row in SQL */
            con.query("INSERT INTO clans (name, owner, position, weapon, color, member_skin, leader_skin) VALUES(?, ?, ?, ?, ?, ?, ?)", [Player.Info[player.playerid].Creating_Clan.name, Player.Info[player.playerid].AccID, JSON.stringify([0, 0, 0, 0]), JSON.stringify(Object.values(Player.Info[player.playerid].Creating_Clan.weapons)), `${Player.Info[player.playerid].Creating_Clan.color}`, Player.Info[player.playerid].Creating_Clan.skin.member, Player.Info[player.playerid].Creating_Clan.skin.leader], function(err, result) {
                if(!err) {
                    Clan.Create(result.insertId, Player.Info[player.playerid].Creating_Clan.name, Player.Info[player.playerid].AccID, [0, 0, 0, 0], [Player.Info[player.playerid].Creating_Clan.weapons[0], Player.Info[player.playerid].Creating_Clan.weapons[1], Player.Info[player.playerid].Creating_Clan.weapons[2], Player.Info[player.playerid].Creating_Clan.weapons[3], Player.Info[player.playerid].Creating_Clan.weapons[4], Player.Info[player.playerid].Creating_Clan.weapons[5]], Player.Info[player.playerid].Creating_Clan.color, {member: Player.Info[player.playerid].Creating_Clan.skin.member, leader: Player.Info[player.playerid].Creating_Clan.skin.leader}, 0, 0);
                    Player.Info[player.playerid].Clan = result.insertId;
                    Player.Info[player.playerid].Clan_Rank = 3;
                    UpdatePlayerDB(player, "clan", Player.Info[player.playerid].Clan);
                    UpdatePlayerDB(player, "clan_rank", Player.Info[player.playerid].Clan_Rank);
                    player.SetPlayerColor(Player.Info[player.playerid].Creating_Clan.color);
                    player.SetPlayerSkin(Player.Info[player.playerid].Creating_Clan.skin.leader);
                    for(let i = 0; i < 6; i++) {
                        player.GivePlayerWeapon(Clan.Info[Player.Info[player.playerid].Clan].weapons[i], 9999);
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
                        CMD.emit("stunts", player);
                        break;
                    }
                    case 1: { /* Jumps */
                        CMD.emit("jumps", player);
                        break;
                    }
                    case 2: { /* Death Matchs */
                        CMD.emit("dm", player);
                        break;
                    }
                    case 3: { /* Interiors */
                        CMD.emit("int", player);
                        break;
                    }
                    case 4: { /* Drifts */
                        CMD.emit("drifts", player);
                        break;
                    }
                    case 5: { /* Races */
                        CMD.emit("races", player);
                        break;
                    }
                    case 6: { /* Jobs */
                        CMD.emit("jobs", player);
                        break;
                    }
                    case 7: { /* Minigames */
                        CMD.emit("minigames", player);
                        break;
                    }
                    case 8: { /* Challenges */
                        CMD.emit("challanges", player);
                        break;
                    }
                    case 9: { /* Parkours */
                        CMD.emit("parkours", player);
                        break;
                    }
                    case 10: { /* Partys */
                        CMD.emit("partys", player);
                        break;
                    }
                    case 11: { /* Special Places */
                        CMD.emit("splaces", player);
                        break;
                    }
                    case 12: { /* Others */
                        CMD.emit("others", player);
                        break;
                    }
                    case 13: { /* Simple Stunts */
                        CMD.emit("sstunts", player);
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
                let result = Teleport.Get().filter(f => f.type == "others");
                for(let i = 0; i < result.length; i++) {
                    if(i == listitem) {
                        TelePlayer(player, result[i].command, result[i].name, result[i].position[0], result[i].position[1], result[i].position[2], result[i].position[3]);  
                        break;
                    }
                }
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
            else CMD.emit("stats", player, []);
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
                        if(Player.Info[player.playerid].VIP >= 1) return SendError(player, "You can't buy this VIP rank because you have already this rank or bigger!");
                        Player.Info[player.playerid].VIP = 1;
                        UpdateRankLabelFor(player);
                        samp.SendClientMessageToAll(data.colors.LIGHT_YELLOW, `INFO:{00BBF6} ${player.GetPlayerName(24)}(${player.playerid}){BBFF00} a cumparat{FF0000} VIP Rosu{BBFF00} Gratis, Pentru a cumpara VIP, scrie /BuyVIP!`);
                        let info = "";
                        info += "{00FF00}Ai cumparat cu succes {FF0000}VIP Red{00FF00} Gratis!\n";
                        info += "{00FF00}Scrie {00BBF6}/vCmds {00FF00}pentru a vedea {FF0000}Comenzile de VIP{00FF00}!";
                        player.ShowPlayerDialog(Dialog.BUYVIP_AFTER, samp.DIALOG_STYLE.MSGBOX, Lang(player, "VIP {FF0000}Cumparat{AFAFAF}!", ""), info, "Ok", "VCmds");
                        break;
                    }
                    case 1: {
                        if(Player.Info[player.playerid].VIP >= 2) return SendError(player, "You can't buy this VIP rank because you have already this rank or bigger!");
                        if(Player.Info[player.playerid].Coins >= 20000) {

                        }
                        else SendError(player, "Nu ai destui Coins/Ore pentru a cumpara acest rank de VIP!", "You don't have enough Coins/Hours to buy that VIP rank!");
                        break;
                    }
                    case 2: {
                        if(Player.Info[player.playerid].VIP >= 3) return SendError(player, "You can't buy this VIP rank because you have already this rank or bigger!");
                        if(Player.Info[player.playerid].Coins >= 80000) {

                        }
                        else SendError(player, "Nu ai destui Coins/Ore pentru a cumpara acest rank de VIP!", "You don't have enough Coins/Hours to buy that VIP rank!");
                        break;
                    }
                    case 3: {
                        if(Player.Info[player.playerid].VIP >= 4) return SendError(player, "You can't buy this VIP rank because you have already this rank or bigger!");
                        if(Player.Info[player.playerid].Coins >= 150000) {

                        }
                        else SendError(player, "Nu ai destui Coins/Ore pentru a cumpara acest rank de VIP!", "You don't have enough Coins/Hours to buy that VIP rank!");
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
                    player.SendClientMessage(data.colors.YELLOW, Lang(player, `Ti-ai adaugat cu succes E-Mail-ul {FF0000}${inputtext} {FFFF00}in Cont!`, `You have successfully added the {FF0000}${inputtext} {FFFF00}E-Mail in your Account!`));
                    Player.Info[player.playerid].Mail = inputtext;
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
            if(response) ShowCMDS(player, 1);
            else ShowCMDS(player, 3);
            break;
        }
        case Dialog.CMDS_3: {
            if(!response) ShowCMDS(player, 2);
            break;
        }
        case Dialog.NEW_NAME: {
            if(response) {
                if(inputtext.length < 3 || inputtext.length > 20) return Call_NewName(player);
                player.SetPlayerName(inputtext);
                PreparatePlayerLogin(player);
            }
            else {
                let tag = Function.getRandomInt(1, 99999);
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
                            if(Player.Info[player.playerid].Fail_Logins == 4) player.Kick();
                            else {
                                let info = "";
                                info += `{FF0000}${Lang(player, `Autentificare nereusita (${Player.Info[player.playerid].Fail_Logins}/4)!`, `Login failed (${Player.Info[player.playerid].Fail_Logins}/4)!`)}\n`;
                                info += "\n";
                                info += `{FFFF00}${Lang(player, "Ai introdus parola gresita. Te rugam sa incerci din nou!", "You entered the wrong password. Please try again!")}\n`;
                                info += `{00FF00}${Lang(player, `Daca ti-ai uitat parola intra pe {FF0000}${data.settings.SERVER_WEB}{00FF00} pentru a o reseta!`, `If you forgot your password enter the {FF0000}${data.settings.SERVER_WEB} {00FF00}to reset it!`)}`
                                player.ShowPlayerDialog(Dialog.LOGIN, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Autentificare {FF0000}Nereusita", "Login {FF0000}Failed"), info, Lang(player, "Autentificare", "Login"), Lang(player, "Nume Nou", "New Name"));
                            }
                        }   
                        else {
                            Player.Info[player.playerid].Fail_Logins = 0;
                            if(result[0].spassword == "null") LoadPlayerStats(player);
                            else {
                                let info = "";
                                info += `${Lang(player, "{FF0000}Acest cont are o parola secundara!", "{FF0000}This account has a secondary password!")}\n`;
                                info += `${Lang(player, "{FFCC00}Autentifica-te cu parola secundara pentru a putea continua!", "{FFCC00}Please login with the secondary password in order to continue!")}\n`;
                                info += "\n";
                                info += `${Lang(player, "{FFFF00}Scrie mai jos {FF0000}Parola Secundara{FFFF00}:", "{FFFF00}Enter below the {FF0000}Secondary Password{FFFF00}:")}`;
                                player.ShowPlayerDialog(Dialog.LOGIN_SPASSWORD, samp.DIALOG_STYLE.PASSWORD, Lang(player, "Autentificare - Parola Secundara", "Login - Secondary Password"), info, Lang(player, "Autentificare", "Login"), Lang(player, "Nume Nou", "New Name"));
                            }
                        }
                    }
                    else player.Kick();
                });
            }
            else Call_NewName(player);
            break;
        }
        case Dialog.AFTER_REGISTER: {
            if(!response) CMD.emit("help", player);
            break;
        }
        case Dialog.REGISTER: {
            if(response) {
                con.query("INSERT INTO users (name, password) VALUES(?, ?)", [player.GetPlayerName(24), md5(inputtext)], function(err, result) {
                    if(!err) {
                        Player.Info[player.playerid].AccID = result.insertId;
                        LoadPlayerStats(player);
                        Server.Info.NewRegistredPlayers++;
                        samp.SendClientMessageToAll(data.colors.ORANGE, `INFO: {00BBF6}${player.GetPlayerName(24)}(${player.playerid}){BBFF00} ${Lang(player, `s-a inregistrat pe server-ul nostru!`, `has registered on our server!`)}`);
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
    if(Player.Info[player.playerid].AFK) return player.GameTextForPlayer("~w~~h~Type ~r~~h~/back~n~~w~~h~to use the~n~~r~~h~Chat~w~~h~!", 4000, 4);

    if(!checkAntiSpam(player)) return false;

    Player.Info[player.playerid].Last_Chat_Message = Math.floor(Date.now() / 1000);
    Server.Info.Messages++;
    
    if(!CheckCustomChat(player, text)) return false;

    samp.SendClientMessageToAll(player.GetPlayerColor(), `${player.GetPlayerName(24)}${getPlayerRankInChat(player)}{00CCFF}(${player.playerid}):{FFFFFF} ${text}`);

    if(text.toLowerCase().startsWith(data.settings.BUSTER_PREFIX.toLowerCase())) {
        samp.SendClientMessageToAll(data.colors.RED, `${data.settings.BUSTER_PREFIX}: ${data.settings.BUSTER_RESPONSES[Function.getRandomInt(0, data.settings.BUSTER_RESPONSES.length)]}`);
    }
    return false;
});

samp.OnPlayerCommandText((player, cmdtext) => {
    if(Player.Info[player.playerid].LoggedIn) {
        cmdtext = cmdtext.replace("/", "");
        let params = cmdtext.split(/[ ]+/);
        cmdtext = params[0].toLowerCase();
        params.shift();
        if(isPlayerInSpecialZone(player) && cmdtext != "leave") return player.GameTextForPlayer("~w~~h~Use ~r~~h~/Leave ~w~~h~to ~r~~h~Leave~w~~h~!", 4000, 4);
        if(Player.Info[player.playerid].AFK && cmdtext != "back") return player.GameTextForPlayer("~w~~h~Type ~r~~h~/back~n~~w~~h~to use~n~~r~~h~Commands~w~~h~!", 3000, 4);
        if(CMD.eventNames().some(s => s == cmdtext)) {
            CMD.emit(cmdtext, player, params);
        }
        else if(Teleport.Exists(cmdtext)) {
            TelePlayer(player, cmdtext, Teleport.Info[cmdtext].name, Teleport.Info[cmdtext].position[0], Teleport.Info[cmdtext].position[1], Teleport.Info[cmdtext].position[2], Teleport.Info[cmdtext].position[3]);
        }
        else player.SendClientMessage(data.colors.RED, Lang(player, `Comanda {BBFF00}/${cmdtext}{FF0000} nu exista! Foloseste {BBFF00}/help{FF0000} sau {BBFF00}/cmds{FF0000}!`, `Command {BBFF00}/${cmdtext}{FF0000} don't exist! Use {BBFF00}/help{FF0000} or {BBFF00}/cmds{FF0000}!`));
    }
    return true;
});  

samp.OnPlayerSpawn((player) => {
    if(!Player.Info[player.playerid].LoggedIn) return player.Kick();
    HideConnectTextDraw(player);
    ShowSpawnTextDraw(player);
    player.SetPlayerVirtualWorld(0);
    if(Player.Info[player.playerid].Mail == "none" && Player.Info[player.playerid].Need_Mail_Showed == false) {
        player.ShowPlayerDialog(Dialog.ADD_MAIL, samp.DIALOG_STYLE.INPUT, "E-Mail", Lang(player, "{FFFF00}Se pare ca nu ai un {FF0000}E-Mail {FFFF00}in cont!\n{FFCC00}In cazul in care iti vei uita parola, nu o vei putea recupera!\n\n{FF0000}Daca doresti sa iti adaugi un E-Mail in cont, te rugam sa il introduci mai jos:", "{FFFF00}It looks like you don't have any {FF0000}E-Mail {FF0000}in your account!\n{FFCC00}If you will forgot your password, you will be not able to recover it!\n\n{FF0000}If you want to add an E-Mail in your account, please type it before:"), Lang(player, "Adauga", "Add"), Lang(player, "Mai tarziu", "Later"));
        Player.Info[player.playerid].Need_Mail_Showed = true;
    }
    SetupPlayerForSpawn(player);
    ShowGangZonesForPlayer(player);
    ShowRankLabelFor(player);
    return true;
});

/* Small part of Discord BOT */
Discord.bot.on("showCommands", (message) => {
    hastebin("/" + replaceAll(CMD.eventNames().toString(), ",", "\n/"), "txt").then((result) => {
        message.channel.send(result);
    });
});