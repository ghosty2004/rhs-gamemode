const { GangZoneCreate, GangZoneDestroy } = require("samp-node-lib");

module.exports = {
    Info: {},
    Create: function(id, name, position, weapons, color, alliance, points, captures, kills, deaths, territory_position) {
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
                territory: {
                    owner: id,
                    MinX: territory_position[0],
                    MinY: territory_position[1],
                    MaxX: territory_position[2],
                    MaxY: territory_position[3],
                    GangZone: GangZoneCreate(territory_position[0], territory_position[1], territory_position[2], territory_position[3])
                },
                capturing: {
                    time: 30,
                    turf: -1,
                    interval: null
                }
            }
            return true;
        }
        else return false;
    },
    Delete: function(id) {
        if(this.Info[id]) {
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