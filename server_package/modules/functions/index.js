const { User } = require("discord.js");
const { getPlayers, SampPlayer, GetVehicleRotationQuat, GetVehiclePos, SendClientMessageToAll } = require("samp-node-lib");

const colors = require("../../data/colors");
const con = require("../mysql");
const Player = require("../player");

module.exports = {
    /**
     * @param {SampPlayer} player 
     * @param {String} ro_string 
     * @param {String} en_string 
     * @returns {String}
     */
    Lang: function(player, ro_string, en_string) {
        return Player.Info[player.playerid].Language == 1 ? ro_string : en_string;
    },
    /**
     * @param {SampPlayer} player 
     */
    kickPlayer: function(player) {
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
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    },
    /**
     * @param {Number|String} IDOrName 
     * @returns {SampPlayer}
     */
    getPlayer: function(IDOrName) {
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
    timestampToHMS: function(d) {
        let time = Math.floor(Date.now() / 1000) - d;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60) % 60;
        let seconds = Math.floor(time % 60);
        return {hours: ('0' + hours).slice(-2), minutes: ('0' + minutes).slice(-2), seconds: ('0' + seconds).slice(-2)};
    }, 
    /**
     * @returns {String}
     */
    getBeatifulDate: function() { 
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${("0" + d.getDate()).slice(-2)} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
    },
    /**
     * @param {Number} number 
     * @returns {String}
     */
    decimalToHexString: function(number) {
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
    secondsToMinutesAndSeconds: function(time) {
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;
        return `${mins}:${secs}`;
    },
    /**
     * @param {Number} number 
     * @returns {String}
     */
    numberWithCommas: function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    /**
     * @returns {String}
     */
    getDateForLastOn: function() {
        const d = new Date();
        return `${("0" + d.getDate()).slice(-2)}:${d.getMonth()+1}:${d.getFullYear()}`;
    },
    /**
     * @param {Number|String} value 
     * @returns 
     */
    isNumber: function(value) {
        if(typeof(value) == "number" || !isNaN(value)) return true;
        else return false;
    },
    /**
     * @param {Number} AccID 
     */
    getNameByAccID: function(AccID) {
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
    getTotalUsersCount: function() {
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
    getGangFounders: function(GangID) {
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
    degToRad: function(degrees) {
        return degrees * (Math.PI / 180);
    },
    /**
     * @param {Number} rad 
     * @returns {Number}
     */
    radToDeg: function(rad) {
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
         * @returns {Boolean}
         */
        loginSessionId: function(user) {
            return new Promise((resolve, reject) => {
                con.query("SELECT ID FROM users WHERE discord = ?", [user.id], function(err, result) {
                    if(err || result == 0) resolve(0);
                    else resolve(result[0].ID);
                });
            });
        },
        /**
         * @param {User} user 
         * @returns {Number}
         */
        adminLevel: function(user) {
            return new Promise((resolve, reject) => {
                con.query("SELECT admin FROM users WHERE discord = ?", [user.id], function(err, result) {
                    if(err || result == 0) resolve(0);
                    else resolve(result[0].admin);
                });
            });
        }
    },
    /**
     * @param {Number} days 
     * @returns {Number}
     */
    getTimestamp: function(days=0) {
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
    kickTargetByAdmin: function(adminData, target, reason) {
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
    }
}