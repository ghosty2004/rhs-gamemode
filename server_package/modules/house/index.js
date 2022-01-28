const { CreateDynamicPickup, CreateDynamic3DTextLabel } = require("../streamer");

module.exports = {
    /**
     * @type {[{owner: Number, position: Number[], interiorType: String, cost: Number, pickup: Number}]}
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
                owner: owner,
                position: position,
                interiorType: interiorType,
                cost: cost,
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
            this.Info.splice(index, 1);
        } 
    }
}