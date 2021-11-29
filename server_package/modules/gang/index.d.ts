declare interface Info {
    id: number,
    name: string,
    position: Array<number>,
    weapons: Array<number>,
    color: number,
    alliance: number,
    points: number,
    captures: number,
    kills: number,
    deaths: number,
    base_position: Array<number>,
    gate: {
        objectid: number,
        position: Array<number>,
        object: number
    },
    territory: {
        owner: number,
        MinX: number,
        MinY: number,
        MaxX: number,
        MaxY: number,
        GangZone: number
    },
    capturing: {
        time: number,
        turf: number,
        interval: NodeJS.Timer|null
    },
    teleportcheckpoints: {
        id: number,
        position: Array<number>,
        position_to: Array<number>,
        textlabel: string,
        label: number,
        checkpoint: number
    }[]
}
export declare const Info: Info[];
export declare function Create(id: number, name: string, position: Array<number>, weapons: Array<number>, color: number, alliance: number, points: number, captures: number, kills: number, deaths: number, base_position: Array<number>, gate_objectid: number, gate_position: Array<number>, territory_position: Array<number>): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;
export declare function CreateTeleportCheckpoint(gang_id: number, id: number, position: Array<number>, position_to: Array<number>, textlabel: string): boolean;
export declare function DeleteTeleportCheckpoint(gang_id: number, id: number): boolean;
export declare function ExistsTeleportCheckpoint(gang_id: number, id: number): boolean;
export declare function Get(): Info[];
export declare function GetOwnedGangZones(id: number): Array<number>;