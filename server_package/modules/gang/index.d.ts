export declare const Info: {
    name: string,
    position: Array<number>,
    kills: number,
    deaths: number
}[];
export declare function Create(id: number, name: string, position: Array<number>, kills: number, deaths: number): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;