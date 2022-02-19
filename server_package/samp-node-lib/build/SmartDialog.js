"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDialogFunctions = exports.ShowPlayerSmartDialog = void 0;
const SampFunctions_1 = require("./SampFunctions");
const events_1 = require("events");
const dialogEvent = new events_1.EventEmitter();
const ShowPlayerSmartDialog = (playerid, style, caption, info, button1, button2, callback) => {
    return SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, callback);
};
exports.ShowPlayerSmartDialog = ShowPlayerSmartDialog;
class SmartDialogFunctions {
    static ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, callback) {
        (0, SampFunctions_1.ShowPlayerDialog)(playerid, 0, style, caption, info, button1, button2);
        function onResponse(responsePlayerId, responseDialogId, responseButton, responseListItem, responseInputText) {
            if (responsePlayerId != playerid)
                return;
            if (responseDialogId != 0)
                return;
            callback({
                button: responseButton,
                listItem: responseListItem,
                inputText: responseInputText,
                repeatDialog() {
                    SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, (newCallBack) => {
                        callback(newCallBack);
                    });
                }
            });
            dialogEvent.removeListener("onResponse", onResponse);
        }
        dialogEvent.on("onResponse", onResponse);
    }
}
exports.SmartDialogFunctions = SmartDialogFunctions;
samp.on("OnDialogResponse", (playerid, dialogid, response, listitem, inputtext) => {
    dialogEvent.emit("onResponse", playerid, dialogid, response, listitem, inputtext);
});
//# sourceMappingURL=SmartDialog.js.map