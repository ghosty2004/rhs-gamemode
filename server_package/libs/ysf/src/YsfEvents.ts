import { E_SCM_EVENT_TYPE } from "./YsfEnums";

export const OnPlayerEnterGangZone = (func: (playerId: number, zoneId: number) => void): void => {
    samp.on("OnPlayerEnterGangZone", ((playerId, zoneId) => func(playerId, zoneId)));
}

export const OnPlayerLeaveGangZone = (func: (playerId: number, zoneId: number) => void): void => {
    samp.on("OnPlayerLeaveGangZone", ((playerId, zoneId) => func(playerId, zoneId)));
}

export const OnPlayerEnterPlayerGangZone = (func: (playerId: number, zoneId: number) => void): void => {
    samp.on("OnPlayerEnterPlayerGangZone", ((playerId, zoneId) => func(playerId, zoneId)));
}

export const OnPlayerLeavePlayerGangZone = (func: (playerId: number, zoneId: number) => void): void => {
    samp.on("OnPlayerLeavePlayerGangZone", ((playerId, zoneId) => func(playerId, zoneId)));
}

export const OnPlayerPickUpPlayerPickup = (func: (playerId: number, pickupId: number) => void): void => {
    samp.on("OnPlayerPickUpPlayerPickup", ((playerId, pickupId) => func(playerId, pickupId)));
}

export const OnPlayerPauseStateChange = (func: (playerId: number, pauseState: number) => void): void => {
    samp.on("OnPlayerPauseStateChange", ((playerId, pauseState) => func(playerId, pauseState)));
}

export const OnPlayerStatsAndWeaponsUpdate = (func: (playerId: number) => void): void => {
    samp.on("OnPlayerStatsAndWeaponsUpdate", ((playerId) => func(playerId)));
}

export const OnRemoteRCONPacket = (func: (ipAddress: string, port: number, password: number, success: number, command: string) => void): void => {
    samp.on("OnRemoteRCONPacket", ((ipAddress, port, password, success, command) => func(ipAddress, port, password, success, command)));
}

export const OnServerMessage = (func: (msg: string) => void): void => {
    samp.on("OnServerMessage", ((msg) => func(msg)));
}

export const OnPlayerClientGameInit = (func: (playerId: number, useCjWalk: number, limitGlobalChat: number, globalChatRadius: number, nameTagDistance: number, disableEnterExits: number, nameTagLos: number, manualVehEngineAndLights: number, spawnsAvailable: number, showNameTags: number, showPlayerMarkers: number, onFootRate: number, inCarRate: number, weaponRate: number, lagCompMode: number, vehicleFriendlyFire: number) => void): void => {
    samp.on("OnPlayerClientGameInit", ((playerId, useCjWalk, limitGlobalChat, globalChatRadius, nameTagDistance, disableEnterExits, nameTagLos, manualVehEngineAndLights, spawnsAvailable, showNameTags, showPlayerMarkers, onFootRate, inCarRate, weaponRate, lagCompMode, vehicleFriendlyFire) => func(playerId, useCjWalk, limitGlobalChat, globalChatRadius, nameTagDistance, disableEnterExits, nameTagLos, manualVehEngineAndLights, spawnsAvailable, showNameTags, showPlayerMarkers, onFootRate, inCarRate, weaponRate, lagCompMode, vehicleFriendlyFire)));
}

export const OnOutcomeScmEvent = (func: (playerId: number, issuerId: number, eventId: E_SCM_EVENT_TYPE, vehicleId: number, arg1: number, arg2: number) => void): void => {
    samp.on("OnOutcomeScmEvent", ((playerId, issuerId, eventId, vehicleId, arg1, arg2) => func(playerId, issuerId, eventId, vehicleId, arg1, arg2)));
}

export const OnServerQueryInfo = (func: (ipAddress: string, hostName: string, gameMode: string, language: string) => void): void => {
    samp.on("OnServerQueryInfo", ((ipAddress, hostName, gameMode, language) => func(ipAddress, hostName, gameMode, language)));
}

export const OnSystemCommandExecute = (func: (lineOutput: string, retval: number, index: number, success: number, lineCurrent: number, lineTotal: number) => void): void => {
    samp.on("OnSystemCommandExecute", ((lineOutput, retval, index, success, lineCurrent, lineTotal) => func(lineOutput, retval, index, success, lineCurrent, lineTotal)));
}

export const OnPickupStreamIn = (func: (pickupId: number, forPlayerId: number) => void): void => {
    samp.on("OnPickupStreamIn", ((pickupId, forPlayerId) => func(pickupId, forPlayerId)));
}

export const OnPickupStreamOut = (func: (pickupId: number, forPlayerId: number) => void): void => {
    samp.on("OnPickupStreamOut", ((pickupId, forPlayerId) => func(pickupId, forPlayerId)));
}