const { getPlayers, SampPlayer } = require("samp-node-lib");

const { LIGHT_GREEN } = require("../../data/colors");
const { gangWarInfo1, gangWarInfo2 } = require("../../textdraws/player");
const { UNEXPECTED } = require("../errors");

const Gang = require("../gang");
const Player = require("../player");

module.exports = {
    /**
     * @type {[{inviterGang: Number, invitedGang: Number, status: "preparing"|"started"|"someOneWin", map: Number, weapon: Number, requiredPoints: Number, inviterGangPoints: Number, invitedGangPoints: Number}]}
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
        {name: "Walking Weapons", guns: [24, 25, 34]},
        {name: "Running Weapons", guns: [24, 26, 31]}
    ],
    /**
     * @param {SampPlayer} player
     */
    addPointTo(player) {
        let gwarId = Player.Info[player.playerid].inGwar;
        if(!this.Info[gwarId]) return;
        if(this.Info[gwarId].inviterGang == Player.Info[player.playerid].Gang) {
            this.Info[gwarId].inviterGangPoints += 1;
            if(this.Info[gwarId].inviterGangPoints == this.Info[gwarId].requiredPoints) this.Win(gwarId, "inviter");
        } else {
            this.Info[gwarId].invitedGangPoints += 1;
            if(this.Info[gwarId].invitedGangPoints == this.Info[gwarId].requiredPoints) this.Win(gwarId, "invited");
        }
        this.setGwarType(gwarId, "updateTextDraws");
    },
    /**
     * @param {Number} gwarId 
     * @param {"inviter"|"invited"|"unknown"} who 
     */
    Win(gwarId, who) {
        if(!this.Info[gwarId]) return;
        this.Info[gwarId].status = "someOneWin";
        if(who == "inviter") {
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && this.Info[gwarId].inviterGang == Player.Info[f.playerid].Gang).forEach((i) => { this.Kick(i, "~g~~h~gwar win"); });
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && this.Info[gwarId].invitedGang == Player.Info[f.playerid].Gang).forEach((i) => { this.Kick(i, "~r~~h~gwar lost"); });
        } else if(who == "invited") {
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && this.Info[gwarId].invitedGang == Player.Info[f.playerid].Gang).forEach((i) => { this.Kick(i, "~g~~h~gwar win"); });
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && this.Info[gwarId].inviterGang == Player.Info[f.playerid].Gang).forEach((i) => { this.Kick(i, "~r~~h~gwar lost"); });
        }
        else if(who == "unknown") { }
        this.setGwarType(gwarId, "hideTextDraws");
        this.Info.splice(gwarId, 1);
    },
    /**
     * @param {Number} gwarId 
     * @param {"showTextDraws"|"hideTextDraws"|"updateTextDraws"|"spawnPlayers"} type 
     */
    setGwarType(gwarId, type) {
        if(!this.Info[gwarId]) return;
        let inviterGang = Gang.Info.find(f => f.id == this.Info[gwarId].inviterGang);
        let invitedGang = Gang.Info.find(f => f.id == this.Info[gwarId].invitedGang);
        let inviterPlayers = getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && Player.Info[f.playerid].Gang == inviterGang.id);
        let invitedPlayers = getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && Player.Info[f.playerid].Gang == invitedGang.id);
        inviterPlayers.forEach((i) => { 
            switch(type) {
                case "showTextDraws": i.PlayerTextDrawShow(gangWarInfo1[i.playerid]), i.PlayerTextDrawShow(gangWarInfo2[i.playerid]); break;
                case "hideTextDraws": i.PlayerTextDrawHide(gangWarInfo1[i.playerid]), i.PlayerTextDrawHide(gangWarInfo1[i.playerid]); break;
                case "updateTextDraws": {
                    i.PlayerTextDrawSetString(gangWarInfo1[i.playerid], `${inviterGang.name}: ~r~~h~${this.Info[gwarId].inviterGangPoints}`);
                    i.PlayerTextDrawColor(gangWarInfo1[i.playerid], inviterGang.color);
                    i.PlayerTextDrawSetString(gangWarInfo2[i.playerid], `${invitedGang.name}: ~r~~h~${this.Info[gwarId].invitedGangPoints}`);
                    i.PlayerTextDrawColor(gangWarInfo2[i.playerid], invitedGang.color);
                    break;
                }
                case "spawnPlayers": this.spawnPlayerInMatch(i); break;
            }
        });
        invitedPlayers.forEach((i) => { 
            switch(type) {
                case "showTextDraws": i.PlayerTextDrawShow(gangWarInfo1[i.playerid]), i.PlayerTextDrawShow(gangWarInfo2[i.playerid]); break;
                case "hideTextDraws": i.PlayerTextDrawHide(gangWarInfo1[i.playerid]), i.PlayerTextDrawHide(gangWarInfo1[i.playerid]); break;
                case "updateTextDraws": {
                    i.PlayerTextDrawSetString(gangWarInfo1[i.playerid], `${invitedGang.name}: ~r~~h~${this.Info[gwarId].invitedGangPoints}`);
                    i.PlayerTextDrawColor(gangWarInfo1[i.playerid], invitedGang.color);
                    i.PlayerTextDrawSetString(gangWarInfo2[i.playerid], `${inviterGang.name}: ~r~~h~${this.Info[gwarId].inviterGangPoints}`);
                    i.PlayerTextDrawColor(gangWarInfo2[i.playerid], inviterGang.color);
                    break;
                }
                case "spawnPlayers": this.spawnPlayerInMatch(i); break;
            }
        });
    },
    /**
     * @param {SampPlayer} player 
     */
    spawnPlayerInMatch(player) {
        let gwarId = Player.Info[player.playerid].inGwar;
        if(!this.Info[gwarId]) return;
        if(this.Info[gwarId].inviterGang == Player.Info[player.playerid].Gang) {
            player.SetPlayerPos(this.Maps[this.Info[gwarId].map].positionInviter[0], this.Maps[this.Info[gwarId].map].positionInviter[1], this.Maps[this.Info[gwarId].map].positionInviter[2]);
            player.SetPlayerFacingAngle(this.Maps[this.Info[gwarId].map].positionInviter[3]);
        } else {
            player.SetPlayerPos(this.Maps[this.Info[gwarId].map].positionInvited[0], this.Maps[this.Info[gwarId].map].positionInvited[1], this.Maps[this.Info[gwarId].map].positionInvited[2]);
            player.SetPlayerFacingAngle(this.Maps[this.Info[gwarId].map].positionInvited[3]);
        }
        player.SetPlayerInterior(this.Maps[this.Info[gwarId].map].interiorId);
        player.SetPlayerVirtualWorld(gwarId + 999);
        player.ResetPlayerWeapons();
        this.Weapons[this.Info[gwarId].weapon].guns.forEach((weaponId) => { player.GivePlayerWeapon(weaponId, 9999); });
    },
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
                weapon: 0,
                requiredPoints: 10,
                inviterGangPoints: 0,
                invitedGangPoints: 0
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
            if(this.Info[gwarId].invitedGang != Player.Info[player.playerid].Gang && this.Info[gwarId].inviterGang != Player.Info[player.playerid].Gang) return reject("This gwar invite is not for your gang!");
            player.SetPlayerPos(-1394.2000, 987.6200, 1023.9598);
            player.SetPlayerFacingAngle(176.8759);
            player.SetPlayerInterior(15);
            player.SetPlayerVirtualWorld(gwarId + 999);
            player.ResetPlayerWeapons();
            Player.Info[player.playerid].inGwar = gwarId;
            player.GameTextForPlayer("~y~~h~GWar Lobby", 4000, 3);
            resolve(true);
        });
    },
    /**
     * @param {SampPlayer} player 
     * @param {String} reason 
     */
    Kick(player, reason) {
        let gwarId = Player.Info[player.playerid].inGwar;
        if(!this.Info[gwarId]) return;
        Player.Info[player.playerid].inGwar = -1;
        player.GameTextForPlayer(reason, 4000, 3);
        player.SpawnPlayer();
        player.PlayerTextDrawHide(gangWarInfo1[player.playerid]);
        player.PlayerTextDrawHide(gangWarInfo2[player.playerid]);
        if(this.Info[gwarId].status == "started") {
            let inviterPlayersCount = getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && Player.Info[f.playerid].Gang == this.Info[gwarId].inviterGang).length;
            let invitedPlayersCount = getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && Player.Info[f.playerid].Gang == this.Info[gwarId].invitedGang).length;
            if(invitedPlayersCount == 0 && inviterPlayersCount >= 1) this.Win(gwarId, "inviter");
            else if(inviterPlayersCount == 0 && invitedPlayersCount >= 1) this.Win(gwarId, "invited");
            else this.Win(gwarId, "unknown");
        }
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
     * @param {Number} value 
     */
    setRequiredPoints(player, value) {
        let index = Player.Info[player.playerid].inGwar;
        if(!this.Info[index]) return;
        this.Info[index].requiredPoints = value;
        getPlayers().filter(f => Player.Info[f.playerid].inGwar == index).forEach((i) => {
            i.SendClientMessage(LIGHT_GREEN, `GWAR Points: {FF0000}${player.GetPlayerName(24)} {2EC32E}changed required points to: {FFB300}${value}`);
        });
    },
    /**
     * @param {SampPlayer} player 
     */
    Start(player) {
        return new Promise((resolve, reject) => {
            let gwarId = Player.Info[player.playerid].inGwar;
            if(!this.Info[gwarId]) reject(UNEXPECTED);
            let inviterPlayersCount = getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && Player.Info[f.playerid].Gang == this.Info[gwarId].inviterGang).length;
            let invitedPlayersCount = getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId && Player.Info[f.playerid].Gang == this.Info[gwarId].invitedGang).length;
            if(inviterPlayersCount < 1 || invitedPlayersCount < 1) return reject("There needs to be at least 1 player in each gang!");
            this.Info[gwarId].status = "started";
            this.setGwarType(gwarId, "updateTextDraws");
            this.setGwarType(gwarId, "showTextDraws");
            this.setGwarType(gwarId, "spawnPlayers");
            resolve(true);
        });
    },
    Stop(gwarId) {
        return new Promise((resolve, reject) => {
            if(!this.Info[gwarId]) return reject("This gwar id not exists!");
            if(this.Info[gwarId].status == "started") return reject("You can't stop started wars!");
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId).forEach((i) => { this.Kick(i, "~r~~h~gwar canceled"); });
            this.Info.splice(gwarId, 1);
            resolve(true);
        });
    }
}