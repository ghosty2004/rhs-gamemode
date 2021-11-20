module.exports = {
    Info: {},
    Create: function(id, name, position) {
        if(!this.Info[id]) {
            this.Info[id] = {
                name: name,
                position: position
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