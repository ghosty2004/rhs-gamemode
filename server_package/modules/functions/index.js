const { User } = require("discord.js");
const { getPlayers, SampPlayer, GetVehicleRotationQuat, GetVehiclePos, SendClientMessageToAll } = require("../../samp-node-lib");

const Clan = require("../clan");
const Gang = require("../gang");
const colors = require("../../data/colors");
const con = require("../mysql");
const Player = require("../player");

module.exports = { 
    /**
     * @param {Number} ms 
     */
    Sleep(ms) {
        return new Promise((resolve) => { setTimeout(resolve, ms); });
    },
    /**
     * @param {SampPlayer} player 
     * @param {String} roString 
     * @param {String} enString 
     * @returns {String}
     */
    Lang(player, roString, enString) {
        return Player.Info[player.playerid].Language == 1 ? roString : enString;
    },
    /**
     * @param {SampPlayer} player 
     */
    kickPlayer(player) {
        setTimeout(() => {
            try { player.Kick(); }
            catch {}
        }, 200);
    },
    /**
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    },
    /**
     * @param {Number|String} IDOrName 
     * @returns {SampPlayer}
     */
    getPlayer(IDOrName) {
        let result; 
        if(!isNaN(IDOrName)) result = getPlayers().filter(f => f.playerid == parseInt(IDOrName))[0];
        else result = getPlayers().filter(f => f.GetPlayerName(24).toLowerCase().includes(`${IDOrName}`.toLowerCase()))[0];
        if(result) return result;
        else return 0;
    },
    /**
     * @param {Number} d 
     * @returns {String}
     */
    timestampToHMS(d) {
        let time = Math.floor(Date.now() / 1000) - d;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60) % 60;
        let seconds = Math.floor(time % 60);
        return {hours: ('0' + hours).slice(-2), minutes: ('0' + minutes).slice(-2), seconds: ('0' + seconds).slice(-2)};
    }, 
    /**
     * @returns {String}
     */
    getBeatifulDate() { 
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${("0" + d.getDate()).slice(-2)} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
    },
    /**
     * @param {Number} number 
     * @returns {String}
     */
    decimalToHexString(number) {
        if(number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }
        let hex = "";
        for(let i = 0; i < 6; i++) {
            hex += `${number.toString(16)[i]}`;
        }
        return hex;
    },
    /**
     * @param {Number} time 
     * @returns {String}
     */
    secondsToMinutesAndSeconds(time) {
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;
        return `${mins}:${secs}`;
    },
    /**
     * @param {Number} number 
     * @returns {String}
     */
    numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    /**
     * @returns {String}
     */
    getDateForLastOn() {
        const d = new Date();
        return `${("0" + d.getDate()).slice(-2)}:${d.getMonth()+1}:${d.getFullYear()}`;
    },
    /**
     * @param {Number|String} value 
     * @returns 
     */
    isNumber(value) {
        if(typeof(value) == "number" || !isNaN(value)) return true;
        else return false;
    },
    /**
     * @param {Number} AccID 
     */
    getNameByAccID(AccID) {
        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM users WHERE ID = ?", [AccID], function(err, result) {
                if(err || !result) return resolve("none");
                resolve(result[0].name);
            });
        });
    },
    /**
     * @returns {Number}
     */
    getTotalUsersCount() {
        return new Promise((resolve, reject) => {
            con.query("SELECT COUNT(*) AS count FROM users", function(err, result) { 
                if(err || result == 0) return resolve(0);
                resolve(result[0].count); 
            });
        }); 
    },
    /**
     * @param {Number} GangID 
     * @returns {String}
     */
    getGangFounders(GangID) {
        return new Promise((resolve, reject) => {
            con.query("SELECT name FROM users WHERE gang = ? AND gang_rank = ?", [GangID, 5], function(err, result) {
                if(err || result == 0) resolve("None");
                else {
                    let names = [];
                    for(let i = 0; i < result.length; i++) names.push(result[i].name);
                    resolve(`${names.toString().replace(new RegExp(",", 'g'), ", ")}`);
                }
            });
        });
    },
    /**
     * @param {Number} degrees 
     * @returns {Number}
     */
    degToRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    /**
     * @param {Number} rad 
     * @returns {Number}
     */
    radToDeg(rad) {
        return rad / (Math.PI / 180);
    },
    /**
     * @param {Number} vehicleId 
     * @returns {{x: Number, y: Number, z: Number}}
     */
    getVehicleRotation(vehicleId) {
        let rotationQuat = GetVehicleRotationQuat(vehicleId);
        let rotation = {
            x: Math.asin(2*rotationQuat[2]*rotationQuat[3]-2*rotationQuat[1]*rotationQuat[0]),
            y: -Math.atan2(rotationQuat[1]*rotationQuat[3]+rotationQuat[2]*rotationQuat[0],0.5-rotationQuat[1]*rotationQuat[1]-rotationQuat[2]*rotationQuat[2]),
            z: -Math.atan2(rotationQuat[1]*rotationQuat[2]+rotationQuat[3]*rotationQuat[0],0.5-rotationQuat[1]*rotationQuat[1]-rotationQuat[3]*rotationQuat[3])
        }
        return rotation;
    },
    discordUserData: {
        /**
         * @param {User} user 
         */
        loginSessionId(user) {
            return new Promise((resolve, reject) => {
                con.query("SELECT ID FROM users WHERE discord = ?", [user.id], function(err, result) {
                    if(err || result == 0) resolve(0);
                    else resolve(result[0].ID);
                });
            });
        },
        /**
         * @param {User} user 
         * @param {String} column
         */
        columnValue(user, column) {
            return new Promise((resolve, reject) => {
                con.query(`SELECT ${column} as value FROM users WHERE discord = ?`, [user.id], function(err, result) {
                    if(err || result == 0) resolve(0);
                    else resolve(result[0].value);
                });
            });
        }
    },
    /**
     * @param {Number} days 
     * @returns {Number}
     */
    getTimestamp(days=0) {
        return days == 0 ? Math.round(new Date() / 1000) : Math.round(new Date() / 1000) + (days * 86400);
    },
    /**
     * @param {{name: String, accId: Number}} adminData
     * @param {SampPlayer} target 
     * @param {Number} days 
     * @param {String} reason
     */
    banTargetByAdmin: async function(adminData, target, days, reason) {
        SendClientMessageToAll(colors.LIGHT_BLUE, "================(Ban Details)================");
        SendClientMessageToAll(colors.RED, `${target.GetPlayerName(24)} {CEC8C8}has been banned by Admin {00BBF6}${adminData.name} {CEC8C8}for {FF0000}${days} {CEC8C8}day(s)!`);
        SendClientMessageToAll(colors.GRAY, `Reason: {00BBF6}${reason}`);
        SendClientMessageToAll(colors.LIGHT_BLUE, "==========================================");
    
        for(let i = 0; i < 30; i++) target.SendClientMessage(-1, "");
        target.SendClientMessage(colors.LIGHT_BLUE, `============(${this.Lang(target, "Detalii Ban", "Ban Details")})============`);
        target.SendClientMessage(colors.GRAY, `${this.Lang(target, `Ai primit interdictie de la Admin {00BBF6}${adminData.name} {CEC8C8}pentru {FF0000}${days} {CEC8C8}zile!`, `You have been banned by Admin {00BBF6}${adminData.name} {CEC8C8}for {FF0000}${days} {CEC8C8}days!`)}`);
        target.SendClientMessage(colors.GRAY, `${this.Lang(target, "Motiv", "Reason")}: {00BBF6}${reason}`);
        target.SendClientMessage(colors.LIGHT_BLUE, "=======================================");
    
        const status = await new Promise((resolve, reject) => {
            con.query("SELECT * FROM bans WHERE acc_id = ?", [Player.Info[target.playerid].AccID], function(err, result) {
                resolve({err: err, result: result});
            });
        });
        
        if(!status.err && status.result == 0) con.query("INSERT INTO bans (acc_id, ip, admin_acc_id, from_timestamp, to_timestamp, reason) VALUES(?, ?, ?, ?, ?, ?)", [Player.Info[target.playerid].AccID, target.GetPlayerIp(16), adminData.accId, this.getTimestamp(), this.getTimestamp(days), reason]);
        else con.query("UPDATE bans SET ip = ?, admin_acc_id = ?, from_timestamp = ?, to_timestamp = ?, reason = ?", [player.GetPlayerIp(16), adminData.accId, this.getTimestamp(), this.getTimestamp(days), reason]);

        this.kickPlayer(target);
    },
    /**
     * @param {{name: String, accId: Number}} adminData 
     * @param {SampPlayer} target 
     * @param {String} reason 
     */
    kickTargetByAdmin(adminData, target, reason) {
        Player.Info[target.playerid].Kicks++;
        if(Player.Info[target.playerid].Kicks < 3) {
            SendClientMessageToAll(colors.RED, `${target.GetPlayerName(24)} {D1D1D1}has been kicked by Admin {00A6FF}${adminData.name}{D1D1D1}!`);
            SendClientMessageToAll(0x00A6FFAA, `Reason: {D1D1D1}${reason} {FF0000}(Kicks: ${Player.Info[target.playerid].Kicks}/3)`);
            this.kickPlayer(target);
        }
        else {
            Player.Info[target.playerid].Kicks = 0;
            this.banTargetByAdmin(adminData, target, 1, "3/3 Kicks");
        }
    },
    /**
     * @param {Number} clanId
     */
    saveClan(clanId) {
        if(!Clan.Exists(clanId)) return;
        con.query("UPDATE clans SET name = ?, owner = ?, position = ?, weapon = ?, color = ?, member_skin = ?, leader_skin = ?, kills = ?, deaths = ? WHERE ID = ?", [
            Clan.Info[clanId].name, Clan.Info[clanId].owner, JSON.stringify(Clan.Info[clanId].position), JSON.stringify(Clan.Info[clanId].weapons), Clan.Info[clanId].color,
            Clan.Info[clanId].skin.member, Clan.Info[clanId].skin.leader, Clan.Info[clanId].kills, Clan.Info[clanId].deaths, clanId
        ]);
    },
    saveGang(gang) {
        con.query("UPDATE gangs SET name = ?, position = ?, weapon = ?, color = ?, alliance = ?, points = ?, captures = ?, kills = ?, deaths = ?, territory_position = ? WHERE ID = ?", [
            gang.name, JSON.stringify(gang.position), JSON.stringify(gang.weapons), gang.color, gang.alliance, gang.points, gang.captures, 
            gang.kills, gang.deaths, JSON.stringify([gang.territory.MinX, gang.territory.MinY, gang.territory.MaxX, gang.territory.MaxY]), gang.id
        ]);
    },
    /**
     * @param {SampPlayer} player 
     */
    savePlayer(player) {
        if(!Player.Info[player.playerid].LoggedIn) return;
        let OnlineTime = this.totalGameTime(player, "default");
        let OnlineTimeGang = this.totalGameTime(player, "gang");
        let OnlineTimeMonth = this.totalGameTime(player, "month");

        con.query("UPDATE users SET mail = ?, money = ?, coins = ?, respect_positive = ?, respect_negative = ?, hours = ?, minutes = ?, seconds = ?, admin = ?, admin_points = ?, admin_kicks = ?, admin_warns = ?,\
        admin_bans = ?, admin_reactiontests = ?, admin_mathtests = ?, admin_jails = ?, admin_mutes = ?, admin_clearchats = ?, admin_since = ?, VIP = ?, VIP_Expire = ?, clan = ?, clan_rank = ?, gang = ?, gang_rank = ?,\
        gang_kills = ?, gang_deaths = ?, gang_captures = ?, gang_points = ?, gang_warns = ?, gang_hours = ?, gang_minutes = ?, gang_seconds = ?, gang_membersince = ?, kills = ?, headshots = ?, killingspree = ?,\
        bestkillingspree = ?, deaths = ?, driftpoints = ?, stuntpoints = ?, racepoints = ?, adminpoints = ?, month_hours = ?, month_minutes = ?, month_seconds = ?, month_kills = ?, month_headshots = ?, month_killingspree = ?,\
        month_bestkillingspree = ?, month_deaths = ?, month_driftpoints = ?, month_stuntpoints = ?, month_racepoints = ?, description1 = ?, description2 = ?, description3 = ?, laston = ?, jailed = ?, caged = ?, kicks = ?,\
        discord = ?, hold_settings = ? WHERE ID = ?", [
            Player.Info[player.playerid].Mail, Player.Info[player.playerid].Money, Player.Info[player.playerid].Coins, Player.Info[player.playerid].Respect.Positive, Player.Info[player.playerid].Respect.Negative, 
            OnlineTime.hours, OnlineTime.minutes, OnlineTime.seconds, Player.Info[player.playerid].Admin, Player.Info[player.playerid].AdminActivity.Points, Player.Info[player.playerid].AdminActivity.Kicks,
            Player.Info[player.playerid].AdminActivity.Warns, Player.Info[player.playerid].AdminActivity.Bans, Player.Info[player.playerid].AdminActivity.ReactionTests, Player.Info[player.playerid].AdminActivity.MathTests,
            Player.Info[player.playerid].AdminActivity.Jails, Player.Info[player.playerid].AdminActivity.Mutes, Player.Info[player.playerid].AdminActivity.ClearChats, Player.Info[player.playerid].AdminActivity.Since,  
            Player.Info[player.playerid].VIP, Player.Info[player.playerid].VIP_Expire, Player.Info[player.playerid].Clan, Player.Info[player.playerid].Clan_Rank, Player.Info[player.playerid].Gang, Player.Info[player.playerid].Gang_Data.Rank, 
            Player.Info[player.playerid].Gang_Data.Kills, Player.Info[player.playerid].Gang_Data.Deaths, Player.Info[player.playerid].Gang_Data.Captures, Player.Info[player.playerid].Gang_Data.Points, Player.Info[player.playerid].Gang_Data.Warns, 
            OnlineTimeGang.hours, OnlineTimeGang.minutes, OnlineTimeGang.seconds, Player.Info[player.playerid].Gang_Data.MemberSince, Player.Info[player.playerid].Kills_Data.Kills, Player.Info[player.playerid].Kills_Data.HeadShots, 
            Player.Info[player.playerid].Kills_Data.KillingSpree, Player.Info[player.playerid].Kills_Data.BestKillingSpree, Player.Info[player.playerid].Kills_Data.Deaths, Player.Info[player.playerid].Driving_Data.DriftPoints, 
            Player.Info[player.playerid].Driving_Data.StuntPoints, Player.Info[player.playerid].Driving_Data.RacePoints, Player.Info[player.playerid].AdminPoints, OnlineTimeMonth.hours, OnlineTimeMonth.minutes, OnlineTimeMonth.seconds,
            Player.Info[player.playerid].Month.Kills_Data.Kills, Player.Info[player.playerid].Month.Kills_Data.HeadShots, Player.Info[player.playerid].Month.Kills_Data.KillingSpree, Player.Info[player.playerid].Month.Kills_Data.BestKillingSpree, 
            Player.Info[player.playerid].Month.Kills_Data.Deaths, Player.Info[player.playerid].Month.Driving_Data.DriftPoints, Player.Info[player.playerid].Month.Driving_Data.StuntPoints, Player.Info[player.playerid].Month.Driving_Data.RacePoints, 
            Player.Info[player.playerid].Description[1], Player.Info[player.playerid].Description[2], Player.Info[player.playerid].Description[3], this.getDateForLastOn(), Player.Info[player.playerid].Jailed, Player.Info[player.playerid].Caged, 
            Player.Info[player.playerid].Kicks, Player.Info[player.playerid].Discord, Player.Info[player.playerid].HoldsData.Settings, Player.Info[player.playerid].AccID
        ]);
    },
    /**
     * @param {SampPlayer} player
     * @param {"default"|"gang"|"month"} type
     * @returns {{hours: Number, minutes: Number, seconds: Number}}
     */
    totalGameTime(player, type) {
        let total_time;
        switch(type) {
            case "default": {
                total_time = ((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].ConnectTime) + (Player.Info[player.playerid].OnlineTime.Hours*60*60) + (Player.Info[player.playerid].OnlineTime.Minutes*60) + (Player.Info[player.playerid].OnlineTime.Seconds));
                break;
            }
            case "gang": {
                total_time = ((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].Gang_Data.ConnectTime) + (Player.Info[player.playerid].Gang_Data.OnlineTime.Hours*60*60) + (Player.Info[player.playerid].Gang_Data.OnlineTime.Minutes*60) + (Player.Info[player.playerid].Gang_Data.OnlineTime.Seconds));
                break;
            }
            case "month": {
                total_time = ((Math.floor(Date.now() / 1000) - Player.Info[player.playerid].ConnectTime) + (Player.Info[player.playerid].Month.OnlineTime.Hours*60*60) + (Player.Info[player.playerid].Month.OnlineTime.Minutes*60) + (Player.Info[player.playerid].Month.OnlineTime.Seconds));
                break;
            }
        }
        let hours = Math.floor(total_time / 3600);
        let minutes = Math.floor(total_time / 60) % 60;
        let seconds = Math.floor(total_time % 60);
        return {hours: hours, minutes: minutes, seconds: seconds};
    },
    /**
     * @param {SampPlayer} admin 
     * @param {Boolean} discord
     */
    saveAll(admin, discod = false) {
        getPlayers().filter(f => Player.Info[f.playerid].LoggedIn).forEach((i) => {
            this.savePlayer(i);
            i.SendClientMessage(colors.YELLOW, `Admin {FF0000}${discod ? admin : admin.GetPlayerName(24)} {FFFF00}has saved your {FF0000}account{FFFF00}!`);
        });
        Clan.Get().forEach((i) => { this.saveClan(i.id); });
        Gang.Info.forEach((i) => { this.saveGang(i); });
    },
    /**
     * @param {Number} rank 
     * @returns {String}
     */
    getRconRank(rank) {
        let string = "None";
        switch(rank) {
            case 1: string = "RCON"; break;
            case 2: string = "Caretaker"; break;
            case 3: string = "Founder"; break;
        }
        return string;
    }
}