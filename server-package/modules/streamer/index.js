module.exports = {
    CreateDynamicPickup: function(modelid, type, x, y, z, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200.0, areaid = -1, priority = 0) {
        let value = samp.callPublic("_CreateDynamicPickup", "iifffiiifii", modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority);
        this.UpdateAll(); 
        return value;
    },
    DestroyDynamicPickup: function(pickupid) {
        samp.callPublic("_DestroyDynamicPickup", "i", pickupid);
        this.UpdateAll();
    },
    IsValidDynamicPickup: function(pickupid) {
        return samp.callPublic("_IsValidDynamicPickup", "i", pickupid);
    },
    CreateDynamic3DTextLabel: function(text, color, x, y, z, drawdistance) {
        let value = samp.callPublic("_CreateDynamic3DTextLabel", "siffff", text, color, x, y, z, drawdistance);
        this.UpdateAll();
        return value;
    },
    DestroyDynamic3DTextLabel: function(id) {
        let value = samp.callPublic("_DestroyDynamic3DTextLabel", "i", id);
        this.UpdateAll();
        return value;
    },
    IsValidDynamic3DTextLabel: function(id) {
        samp.callPublic("_IsValidDynamic3DTextLabel", "i", id);
    },
    UpdateDynamic3DTextLabelText: function(id, color, text) {
        samp.callPublic("_UpdateDynamic3DTextLabelText", "iis", id, color, text);
        this.UpdateAll();
    },
    Update: function(playerid) {
        samp.callPublic("_samp_Streamer_Update", "i", playerid);
    },
    UpdateAll: function() {
        samp.getPlayers().forEach((player) => {
            this.Update(player.playerid);
        });
    }
}