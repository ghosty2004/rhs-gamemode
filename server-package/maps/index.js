/* ================ */
/*      MAPS        */
/* ================ */

const { CreateDynamicObject, SetDynamicObjectMaterial, SetDynamicObjectMaterialText } = require("../modules/streamer");
global.CreateDynamicObject = CreateDynamicObject;
global.SetDynamicObjectMaterial = SetDynamicObjectMaterial;
global.SetDynamicObjectMaterialText = SetDynamicObjectMaterialText;

/* Others */
const LS = require("./others/ls");
const LV = require("./others/lv");
const Spawn = require("./others/spawn");
const Voller = require("./others/voller");

/* Stunt Zones */
const LSAir = require("./stuntzones/lsair");
const LVAir = require("./stuntzones/lvair");

module.exports = {
    Load: function() {
        /* Others */
        LS.Load();
        LV.Load();
        Spawn.Load();
        Voller.Load();

        /* Stunt Zones */
        LSAir.Load();
        LVAir.Load();
    },
    RemoveBuildings: function(player) {
        /* Others */
        LS.RemoveBuilding(player);
        LV.RemoveBuilding(player);
        Voller.RemoveBuilding(player);

        /* Stunt Zones */
        LSAir.Load();
        LVAir.Load();
    }
}