declare interface Info {
    Owner: number,
    MinX: number,
    MinY: number,
    MaxX: number,
    MaxY: number,
    GangZone: number
}
export declare const Info: Info;
export declare function Create(id: number, owner: number, minX: number, minY: number, maxX: number, maxY: number): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;
export declare function Get(): Info[];