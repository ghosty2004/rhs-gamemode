module.exports = {
    Info: {},
    ResetVariables: function(player) {
        this.Info[player.playerid] = {
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
            ConnectTime: Date.now(),
            Admin: 0,
            VIP: 0,
            VIP_Expire: 0,
            Clan: 0,
            Clan_Rank: 0,
            Gang: 0,
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
            Properties: {
                Business: 0,
                House: 0
            },
            Description: {
                "1": "",
                "2": "",
                "3": ""
            },
            Editing_Stats_Description_Line: 0,
            Creating_Clan: {
                name: "",
                skin: {
                    member: 0,
                    leader: 0
                },
                color: 0xFFFFFFAA,
                weapon: {
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 0,
                    "6": 0
                }
            },
            Jailed: 0
        }
    }
};