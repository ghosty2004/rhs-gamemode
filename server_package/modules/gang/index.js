const { GangZoneCreate, GangZoneDestroy, CreateObject, Create3DTextLabel, DestroyObject, Delete3DTextLabel } = require("samp-node-lib");
const { GANGS } = require("../../data/settings");
const { CreateCustomCheckpoint, DeleteCustomCheckpoint } = require("../checkpoint");

module.exports = {
    Info: {},
    Create: function(id, name, position, weapons, color, alliance, points, captures, kills, deaths, base_position, gate_objectid, gate_position, territory_position) {
        if(!this.Info[id]) {
            this.Info[id] = {
                id: id,
                name: name,
                position: position,
                weapons: weapons,
                color: color,
                alliance: alliance,
                points: points,
                captures: captures,
                kills: kills,
                deaths: deaths,
                base_position: base_position,
                gate: {
                    objectid: gate_objectid,
                    position: gate_position,
                    object: gate_position[0] == 0 && gate_position[1] == 0 && gate_position[2] == 0 ? null : CreateObject(gate_objectid, gate_position[0], gate_position[1], gate_position[2], gate_position[3], gate_position[4], gate_position[5]),
                    label: gate_position[0] == 0 && gate_position[1] == 0 && gate_position[2] == 0 ? null : Create3DTextLabel("{BBFF00}if you are in this gang or in it's allied\n{BBFF00}use {00BBF6}/og{BBFF00} to open the gates and {00BBF6}/cg{BBFF00} to close the gates!\n{BBFF00}use {00BBF6}/g{BBFF00} to open and automatically close gates!\n{00BBF6}/blow | /repair", -1, gate_position[0], gate_position[1], gate_position[2], 20)
                },
                territory: {
                    owner: id,
                    MinX: territory_position[0],
                    MinY: territory_position[1],
                    MaxX: territory_position[2],
                    MaxY: territory_position[3],
                    GangZone: GangZoneCreate(territory_position[0], territory_position[1], territory_position[2], territory_position[3])
                },
                capturing: {
                    time: GANGS.CAPTURE_TIME,
                    turf: -1,
                    interval: null
                },
                teleportcheckpoints: []
            }
            return true;
        }
        else return false;
    },
    Delete: function(id) {
        if(this.Info[id]) {
            if(this.Info[id].gate.object) DestroyObject(this.Info[id].gate.object);
            if(this.Info[id].gate.label) Delete3DTextLabel(this.Info[id].gate.label);
            GangZoneDestroy(this.Info[id].territory.GangZone);
            delete this.Info[id];
            return true;
        }
        else return false;
    },
    Exists: function(id) {
        if(this.Info[id]) return true;
        else return false;
    },
    CreateTeleportCheckpoint: function(gang_id, id, position, position_to, textlabel) {
        if(this.Info[gang_id]) {
            if(!this.Info[gang_id].teleportcheckpoints.some(s => s.id == id)) {
                this.Info[gang_id].teleportcheckpoints.push({
                    id: id,
                    position: position,
                    position_to: position_to,
                    textlabel: textlabel,
                    label: Create3DTextLabel(`{BBFF00}Teleport to\n{00BBF6}${textlabel}`, -1, position[0], position[1], position[2], 20),
                    checkpoint: CreateCustomCheckpoint(position[0], position[1], position[2], 1, 3)
                });
                return true;
            }
            else return false;
        }
        else return false;
    },
    DeleteTeleportCheckpoint: function(gang_id, id) {
        if(this.Info[gang_id]) {
            let index = this.Info[gang_id].teleportcheckpoints.findIndex(f => f.id == id);
            if(index != -1) {
                Delete3DTextLabel(this.Info[gang_id].teleportcheckpoints[index].label);
                DeleteCustomCheckpoint(this.Info[gang_id].teleportcheckpoints[index].checkpoint);
                this.Info[gang_id].teleportcheckpoints.splice(index, 1);
                return true;
            }
            else return false;
        }
        else return false;
    },
    ExistsTeleportCheckpoint: function(gang_id, id) {
        if(this.Info[gang_id]) {
            return this.Info[gang_id].teleportcheckpoints.some(s => s.id == id);
        }
        else return false;
    },
    Get: function() {
        let data = Object.entries(this.Info);
        let value = [];
        for(let i = 0; i < data.length; i++) { value.push(data[i][1]); }
        return value;
    },
    GetOwnedGangZones: function(id) {
        let zones = [];
        this.Get().filter(f => f.territory.owner == id).forEach((i) => {
            zones.push(i.territory.GangZone);
        });
        return zones;
    }
}