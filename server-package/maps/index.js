/* ================ */
/*      MAPS        */
/* ================ */

const { CreateDynamicObject, SetDynamicObjectMaterial, SetDynamicObjectMaterialText } = require("../modules/streamer");
global.CreateDynamicObject = CreateDynamicObject;
global.SetDynamicObjectMaterial = SetDynamicObjectMaterial;
global.SetDynamicObjectMaterialText = SetDynamicObjectMaterialText;

/* Drifts */
const Drift1 = require("./drifts/1");

/* Others */
const Jail = require("./others/jail");
const LS = require("./others/ls");
const LV = require("./others/lv");
const Spawn = require("./others/spawn");
const Voller = require("./others/voller");

/* Stunt Zones */
const AA = require("./stuntzones/aa");
const Chrome = require("./stuntzones/chrome");
const LSAir = require("./stuntzones/lsair");
const LVAir = require("./stuntzones/lvair");
const SFAir = require("./stuntzones/sfair");

module.exports = {
    Load: function() {
        /* Drifts */
        Drift1.Load();

        /* Others */
        Jail.Load();
        LS.Load();
        LV.Load();
        Spawn.Load();
        Voller.Load();

        /* Stunt Zones */
        AA.Load();
        Chrome.Load();
        LSAir.Load();
        LVAir.Load();
        SFAir.Load();
    },
    RemoveBuildings: function(player) {
        /* Drifts */
        Drift1.RemoveBuilding(player);

        /* Others */
        LS.RemoveBuilding(player);
        LV.RemoveBuilding(player);
        Voller.RemoveBuilding(player);

        /* Stunt Zones */
        AA.RemoveBuilding(player);
        LSAir.RemoveBuilding(player);
        LVAir.RemoveBuilding(player);
        SFAir.RemoveBuilding(player);
    }
}