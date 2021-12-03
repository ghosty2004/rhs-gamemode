const { getPlayers } = require("samp-node-lib");
const { query } = require("../mysql");

module.exports = {
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    },
    getPlayer: function(IDOrName) {
        let result; 
        if(!isNaN(IDOrName)) result = getPlayers().filter(f => f.playerid == parseInt(IDOrName))[0];
        else result = getPlayers().filter(f => f.GetPlayerName(24).toLowerCase().includes(`${IDOrName}`.toLowerCase()))[0];
        if(result) return result;
        else return 0;
    },
    timestampToHMS: function(d) {
        let time = Math.floor(Date.now() / 1000) - d;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60) % 60;
        let seconds = Math.floor(time % 60);
        return {hours: hours, minutes: minutes, seconds: seconds};
    },
    getBeatifulDate: function() { 
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${("0" + d.getDate()).slice(-2)} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
    },
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
    secondsToMinutesAndSeconds: function(time) {
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;
        return `${mins}:${secs}`;
    },
    numberWithCommas: function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getDateForLastOn: function() {
        const d = new Date();
        return `${("0" + d.getDate()).slice(-2)}:${d.getMonth()+1}:${d.getFullYear()}`;
    },
    isNumber: function(value) {
        if(typeof(value) == "number" || !isNaN(value)) return true;
        else return false;
    }
}