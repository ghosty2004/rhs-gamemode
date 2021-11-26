const { GangZoneCreate, GangZoneDestroy } = require("samp-node-lib");

module.exports = {
    Info: {},
    Create: function(id, owner, minX, minY, maxX, maxY) {
        if(!this.Info[id]) {
            this.Info[id] = {
                Owner: owner,
                MinX: minX,
                MinY: minY,
                MaxX: maxX,
                MaxY: maxY,
                GangZone: GangZoneCreate(minX, minY, maxX, maxY)
            }
            return true;
        }
        else return false;
    },
    Delete: function(id) {
        if(this.Info[id]) {
            GangZoneDestroy(this.Info[id].GangZone);
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