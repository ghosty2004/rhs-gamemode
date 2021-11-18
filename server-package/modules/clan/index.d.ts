export declare const Info: {
    name: string,
    owner: number,
    position: {
        x: number,
        y: number,
        z: number
    },
    kills: number,
    deaths: number
}[];
export declare function Create(id: number, name: string, owner: number, position: {x: number, y: number, z: number}, kills: number, deaths: number): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(name: string): boolean;