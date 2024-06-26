import {SampPlayer} from "./SampPlayer";

export class SampPlayers {
    static ids: any = {};

    static getNewClass(playerid: number): SampPlayer {
        SampPlayers.ids[`id${playerid}`] = new SampPlayer(playerid);
        return SampPlayers.ids[`id${playerid}`];
    }

    static getClass(playerid: number): SampPlayer {
        if (SampPlayers.ids[`id${playerid}`] === undefined) {
            SampPlayers.ids[`id${playerid}`] = new SampPlayer(playerid);
        }
        return SampPlayers.ids[`id${playerid}`];
    }

    static removeClass(playerid: number) {
        if (SampPlayers.ids[`id${playerid}`] !== undefined) {
            const playerClass = SampPlayers.ids[`id${playerid}`];
            delete SampPlayers.ids[`id${playerid}`];
            return playerClass;
        }
        return new SampPlayer(playerid);
    }
}