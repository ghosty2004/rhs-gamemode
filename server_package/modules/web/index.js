const express = require("express");
const { getPlayers } = require("samp-node-lib");
const Player = require("../player");

/* ============ */
/* Some Configs */
/* ============ */
const app = express();
const port = 1337; 

app.use(express.json());
app.set("json spaces", 4);

app.listen(port, () => {
    console.log(`Web server running on port ${port}`);
});

app.get("/api/onlineplayers", (request, response) => {
    let array = [];
    getPlayers().forEach((i) => {
        array.push({
            id: i.playerid,
            name: i.GetPlayerName(24),
            version: i.GetPlayerVersion(24),
            gpci: i.gpci(41),
            money: i.GetPlayerMoney(),
            ping: i.GetPlayerPing(),
            position: i.position
        });
    });
    response.json(array);
});