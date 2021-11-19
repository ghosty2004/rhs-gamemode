/* ================ */
/*      MAPS        */
/* ================ */

/* others */
const LS = require("./others/ls");
const LSAir = require("./others/lsair");
const LV = require("./others/lv");
const LVAir = require("./others/lvair");
const Spawn = require("./others/spawn");
const Voller = require("./others/voller");

module.exports = {
    Load: function() {
        LS.Load();
        LSAir.Load();
        LV.Load();
        LVAir.Load();
        Spawn.Load();
        Voller.Load();
    },
    RemoveBuildings: function(player) {
        LS.RemoveBuilding(player);
        LSAir.RemoveBuilding(player);
        LV.RemoveBuilding(player);
        LVAir.RemoveBuilding(player);
        Voller.RemoveBuilding(player);
    }
}