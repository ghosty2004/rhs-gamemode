module.exports = {
    Info: [],
    Create: function(id, owner) {
        if(this.Info.some(s => s.id == id)) {
            this.Info.push({
                owner: owner
            });
            return true;
        }
        else return false;
    },
    Delete: function(id) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index != -1) {
            this.Info.splice(index, 1);
            return true;
        }
        else return false;
    }
}