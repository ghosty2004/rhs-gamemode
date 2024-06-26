module.exports = {
    Info: {},
    ResetVariables: function(playerid) {
        this.Info[playerid] = {
            LoggedIn: false,
            Language: 0,
            Fail_Logins: 0,
            AccID: 0,
            Mail: "none",
            Money: 0,
            Coins: 0,
            Respect: {
                Positive: 0,
                Negative: 0
            },
            ConnectTime: Math.floor(Date.now() / 1000),
            OnlineTime: {
                Hours: 0,
                Minutes: 0,
                Seconds: 0
            },
            Admin: 0,
            AdminActivity: {
                Points: 0,
                Kicks: 0,
                Warns: 0,
                Bans: 0,
                ReactionTests: 0,
                MathTests: 0,
                Jails: 0,
                Mutes: 0,
                ClearChats: 0,
                Since: "Unknown"
            },
            RconType: 0,
            VIP: 0,
            VIP_Expire: 0,
            Clan: 0,
            Clan_Rank: 0,
            Gang: 0,
            Gang_Data: {
                Rank: 0,
                Kills: 0,
                Deaths: 0,
                Captures: 0,
                Points: 0,
                Warns: 0,
                OnlineTime: {
                    Hours: 0,
                    Minutes: 0,
                    Seconds: 0
                },
                MemberSince: "Unknown",
                ConnectTime: Math.floor(Date.now() / 1000),
                Capturing: false,
                Capturing_Label: null
            },
            Kills_Data: {
                Kills: 0,
                HeadShots: 0,
                KillingSpree: 0,
                BestKillingSpree: 0,
                Deaths: 0
            },
            Driving_Data: {
                DriftPoints: 0,
                StuntPoints: 0,
                RacePoints: 0,
            },
            Month: {
                OnlineTime: {
                    Hours: 0,
                    Minutes: 0,
                    Seconds: 0
                },
                Kills_Data: {
                    Kills: 0,
                    HeadShots: 0,
                    KillingSpree: 0,
                    BestKillingSpree: 0,
                    Deaths: 0
                },
                Driving_Data: {
                    DriftPoints: 0,
                    StuntPoints: 0,
                    RacePoints: 0,
                }
            },
            Description: {
                "1": "",
                "2": "",
                "3": ""
            },
            LastOn: "Unknown",
            Creating_Clan: {
                name: "",
                skin: {
                    member: 0,
                    leader: 0
                },
                color: 0xFFFFFFAA,
                weapons: [0, 0, 0, 0, 0, 0]
            },
            Jailed: 0,
            Caged: 0,
            Kicks: 0,
            Last_Chat_Message: Math.floor(Date.now() / 1000),
            Last_Command: Math.floor(Date.now() / 1000),
            In_Minigame: "none",
            TargetsPoints: 0,
            TargetsLastShot: Math.floor(Date.now() / 1000),
            DiscordLoginRequest: {
                From: null,
                Code: 0
            },
            Discord: 0,
            HideTextDraws: false,
            GodMode: false,
            GodCar: false,
            Atrade: -1,
            Trade: {
                On: -1,
                Sell: {
                    Item: -1,
                    Value: 0
                },
                Buy: {
                    Item: -1,
                    Value: 0
                }
            },
            TradeRequestFrom: -1,
            Reported: {
                By: -1,
                Reason: ""
            },
            SpawnedCar: -1,
            Spectating: -1,
            CageObjects: [],
            AFK: false,
            Need_Mail_Showed: false,
            Rank_Label: null,
            In_DM: "none",
            Selected_MRF_Weapon: null,
            Holds: [],
            HoldsData: {
                Editing: null,
                CreatingId: 0,
                Settings: 0
            },
            EditingCarText: {
                Fontsize: 5,
                Index: 0
            },
            InHouse: 0,
            InBusiness: 0,
            inGwar: -1
        }

        /* ===================== */
        /* Reset Holds Variables */
        /* ===================== */
        for(let i = 0; i < 10; i++) {
            this.Info[playerid].Holds.push({
                index: i,
                used: false,
                model: 0,
                bone: 0,
                offsetposition: [0, 0, 0],
                offsetrotation: [0, 0, 0],
                offsetscale: [0, 0, 0]
            });
        }
    }
};