const { getPlayers, SampPlayer } = require("samp-node-lib");

const { LIGHT_GREEN } = require("../../data/colors");
const { gangWarInfo1, gangWarInfo2 } = require("../../textdraws/player");
const { UNEXPECTED } = require("../errors");

const Gang = require("../gang");
const Player = require("../player");

module.exports = {
    /**
     * @type {[{inviterGang: Number, invitedGang: Number, status: "preparing"|"started", map: Number, weapon: Number}]}
     */
    Info: [],
    /**
     * @type {[{name: String, positionInviter: Number[], positionInvited: Number[], interiorId: Number}]}
     */
    Maps: [
        {name: "Whetstone", positionInviter: [0, 0, 0, 0], positionInvited: [0, 0, 0, 0], interiorId: 0},
        {name: "SF Old Factory", positionInviter: [0, 0, 0, 0], positionInvited: [0, 0, 0, 0], interiorId: 0},
        {name: "LV police HQ", positionInviter: [288.7433, 168.1029, 1007.1719, 2.4031], positionInvited: [238.5836, 140.0862, 1003.0234, 0.1704], interiorId: 3},
        {name: "Meat Factory", positionInviter: [948.5914, 2176.9919, 1011.0234, 179.7532], positionInvited: [962.7989, 2108.2217, 1011.0303, 91.3533], interiorId: 1}
    ],
    /**
     * @type {[{name: String, guns: Number[]}]}
     */
    Weapons: [
        {name: "Walking Weapons", guns: []},
        {name: "Running Weapons", guns: []}
    ],
    /**
     * @param {SampPlayer} player
     * @param {Number} invitedGang 
     */
    Invite(player, invitedGang) {
        return new Promise((resolve, reject) => {
            let inviterGangResult = Gang.Info.find(f => f.id == Player.Info[player.playerid].Gang);
            let invitedGangResult = Gang.Info.find(f => f.id == invitedGang);
            if(!inviterGangResult || !invitedGangResult) return reject(UNEXPECTED);
            if(this.Info.some(s => s.inviterGang == inviterGangResult.id && s.invitedGang == invitedGangResult.id)) return reject("An invitation for this gang is already sent!");
            if(inviterGangResult.id == invitedGangResult.id) return reject("You can't invite this gang to gwar!");
            let index = this.Info.push({
                inviterGang: inviterGangResult.id,
                invitedGang: invitedGangResult.id,
                status: "preparing",
                map: 0,
                weapon: 0
            });
            let gwarId = (index - 1);
            getPlayers().filter(f => Player.Info[f.playerid].Gang == invitedGangResult.id).forEach((i) => {
                i.SendClientMessage(LIGHT_GREEN, `GWAR Invite: {FFB300}${player.GetPlayerName(24)} {2EC32E}from {FFB300}${inviterGangResult.name} {2EC32E}invited your gang to war! {FFB300}/gwar join ${gwarId}`);
            });
            resolve(gwarId);
        });
    },
    /**
     * @param {SampPlayer} player 
     */
    Join(player, gwarId) {
        return new Promise((resolve, reject) => {
            if(!this.Info[gwarId]) return reject("This gwar id not exists!");
            if(this.Info[gwarId].status == "started") return reject("You can't join in started wars!");
            player.SetPlayerPos(-1394.2000, 987.6200, 1023.9598);
            player.SetPlayerFacingAngle(176.8759);
            player.SetPlayerInterior(15);
            player.SetPlayerVirtualWorld(gwarId + 999);
            player.ResetPlayerWeapons();
            Player.Info[player.playerid].inGwar = gwarId;
            resolve(true);
        });
    },
    /**
     * @param {SampPlayer} player 
     * @param {Number} mapId 
     */
    setMap(player, mapId) {
        let index = Player.Info[player.playerid].inGwar;
        if(!this.Info[index]) return;
        this.Info[index].map = mapId;
        getPlayers().filter(f => Player.Info[f.playerid].inGwar == index).forEach((i) => {
            i.SendClientMessage(LIGHT_GREEN, `GWAR Map: {FF0000}${player.GetPlayerName(24)} {2EC32E}changed map to: {FFB300}${this.Maps[mapId].name}`);
        });
    },
    /**
     * @param {SampPlayer} player 
     * @param {Number} weaponId 
     */
    setWeapon(player, weaponId) {
        let index = Player.Info[player.playerid].inGwar;
        if(!this.Info[index]) return;
        this.Info[index].weapon = weaponId;
        getPlayers().filter(f => Player.Info[f.playerid].inGwar == index).forEach((i) => {
            i.SendClientMessage(LIGHT_GREEN, `GWAR Weapons: {FF0000}${player.GetPlayerName(24)} {2EC32E}changed weapons to: {FFB300}${this.Weapons[weaponId].name}`);
        });
    },
    /**
     * @param {SampPlayer} player 
     */
    Start(player) {
        return new Promise((resolve, reject) => {
            let index = Player.Info[player.playerid].inGwar;
            if(!this.Info[index]) reject(UNEXPECTED);
            let inviterGangPlayers = getPlayers().filter(f => Player.Info[f.playerid].inGwar == index && Player.Info[f.playerid].Gang == this.Info[index].inviterGang);
            let invitedGangPlayers = getPlayers().filter(f => Player.Info[f.playerid].inGwar == index && Player.Info[f.playerid].Gang == this.Info[index].invitedGang);
            if(inviterGangPlayers.length < 1 || invitedGangPlayers.length < 1) return reject("There needs to be at least 1 player in each gang!");
            resolve(true);
        });
    },
    Stop(gwarId) {
        return new Promise((resolve, reject) => {
            if(!this.Info[gwarId]) return reject("This gwar id not exists!");
            if(this.Info[gwarId].status == "started") return reject("You can't stop started wars!");
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId).forEach((i) => {
                Player.Info[i.playerid].inGwar = -1;
                i.GameTextForPlayer("~r~~h~gwar canceled", 4000, 3);
                i.SpawnPlayer();
            });
            this.Info.splice(gwarId, 1);
            resolve(true);
        });
    }
}