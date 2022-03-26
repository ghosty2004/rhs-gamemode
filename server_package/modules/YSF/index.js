const { callPublic, SampPlayer } = require("../../libs/samp");

module.exports = {
    /**
     * @param {Number} maxplayers 
     */
    SetMaxPlayers(maxplayers) {
        return callPublic("_SetMaxPlayers", "i", maxplayers);
    },
    /**
     * @param {String} name 
     * @param {String} value 
     */
    AddServerRule(name, value) {
        return callPublic("_AddServerRule", "ss", name, value);
    },
    /**
     * @param {String} name 
     * @param {String} value 
     */
    SetServerRule(name, value) {
        return callPublic("_SetServerRule", "ss", name, value);
    },
    /**
     * @param {SampPlayer} player 
     * @param {Number} color 
     */
    EnableConsoleMSGsForPlayer(player, color) {
        return callPublic("_EnableConsoleMSGsForPlayer", "ii", player.playerid, color);
    },
    /**
     * @param {String} name 
     */
    IsValidNickName(name) {
        return callPublic("_IsValidNickName", "s", name);
    },
    /**
     * @param {String} character 
     * @param {Boolean} boolean 
     */
    AllowNickNameCharacter(character, boolean) {
        return callPublic("_AllowNickNameCharacter", "si", character, boolean);
    },
    /**
     * @param {String} character 
     */
    IsNickNameCharacterAllowed(character) {
        return callPublic("_IsNickNameCharacterAllowed", "s", character);
    },
    /**
     * @param {SampPlayer} player 
     * @param {Boolean} boolean 
     */
    SetPlayerAdmin(player, boolean) {
        return callPublic("_SetPlayerAdmin", "ii", player.playerid, boolean);
    }
}