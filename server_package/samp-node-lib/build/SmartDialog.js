"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDialogFunctions = exports.ShowPlayerSmartDialog = void 0;
const SampFunctions_1 = require("./SampFunctions");
const events_1 = require("events");
const dialogEvent = new events_1.EventEmitter();
const showingDialog = {};
const ShowPlayerSmartDialog = (playerid, style, caption, info, button1, button2, callback) => {
    return SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, callback);
};
exports.ShowPlayerSmartDialog = ShowPlayerSmartDialog;
class SmartDialogFunctions {
    static ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, callback) {
        (0, SampFunctions_1.ShowPlayerDialog)(playerid, 0, style, caption, info, button1, button2);
        showingDialog[playerid] = true;
        function onResponse(responsePlayerId, responseDialogId, responseButton, responseListItem, responseInputText) {
            if (responsePlayerId != playerid)
                return;
            if (responseDialogId != 0)
                return;
            callback({
                button: responseButton,
                listItem: responseListItem,
                inputText: responseInputText,
                repeatDialog(repeatInfo = info) {
                    SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, repeatInfo, button1, button2, (newCallBack) => {
                        callback(newCallBack);
                    });
                }
            });
            showingDialog[playerid] = false;
            removeAllListeners();
        }
        function onDisconnect(disconnectedPlayerId) {
            if (disconnectedPlayerId != playerid)
                return;
            removeAllListeners();
        }
        function onNewDialog(playerId) {
            if (playerId != playerid)
                return;
            removeAllListeners();
        }
        dialogEvent.on("onResponse", onResponse);
        dialogEvent.on("onDisconnect", onDisconnect);
        dialogEvent.on("onNewDialog", onNewDialog);
        function removeAllListeners() {
            dialogEvent.removeListener("onResponse", onResponse);
            dialogEvent.removeListener("onDisconnect", onDisconnect);
            dialogEvent.removeListener("onNewDialog", onNewDialog);
        }
    }
}
exports.SmartDialogFunctions = SmartDialogFunctions;
samp.on("OnDialogResponse", (playerid, dialogid, response, listitem, inputtext) => {
    if (showingDialog[playerid] == true)
        dialogEvent.emit("onNewDialog");
    dialogEvent.emit("onResponse", playerid, dialogid, response, listitem, inputtext);
});
samp.on("OnPlayerDisconnect", (playerid, reason) => {
    dialogEvent.emit("onDisconnect", playerid);
    delete showingDialog[playerid];
});
samp.on("OnPlayerConnect", (playerid) => {
    showingDialog[playerid] = false;
});
//# sourceMappingURL=SmartDialog.js.map