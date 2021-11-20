export declare const Info: {
    name: string,
    position: Array<number>,
    label: number
}[];
export declare function Create(id: number, name: string, position: Array<number>): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;
export declare function Random(): Array<number>;