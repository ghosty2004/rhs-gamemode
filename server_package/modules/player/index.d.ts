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
    Gang_Data: {
        Rank: number,
        Kills: number,
        Deaths: number,
        Captures: number,
        Points: number,
        Warns: number,
        OnlineTime: {
            Hours: number,
            Minutes: number,
            Seconds: number
        },
        MemberSince: string,
        ConnectTime: number,
        Capturing: boolean,
        Capturing_Label: null|number
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
    Caged: number,
    Kicks: number,
    Last_Chat_Message: number,
    Last_Command: number,
    SpecialZone: {
        Targets: boolean
    },
    TargetsPoints: number,
    TargetsLastShot: number,
    ClickedPlayer: number,
    DiscordLoginRequest: {
        From: null|string,
        Code: number
    },
    Discord: number,
    HideTextDraws: boolean,
    GodMode: boolean,
    GodCar: boolean,
    Atrade: number,
    Trade: {
        Sell: {
            Item: number,
            Value: number
        },
        Buy: {
            Item: number,
            Value: number
        }
    },
    TradeRequestFrom: number,
    Reported: {
        By: number,
        Reason: string
    },
    SpawnedCar: number,
    Spectating: number,
    YouTubeSearchResults: Array<any>,
    CageObjects: Array<any>,
    AFK: boolean,
    Need_Mail_Showed: boolean,
    Rank_Label: null|number,
    In_DM: "none"|"minigun"|"de"|"m4"|"os"|"sniper"|"mrf"|"garena"|"oh"|"prodm"|"helldm"|"gunwar",
    Selected_MRF_Weapon: null|38|35|37
}[]

export declare function ResetVariables(playerid: number): void;