module.exports = {
    Info: [],
    Create: function(id, type, commandname, name, position) {
        if(!this.Info.some(s => s.id == id)) {
            this.Info.push({
                id: id,
                command: commandname,
                type: type,
                name: name,
                position: position
            });
            return true;
        }
        else return false;
    },
    Delete: function(commandname) {
        let index = this.Info.findIndex(f => f.command == commandname);
        if(index != -1) {
            this.Info.splice(index, 1);
            return true;
        }
        else return false;
    },
    Exists: function(commandname) {
        if(this.Info.some(s => s.command == commandname)) return true;
        else return false;
    }
}