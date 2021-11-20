/* ================ */
/*      MAPS        */
/* ================ */

const { CreateObject, SetObjectMaterial } = require("samp-node-lib");
global.CreateObject = CreateObject;
global.SetObjectMaterial = SetObjectMaterial;
const { CreateDynamicObject, SetDynamicObjectMaterial, SetDynamicObjectMaterialText } = require("../modules/streamer");
global.CreateDynamicObject = CreateDynamicObject;
global.SetDynamicObjectMaterial = SetDynamicObjectMaterial;
global.SetDynamicObjectMaterialText = SetDynamicObjectMaterialText;

/* Drifts */
const Drift1 = require("./drifts/1");

/* Gangs */
const Gang1 = require("./gangs/1");

/* Others */
const Beach = require("./others/beach");
const Chilliad = require("./others/chilliad");
const Jail = require("./others/jail");
const LS = require("./others/ls");
const LV = require("./others/lv");
const LVTrans = require("./others/lvtrans");
const Pimps = require("./others/pimps");
const SF = require("./others/sf");
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

        /* Gangs */
        Gang1.Load();

        /* Others */
        Beach.Load();
        Jail.Load();
        LS.Load();
        LV.Load();
        LVTrans.Load();
        Pimps.Load();
        SF.Load();
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

        /* Gangs */
        // null..

        /* Others */
        Beach.RemoveBuilding(player);
        LS.RemoveBuilding(player);
        LV.RemoveBuilding(player);
        LVTrans.RemoveBuilding(player);
        Pimps.RemoveBuilding(player);
        SF.RemoveBuilding(player);
        Voller.RemoveBuilding(player);

        /* Stunt Zones */
        AA.RemoveBuilding(player);
        LSAir.RemoveBuilding(player);
        LVAir.RemoveBuilding(player);
        SFAir.RemoveBuilding(player);
    }
}