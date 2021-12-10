export declare const Info: {
    id: number,
    owner: number,
    model: number,
    color: Array<number>,
    position: Array<number>,
    cartext: {
        text: string,
        fontsize: number,
        offsetposition: Array<number>,
        offsetrotation: Array<number>,
        object: null|number
    }[],
    from_admin: number,
    vehicle: null|number
}[];
export declare function Create(id: number, owner: number, model: number, color: Array<number>, position: Array<number>, cartext: Array[], from_admin: number): boolean;
export declare function Delete(id: number): boolean;
export declare function Exists(id: number): boolean;