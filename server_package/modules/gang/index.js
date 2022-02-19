const { GangZoneCreate, GangZoneDestroy, CreateObject, Create3DTextLabel, DestroyObject, Delete3DTextLabel } = require("../../samp-node-lib");
const { GANGS } = require("../../data/settings");
const { CreateCustomCheckpoint, DeleteCustomCheckpoint } = require("../checkpoint");

module.exports = {
    /**
     * @type {[{id: Number, name: String, position: Number[], weapons: Number[], color: Number, alliance: Number, points: Number, captures: Number, 
     * kills: Number, deaths: Number, base_position: Number[], gate: {objectId: number, position: Number[], object: Number, label: Number},
     * territory: {owner: Number, MinX: Number, MinY: Number, MaxX: Number, MaxY: Number, GangZone: Number}, capturing: {time: Number, turf: Number, interval: NodeJS.Timer}, 
     * teleportcheckpoints: [{id: Number, position: Number[], positionTo: Number[], label: Number, checkpoint: Number}]}]}
     */
    Info: [],
    /**
     * @param {Number} id 
     * @param {String} name 
     * @param {Number[]} position 
     * @param {Number[]} weapons 
     * @param {Number} color 
     * @param {Number} alliance 
     * @param {Number} points 
     * @param {Number} captures 
     * @param {Number} kills 
     * @param {Number} deaths 
     * @param {Number[]} base_position 
     * @param {Number} gate_objectid 
     * @param {Number[]} gate_position 
     * @param {Number[]} territory_position 
     */
    Create(id, name, position, weapons, color, alliance, points, captures, kills, deaths, base_position, gate_objectid, gate_position, territory_position) {
        if(this.Info.some(s => s.id == id)) return;
        this.Info.push({
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
        });
    },
    /**
     * @param {Number} id 
     */
    Delete(id) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index == -1) return;
        DestroyObject(this.Info[index].gate.object);
        Delete3DTextLabel(this.Info[index].gate.label);
        GangZoneDestroy(this.Info[index].territory.GangZone);
        this.Info.splice(index, 1);
    },
    /**
     * @param {Number} gangId 
     * @param {Number} checkpointId 
     * @param {*} position 
     * @param {*} positionTo 
     * @param {*} labelText 
     */
    CreateTeleportCheckpoint(gangId, checkpointId, position, positionTo, labelText) {
        let result = this.Info.find(f => f.id == gangId);
        if(!result) return;
        result.teleportcheckpoints.push({
            id: checkpointId,
            position: position,
            positionTo: positionTo,
            label: Create3DTextLabel(`{BBFF00}Teleport to\n{00BBF6}${labelText}`, -1, position[0], position[1], position[2], 20),
            checkpoint: CreateCustomCheckpoint(position[0], position[1], position[2], 1, 3)
        });
    },
    /**
     * @param {*} gangId 
     * @param {*} checkpointId 
     */
    DeleteTeleportCheckpoint(gangId, checkpointId) {
        let result = this.Info.find(f => f.id == gangId);
        if(!result) return;
        let index = result.teleportcheckpoints.findIndex(f => f.id == checkpointId);
        if(index == -1) return;
        Delete3DTextLabel(result.teleportcheckpoints[index].label);
        DeleteCustomCheckpoint(result.teleportcheckpoints[index].checkpoint);
        result.teleportcheckpoints.splice(index, 1);
    },
    /*Get: function() {
        let data = Object.entries(this.Info);
        let value = [];
        for(let i = 0; i < data.length; i++) { value.push(data[i][1]); }
        return value;
    },*/
    GetOwnedGangZones(gangId) {
        let zones = [];
        this.Info.filter(f => f.territory.owner == gangId).forEach((i) => {
            zones.push(i.territory.GangZone);
        })
        return zones;
    }
}