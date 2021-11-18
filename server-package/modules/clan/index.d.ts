export declare const Info: {
    name: string,
    owner: number,
    position: {
        x: number,
        y: number,
        z: number
    },
    weapon: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number,
        "6": number
    },
    kills: number,
    deaths: number
}[];
export declare function Create(id: number, name: string, owner: number, position: {x: number, y: number, z: number}, weapon: {"1": number, "2": number, "3": number, "4": number, "5": number, "6": number},kills: number, deaths: number): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(name: string): boolean;