module.exports = {
    Info: {},
    Create: function(id, name, owner, position, weapons, kills, deaths) {
        if(!this.Info[id]) {
            this.Info[id] = {
                name: name,
                owner: owner,
                position: position,
                weapons: weapons,
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
    Exists: function(name) {
        if(Object.entries(this.Info).some(s => s.some(s => s.name == name))) return true;
        else return false;
    }
}