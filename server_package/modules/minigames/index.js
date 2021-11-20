const { CreateObject, SetObjectPos } = require("samp-node-lib");
const { getRandomInt } = require("../functions");
const { CreateDynamic3DTextLabel, DestroyDynamic3DTextLabel, Update } = require("../streamer");

module.exports = {
    Targets: {
        Weapon: 33,
        HitObject: null,
        HitLabel: null,
        Hit: function(player) {
            let position = [];
            let random = getRandomInt(0, 5);
            switch(random) {
                case 0: position = [-457.1568, -2668.6938, 1071.0626]; break;
                case 1: position = [-468.6585, -2667.5754, 1071.0626]; break;
                case 2: position = [-471.4542, -2678.4880, 1071.0626]; break;
                case 3: position = [-462.5624, -2681.6790, 1071.0626]; break;
                case 4: position = [-456.6401, -2676.4048, 1071.0626]; break;
                case 5: position = [-462.4262, -2674.7219, 1071.0626]; break;
            }
            SetObjectPos(this.HitObject, position[0], position[1], position[2]);
            DestroyDynamic3DTextLabel(this.HitLabel);
            this.HitLabel = CreateDynamic3DTextLabel(`{FF0000}Hit by {FFFFFF}${player.GetPlayerName(24)}`, -1, position[0], position[1], position[2], 50); 
            Update(player.playerid);
        }
    },
    Load: function() {
        this.Targets.HitObject = CreateObject(1276, -457.156891, -2668.693848, 1071.062622, 0.000000, 0.000000, -90.000000, 3139.0);
        this.Targets.HitLabel = CreateDynamic3DTextLabel("{FF0000}Hit by {FFFFFF}None", -1, -457.156891, -2668.693848, 1071.062622, 50); 
    }
}