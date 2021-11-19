/* ================ */
/*      MAPS        */
/* ================ */

/* others */
const LS = require("./others/ls");
const LV = require("./others/lv");
const Spawn = require("./others/spawn");
const Voller = require("./others/voller");

module.exports = {
    Load: function() {
        LS.Load();
        LV.Load();
        Spawn.Load();
        Voller.Load();
    },
    RemoveBuildings: function(player) {
        LS.RemoveBuilding(player);
        LV.RemoveBuilding(player);
        Voller.RemoveBuilding(player);
    }
}