module.exports = {
    Info: [],
    Create: function(id, owner, model, color, position) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index == -1) {
            this.Info.push({
                id: id,
                owner: owner,
                model: model,
                color: color,
                position: position,
                vehicle: null
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
    },
    Exists: function(id) {
        return this.Info.some(s => s.id == id);
    }
}