const { SERVER_WEB } = require("../../data/settings");
const { CreateDynamic3DTextLabel, DestroyDynamic3DTextLabel } = require("../streamer");

module.exports = {
    Info: {},
    /**
     * @param {Number} id 
     * @param {String} name 
     * @param {Number[]} position 
     */
    Create: function(id, name, position) {
        if(this.Info[id]) return;
        this.Info[id] = {
            name: name,
            position: position,
            label: CreateDynamic3DTextLabel(`{FF0000}Spawn Zone\n{BBFF00}Type {00BBF6}/HM {BBFF00}for free health & armour!\n{00BBF6}${SERVER_WEB}`, -1, position[0], position[1], position[2], 30)
        }
    },
    /**
     * @param {Number} id 
     */
    Delete: function(id) {
        if(!this.Info[id]) return;
        DestroyDynamic3DTextLabel(this.Info[id].label);
        delete this.Info[id];
    },
    /**
     * @param {Number} id 
     * @returns {Boolean}
     */
    Exists: function(id) {
        if(this.Info[id]) return true;
        else return false;
    },
    /**
     * @returns {Array[]}
     */
    Random: function() {
        let data = Object.entries(this.Info);
        return data[Math.floor(Math.random() * data.length)][1].position;
    }
}