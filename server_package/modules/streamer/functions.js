const { OBJECT_MATERIAL_SIZE, getPlayers, callNative } = require("../../libs/samp");

module.exports = {
    /**
     * @param {Number} modelid 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} rx 
     * @param {Number} ry 
     * @param {Number} rz 
     * @param {Number} worldid 
     * @param {Number} interiorid 
     * @param {Number} playerid 
     * @param {Number} streamdistance 
     * @param {Number} drawdistance 
     * @param {Number} areaid 
     * @param {Number} priority 
     * @returns {Number}
     */
    CreateDynamicObject(modelid, x, y, z, rx, ry, rz, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 350, drawdistance = 400, areaid = -1, priority = 0) {
        return callNative("CreateDynamicObject", "iffffffiiiffii", modelid, x, y, z, rx, ry, rz, worldid, interiorid, playerid, streamdistance, drawdistance, areaid, priority);
    },
    /**
     * @param {Number} objectid 
     * @returns {Number}
     */
    DestroyDynamicObject(objectid) {
        return callNative("DestroyDynamicObject", "i", objectid);
    },
    /**
     * @param {Number} objectid 
     * @returns {Number}
     */
    IsValidDynamicObject(objectid) {
        return callNative("IsValidDynamicObject", "i", objectid);
    },
    /**
     * @param {Number} objectid 
     * @param {Number} materialindex 
     * @param {Number} modelid 
     * @param {String} txdname 
     * @param {String} texturename 
     * @param {Number} materialcolor 
     * @returns {Number}
     */
    SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname, texturename, materialcolor) {
        return callNative("SetDynamicObjectMaterial", "iiissi", objectid, materialindex, modelid, txdname, texturename, materialcolor);
    },
    /**
     * @param {Number} objectid 
     * @param {Number} materialindex 
     * @param {String} text 
     * @param {Number} materialsize 
     * @param {String} fontface 
     * @param {Number} fontsize 
     * @param {Number} bold 
     * @param {Number} fontcolor 
     * @param {Number} backcolor 
     * @param {Number} textalignment 
     * @returns {Number}
     */
    SetDynamicObjectMaterialText(objectid, materialindex, text, materialsize = OBJECT_MATERIAL_SIZE._256x128, fontface = "Arial", fontsize = 24, bold = 1, fontcolor = 0xFFFFFFFF, backcolor = 0, textalignment = 0) {
        return callNative("SetDynamicObjectMaterialText", "iisisiiiii", objectid, materialindex, text, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
    },
    /**
     * @param {Number} modelid 
     * @param {Number} type 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} worldid 
     * @param {Number} interiorid 
     * @param {Number} playerid 
     * @param {Number} streamdistance 
     * @param {Number} areaid 
     * @param {Number} priority 
     * @returns {Number}
     */
    CreateDynamicPickup(modelid, type, x, y, z, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200.0, areaid = -1, priority = 0) {
        return callNative("CreateDynamicPickup", "iifffiiifii", modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority);
    },
    /**
     * @param {Number} pickupid 
     * @returns {Number}
     */
    DestroyDynamicPickup(pickupid) {
        return callNative("DestroyDynamicPickup", "i", pickupid);
    },
    /**
     * @param {Number} pickupid 
     * @returns {Number}
     */
    IsValidDynamicPickup(pickupid) {
        return callNative("IsValidDynamicPickup", "i", pickupid);
    },
    /**
     * @param {String} text 
     * @param {Number} color 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} drawdistance 
     * @param {Number} attachedplayer 
     * @param {Number} attachedvehicle 
     * @param {Number} testlos 
     * @param {Number} worldid 
     * @param {Number} interiorid 
     * @returns {Number}
     */
    CreateDynamic3DTextLabel(text, color, x, y, z, drawdistance, attachedplayer=-1, attachedvehicle=-1, testlos=false, worldid=-1, interiorid=-1) {
        return callNative("CreateDynamic3DTextLabel", "siffffiiiii", text, color, x, y, z, drawdistance, attachedplayer == -1 ? 0xFFFF : attachedplayer, attachedvehicle == -1 ? 0xFFFF : attachedvehicle, testlos, worldid, interiorid);
    },
    /**
     * @param {Number} id 
     * @returns {Number} 
     */
    DestroyDynamic3DTextLabel(id) {
        return callNative("DestroyDynamic3DTextLabel", "i", id);
    },
    /**
     * @param {Number} id 
     * @returns {Number}
     */
    IsValidDynamic3DTextLabel(id) {
        return callNative("IsValidDynamic3DTextLabel", "i", id);
    },
    /**
     * @param {Number} id 
     * @param {Number} color 
     * @param {String} text 
     * @returns 
     */
    UpdateDynamic3DTextLabelText(id, color, text) {
        return callNative("UpdateDynamic3DTextLabelText", "iis", id, color, text);
    },
    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} type 
     * @param {Number} color 
     * @returns {Number}
     */
    CreateDynamicMapIcon(x, y, z, type, color) {
        return callNative("CreateDynamicMapIcon", "fffii", x, y, z, type, color);
    },
    /**
     * @param {Number} playerid 
     * @returns {Number}
     */
    Update(playerid) {
        return callNative("Streamer_Update", "i", playerid);
    },
    UpdateAll() { getPlayers().forEach((i) => { this.Update(i.playerid); }); }
}