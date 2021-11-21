const { getPlayers } = require("samp-node-lib");

module.exports = {
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    },
    getPlayer: function(IDOrName) { 
        let result = getPlayers().filter(f => f.GetPlayerName(24).toLowerCase().includes(`${IDOrName}`.toLowerCase()) || f.playerid == IDOrName)[0];
        if(result) return result;
        else return 0;
    },
    timestampToHMS: function(d) {
        let time = Math.floor(Date.now() / 1000) - d;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60) % 60;
        let seconds = Math.floor(time % 60);
        return {hours: hours, minutes: minutes, seconds: seconds};
    }
}