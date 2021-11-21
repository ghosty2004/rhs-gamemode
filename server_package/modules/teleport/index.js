module.exports = {
    Info: {},
    Create: function(id, type, commandname, name, position) {
        if(!this.Info[commandname]) {
            this.Info[commandname] = {
                id: id,
                command: commandname,
                type: type,
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
    },
    Get: function() {
        let data = Object.entries(this.Info);
        let value = [];
        for(let i = 0; i < data.length; i++) {
            value.push({
                id: data[i][1].id,
                command: data[i][0],
                type: data[i][1].type,
                name: data[i][1].name,
                position: data[i][1].position
            });
        }
        return value;
    }
}