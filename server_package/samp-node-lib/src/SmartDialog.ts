/**
 * Smart Dialog by @Ghosty2004
 */

import {ShowPlayerDialog} from "./SampFunctions";
import {SMART_DIALOG_CALLBACK, SMART_DIALOG_SHOWING} from "./SampInterface";

import {EventEmitter} from "events";

const dialogEvent = new EventEmitter();
const showingDialog: SMART_DIALOG_SHOWING = {};

export const ShowPlayerSmartDialog = (playerid: number, style: number, caption: string, info: string, button1: string, button2: string, callback: SMART_DIALOG_CALLBACK) => {
    return SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, callback);
};

export class SmartDialogFunctions {
    static ShowPlayerSmartDialog(playerid: number, style: number, caption: string, info: string, button1: string, button2: string, callback: SMART_DIALOG_CALLBACK): void {
        ShowPlayerDialog(playerid, 0, style, caption, info, button1, button2);
        showingDialog[playerid] = true;
 
        function onResponse(responsePlayerId: number, responseDialogId: number, responseButton: number, responseListItem: number, responseInputText: string) {
            if(responsePlayerId != playerid) return;
            if(responseDialogId != 0) return;
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

        function onDisconnect(disconnectedPlayerId: number) {
            if(disconnectedPlayerId != playerid) return;
            removeAllListeners();
        }

        function onNewDialog(playerId: number) {
            if(playerId != playerid) return;
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

samp.on("OnDialogResponse", (playerid, dialogid, response, listitem, inputtext) => {
    if(showingDialog[playerid] == true) dialogEvent.emit("onNewDialog");
    dialogEvent.emit("onResponse", playerid, dialogid, response, listitem, inputtext);
});

samp.on("OnPlayerDisconnect", (playerid, reason) => {
    dialogEvent.emit("onDisconnect", playerid);
    delete showingDialog[playerid];
});

samp.on("OnPlayerConnect", (playerid) => {
    showingDialog[playerid] = false;
});