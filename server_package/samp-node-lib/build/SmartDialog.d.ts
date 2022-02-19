import { SMART_DIALOG_CALLBACK } from "./SampInterface";
export declare const ShowPlayerSmartDialog: (playerid: number, style: number, caption: string, info: string, button1: string, button2: string, callback: SMART_DIALOG_CALLBACK) => void;
export declare class SmartDialogFunctions {
    static ShowPlayerSmartDialog(playerid: number, style: number, caption: string, info: string, button1: string, button2: string, callback: SMART_DIALOG_CALLBACK): void;
}
