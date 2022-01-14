const Gifts = require("./gifts");
const HSN = require("./hns");
const LastMan = require("./lastman");
const Targets = require("./targets");

const Load = function() {
    Gifts.Load();
    HSN.Load();
    LastMan.Load();
    Targets.Load();
}

module.exports = {Targets, Load};