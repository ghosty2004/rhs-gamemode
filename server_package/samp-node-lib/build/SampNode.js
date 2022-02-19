"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callNativeFloat = exports.callNative = exports.logprint = exports.callPublicFloat = exports.callPublic = exports.fire = exports.registerEvent = exports.removeEventListener = exports.removeListener = exports.addEventListener = exports.addListener = exports.on = void 0;
const on = (eventName, func) => {
    samp.on(eventName, func);
};
exports.on = on;
const addListener = (eventName, func) => {
    samp.addListener(eventName, func);
};
exports.addListener = addListener;
const addEventListener = (eventName, func) => {
    samp.addEventListener(eventName, func);
};
exports.addEventListener = addEventListener;
const removeListener = (eventName, func) => {
    samp.removeListener(eventName, func);
};
exports.removeListener = removeListener;
const removeEventListener = (eventName, func) => {
    samp.removeEventListener(eventName, func);
};
exports.removeEventListener = removeEventListener;
const registerEvent = (eventName, paramTypes) => {
    return samp.registerEvent(eventName, paramTypes);
};
exports.registerEvent = registerEvent;
const fire = (eventName, ...args) => {
    samp.fire(eventName, ...args);
};
exports.fire = fire;
const callPublic = (publicName, paramTypes, ...args) => {
    return samp.callPublic(publicName, paramTypes, ...args);
};
exports.callPublic = callPublic;
const callPublicFloat = (publicName, paramTypes, ...args) => {
    return samp.callPublicFloat(publicName, paramTypes, ...args);
};
exports.callPublicFloat = callPublicFloat;
const logprint = (str) => {
    return samp.logprint(str);
};
exports.logprint = logprint;
const callNative = (nativeName, paramTypes, ...args) => {
    return samp.callNative(nativeName, paramTypes, ...args);
};
exports.callNative = callNative;
const callNativeFloat = (nativeName, paramTypes, ...args) => {
    return samp.callNativeFloat(nativeName, paramTypes, ...args);
};
exports.callNativeFloat = callNativeFloat;
//# sourceMappingURL=SampNode.js.map