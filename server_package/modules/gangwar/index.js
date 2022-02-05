const { getPlayers, SampPlayer } = require("samp-node-lib");

const { ORANGE } = require("../../data/colors");
const { UNEXPECTED } = require("../errors");

const Gang = require("../gang");
const Player = require("../player");

module.exports = {
    /**
     * @type {[{inviterGang: Number, invitedGang: Number, status: "preparing"|"started", map: Number}]}
     */
    Info: [],
    /**
     * @type {[{positionInviter: Number[], positionInvited: Number[]}]}
     */
    Maps: [
        {positionInviter: [0, 0, 0], positionInvited: [0, 0, 0]},
        {positionInviter: [0, 0, 0], positionInvited: [0, 0, 0]},
        {positionInviter: [0, 0, 0], positionInvited: [0, 0, 0]},
        {positionInviter: [0, 0, 0], positionInvited: [0, 0, 0]}
    ],
    /**
     * @param {Number} inviterGang 
     * @param {Number} invitedGang 
     */
    async Invite(inviterGang, invitedGang) {
        return new Promise((resolve, reject) => {
            let inviterGangResult = Gang.Info.find(f => f.id == inviterGang);
            let invitedGangResult = Gang.Info.find(f => f.id == invitedGang);
            if(!inviterGangResult || !invitedGangResult) return reject(UNEXPECTED);
            if(this.Info.some(s => s.inviterGang == inviterGang && s.invitedGang == invitedGang)) return reject("An invitation for this gang is already sent!");
            if(inviterGangResult.id == invitedGangResult.id) return reject("You can't invite this gang to gwar!");
            getPlayers().filter(f => Player.Info[f.playerid].Gang == invitedGangResult.id).forEach((i) => {
                i.SendClientMessage(ORANGE, `Gang War:{00BBF6} Your Gang have been invited in Gang War by {FFFFFF}${inviterGangResult.name}{00BBF6}!`);
            });
            let gwarId = this.Info.push({
                inviterGang: inviterGang,
                invitedGang: invitedGang,
                status: "preparing",
                map: 0
            });
            resolve(gwarId);
        });
    },
    async Stop(gwarId) {
        return new Promise((resolve, reject) => {
            if(!this.Info[gwarId]) return reject("This gwar id not exists!");
            if(this.Info[gwarId].status == "started") return reject("You can't stop started wars!");
            getPlayers().filter(f => Player.Info[f.playerid].inGwar == gwarId).forEach((i) => {
                Player.Info[i.playerid].inGwar = -1;
                i.SpawnPlayer();
            });
            this.Info.splice(gwarId, 1);
            resolve(true);
        });
    },
    /**
     * @param {SampPlayer} player 
     */
    async Join(player, gwarId) {
        return new Promise((resolve, reject) => {
            if(!this.Info[gwarId]) return reject("This gwar id not exists!");
            if(this.Info[gwarId].status == "started") return reject("You can't join in started wars!");
            player.SetPlayerPos(-1394.2000, 987.6200, 1023.9598);
            player.SetPlayerFacingAngle(176.8759);
            player.SetPlayerInterior(15);
            player.SetPlayerVirtualWorld(gwarId + 999);
            resolve(true);
        });
    }
}