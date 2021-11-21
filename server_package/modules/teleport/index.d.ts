declare interface Info {
    id: number,
    command: string,
    type: string,
    name: string,
    position: Array<number>
}
export declare const Info: Info;
export declare function Create(id: number, type: string, commandname: string, name: string, position: Array<number>): boolean;
export declare function Delete(commandname: string): boolean;
export declare function Exists(commandname: string): boolean;
export declare function ExistsId(id: number): boolean;
export declare function Get(): Info[];