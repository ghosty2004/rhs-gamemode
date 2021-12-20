/* ================ */
/*      MAPS        */
/* ================ */

const { CreateObject, SetObjectMaterial } = require("samp-node-lib");
const fs = require("fs");

global.CreateObject = CreateObject;
global.SetObjectMaterial = SetObjectMaterial;
const { CreateDynamicObject, SetDynamicObjectMaterial, SetDynamicObjectMaterialText } = require("../modules/streamer");
global.CreateDynamicObject = CreateDynamicObject;
global.SetDynamicObjectMaterial = SetDynamicObjectMaterial;
global.SetDynamicObjectMaterialText = SetDynamicObjectMaterialText;

/* Player's Objects */
const PlayerObj_Class_Select = require("./player/class_select");

function getMaps() {
    return new Promise((resolve, reject) => { 
        fs.readdir("./server_package/maps", function (err, files) {
            const maps = [];
            files.forEach((i) => {
                if(i != "index.js" && i != "player") {
                    maps.push([i, fs.readdirSync(`./server_package/maps/${i}`).filter(file => file.endsWith('.js'))]);
                }
            });
            resolve(maps);
        });
    });
}

module.exports = {
    Load: async function() {
        getMaps().then((data) => {
            console.log(data)
            data.forEach((i) => {
                for(const file of i[1]) {
                    const Data = require(`./${i[0]}/${file}`);
                    if(Data.Load) Data.Load();
                }
            });
        });
    }, 
    RemoveBuildings: async function(player) {
        getMaps().then((data) => {
            data.forEach((i) => {
                for(const file of i[1]) {
                    const Data = require(`./${i[0]}/${file}`);
                    if(Data.RemoveBuilding) Data.RemoveBuilding(player);
                }
            });
        });
    },
    Custom: { PlayerObj_Class_Select }
}