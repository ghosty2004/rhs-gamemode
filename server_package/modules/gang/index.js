const { GangZoneCreate, GangZoneDestroy } = require("samp-node-lib");

module.exports = {
    Info: {},
    Create: function(id, name, position, color, kills, deaths, territory_owner, territory_position) {
        if(!this.Info[id]) {
            this.Info[id] = {
                name: name,
                position: position,
                color: color,
                kills: kills,
                deaths: deaths,
                territory: {
                    owner: territory_owner,
                    MinX: territory_position[0],
                    MinY: territory_position[1],
                    MaxX: territory_position[2],
                    MaxY: territory_position[3],
                    GangZone: GangZoneCreate(territory_position[0], territory_position[1], territory_position[2], territory_position[3])
                },
                In_Capture: 0
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
    }
}