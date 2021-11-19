/* ================ */
/*      MAPS        */
/* ================ */

/* others */
const LS = require("./others/ls");
const LV = require("./others/lv");
const Spawn = require("./others/spawn");

module.exports = {
    Load: function() {
        LS.Load();
        LV.Load();
        Spawn.Load();
    },
    RemoveBuildings: function(player) {
        LS.RemoveBuilding(player);
        LV.RemoveBuilding(player);
    }
}