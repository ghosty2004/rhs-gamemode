declare interface Info {
    name: string,
    owner: number,
    position: Array<number>,
    weapons: Array<number>,
    color: number,
    skin: {
        member: number,
        leader: number
    }
    kills: number,
    deaths: number
}[];
export declare const Info: Info[];
export declare function Create(id: number, name: string, owner: number, position: Array<number>, weapons: Array<number>, color: number, skin: {member: number, leader: number}, kills: number, deaths: number): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;
export declare function ExistsName(name: string): boolean;
export declare function Get(): Info[];