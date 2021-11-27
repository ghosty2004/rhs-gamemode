declare interface Info {
    name: string,
    position: Array<number>,
    weapons: Array<number>,
    color: number,
    alliance: number,
    points: number,
    captures: number,
    kills: number,
    deaths: number,
    territory: {
        owner: number,
        MinX: number,
        MinY: number,
        MaxX: number,
        MaxY: number,
        GangZone: number
    },
    In_Capture: number
}
export declare const Info: Info[];
export declare function Create(id: number, name: string, position: Array<number>, weapons: Array<number>, color: number, alliance: number, points: number, captures: number, kills: number, deaths: number, territory_owner: number, territory_position: Array<number>): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;
export declare function Get(): Info[];