const express = require("express");
const { getPlayers } = require("samp-node-lib");

const Clan = require("../clan");
const Gang = require("../gang");
const Player = require("../player");

const app = express();
const port = 1337; 

app.use(express.json());
app.set("json spaces", 4);

module.exports = {
    Start: function() {
        app.listen(port, () => {
            console.log(`Web server running on port ${port}`);
        });

        app.get("/api/clans", (request, response) => {
            response.json(Clan.Info);
        });

        app.get("/api/gangs", (request, response) => {
            response.json(Gang.Info);
        });

        app.get("/api/onlineplayers", (request, response) => {
            let array = [];
            getPlayers().forEach((i) => {
                array.push({
                    Id: i.playerid,
                    Name: i.GetPlayerName(24),
                    Version: i.GetPlayerVersion(24),
                    Gpci: i.gpci(41),
                    Ping: i.GetPlayerPing(),
                    Position: i.position,
                    Data: {
                        Language: Player.Info[i.playerid].Language == 1 ? "Romana" : "English",
                        AccountID: Player.Info[i.playerid].AccID,
                        Money: Player.Info[i.playerid].Money,
                        Coins: Player.Info[i.playerid].Coins,
                        Respect: Player.Info[i.playerid].Respect,
                        ConnectTime: Player.Info[i.playerid].ConnectTime,
                        OnlineTime: Player.Info[i.playerid].OnlineTime,
                        Admin: Player.Info[i.playerid].Admin,
                        AdminActivity: Player.Info[i.playerid].AdminActivity,
                        RconType: Player.Info[i.playerid].RconType,
                        VIP: Player.Info[i.playerid].VIP,
                        VIP_Expire: Player.Info[i.playerid].VIP_Expire,
                        Clan: Player.Info[i.playerid].Clan,
                        Clan_Rank: Player.Info[i.playerid].Clan_Rank,
                        Gang: Player.Info[i.playerid].Gang,
                        Gang_Data: Player.Info[i.playerid].Gang_Data,
                        Kills_Data: Player.Info[i.playerid].Kills_Data,
                        Driving_Data: Player.Info[i.playerid].Driving_Data,
                        Month: Player.Info[i.playerid].Month,
                        LastOn: Player.Info[i.playerid].LastOn
                    }
                });
            });
            response.json(array);
        });
    }
}