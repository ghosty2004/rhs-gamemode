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
    AdminActivity: {
        Points: number,
        Kicks: number,
        Warns: number,
        Bans: number,
        ReactionTests: number,
        MathTests: number,
        Jails: number,
        Mutes: number,
        ClearChats: number,
        Since: string
    },
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
    LastOn: "Unknown",
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
    In_Minigame: "none"|"gifts"|"hns"|"lastman"|"targets",
    TargetsPoints: number,
    TargetsLastShot: number,
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
        On: number,
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
    CageObjects: Array<any>,
    AFK: boolean,
    Need_Mail_Showed: boolean,
    Rank_Label: null|number,
    In_DM: "none"|"minigun"|"de"|"m4"|"os"|"sniper"|"mrf"|"garena"|"oh"|"prodm"|"helldm"|"gunwar",
    Selected_MRF_Weapon: null|38|35|37,
    Holds: {
        index: number,
        used: boolean,
        model: number,
        bone: number,
        offsetposition: Array<number>,
        offsetrotation: Array<number>,
        offsetscale: Array<number>
    }[],
    HoldsData: {
        Editing: null|number,
        CreatingId: number,
        Settings: number
    },
    EditingCarText: {
        Fontsize: number,
        Index: number
    },
    InHouse: number,
    InBusiness: number,
    inGwar: number
}[];

export declare function ResetVariables(playerid: number): void;