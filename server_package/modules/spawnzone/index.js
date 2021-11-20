const { SERVER_WEB } = require("../../data/settings");
const { CreateDynamic3DTextLabel } = require("../streamer");

module.exports = {
    Info: {},
    Create: function(id, name, position) {
        if(!this.Info[id]) {
            this.Info[id] = {
                name: name,
                position: position,
                label: CreateDynamic3DTextLabel(`{FF0000}Spawn Zone\n{BBFF00}Type {00BBF6}/HM {BBFF00}for free health & armour!\n{00BBF6}${SERVER_WEB}`, -1, position[0], position[1], position[2], 30)
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
    },
    Random: function() {
        let data = Object.entries(this.Info);
        return data[Math.floor(Math.random() * data.length)][1].position;
    }
}