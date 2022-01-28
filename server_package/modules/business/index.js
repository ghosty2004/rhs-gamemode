const { CreateDynamicPickup, CreateDynamic3DTextLabel, DestroyDynamicPickup, DestroyDynamic3DTextLabel } = require("../streamer");
const { getNameByAccID } = require("../functions");

module.exports = {
    /**
     * @type {[{id: Number, name: String, owner: Number, position: Number[], interiorType: String, cost: Number, win: Number, label: Number, pickup: Number}]}
     */
    Info: [],
    /**
     * @param {Number} id 
     * @param {String} name
     * @param {Number} owner 
     * @param {Number[]} position
     * @param {Number} interiorType
     * @param {Number} cost 
     * @param {Number} win
     */
    async Create(id, name, owner, position, interiorType, cost, win) {
        if(!this.Info.some(s => s.id == id)) {
            this.Info.push({
                id: id,
                name: name,
                owner: owner,
                position: position,
                interiorType: interiorType,
                cost: cost,
                win: win,
                label: CreateDynamic3DTextLabel(`{FFFF00}"${name}{FFFF00}"\n{6600FF}Owner: {00FF00}${owner == 0 ? "For Sale" : `${await getNameByAccID(owner)}`}\n{6600FF}Cost: {00FF00}${cost} Coins\n{6600FF}Win: {00FF00}${win} Coins\n{6666FF}/business`, -1, position[0], position[1], position[2], 50),
                pickup: CreateDynamicPickup(1274, 1, position[0], position[1], position[2])
            }); 
        } 
    },
    async Update(id) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index != -1) {
            UpdateDynamic3DTextLabelText(this.Info[index].label, -1, `{FFFF00}"${this.Info[index].name}{FFFF00}"\n{6600FF}Owner: {00FF00}${this.Info[index].owner == 0 ? "For Sale" : `${await getNameByAccID(this.Info[index].owner)}`}\n{6600FF}Cost: {00FF00}${this.Info[index].cost} Coins\n{6600FF}Win: {00FF00}${this.Info[index].win} Coins\n{6666FF}/business`);
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