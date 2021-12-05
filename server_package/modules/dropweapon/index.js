const { callPublic } = require("samp-node-lib")

module.exports = {
    SetPlayerDropWeaponData: function(player, slot, weaponid, ammo) {
        return callPublic("_SetPlayerDropWeaponData", "iiii", player.playerid, slot, weaponid, ammo);
    },
    ClearPlayerDropWeaponSlot: function(player, slot) {
        return callPublic("_ClearPlayerDropWeaponSlot", "ii", player.playerid, slot);
    },
    ClearPlayerDropWeaponData: function(player) {
        return callPublic("_ClearPlayerDropWeaponData", "i", player.playerid);
    },
    DropPlayerWeapons: function(player) {
        return callPublic("_DropPlayerWeapons", "i", player.playerid);
    }
}