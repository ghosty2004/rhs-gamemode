const { callPublic } = require("samp-node-lib");

module.exports = {
    Info: {
        StartTime: Math.floor(Date.now() / 1000),
        NewJoinedPlayers: 0,
        NewRegistredPlayers: 0,
        Messages: 0,
        Reuqest: {
            FindPosZ: {}
        }
    },
    SetMaxPlayers: function(maxplayers) {
        return callPublic("_SetMaxPlayers", "i", maxplayers);
    },
    AddServerRule: function(name, value) {
        return callPublic("_AddServerRule", "ss", name, value);
    }
}