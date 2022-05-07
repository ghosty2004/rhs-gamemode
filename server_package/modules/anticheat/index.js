/**
 * Anti Cheat by @Ghosty2004
 */

const { OnPlayerStateChange, PLAYER_STATE, OnPlayerUpdate, GetAnimationName } = require("../../libs/samp/build");
const { GetPlayerRotationQuat } = require("../../libs/ysf/build");
const Functions = require("../functions");

OnPlayerStateChange((player, newstate, oldstate) => {
    if(!player.getVariable("spectating") && newstate == PLAYER_STATE.SPECTATING) {
        Functions.sendBuster(player, "Fake Spectate Sync");
    }
});

OnPlayerUpdate((player) => {
    /**
     * Anti Fly
     */
    const AnimIndex = player.GetPlayerAnimationIndex();
    const AnimName = GetAnimationName(AnimIndex, 32, 32);
    if(AnimName[0] == "PARACHUTE" && AnimName[1] == "FALL_SKYDIVE" && player.GetPlayerWeapon() != 46) Functions.sendBuster(player, "Surfly");

    /**
      * Anti Rotation Quaternion
     */
    const quaternion = GetPlayerRotationQuat(player.playerid);
    if(quaternion.x != 0 || quaternion.y != 0) Functions.sendBuster(player, "Rotation Quaternion");
});