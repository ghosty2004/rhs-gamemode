export const OnDynamicObjectMoved = (func: (objectid: number) => void): void => {
    samp.registerEvent("OnDynamicObjectMoved", "i");
    samp.on("OnDynamicObjectMoved", ((objectid) => func(objectid)));
}

export const OnPlayerEditDynamicObject = (func: (playerid: number, objectid: number, response: number, x: number, y: number, z: number, rx: number, ry: number, rz: number) => void): void => {
    samp.registerEvent("OnPlayerEditDynamicObject", "iiiiiiiii");
    samp.on("OnPlayerEditDynamicObject", ((playerid, objectid, response, x, y, z, rx, ry, rz) => func(playerid, objectid, response, x, y, z, rx, ry, rz)));
}

export const OnPlayerSelectDynamicObject = (func: (playerid: number, objectid: number, modelid: number, x: number, y: number, z: number) => void): void => {
    samp.registerEvent("OnPlayerSelectDynamicObject", "iiiiii");
    samp.on("OnPlayerSelectDynamicObject", ((playerid, objectid, modelid, x, y, z) => func(playerid, objectid, modelid, x, y, z)));
}

export const OnPlayerShootDynamicObject = (func: (playerid: number, weaponid: number, objectid: number, x: number, y: number, z: number) => void): void => {
    samp.registerEvent("OnPlayerShootDynamicObject", "iiiiii");
    samp.on("OnPlayerShootDynamicObject", ((playerid, weaponid, objectid, x, y, z) => func(playerid, weaponid, objectid, x, y, z)));
}

export const OnPlayerPickUpDynamicPickup = (func: (playerid: number, pickupid: number) => void): void => {
    samp.registerEvent("OnPlayerPickUpDynamicPickup", "ii");
    samp.on("OnPlayerPickUpDynamicPickup", ((playerid, pickupid) => func(playerid, pickupid)));
}

export const OnPlayerEnterDynamicCP = (func: (playerid: number, checkpointid: number) => void): void => {
    samp.registerEvent("OnPlayerEnterDynamicCP", "ii");
    samp.on("OnPlayerEnterDynamicCP", ((playerid, checkpointid) => func(playerid, checkpointid)));
}

export const OnPlayerLeaveDynamicCP = (func: (playerid: number, checkpointid: number) => void): void => {
    samp.registerEvent("OnPlayerLeaveDynamicCP", "ii");
    samp.on("OnPlayerLeaveDynamicCP", ((playerid, checkpointid) => func(playerid, checkpointid)));
}

export const OnPlayerEnterDynamicRaceCP = (func: (playerid: number, checkpointid: number) => void): void => {
    samp.registerEvent("OnPlayerEnterDynamicRaceCP", "ii");
    samp.on("OnPlayerEnterDynamicRaceCP", ((playerid, checkpointid) => func(playerid, checkpointid)));
}

export const OnPlayerLeaveDynamicRaceCP = (func: (playerid: number, checkpointid: number) => void): void => {
    samp.registerEvent("OnPlayerLeaveDynamicRaceCP", "ii");
    samp.on("OnPlayerLeaveDynamicRaceCP", ((playerid, checkpointid) => func(playerid, checkpointid)));
}

export const OnPlayerEnterDynamicArea = (func: (playerid: number, areaid: number) => void): void => {
    samp.registerEvent("OnPlayerEnterDynamicArea", "ii");
    samp.on("OnPlayerEnterDynamicArea", ((playerid, areaid) => func(playerid, areaid)));
}

export const OnPlayerLeaveDynamicArea = (func: (playerid: number, areaid: number) => void): void => {
    samp.registerEvent("OnPlayerLeaveDynamicArea", "ii");
    samp.on("OnPlayerLeaveDynamicArea", ((playerid, areaid) => func(playerid, areaid)));
}

export const OnPlayerGiveDamageDynamicActor = (func: (playerid: number, actorid: number, amount: number, weaponid: number, bodypart: number) => void): void => {
    samp.registerEvent("OnPlayerGiveDamageDynamicActor", "iiiii");
    samp.on("OnPlayerGiveDamageDynamicActor", ((playerid, actorid, amount, weaponid, bodypart) => func(playerid, actorid, amount, weaponid, bodypart)));
}

export const OnDynamicActorStreamIn = (func: (actorid: number, forplayerid: number) => void): void => {
    samp.registerEvent("OnDynamicActorStreamIn", "ii"); 
    samp.on("OnDynamicActorStreamIn", ((actorid, forplayerid) => func(actorid, forplayerid)));
}

export const OnDynamicActorStreamOut = (func: (actorid: number, forplayerid: number) => void): void => {
    samp.registerEvent("OnDynamicActorStreamOut", "ii"); 
    samp.on("OnDynamicActorStreamOut", ((actorid, forplayerid) => func(actorid, forplayerid)));
}

export const Streamer_OnItemStreamIn = (func: (type: number, id: number, forplayerid: number) => void): void => {
    samp.registerEvent("Streamer_OnItemStreamIn", "iii"); 
    samp.on("Streamer_OnItemStreamIn", ((type, id, forplayerid) => func(type, id, forplayerid)));
}

export const Streamer_OnItemStreamOut = (func: (type: number, id: number, forplayerid: number) => void): void => {
    samp.registerEvent("Streamer_OnItemStreamOut", "iii");
    samp.on("Streamer_OnItemStreamOut", ((type, id, forplayerid) => func(type, id, forplayerid)));
}

export const Streamer_OnPluginError = (func: (error: string) => void): void => {
    samp.registerEvent("Streamer_OnPluginError", "s");
    samp.on("Streamer_OnPluginError", ((error) => func(error)));
}