const { getPlayers, SampPlayer, GetVehicleRotationQuat, GetVehiclePos } = require("samp-node-lib");

const con = require("../mysql");

module.exports = {
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
     * @returns {String}
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
    }
}