const { CreateDynamicPickup, CreateDynamic3DTextLabel, DestroyDynamicPickup, DestroyDynamic3DTextLabel, UpdateDynamic3DTextLabelText } = require("../streamer");
const { getNameByAccID } = require("../functions");
const { CreateObject } = require("samp-node-lib");

module.exports = {
    /**
     * @type {[{id: Number, owner: Number, position: Number[], interiorType: String, cost: Number, label: Number, pickup: Number, lifts: [{positionXYZ: Number[], positionsZ: Number[], rotationXYZ: Number[], objectHandle: Number, labels: Number[], level: Number}]}]}
     */
    Info: [],
    /**
     * @param {Number} id 
     * @param {Number} owner 
     * @param {Number[]} position
     * @param {Number} interiorType
     * @param {Number} cost 
     * @param {[{positionXYZ: Number[], positionsZ: Number[], rotationXYZ: Number[]}]} lifts
     */
    async Create(id, owner, position, interiorType, cost, lifts) {
        if(this.Info.some(s => s.id == id)) return;
        let index = (this.Info.push({
            id: id,
            owner: owner,
            position: position,
            interiorType: interiorType,
            cost: cost,
            label: CreateDynamic3DTextLabel(`{BBFF00}${owner == 0 ? "House {00BBF6}For Sale" : `House owned by {00BBF6}${await getNameByAccID(owner)}`}{BBFF00}!\n{BBFF00}Type {00BBF6}/house {BBFF00}for Help!`, -1, position[0], position[1], position[2], 50),
            pickup: CreateDynamicPickup(owner == 0 ? 19523 : 19522, 1, position[0], position[1], position[2]),
            lifts: [] 
        }) - 1);
        for(let i = 0; i < lifts.length; i++) {
            let liftIndex = (this.Info[index].lifts.push({
                positionXYZ: lifts[i].positionXYZ,
                positionsZ: lifts[i].positionsZ,
                rotationXYZ: lifts[i].rotationXYZ,
                objectHandle: CreateObject(18755, lifts[i].positionXYZ[0], lifts[i].positionXYZ[1], lifts[i].positionXYZ[2], lifts[i].rotationXYZ[0], lifts[i].rotationXYZ[1] + lifts[i].positionsZ[0], lifts[i].rotationXYZ[2], 300),
                labels: [],
                level: 0
            })) - 1;
            for(let labelLoop = 0; labelLoop < lifts[i].positionsZ.length; labelLoop++) {
                this.Info[index].lifts[liftIndex].labels.push(CreateDynamic3DTextLabel("/lift", -1, lifts[i].positionXYZ[0], lifts[i].positionXYZ[1], lifts[i].positionXYZ[2] + lifts[i].positionsZ[labelLoop], 20));
            }
        }
    },
    async Update(id) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index == -1) return;
        UpdateDynamic3DTextLabelText(this.Info[index].label, -1, `{BBFF00}${this.Info[index].owner == 0 ? "House {00BBF6}For Sale" : `House owned by {00BBF6}${await getNameByAccID(this.Info[index].owner)}`}{BBFF00}!\n{BBFF00}Type {00BBF6}/house {BBFF00}for Help!`);
        DestroyDynamicPickup(this.Info[index].pickup);
        this.Info[index].pickup = CreateDynamicPickup(this.Info[index].owner == 0 ? 19523 : 19522, 1, this.Info[index].position[0], this.Info[index].position[1], this.Info[index].position[2]);
    },
    /**
     * @param {Number} id
     */
    Delete(id) {
        let index = this.Info.findIndex(f => f.id == id);
        if(index == -1) return;
        DestroyDynamic3DTextLabel(this.Info[index].label);
        DestroyDynamicPickup(this.Info[index].pickup);
        this.Info.splice(index, 1);
    }
}