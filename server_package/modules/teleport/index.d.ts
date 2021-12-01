export declare const Info: {
    id: number,
    command: string,
    type: "stunts"|"jumps"|"drifts"|"challanges"|"partys"|"splaces"|"others",
    name: string,
    position: Array<number>
}[];
export declare function Create(id: number, type: string, commandname: string, name: string, position: Array<number>): boolean;
export declare function Delete(commandname: string): boolean;
export declare function Exists(commandname: string): boolean;