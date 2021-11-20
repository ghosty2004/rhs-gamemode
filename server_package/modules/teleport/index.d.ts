export declare const Info: {
    id: number,
    name: string,
    position: Array<number>
}[];
export declare function Create(id: number, commandname: string, name: string, position: Array<number>): boolean;
export declare function Delete(commandname: string): boolean;
export declare function Exists(commandname: string): boolean;
export declare function ExistsId(id: number): boolean;