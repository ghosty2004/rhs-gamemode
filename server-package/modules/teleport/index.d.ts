export declare const Info: {
    id: number,
    name: string,
    position: Array<string>
}[];
export declare function Create(id: number, commandname: string, name: string, position: Array<string>): boolean;
export declare function Delete(commandname: string): boolean;
export declare function Exists(commandname: string): boolean;
export declare function ExistsId(id: number): boolean;