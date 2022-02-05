const { callPublic, OBJECT_MATERIAL_SIZE, getPlayers } = require("samp-node-lib");

module.exports = {
    CreateDynamicObject(modelid, x, y, z, rx, ry, rz, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 350, drawdistance = 400, areaid = -1, priority = 0) {
        return callPublic("_CreateDynamicObject", "iffffffiiiffii", modelid, x, y, z, rx, ry, rz, worldid, interiorid, playerid, streamdistance, drawdistance, areaid, priority);
    },
    DestroyDynamicObject(objectid) {
        callPublic("_DestroyDynamicObject", "i", objectid);
    },
    IsValidDynamicObject(objectid) {
        callPublic("_IsValidDynamicObject", "i", objectid);
    },
    SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname, texturename, materialcolor) {
        callPublic("_SetDynamicObjectMaterial", "iiissi", objectid, materialindex, modelid, txdname, texturename, materialcolor);
    },
    SetDynamicObjectMaterialText(objectid, materialindex, text, materialsize = OBJECT_MATERIAL_SIZE._256x128, fontface = "Arial", fontsize = 24, bold = 1, fontcolor = 0xFFFFFFFF, backcolor = 0, textalignment = 0) {
        callPublic("_SetDynamicObjectMaterialText", "iisisiiiii", objectid, materialindex, text, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
    },
    CreateDynamicPickup(modelid, type, x, y, z, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200.0, areaid = -1, priority = 0) {
        let value = callPublic("_CreateDynamicPickup", "iifffiiifii", modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority);
        return value;
    },
    DestroyDynamicPickup(pickupid) {
        callPublic("_DestroyDynamicPickup", "i", pickupid);
    },
    IsValidDynamicPickup(pickupid) {
        return callPublic("_IsValidDynamicPickup", "i", pickupid);
    },
    CreateDynamic3DTextLabel(text, color, x, y, z, drawdistance, attachedplayer=-1, attachedvehicle=-1, testlos=false, worldid=-1, interiorid=-1) {
        if(attachedplayer == -1) attachedplayer = 0xFFFF;
        if(attachedvehicle == -1) attachedvehicle = 0xFFFF;
        let value = callPublic("_CreateDynamic3DTextLabel", "siffffiiiii", text, color, x, y, z, drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid);
        return value;
    },
    DestroyDynamic3DTextLabel(id) {
        let value = callPublic("_DestroyDynamic3DTextLabel", "i", id);
        return value;
    },
    IsValidDynamic3DTextLabel(id) {
        callPublic("_IsValidDynamic3DTextLabel", "i", id);
    },
    UpdateDynamic3DTextLabelText(id, color, text) {
        callPublic("_UpdateDynamic3DTextLabelText", "iis", id, color, text);
    },
    CreateDynamicMapIcon(x, y, z, type, color) {
        return callPublic("_CreateDynamicMapIcon", "fffii", x, y, z, type, color);
    },
    Update(playerid) {
        callPublic("_Streamer_Update", "i", playerid);
    },
    UpdateAll() {
        getPlayers().forEach((i) => {
            this.Update(i.playerid);
        });
    }
}