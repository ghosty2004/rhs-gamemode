import { SampPlayer } from "samp-node-lib";

export declare const Info: {
    LoggedIn: boolean,
    Language: number,
    Fail_Logins: number,
    Mail: string,
    Money: number,
    Coins: number,
    Respect: {
        Positive: number,
        Negative: number
    },
    ConnectTime: number,
    Admin: number,
    VIP: number,
    Kills_Data: {
        Kills: number,
        HeadShots: number,
        KillingSpree: number,
        BestKillingSpree: number,
        Deaths: number
    },
    Driving_Data: {
        DriftPoints: number,
        StuntPoints: number,
        RacePoints: number,

    },
    Properties: {
        Business: number,
        House: number
    },
    Description: {
        "1": string,
        "2": string,
        "3": string
    },
    Editing_Stats_Description_Line: number
}[]

export declare function ResetVariables(player: SampPlayer): void;