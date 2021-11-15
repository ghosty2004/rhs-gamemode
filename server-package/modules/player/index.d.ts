import { SampPlayer } from "samp-node-lib";

export declare const Info: {
    LoggedIn: boolean,
    Language: number,
    Fail_Logins: number,
    Mail: string,
    Admin: number,
    VIP: number,
}[]

export declare function ResetVariables(player: SampPlayer): void;