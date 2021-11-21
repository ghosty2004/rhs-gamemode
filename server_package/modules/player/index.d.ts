import { SampPlayer } from "samp-node-lib";

export declare const Info: {
    LoggedIn: boolean,
    Language: number,
    Fail_Logins: number,
    AccID: number,
    Mail: string,
    Money: number,
    Coins: number,
    Respect: {
        Positive: number,
        Negative: number
    },
    ConnectTime: number,
    OnlineTime: {
        Hours: number,
        Minutes: number,
        Seconds: number
    },
    Admin: number,
    RconType: number,
    VIP: number,
    VIP_Expire: number,
    Clan: number,
    Clan_Rank: number,
    Gang: number,
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
    AdminPoints: number,
    Month: {
        OnlineTime: {
            Hours: number,
            Minutes: number,
            Seconds: number
        },
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
        }
    },
    Description: {
        "1": string,
        "2": string,
        "3": string
    },
    Editing_Stats_Description_Line: number,
    Creating_Clan: {
        name: string,
        skin: {
            member: number,
            leader: number
        },
        color: number,
        weapons: Array<number>
    },
    Jailed: number,
    Last_Chat_Message: number,
    SpecialZone: {
        Targets: boolean
    },
    TargetsPoints: number,
    ClickedPlayer: SampPlayer,
    DiscordLoginRequest: {
        From: null|string,
        Code: number
    },
    Discord: number,
    HideTextDraws: boolean
}[]

export declare function ResetVariables(player: SampPlayer): void;