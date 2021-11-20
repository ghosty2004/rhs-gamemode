module.exports = {
    Info: {},
    Create: function(id, commandname, name, position) {
        if(!this.Info[commandname]) {
            this.Info[commandname] = {
                id: id,
                name: name,
                position: position
            }
            return true;
        }
        else return false;
    },
    Delete: function(commandname) {
        if(this.Info[commandname]) {
            delete this.Info[commandname];
            return true;
        }
        else return false;
    },
    Exists: function(commandname) {
        if(this.Info[commandname]) return true;
        else return false;
    },
    ExistsId: function(id) {
        if(Object.entries(this.Info).some(s => s.some(s => s.id == id))) return true;
        else return false;
    }
}