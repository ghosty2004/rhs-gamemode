import {OnDialogResponse,SampEvents} from "./SampEvents";
import {ShowPlayerDialog} from "./SampFunctions";
import {SMART_DIALOG_CALLBACK} from "./SampInterface";

import {EventEmitter} from "events";

const dialogEvent = new EventEmitter();

export const ShowPlayerSmartDialog = (playerid: number, style: number, caption: string, info: string, button1: string, button2: string, callback: SMART_DIALOG_CALLBACK) => {
    return SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, callback);
};

export class SmartDialogFunctions {
    static ShowPlayerSmartDialog(playerid: number, style: number, caption: string, info: string, button1: string, button2: string, callback: SMART_DIALOG_CALLBACK): void {
        ShowPlayerDialog(playerid, 0, style, caption, info, button1, button2);
        dialogEvent.once("onResponse", (responsePlayerId, responseDialogId, responseButton, responseListItem, responseInputText) => {
            if(responsePlayerId != playerid) return;
            if(responseDialogId != 0) return;
            callback({
                button: responseButton,
                listItem: responseListItem,
                inputText: responseInputText,
                repeatDialog() {
                    SmartDialogFunctions.ShowPlayerSmartDialog(playerid, style, caption, info, button1, button2, (newCallBack) => {
                        callback(newCallBack);
                    });
                }
            })
        });
    }
}

samp.on("OnDialogResponse", (playerid, dialogid, response, listitem, inputtext) => {
    dialogEvent.emit("onResponse", playerid, dialogid, response, listitem, inputtext);
});