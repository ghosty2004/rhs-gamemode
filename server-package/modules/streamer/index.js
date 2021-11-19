const { callPublic, OBJECT_MATERIAL_SIZE } = require("samp-node-lib");

module.exports = {
    CreateDynamicObject: function(modelid, x, y, z, rx, ry, rz, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 600, drawdistance = 600, areaid = -1, priority = 0) {
        return callPublic("_CreateDynamicObject", "iffffffiiiffii", modelid, x, y, z, rx, ry, rz, worldid, interiorid, playerid, streamdistance, drawdistance, areaid, priority);
    },
    DestroyDynamicObject: function(objectid) {
        callPublic("_DestroyDynamicObject", "i", objectid);
    },
    IsValidDynamicObject: function(objectid) {
        callPublic("_IsValidDynamicObject", "i", objectid);
    },
    SetDynamicObjectMaterial: function(objectid, materialindex, modelid, txdname, texturename, materialcolor) {
        callPublic("_SetDynamicObjectMaterial", "iiissi", objectid, materialindex, modelid, txdname, texturename, materialcolor);
    },
    SetDynamicObjectMaterialText: function(objectid, materialindex, text, materialsize = OBJECT_MATERIAL_SIZE._256x128, fontface = "Arial", fontsize = 24, bold = 1, fontcolor = 0xFFFFFFFF, backcolor = 0, textalignment = 0) {
        callPublic("_SetDynamicObjectMaterialText", "iisisiiiii", objectid, materialindex, text, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
    },
    CreateDynamicPickup: function(modelid, type, x, y, z, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200.0, areaid = -1, priority = 0) {
        let value = callPublic("_CreateDynamicPickup", "iifffiiifii", modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority);
        this.UpdateAll(); 
        return value;
    },
    DestroyDynamicPickup: function(pickupid) {
        callPublic("_DestroyDynamicPickup", "i", pickupid);
        this.UpdateAll();
    },
    IsValidDynamicPickup: function(pickupid) {
        return callPublic("_IsValidDynamicPickup", "i", pickupid);
    },
    CreateDynamic3DTextLabel: function(text, color, x, y, z, drawdistance) {
        let value = callPublic("_CreateDynamic3DTextLabel", "siffff", text, color, x, y, z, drawdistance);
        this.UpdateAll();
        return value;
    },
    DestroyDynamic3DTextLabel: function(id) {
        let value = callPublic("_DestroyDynamic3DTextLabel", "i", id);
        this.UpdateAll();
        return value;
    },
    IsValidDynamic3DTextLabel: function(id) {
        callPublic("_IsValidDynamic3DTextLabel", "i", id);
    },
    UpdateDynamic3DTextLabelText: function(id, color, text) {
        callPublic("_UpdateDynamic3DTextLabelText", "iis", id, color, text);
        this.UpdateAll();
    },
    Update: function(playerid) {
        callPublic("_samp_Streamer_Update", "i", playerid);
    },
    UpdateAll: function() {
        samp.getPlayers().forEach((player) => {
            this.Update(player.playerid);
        });
    }
}