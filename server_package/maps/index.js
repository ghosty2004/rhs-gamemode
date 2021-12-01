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

/* Death Match */
const DE = require("./deathmatch/de");
const GunWar = require("./deathmatch/gunwar");
const Hell = require("./deathmatch/hell");
const M4 = require("./deathmatch/m4");
const Minigun = require("./deathmatch/minigun");
const MRF = require("./deathmatch/mrf");
const OH = require("./deathmatch/oh");
const OS = require("./deathmatch/os");
const Pro = require("./deathmatch/pro");
const Sniper = require("./deathmatch/sniper");

/* Drifts */
const Drift1 = require("./drifts/1");

/* Gangs */
const Gang1 = require("./gangs/1");
const Gang2 = require("./gangs/2");
const Gang3 = require("./gangs/3");
const Gang4 = require("./gangs/4");
const Gang5 = require("./gangs/5");
const Gang6 = require("./gangs/6");

/* Minigames */
const Targets = require("./minigames/targets");

/* Others */
const Beach = require("./others/beach");
const Chilliad = require("./others/chilliad");
const Jail = require("./others/jail");
const LS = require("./others/ls");
const LV = require("./others/lv");
const LVTrans = require("./others/lvtrans");
const Pimps = require("./others/pimps");
const Quarry = require("./others/quarry.js");
const SF = require("./others/sf");
const Spawn = require("./others/spawn");
const VIPClub = require("./others/vipclub");
const Voller = require("./others/voller");

/* Player's Objects */
const PlayerObj_Class_Select = require("./player/class_select");

/* Stunt Zones */
const AA = require("./stuntzones/aa");
const Chrome = require("./stuntzones/chrome");
const LSAir = require("./stuntzones/lsair");
const LVAir = require("./stuntzones/lvair");
const SFAir = require("./stuntzones/sfair");

module.exports = {
    Load: function() {
        /* Death Match */
        DE.Load();
        GunWar.Load();
        Hell.Load();
        M4.Load();
        Minigun.Load();
        MRF.Load();
        OH.Load();
        OS.Load();
        Pro.Load();
        Sniper.Load();

        /* Drifts */
        Drift1.Load();

        /* Gangs */
        Gang1.Load();
        Gang2.Load();
        Gang3.Load();
        Gang4.Load();
        Gang5.Load();
        Gang6.Load();

        /* Minigames */
        Targets.Load();

        /* Others */
        Beach.Load();
        Chilliad.Load();
        Jail.Load();
        LS.Load();
        LV.Load();
        LVTrans.Load();
        Pimps.Load();
        Quarry.Load();
        SF.Load();
        Spawn.Load();
        VIPClub.Load();
        Voller.Load();

        /* Stunt Zones */
        AA.Load();
        Chrome.Load();
        LSAir.Load();
        LVAir.Load();
        SFAir.Load();
    },
    RemoveBuildings: function(player) {
        /* Death Match */
        GunWar.RemoveBuilding(player);
        M4.RemoveBuilding(player);

        /* Drifts */
        Drift1.RemoveBuilding(player);

        /* Gangs */
        Gang1.RemoveBuilding(player);
        Gang2.RemoveBuilding(player);
        Gang3.RemoveBuilding(player);
        Gang4.RemoveBuilding(player);

        /* Others */
        Beach.RemoveBuilding(player);
        Chilliad.RemoveBuilding(player);
        LS.RemoveBuilding(player);
        LV.RemoveBuilding(player);
        LVTrans.RemoveBuilding(player);
        Pimps.RemoveBuilding(player);
        SF.RemoveBuilding(player);
        VIPClub.RemoveBuilding(player);
        Voller.RemoveBuilding(player);

        /* Stunt Zones */
        AA.RemoveBuilding(player);
        LSAir.RemoveBuilding(player);
        LVAir.RemoveBuilding(player);
        SFAir.RemoveBuilding(player);
    },
    Custom: { PlayerObj_Class_Select }
}