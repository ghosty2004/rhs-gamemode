const { callPublic } = require("../../libs/samp");

module.exports = {
    CreateCustomCheckpoint: function(x, y, z, size, drawdistance) {
        return callPublic("CreateCustomCheckpoint", "ffffi", x, y, z, size, drawdistance);
    },
    DeleteCustomCheckpoint: function(cpid) {
        return callPublic("DeleteCustomCheckpoint", "i", cpid);
    },
    GetPlayerCustomCheckpoint: function(player) {
        return callPublic("GetPlayerCustomCheckpoint", "i", player.playerid);
    },
    IsPlayerInAnyCustomCheckpoint: function(player) {
        return callPublic("IsPlayerInAnyCustomCheckpoint", "i", player.playerid);
    }
}