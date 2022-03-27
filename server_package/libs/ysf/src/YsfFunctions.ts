// => Execute

export const execute = (command: string, saveoutput = 0, index = 0): void => {
    samp.callNative("execute", "sii", command, saveoutput, index);
}

// => File functions

/** @deprecated */
export const ffind = (pattern: string): Array<any> => {
    return samp.callNative("ffind", "sS", pattern);
}

export const frename = (oldname: string, newname: string): void => {
    samp.callNative("frename", "ss", oldname, newname);
}

// => Directory functions

/** @deprecated */
export const dfind = (pattern: string): Array<any> => {
    return samp.callNative("dfind", "sS", pattern);
}

export const dcreate = (name: string): void => {
    samp.callNative("dcreate", "s", name);
}

export const drename = (oldname: string, newname: string): void => {
    samp.callNative("drename", "ss", oldname, newname);
}

// => Gamemode restart time

export const SetModeRestartTime = (time: number): void => {
    samp.callNative("SetModeRestartTime", "f", time);
}

export const GetModeRestartTime = (): number => {
    return samp.callNative("GetModeRestartTime", "I");
}

// => Max player/npc change at runtime

export const SetMaxPlayers = (maxplayers: number): void => {
    samp.callNative("SetMaxPlayers", "i", maxplayers);
}

export const SetMaxNPCs = (maxnpcs: number): void => {
    samp.callNative("SetMaxNPCs", "i", maxnpcs);
}

// => Filterscript functions

export const LoadFilterScript = (scriptname: string): boolean => {
    return samp.callNative("LoadFilterScript", "s", scriptname);
}

export const UnLoadFilterScript = (scriptname: string): boolean => {
    return samp.callNative("UnLoadFilterScript", "s", scriptname);
}

export const GetFilterScriptCount = (): number => {
    return samp.callNative("GetFilterScriptCount", "");
}

export const GetFilterScriptName = (id: number): Array<any> => {
    return samp.callNative("GetFilterScriptName", "iS", id);
}

// => Server rule modifications

export const AddServerRule = (name: string, value: string, flags = 0): void => {
    samp.callNative("AddServerRule", "ssi", name, value, flags);
}

export const SetServerRule = (name: string, value: string): void => {
    samp.callNative("SetServerRule", "ss", name, value);
}

export const IsValidServerRule = (name: string): void => {
    return samp.callNative("IsValidServerRule", "s", name);
}

export const SetServerRuleFlags = (name: string, flags: number): void => {
    samp.callNative("SetServerRuleFlags", "si", name, flags);
}

export const GetServerRuleFlags = (name: string): number => {
    return samp.callNative("GetServerRuleFlags", "s", name);
}

// => Chat character replacement

export const ToggleChatTextReplacement = (toggle: boolean): void => {
    samp.callNative("ToggleChatTextReplacement", "i", toggle);
}

export const ChatTextReplacementToggled = (): boolean => {
    return samp.callNative("ChatTextReplacementToggled", "");
}

// => Server settings

export const GetServerSettings = (): { showPlayerMarkes: number, showNameTags: number, stuntBonus: number, usePlayerPedAnims: number, limitChatRadius: number, disableInteriorEnterExits: number, nameTagLos: number, manualVehicleEngine: number, limitPlayerMarkers: number, vehicleFriendlyFire: number, defaultCameraCollision: number, globalChatRadius: number, nameTagDrawDistance: number, playerMarkersLimit: number } => {
    const data = samp.callNative("GetServerSettings", "IIIIIIIIIIIFFF")
    return { showPlayerMarkes: data[0], showNameTags: data[1], stuntBonus: data[2], usePlayerPedAnims: data[3], limitChatRadius: data[4], disableInteriorEnterExits: data[5], nameTagLos: data[6], manualVehicleEngine: data[7], limitPlayerMarkers: data[8], vehicleFriendlyFire: data[9], defaultCameraCollision: data[10], globalChatRadius: data[11], nameTagDrawDistance: data[12], playerMarkersLimit: data[13] };
}

export const GetNPCCommandLine = (npcid: number): Array<any> => {
    return samp.callNative("GetNPCCommandLine", "iS", npcid);
}

// => Player position sync bounds

export const GetSyncBounds = (): { hmin: number, hmax: number, vmin: number, vmax: number } => {
    const data = samp.callNative("GetSyncBounds", "IIII");
    return { hmin: data[0], hmax: data[1], vmin: data[2], vmax: data[3] };
}

export const SetSyncBounds = (hmin: number, hmax: number, vmin: number, vmax: number): void => {
    samp.callNative("SetSyncBounds", "iiii", hmin, hmax, vmin, vmax);
}

export const GetRCONCommandName = (cmdname: string): string => {
    return samp.callNative("GetRCONCommandName", "iS", cmdname);
}

export const ChangeRCONCommandName = (cmdname: string, changedname: string): void => {
    samp.callNative("ChangeRCONCommandName", "ss", cmdname, changedname);
}

// => Per AMX function calling

/** @deprecated */
export const CallFunctionInScript = () : void => { }

// => Broadcasting console messages

export const EnableConsoleMSGsForPlayer = (playerId: number, color: number): void => {
    samp.callNative("EnableConsoleMSGsForPlayer", "ii", playerId, color);
}

export const DisableConsoleMSGsForPlayer = (playerId: number): void => {
    samp.callNative("DisableConsoleMSGsForPlayer", "i", playerId);
}

export const HasPlayerConsoleMessages = (playerId: number): number => {
    return samp.callNative("HasPlayerConsoleMessages", "i", playerId);
}

// => YSF settings

export const YSF_SetTickRate = (ticks: number): void => {
    samp.callNative("YSF_SetTickRate", "i", ticks);
}

export const YSF_GetTickRate = (): number => {
    return samp.callNative("YSF_GetTickRate", "");
}

export const YSF_EnableNightVisionFix = (enable: boolean): void => {
    samp.callNative("YSF_EnableNightVisionFix", "i", enable);
}

export const YSF_IsNightVisionFixEnabled = (): boolean => {
    return samp.callNative("YSF_IsNightVisionFixEnabled", "");
}

export const YSF_ToggleOnServerMessage = (toggle: boolean): void => {
    samp.callNative("YSF_ToggleOnServerMessage", "i", toggle);
}

export const YSF_IsOnServerMessageEnabled = (): boolean => {
    return samp.callNative("YSF_IsOnServerMessageEnabled", "");
}

export const YSF_SetExtendedNetStatsEnabled = (enable: boolean): void => {
    samp.callNative("YSF_SetExtendedNetStatsEnabled", "i", enable);
}

export const YSF_IsExtendedNetStatsEnabled = (): boolean => {
    return samp.callNative("YSF_IsExtendedNetStatsEnabled", "");
}

export const YSF_SetAFKAccuracy = (time_ms: number): void => {
    samp.callNative("YSF_SetAFKAccuracy", "i", time_ms);
}

export const YSF_GetAFKAccuracy = (): number => {
    return samp.callNative("YSF_GetAFKAccuracy", "");
}

export const SetRecordingDirectory = (dir: string): void => {
    samp.callNative("SetRecordingDirectory", "s", dir);
}

export const GetRecordingDirectory = (len: number): string => {
    return samp.callNative("GetRecordingDirectory", "Si", len);
}

// => Nickname

export const IsValidNickName = (name: string): number => {
    return samp.callNative("IsValidNickName", "s", name);
}

export const AllowNickNameCharacter = (character: string, allow: boolean): void => {
    samp.callNative("AllowNickNameCharacter", "ss", character, allow);
}

export const IsNickNameCharacterAllowed = (character: string): number => {
    return samp.callNative("IsNickNameCharacterAllowed", "s", character);
}

// => Classes

export const GetAvailableClasses = (): number => {
    return samp.callNative("GetAvailableClasses", "");
}

export const GetPlayerClass = (classId: number): { teamId: number, modelId: number, spawnX: number, spawnY: number, spawnZ: number, zAngle: number, weapon1: number, weapon1Ammo: number, weapon2: number, weapon2Ammo: number, weapon3: number, weapon3Ammo: number } => {
    const data = samp.callNative("GetPlayerClass", "iIIFFFFIIIIII", classId);
    return { teamId: data[0], modelId: data[1], spawnX: data[2], spawnY: data[3], spawnZ: data[4], zAngle: data[5], weapon1: data[6], weapon1Ammo: data[7], weapon2: data[8], weapon2Ammo: data[9], weapon3: data[10], weapon3Ammo: data[11] };
}

export const EditPlayerClass = (classId: number, teamId: number, modelId: number, spawnX: number, spawnY: number, spawnZ: number, zAngle: number, weapon1: number, weapon1Ammo: number, weapon2: number, weapon2Ammo: number, weapon3: number, weapon3Ammo: number): void => {
    samp.callNative("EditPlayerClass", "iiiffffiiiiii", classId, teamId, modelId, spawnX, spawnY, spawnZ, zAngle, weapon1, weapon1Ammo, weapon2, weapon2Ammo, weapon3, weapon3Ammo);
}

// => Timers

export const GetRunningTimers = (): number => {
    return samp.callNative("GetRunningTimers", "");
}

// => Per player things

export const SetPlayerGravity = (playerId: number, gravity: number): void => {
    samp.callNative("SetPlayerGravity", "if", playerId, gravity);
}

export const GetPlayerGravity = (playerId: number): number => {
    return samp.callNative("GetPlayerGravity", "i", playerId);
}

export const SetPlayerAdmin = (playerId: number, admin: boolean): void => {
    samp.callNative("SetPlayerAdmin", "ii", playerId, admin);
}

export const SetPlayerTeamForPlayer = (playerId: number, teamplayerId: number, teamid: number): void => {
    samp.callNative("SetPlayerTeamForPlayer", "iii", playerId, teamplayerId, teamid);
}

export const GetPlayerTeamForPlayer = (playerId: number, teamplayerId: number): number => {
    return samp.callNative("GetPlayerTeamForPlayer", "ii", playerId, teamplayerId);
}

export const SetPlayerSkinForPlayer = (playerId: number, skinplayerId: number, skin: number): void => {
    samp.callNative("SetPlayerSkinForPlayer", "iii", playerId, skinplayerId, skin);
}

export const GetPlayerSkinForPlayer = (playerId: number, skinplayerId: number): number => {
    return samp.callNative("GetPlayerSkinForPlayer", "ii", playerId, skinplayerId);
}

export const SetPlayerNameForPlayer = (playerId: number, nameplayerId: number, playername: string): void => {
    samp.callNative("SetPlayerNameForPlayer", "iis", playerId, nameplayerId, playername);
}

export const GetPlayerNameForPlayer = (playerId: number, nameplayerId: number, len: number): string => {
    return samp.callNative("GetPlayerNameForPlayer", "iiSi", playerId, nameplayerId, len);
}

export const SetPlayerFightStyleForPlayer = (playerId: number, styleplayerId: number, style: number): void => {
    samp.callNative("SetPlayerFightStyleForPlayer", "iii", playerId, styleplayerId, style);
}

export const GetPlayerFightStyleForPlayer = (playerId: number, styleplayerId: number): number => {
    return samp.callNative("GetPlayerFightStyleForPlayer", "ii", playerId, styleplayerId);
}

export const SetPlayerPosForPlayer = (playerId: number, posplayerId: number, fX: number, fY: number, fZ: number, forceSync = true): void => {
    samp.callNative("SetPlayerPosForPlayer", "iiiiii", playerId, posplayerId, fX, fY, fZ, forceSync);
}

export const SetPlayerRotationQuatForPlayer = (playerId: number, quatplayerId: number, w: number, x: number, y: number, z: number, forceSync = true): void => {
    samp.callNative("SetPlayerRotationQuatForPlayer", "iiiiiii", playerId, quatplayerId, w, x, y, z, forceSync);
}

export const ApplyAnimationForPlayer = (playerId: number, animplayerId: number, animlib: string, animname: string, fDelta: number, loop: boolean, lockX: number, lockY: number, freeze: boolean, time: number): void => {
    samp.callNative("ApplyAnimationForPlayer", "iissiiiiii", playerId, animplayerId, animlib, animname, fDelta, loop, lockX, lockY, freeze, time);
}

export const GetPlayerWeather = (playerId: number): number => {
    return samp.callNative("GetPlayerWeather", "i", playerId);
}

export const TogglePlayerWidescreen = (playerId: number, set: boolean): void => {
    samp.callNative("TogglePlayerWidescreen", "ii", playerId, set);
}

export const IsPlayerWidescreenToggled = (playerId: number): number => {
    return samp.callNative("IsPlayerWidescreenToggled", "i", playerId);
}

export const GetSpawnInfo = (playerId: number): { teamId: number, modelId: number, spawnX: number, spawnY: number, spawnZ: number, zAngle: number, weapon1: number, weapon1Ammo: number, weapon2: number, weapon2Ammo: number, weapon3: number, weapon3Ammo: number } => {
    const data = samp.callNative("GetSpawnInfo", "iIIFFFFIIIIII", playerId);
    return { teamId: data[0], modelId: data[1], spawnX: data[2], spawnY: data[3], spawnZ: data[4], zAngle: data[5], weapon1: data[6], weapon1Ammo: data[7], weapon2: data[8], weapon2Ammo: data[9], weapon3: data[10], weapon3Ammo: data[11] };
}

export const GetPlayerSkillLevel = (playerId: number, skill: number): number => {
    return samp.callNative("GetPlayerSkillLevel", "ii", playerId, skill);
}

export const IsPlayerCheckpointActive = (playerId: number): number => {
    return samp.callNative("IsPlayerCheckpointActive", "i", playerId);
}

export const GetPlayerCheckpoint = (playerId: number): { positionX: number, positionY: number, positionZ: number, size: number } => {
    const data = samp.callNative("GetPlayerCheckpoint", "iFFFF", playerId);
    return { positionX: data[0], positionY: data[1], positionZ: data[2], size: data[3] };
}

export const IsPlayerRaceCheckpointActive = (playerId: number): number => {
    return samp.callNative("IsPlayerRaceCheckpointActive", "i", playerId);
}

export const GetPlayerRaceCheckpoint = (playerId: number): { positionX: number, positionY: number, positionZ: number, positionNextX: number, positionNextY: number, positionNextZ: number, size: number } => {
    const data = samp.callNative("GetPlayerRaceCheckpoint", "iFFFFFFF", playerId);
    return { positionX: data[0], positionY: data[1], positionZ: data[2], positionNextX: data[3], positionNextY: data[4], positionNextZ: data[5], size: data[6] };
}

export const GetPlayerWorldBounds = (playerId: number): { maxX: number, minX: number, maxY: number, minY: number } => {
    const data = samp.callNative("GetPlayerWorldBounds", "iFFFF");
    return { maxX: data[0], minX: data[1], maxY: data[2], minY: data[3] };
}

export const IsPlayerInModShop = (playerId: number): number => {
    return samp.callNative("IsPlayerInModShop", "i", playerId);
}

export const GetPlayerSirenState = (playerId: number): number => {
    return samp.callNative("GetPlayerSirenState", "i", playerId);
}

export const GetPlayerLandingGearState = (playerId: number): number => {
    return samp.callNative("GetPlayerLandingGearState", "i", playerId);
}

export const GetPlayerHydraReactorAngle = (playerId: number): number => {
    return samp.callNative("GetPlayerHydraReactorAngle", "i", playerId);
}

export const GetPlayerTrainSpeed = (playerId: number): number => {
    return samp.callNative("GetPlayerTrainSpeed", "i", playerId);
}

export const GetPlayerZAim = (playerId: number): number => {
    return samp.callNative("GetPlayerZAim", "i", playerId);
}

export const GetPlayerSurfingOffsets = (playerId: number): { offsetX: number, offsetY: number, offsetZ: number } => {
    const data = samp.callNative("GetPlayerSurfingOffsets", "iFFF", playerId);
    return { offsetX: data[0], offsetY: data[1], offsetZ: data[2] };
}

export const GetPlayerRotationQuat = (playerId: number): { w: number, x: number, y: number, z: number } => {
    const data = samp.callNative("GetPlayerRotationQuat", "iFFFF", playerId);
    return { w: data[0], x: data[1], y: data[2], z: data[3] };
}

export const GetPlayerDialogID = (playerId: number): number => {
    return samp.callNative("GetPlayerDialogID", "i", playerId);
}

export const GetPlayerSpectateID = (playerId: number): number => {
    return samp.callNative("GetPlayerSpectateID", "i", playerId);
}

export const GetPlayerSpectateType = (playerId: number): number => {
    return samp.callNative("GetPlayerSpectateType", "i", playerId);
}

export const GetPlayerLastSyncedVehicleID = (playerId: number): number => {
    return samp.callNative("GetPlayerLastSyncedVehicleID", "i", playerId);
}

export const GetPlayerLastSyncedTrailerID = (playerId: number): number => {
    return samp.callNative("GetPlayerLastSyncedTrailerID", "i", playerId);
}

export const GetPlayerRawIp = (playerId: number): number => {
    return samp.callNative("GetPlayerRawIp", "i", playerId);
}

export const SendBulletData = (senderId: number, forPlayerId = -1, weaponId: number, hitType: number, originX: number, originY: number, originZ: number, targetX: number, targetY: number, targetZ: number, centerOfHitX: number, centerOfHitY: number, centerOfHitZ: number): void => {
    samp.callNative("SendBulletData", "iiiiiiiiiiiii", senderId, forPlayerId, weaponId, hitType, originX, originY, originZ, targetX, targetY, targetZ, centerOfHitX, centerOfHitY, centerOfHitZ);
}

export const ShowPlayerForPlayer = (forPlayerId: number, playerId: number, setSkin = false): void => {
    samp.callNative("ShowPlayerForPlayer", "iii", forPlayerId, playerId, setSkin);
}

export const HidePlayerForPlayer = (forPlayerId: number, playerId: number): void => {
    samp.callNative("HidePlayerForPlayer", "ii", forPlayerId, playerId);
}

export const AddPlayerForPlayer = (forPlayerId: number, playerId: number, isNPC = 0): void => {
    samp.callNative("AddPlayerForPlayer", "iii", forPlayerId, playerId, isNPC);
}

export const RemovePlayerForPlayer = (forPlayerId: number, playerId: number): void => {
    samp.callNative("RemovePlayerForPlayer", "ii", forPlayerId, playerId);
}

export const SetPlayerChatBubbleForPlayer = (forPlayerId: number, playerId: number, text: string, color: number, drawDistance: number, expireTime: number): void => {
    samp.callNative("SetPlayerChatBubbleForPlayer", "iisifi", forPlayerId, playerId, text, color, drawDistance, expireTime);
}

export const ResetPlayerMarkerForPlayer = (playerId: number, resetPlayerId: number): void => {
    samp.callNative("ResetPlayerMarkerForPlayer", "ii", playerId, resetPlayerId);
}

export const SetPlayerVersion = (playerId: number, version: string): void => {
    samp.callNative("SetPlayerVersion", "is", playerId, version);
}

export const IsPlayerSpawned = (playerId: number): number => {
    return samp.callNative("IsPlayerSpawned", "i", playerId);
}

export const IsPlayerControllable = (playerId: number): number => {
    return samp.callNative("IsPlayerControllable", "i", playerId);
}

export const SpawnForWorld = (playerId: number): void => {
    samp.callNative("SpawnForWorld", "i", playerId);
}

export const BroadcastDeath = (playerId: number): void => {
    samp.callNative("BroadcastDeath", "i", playerId);
}

export const IsPlayerCameraTargetEnabled = (playerId: number): number => {
    return samp.callNative("IsPlayerCameraTargetEnabled", "i", playerId);
}

export const SetPlayerDisabledKeysSync = (playerId: number, keys: number, upDown = 0, leftRight = 0): void => {
    samp.callNative("SetPlayerDisabledKeysSync", "iiii", playerId, keys, upDown, leftRight);
}

export const GetPlayerDisabledKeysSync = (playerId: number): { keys: number, upDown: number, leftRight: number } => {
    const data = samp.callNative("GetPlayerDisabledKeysSync", "iIII", playerId);
    return { keys: data[0], upDown: data[1], leftRight: data[2] };
}

export const GetPlayerBuildingsRemoved = (playerId: number): number => {
    return samp.callNative("GetPlayerBuildingsRemoved", "i", playerId);
}

export const IsBuildingRemovedForPlayer = (playerId: number, modelId: number, fX: number, fY: number, fZ: number, fRadius: number): number => {
    return samp.callNative("IsBuildingRemovedForPlayer", "iiffff", playerId, modelId, fX, fY, fZ, fRadius);
}

export const TogglePlayerGhostMode = (playerId: number, toggle: boolean): void => {
    samp.callNative("TogglePlayerGhostMode", "ii", playerId, toggle);
}

export const GetPlayerGhostMode = (playerId: number): number => {
    return samp.callNative("GetPlayerGhostMode", "i", playerId);
}

export const SetPlayerSyncKeys = (playerId: number, keys: number, upDown: number, leftRight: number): void => {
    samp.callNative("SetPlayerSyncKeys", "iiii", playerId, keys, upDown, leftRight);
}

export const SetPlayerSyncPos = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncPos", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncVelocity = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncVelocity", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncRotationQuat = (playerId: number, w: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncRotationQuat", "iffff", playerId, w, x, y, z);
}

export const SetPlayerSyncCameraFrontVector = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncCameraFrontVector", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncCameraPos = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncCameraPos", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncCameraMode = (playerId: number, mode: number): void => {
    samp.callNative("SetPlayerSyncCameraMode", "ii", playerId, mode);
}

export const SetPlayerSyncWeapon = (playerId: number, weaponId: number): void => {
    samp.callNative("SetPlayerSyncWeapon", "ii", playerId, weaponId);
}

export const GetPlayerSyncWeapon = (playerId: number): number => {
    return samp.callNative("GetPlayerSyncWeapon", "i", playerId);
}

export const SetPlayerSyncWeaponState = (playerId: number, weaponState: number): void => {
    samp.callNative("SetPlayerSyncWeaponState", "ii", playerId, weaponState);
}

export const SetPlayerSyncSpecialAction = (playerId: number, actionId: number): void => {
    samp.callNative("SetPlayerSyncSpecialAction", "ii", playerId, actionId);
}

export const SetPlayerSyncHealth = (playerId: number, health: number): void => {
    samp.callNative("SetPlayerSyncHealth", "ii", playerId, health);
}

export const SetPlayerSyncArmour = (playerId: number, armour: number): void => {
    samp.callNative("SetPlayerSyncArmour", "ii", playerId, armour);
}

export const SetPlayerSyncPosition = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncPosition", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncVehicleId = (playerId: number, vehicleId: number, setState = false): void => {
    samp.callNative("SetPlayerSyncVehicleId", "iii", playerId, vehicleId, setState);
}

export const SetPlayerSyncVehicleSeat = (playerId: number, seat: number): void => {
    samp.callNative("SetPlayerSyncVehicleSeat", "ii", playerId, seat);
}

export const SetPlayerSyncVehiclePosition = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncVehiclePosition", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncVehicleVelocity = (playerId: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncVehicleVelocity", "ifff", playerId, x, y, z);
}

export const SetPlayerSyncVehicleRotQuat = (playerId: number, w: number, x: number, y: number, z: number): void => {
    samp.callNative("SetPlayerSyncVehicleRotQuat", "iffff", playerId, w, x, y, z);
}

export const SetPlayerSyncVehicleHealth = (playerId: number, health: number): void => {
    samp.callNative("SetPlayerSyncVehicleHealth", "if", playerId, health);
}

export const SetPlayerSyncTrainSpeed = (playerId: number, speed: number): void => {
    samp.callNative("SetPlayerSyncTrainSpeed", "if", playerId, speed);
}

export const SendPlayerDeath = (playerId: number, forPlayerId = -1): void => {
    samp.callNative("SendPlayerDeath", "ii", playerId, forPlayerId);
}

export const UpdatePlayerSyncData = (playerId: number, type = -1, setState = false): void => {
    samp.callNative("UpdatePlayerSyncData", "iii", playerId, type, setState);
}

/** @deprecated */
export const SendPlayerClientGameInit = (): void => {  }

export const SetPlayerConnectMode = (playerId: number, mode: number): void => {
    samp.callNative("SendPlayerClientGameInit", "ii", playerId, mode);
}

export const GetPlayerConnectMode = (playerId: number): number => {
    return samp.callNative("GetPlayerConnectMode", "i", playerId);
}

// => Actors

export const GetActorSpawnInfo = (actorId: number): { skinId: number, fX: number, fY: number, fZ: number, fAngle: number } => {
    const data = samp.callNative("GetActorSpawnInfo", "iIFFFF", actorId);
    return { skinId: data[0], fX: data[1], fY: data[2], fZ: data[3], fAngle: data[4] };
}

export const GetActorSkin = (actorId: number): number => {
    return samp.callNative("GetActorSkin", "i", actorId);
}

export const GetActorAnimation = (actorId: number): { animLib: string, animName: string, fDelta: number, loop: number, lockX: number, lockY: number, freeze: number } => {
    const data = samp.callNative("GetActorAnimation", "iSiSiFIIIII", actorId, 32, 32);
    return { animLib: data[0], animName: data[1], fDelta: data[2], loop: data[3], lockX: data[4], lockY: data[5], freeze: data[6] };
}

// => Scoreboard manipulation

export const TogglePlayerScoresPingsUpdate = (playerId: number, toggle: boolean): void => {
    samp.callNative("TogglePlayerScoresPingsUpdate", "ii", playerId, toggle);
}

export const TogglePlayerFakePing = (playerId: number, toggle: boolean): void => {
    samp.callNative("TogglePlayerFakePing", "ii", playerId, toggle);
}

export const SetPlayerFakePing = (playerId: number, ping: number): void => {
    samp.callNative("SetPlayerFakePing", "ii", playerId, ping);
}

export const SetPlayerNameInServerQuery = (playerId: number, name: string): void => {
    samp.callNative("SetPlayerNameInServerQuery", "is", playerId, name);
}

export const GetPlayerNameInServerQuery = (playerId: number): string => {
    return samp.callNative("GetPlayerNameInServerQuery", "iSi", playerId, 24);
}

export const ResetPlayerNameInServerQuery = (playerId: number): void => {
    samp.callNative("ResetPlayerNameInServerQuery", "i", playerId);
}

// => Pause functions

export const IsPlayerPaused = (playerId: number): number => {
    return samp.callNative("IsPlayerPaused", "i", playerId);
}

export const GetPlayerPausedTime = (playerId: number): number => {
    return samp.callNative("GetPlayerPausedTime", "i", playerId);
}

// => Objects

export const HideObjectForPlayer = (playerId: number, objectId: number): void => {
    samp.callNative("HideObjectForPlayer", "ii", playerId, objectId);
} 

export const ShowObjectForPlayer = (playerId: number, objectId: number): void => {
    samp.callNative("ShowObjectForPlayer", "ii", playerId, objectId);
}

export const HideNewObjectsForPlayer = (playerId: number, toggle: boolean): void => {
    samp.callNative("HideNewObjectsForPlayer", "ii", playerId, toggle);
}

export const IsObjectHiddenForPlayer = (playerId: number, objectId: number): number => {
    return samp.callNative("IsObjectHiddenForPlayer", "ii", playerId, objectId);
}

export const NewObjectsHiddenForPlayer = (playerId: number): number => {
    return samp.callNative("NewObjectsHiddenForPlayer", "i", playerId);
}

// => Objects get - global

export const GetObjectDrawDistance = (objectId: number): number => {
    return samp.callNative("GetObjectDrawDistance", "i", objectId);
}

export const SetPlayerObjectMoveSpeed = (playerId: number, objectId: number, speed: number): void => {
    samp.callNative("SetPlayerObjectMoveSpeed", "iii", playerId, objectId, speed);
}

export const GetPlayerObjectMoveSpeed = (playerId: number, objectId: number): number => {
    return samp.callNative("GetPlayerObjectMoveSpeed", "ii", playerId, objectId);
}

export const GetPlayerObjectTarget = (playerId: number, objectId: number): { fX: number, fY: number, fZ: number } => {
    const data = samp.callNative("GetPlayerObjectTarget", "iiFFF", playerId, objectId);
    return { fX: data[0], fY: data[1], fZ: data[2] };
}

export const GetPlayerObjectAttachedData = (playerId: number, objectId: number): { attachedVehicleId: number, attachedObjectId: number, attachedPlayerId: number } => {
    const data = samp.callNative("GetPlayerObjectAttachedData", "iiIII", playerId, objectId);
    return { attachedVehicleId: data[0], attachedObjectId: data[1], attachedPlayerId: data[2] };
}

export const GetPlayerObjectAttachedOffset = (playerId: number, objectId: number): { fX: number, fY: number, fZ: number, fRotX: number, fRotY: number, fRotZ: number } => {
    const data = samp.callNative("GetPlayerObjectAttachedOffset", "iiFFFFFF", playerId, objectId);
    return { fX: data[0], fY: data[1], fZ: data[2], fRotX: data[3], fRotY: data[4], fRotZ: data[5] };
}

export const GetPlayerObjectSyncRotation = (playerId: number, objectId: number): number => {
    return samp.callNative("GetPlayerObjectSyncRotation", "ii", playerId, objectId);
}

export const IsPlayerObjectMaterialSlotUsed = (playerId: number, objectId: number, materialIndex: number): number => {
    return samp.callNative("IsPlayerObjectMaterialSlotUsed", "iii", playerId, objectId, materialIndex);
}

export const GetPlayerObjectMaterial = (playerId: number, objectId: number, materialIndex: number): { modelId: number, txdName: string, textureName: string, materialColor: number } => {
    const data = samp.callNative("GetPlayerObjectMaterial", "iiiISiSiI", playerId, objectId, materialIndex, 50, 50);
    return { modelId: data[0], txdName: data[1], textureName: data[2], materialColor: data[3] };
}

export const GetPlayerObjectMaterialText = (playerId: number, objectId: number, materialIndex: number): { text: string, materialSize: number, fontFace: string, fontSize: number, bold: number, fontColor: number, backColor: number, textAligment: number } => {
    const data = samp.callNative("GetPlayerObjectMaterialText", "iiiSiISiIIIII", playerId, objectId, materialIndex, 100, 50);
    return { text: data[0], materialSize: data[1], fontFace: data[2], fontSize: data[3], bold: data[4], fontColor: data[5], backColor: data[6], textAligment: data[7] };
}

export const IsPlayerObjectNoCameraCol = (playerId: number, objectId: number): number => {
    return samp.callNative("IsPlayerObjectNoCameraCol", "ii", playerId, objectId);
}

export const GetPlayerSurfingPlayerObjectID = (playerId: number): number => {
    return samp.callNative("GetPlayerSurfingPlayerObjectID", "i", playerId);
}

export const GetPlayerCameraTargetPlayerObj = (playerId: number): number => {
    return samp.callNative("GetPlayerCameraTargetPlayerObj", "i", playerId);
}

export const GetObjectType = (playerId: number, objectId: number): number => {
    return samp.callNative("GetObjectType", "ii", playerId, objectId);
}

// => Get function for GetPlayerAttachedObject

export const GetPlayerAttachedObject = (playerId: number, index: number): { modelId: number, bone: number, fX: number, fY: number, fZ: number, fRotX: number, fRotY: number, fRotZ: number, fScaleX: number, fScaleY: number, fScaleZ: number, materialColor1: number, materialColor2: number } => {
    const data = samp.callNative("GetPlayerAttachedObject", "iiIIFFFFFFFFFII", playerId, index);
    return { modelId: data[0], bone: data[1], fX: data[2], fY: data[3], fZ: data[4], fRotX: data[5], fRotY: data[6], fRotZ: data[7], fScaleX: data[8], fScaleY: data[9], fScaleZ: data[10], materialColor1: data[11], materialColor2: data[12] };
}

// => RakNet ban functions

export const ClearBanList = (): void => {
    samp.callNative("ClearBanList", "");
}

export const IsBanned = (ipAddress: string): number => {
    return samp.callNative("IsBanned", "s", ipAddress);
}

// => RakNet

export const SetTimeoutTime = (playerId: number, time_ms: number): void => {
    samp.callNative("SetTimeoutTime", "ii", playerId, time_ms);
}

export const GetLocalIP = (index: number): string => {
    return samp.callNative("GetLocalIP", "iSi", index, 16);
}

// => Exclusive RPC broadcast

export const SetExclusiveBroadcast = (toggle: boolean): void => {
    samp.callNative("SetExclusiveBroadcast", "i", toggle);
}

export const BroadcastToPlayer = (playerId: number, toggle = 1): void => {
    samp.callNative("BroadcastToPlayer", "ii", playerId, toggle);
}

export const ToggleCloseConnectionFix = (toggle: boolean): void => {
    samp.callNative("ToggleCloseConnectionFix", "i", toggle);
}

// => Vehicle functions

export const GetVehicleSpawnInfo = (vehicleId: number): { fX: number, fY: number, fZ: number, fRot: number, colors: [number, number] } => {
    const data = samp.callNative("GetVehicleSpawnInfo", "iFFFFII", vehicleId);
    return { fX: data[0], fY: data[1], fZ: data[2], fRot: data[3], colors: [data[4], data[5]] };
}

export const SetVehicleSpawnInfo = (vehicleId: number, modelId: number, fX: number, fY: number, fZ: number, fAngle: number, colors: [number, number]) => {
    samp.callNative("SetVehicleSpawnInfo", "iiffffii", vehicleId, modelId, fX, fY, fZ, fAngle, colors[0], colors[1]);
}

export const GetVehicleColor = (vehicleId: number): [number, number] => {
    return samp.callNative("GetVehicleColor", "iII", vehicleId);
}

export const GetVehiclePaintjob = (vehicleId: number): number => {
    return samp.callNative("GetVehiclePaintjob", "i", vehicleId);
}

export const GetVehicleInterior = (vehicleId: number): number => {
    return samp.callNative("GetVehicleInterior", "i", vehicleId);
}

export const GetVehicleNumberPlate = (vehicleId: number): string => {
    return samp.callNative("GetVehicleNumberPlate", "iSi", vehicleId, 15);
}

export const SetVehicleRespawnDelay = (vehicleId: number, delay: number): void => {
    samp.callNative("SetVehicleRespawnDelay", "ii", vehicleId, delay);
}

export const GetVehicleRespawnDelay = (vehicleId: number): number => {
    return samp.callNative("GetVehicleRespawnDelay", "i", vehicleId);
}

export const SetVehicleOccupiedTick = (vehicleId: number, ticks: number): void => {
    samp.callNative("SetVehicleOccupiedTick", "ii", vehicleId, ticks);
}

export const GetVehicleOccupiedTick = (vehicleId: number): number => {
    return samp.callNative("GetVehicleOccupiedTick", "i", vehicleId);
}

export const SetVehicleRespawnTick = (vehicleId: number, ticks: number): void => {
    samp.callNative("SetVehicleRespawnTick", "ii", vehicleId, ticks);
}

export const GetVehicleRespawnTick = (vehicleId: number): number => {
    return samp.callNative("GetVehicleRespawnTick", "i", vehicleId);
}

export const GetVehicleLastDriver = (vehicleId: number): number => {
    return samp.callNative("GetVehicleLastDriver", "i", vehicleId);
}

export const GetVehicleCab = (vehicleId: number): number => {
    return samp.callNative("GetVehicleCab", "i", vehicleId);
}

export const HasVehicleBeenOccupied = (vehicleId: number): number => {
    return samp.callNative("HasVehicleBeenOccupied", "i", vehicleId);
}

export const SetVehicleBeenOccupied = (vehicleId: number, occupied: boolean): void => {
    samp.callNative("SetVehicleBeenOccupied", "ii", vehicleId, occupied);
}

export const IsVehicleOccupied = (vehicleId: number): number => {
    return samp.callNative("IsVehicleOccupied", "i", vehicleId);
}

export const IsVehicleDead = (vehicleId: number): number => {
    return samp.callNative("IsVehicleDead", "i", vehicleId);
}

export const SetVehicleDead = (vehicleId: number, dead: boolean): void => {
    samp.callNative("SetVehicleDead", "ii", vehicleId, dead);
}

export const SetVehicleParamsSirenState = (vehicleId: number, sirenState: number): void => {
    samp.callNative("SetVehicleParamsSirenState", "ii", vehicleId, sirenState);
}

export const ToggleVehicleSirenEnabled = (vehicleId: number, enabled: number): void => {
    samp.callNative("ToggleVehicleSirenEnabled", "ii", vehicleId, enabled);
}

export const IsVehicleSirenEnabled = (vehicleId: number): number => {
    return samp.callNative("IsVehicleSirenEnabled", "i", vehicleId);
}

export const GetVehicleMatrix = (vehicleId: number): { rightX: number, rightY: number, rightZ: number, upX: number, upY: number, upZ: number, atX: number, atY: number, atZ: number } => {
    const data = samp.callNative("GetVehicleMatrix", "iFFFFFFFFF", vehicleId);
    return { rightX: data[0], rightY: data[1], rightZ: data[2], upX: data[3], upY: data[4], upZ: data[5], atX: data[6], atY: data[7], atZ: data[8] };
}

export const GetVehicleModelCount = (modelId: number): number => {
    return samp.callNative("GetVehicleModelCount", "i", modelId);
}

export const GetVehicleModelsUsed = (): number => {
    return samp.callNative("GetVehicleModelsUsed", "");
}

export const HideVehicle = (vehicleId: number): void => {
    samp.callNative("HideVehicle", "i", vehicleId);
}

export const ShowVehicle = (vehicleId: number): void => {
    samp.callNative("ShowVehicle", "i", vehicleId);
}

export const IsVehicleHidden = (vehicleId: number): number => {
    return samp.callNative("IsVehicleHidden", "i", vehicleId);
}

// => Gangzones - Global

export const IsValidGangZone = (zoneId: number): number => {
    return samp.callNative("IsValidGangZone", "i", zoneId);
}

export const IsPlayerInGangZone = (playerId: number, zoneId: number): number => {
    return samp.callNative("IsPlayerInGangZone", "ii", playerId, zoneId);
}

export const IsGangZoneVisibleForPlayer = (playerId: number, zoneId: number): number => {
    return samp.callNative("IsGangZoneVisibleForPlayer", "ii", playerId, zoneId);
}

export const GangZoneGetColorForPlayer = (playerId: number, zoneId: number): number => {
    return samp.callNative("GangZoneGetColorForPlayer", "ii", playerId, zoneId);
}

export const GangZoneGetFlashColorForPlayer = (playerId: number, zoneId: number): number => {
    return samp.callNative("GangZoneGetFlashColorForPlayer", "ii", playerId, zoneId);
}

export const IsGangZoneFlashingForPlayer = (playerId: number, zoneId: number): number => {
    return samp.callNative("IsGangZoneFlashingForPlayer", "ii", playerId, zoneId);
}

export const GangZoneGetPos = (zoneId: number): { fMinX: number, fMinY: number, fMaxX: number, fMaxY: number } => {
    const data = samp.callNative("GangZoneGetPos", "iFFFF", zoneId);
    return { fMinX: data[0], fMinY: data[1], fMaxX: data[2], fMaxY: data[3] };
}