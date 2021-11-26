module.exports = {
    Info: {},
    Create: function(id, name, position, color, kills, deaths) {
        if(!this.Info[id]) {
            this.Info[id] = {
                name: name,
                position: position,
                color: color,
                kills: kills,
                deaths: deaths
            }
            return true;
        }
        else return false;
    },
    Delete: function(id) {
        if(this.Info[id]) {
            delete this.Info[id];
            return true;
        }
        else return false;
    },
    Exists: function(id) {
        if(this.Info[id]) return true;
        else return false;
    }
}