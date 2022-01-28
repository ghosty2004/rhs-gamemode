const { CreateDynamicPickup, CreateDynamic3DTextLabel, DestroyDynamicPickup, DestroyDynamic3DTextLabel } = require("../streamer");

module.exports = {
    /**
     * @type {[{id: Number, owner: Number, position: Number[], interiorType: String, cost: Number, label: Number, pickup: Number}]}
     */
    Info: [],
    /**
     * @param {Number} id 
     * @param {Number} owner 
     * @param {Number[]} position
     * @param {Number} interiorType
     * @param {Number} cost 
     */
    Create(id, owner, position, interiorType, cost) {
        if(!this.Info.some(s => s.id == id)) {
            this.Info.push({
                id: id,
                owner: owner,
                position: position,
                interiorType: interiorType,
                cost: cost,
                label: CreateDynamic3DTextLabel(),
                pickup: CreateDynamicPickup(owner == 0 ? 19523 : 19522, 1, position[0], position[1], position[2])
            }); 
        } 
    },
    /**
     * @param {Number} id
     */
    Delete(id) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index != -1) {
            DestroyDynamic3DTextLabel(this.Info[index].label);
            DestroyDynamicPickup(this.Info[index].pickup);
            this.Info.splice(index, 1);
        } 
    }
}