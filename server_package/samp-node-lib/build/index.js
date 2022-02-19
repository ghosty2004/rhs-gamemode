"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampPlayer = exports.rgba = exports.getPlayers = exports.getAllVehicle = exports.DynamicObject = exports.GetVehicleModelId = exports.GetVehicleName = exports.vehicleNames = exports.TextDraws = exports.TextDraw = exports.SampNode = void 0;
__exportStar(require("./SampFunctions"), exports);
__exportStar(require("./SampEnum"), exports);
__exportStar(require("./SampEvents"), exports);
__exportStar(require("./SampNode"), exports);
exports.SampNode = require("./SampNode");
var TextDraw_1 = require("./TextDraw");
Object.defineProperty(exports, "TextDraw", { enumerable: true, get: function () { return TextDraw_1.TextDraw; } });
var TextDraws_1 = require("./TextDraws");
Object.defineProperty(exports, "TextDraws", { enumerable: true, get: function () { return TextDraws_1.TextDraws; } });
var VehicleNames_1 = require("./VehicleNames");
Object.defineProperty(exports, "vehicleNames", { enumerable: true, get: function () { return VehicleNames_1.vehicleNames; } });
Object.defineProperty(exports, "GetVehicleName", { enumerable: true, get: function () { return VehicleNames_1.GetVehicleName; } });
Object.defineProperty(exports, "GetVehicleModelId", { enumerable: true, get: function () { return VehicleNames_1.GetVehicleModelId; } });
var DynamicObject_1 = require("./DynamicObject");
Object.defineProperty(exports, "DynamicObject", { enumerable: true, get: function () { return DynamicObject_1.DynamicObject; } });
var getAllVehicle_1 = require("./getAllVehicle");
Object.defineProperty(exports, "getAllVehicle", { enumerable: true, get: function () { return getAllVehicle_1.getAllVehicle; } });
var getPlayers_1 = require("./getPlayers");
Object.defineProperty(exports, "getPlayers", { enumerable: true, get: function () { return getPlayers_1.getPlayers; } });
var rgba_1 = require("./rgba");
Object.defineProperty(exports, "rgba", { enumerable: true, get: function () { return rgba_1.rgba; } });
var SampPlayer_1 = require("./SampPlayer");
Object.defineProperty(exports, "SampPlayer", { enumerable: true, get: function () { return SampPlayer_1.SampPlayer; } });
__exportStar(require("./SmartDialog"), exports);
//# sourceMappingURL=index.js.map