const { callPublic, SampPlayer } = require("samp-node-lib");

module.exports = {
    /**
     * @param {Number} maxplayers 
     */
    SetMaxPlayers: function(maxplayers) {
        return callPublic("_SetMaxPlayers", "i", maxplayers);
    },
    /**
     * @param {String} name 
     * @param {String} value 
     */
    AddServerRule: function(name, value) {
        return callPublic("_AddServerRule", "ss", name, value);
    },
    /**
     * @param {SampPlayer} player 
     * @param {Number} color 
     */
    EnableConsoleMSGsForPlayer: function(player, color) {
        return callPublic("_EnableConsoleMSGsForPlayer", "ii", player.playerid, color);
    },
    /**
     * @param {String} name 
     */
    IsValidNickName: function(name) {
        return callPublic("_IsValidNickName", "s", name);
    },
    /**
     * @param {String} character 
     * @param {Boolean} allow 
     */
    AllowNickNameCharacter: function(character, allow) {
        return callPublic("_AllowNickNameCharacter", "si", character, allow);
    },
    /**
     * @param {String} character 
     */
    IsNickNameCharacterAllowed: function(character) {
        return callPublic("_IsNickNameCharacterAllowed", "s", character);
    }
}