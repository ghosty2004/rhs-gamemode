// => Settings

export const Streamer_GetTickRate = (): number => {
    return samp.callNative("Streamer_GetTickRate", "");
}

export const Streamer_SetTickRate = (rate: number): void => {
    samp.callNative("Streamer_SetTickRate", "i", rate);
}

export const Streamer_GetPlayerTickRate = (playerid: number): number => {
    return samp.callNative("Streamer_GetPlayerTickRate", "i", playerid);
}

export const Streamer_SetPlayerTickRate = (playerid: number, rate: number): void => {
    samp.callNative("Streamer_SetPlayerTickRate", "ii", playerid, rate);
}

export const Streamer_ToggleChunkStream = (toggle: number): void => {
    samp.callNative("Streamer_ToggleChunkStream", "i", toggle);
}

export const Streamer_IsToggleChunkStream = (): number => {
    return samp.callNative("Streamer_IsToggleChunkStream", "");
}

export const Streamer_GetChunkTickRate = (type: number, playerid: number): number => {
    return samp.callNative("Streamer_GetChunkTickRate", "ii", type, playerid);
}

export const Streamer_SetChunkTickRate = (type: number, rate: number, playerid: number): void => {
    samp.callNative("Streamer_SetChunkTickRate", "iii", type, rate, playerid);
}

export const Streamer_GetChunkSize = (type: number): number => {
    return samp.callNative("Streamer_GetChunkSize", "i", type);
}

export const Streamer_SetChunkSize = (type: number, size: number): void => {
    samp.callNative("Streamer_SetChunkSize", "ii", type, size);
}

export const Streamer_GetMaxItems = (type: number): number => {
    return samp.callNative("Streamer_GetMaxItems", "i", type);
}

export const Streamer_SetMaxItems = (type: number, items: number): void => {
    samp.callNative("Streamer_SetMaxItems", "ii", type, items);
}

export const Streamer_GetVisibleItems = (type: number, playerid: number): number => {
    return samp.callNative("Streamer_GetVisibleItems", "ii", type, playerid);
}

export const Streamer_SetVisibleItems = (type: number, items: number, playerid: number): void => {
    samp.callNative("Streamer_GetVisibleItems", "iii", type, items, playerid);
}

/** @deprecated */
export const Streamer_GetRadiusMultiplier = (type: number, multiplier: number, playerid: number): number => {
    return samp.callNative("Streamer_GetRadiusMultiplier", "iii", type, multiplier, playerid);
}

/** @deprecated */
export const Streamer_SetRadiusMultiplier = (type: number, multiplier: number, playerid: number): void => {
    samp.callNative("Streamer_SetRadiusMultiplier", "iii", type, multiplier, playerid);
}

/** @deprecated */
export const Streamer_GetTypePriority = (types: [], maxtypes: number): number => {
    return samp.callNative("Streamer_GetTypePriority", "ii", types, maxtypes);
}

/** @deprecated */
export const Streamer_SetTypePriority = (types: [], maxtypes: number): void => {
    samp.callNative("Streamer_SetTypePriority", "ii", types, maxtypes);
}

export const Streamer_GetCellDistance = (distance: number): number => {
    return samp.callNative("Streamer_GetCellDistance", "i", distance);
}

export const Streamer_SetCellDistance = (distance: number): void => {
    samp.callNative("Streamer_SetCellDistance", "i", distance);
}

export const Streamer_GetCellSize = (size: number): number => {
    return samp.callNative("Streamer_GetCellSize", "i", size);
}

export const Streamer_SetCellSize = (size: number): void => {
    samp.callNative("Streamer_SetCellSize", "i", size);
}

export const Streamer_ToggleItemStatic = (type: number, id: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleItemStatic", "iii", type, id, toggle);
}

export const Streamer_IsToggleItemStatic = (type: number, id: number): number => {
    return samp.callNative("Streamer_IsToggleItemStatic", "ii", type, id);
}

export const Streamer_ToggleItemInvAreas = (type: number, id: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleItemInvAreas", "iii", type, id, toggle);
}

export const Streamer_IsToggleItemInvAreas = (type: number, id: number): number => {
    return samp.callNative("Streamer_IsToggleItemInvAreas", "ii", type, id);
}

export const Streamer_ToggleItemCallbacks = (type: number, id: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleItemCallbacks", "iii", type, id, toggle);
}

export const Streamer_IsToggleItemCallbacks = (type: number, id: number): number => {
    return samp.callNative("Streamer_IsToggleItemCallbacks", "ii", type, id);
}

export const Streamer_ToggleErrorCallback = (toggle: boolean): void => {
    samp.callNative("Streamer_ToggleErrorCallback", "i", toggle);
}

export const Streamer_IsToggleErrorCallback = (): number => {
    return samp.callNative("Streamer_IsToggleErrorCallback", "");
}

export const Streamer_AmxUnloadDestroyItems = (toggle: boolean): void => {
    samp.callNative("Streamer_AmxUnloadDestroyItems", "i", toggle);
}

// => Updates

export const Streamer_ProcessActiveItems = (): void => {
    samp.callNative("Streamer_ProcessActiveItems", "");
}

export const Streamer_ToggleIdleUpdate = (playerid: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleIdleUpdate", "ii", playerid, toggle);
}

export const Streamer_IsToggleIdleUpdate = (playerid: number): number => {
    return samp.callNative("Streamer_IsToggleIdleUpdate", "i", playerid);
}

export const Streamer_ToggleCameraUpdate = (playerid: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleCameraUpdate", "ii", playerid, toggle);
}

export const Streamer_IsToggleCameraUpdate = (playerid: number): number => {
    return samp.callNative("Streamer_IsToggleCameraUpdate", "i", playerid);
}

export const Streamer_ToggleItemUpdate = (playerid: number, type: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleItemUpdate", "iii", playerid, type, toggle);
}

export const Streamer_IsToggleItemUpdate = (playerid: number, type: number): number => {
    return samp.callNative("Streamer_IsToggleItemUpdate", "ii", playerid, type);
}

/** @deprecated */
export const Streamer_GetLastUpdateTime = (): number => {
    return samp.callNative("Streamer_GetLastUpdateTime", "");
}

export const Streamer_Update = (playerid: number, type: -1): void => {
    samp.callNative("Streamer_Update", "ii", playerid, type);
}

export const Streamer_UpdateEx = (playerid: number, x: number, y: number, z: number, worldId: number, interiorId: number, type: number, compensatedTime: number, freezePlayer: number): void => {
    samp.callNative("Streamer_UpdateEx", "iiiiiiiii", playerid, x, y, z, worldId, interiorId, type, compensatedTime, freezePlayer);
}

// => Data Manipulation

/** @deprecated */
export const Streamer_GetFloatData = (type: number, id: number): number => {
    return samp.callNative("Streamer_GetFloatData", "ii", type, id);
}

export const Streamer_SetFloatData = (type: number, id: number, data: number, value: number): void => {
    samp.callNative("Streamer_SetFloatData", "iiii", type, id, data, value);
}   

/** @deprecated */
export const Streamer_GetIntData = (type: number, id: number, data: number): number => {
    return samp.callNative("Streamer_GetIntData", "iii", type, id, data);
}

export const Streamer_SetIntData = (type: number, id: number, data: number, value: number): void => {
    samp.callNative("Streamer_SetIntData", "iiii", type, id, data, value);
}

export const Streamer_RemoveIntData = (type: number, id: number, data: number): void => {
    samp.callNative("Streamer_RemoveIntData", "iii", type, id, data);
}

export const Streamer_HasIntData = (type: number, id: number, data: number): number => {
    return samp.callNative("Streamer_HasIntData", "iii", type, id, data);
}

/** @deprecated */
export const Streamer_GetArrayData = (type: number, id: number, data: number, dest: unknown, maxdest: unknown): unknown => {
    return samp.callNative("Streamer_GetArrayData", "iiiii", type, id, data, dest, maxdest);
}

/** @deprecated */
export const Streamer_SetArrayData = (type: number, id: number, data: number, src: unknown, maxsrc: unknown): void => {
    samp.callNative("Streamer_SetArrayData", "iiiii", type, id, data, src, maxsrc);
}

/** @deprecated */
export const Streamer_IsInArrayData = (type: number, id: number, data: number, value: number): number => {
    return samp.callNative("Streamer_IsInArrayData", "iiii", type, id, data, value);
}

/** @deprecated */
export const Streamer_AppendArrayData = (type: number, id: number, data: number, value: number): void => {
    samp.callNative("Streamer_AppendArrayData", "iiii", type, id, data, value);
}

/** @deprecated */
export const Streamer_RemoveArrayData = (type: number, id: number, data: number, value: number): void => {
    samp.callNative("Streamer_RemoveArrayData", "iiii", type, id, data, value);
}

/** @deprecated */
export const Streamer_HasArrayData = (type: number, id: number, data: number): number => {
    return samp.callNative("Streamer_HasArrayData", "iii", type, id, data);
}

/** @deprecated */
export const Streamer_GetArrayDataLength = (type: number, id: number, data: number): number => {
    return samp.callNative("Streamer_GetArrayDataLength", "iii", type, id, data);
}

export const Streamer_GetUpperBound = (type: number): number => {
    return samp.callNative("Streamer_GetUpperBound", "i", type);
}

// => Miscellaneous

export const Streamer_GetDistanceToItem = (x: number, y: number, z: number, id: number): number => {
    return samp.callNative("Streamer_GetDistanceToItem", "fffiF", x, y, z, id)
}

export const Streamer_ToggleItem = (playerid: number, type: number, id: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleItem", "iiii", playerid, type, id, toggle);
}

export const Streamer_IsToggleItem = (playerid: number, type: number, id: number): number => {
    return samp.callNative("Streamer_IsToggleItem", "iii", playerid, type, id);
}

export const Streamer_ToggleAllItems = (playerid: number, type: number, toggle: boolean): void => {
    samp.callNative("Streamer_ToggleAllItems", "iii", playerid, type, toggle);
}

export const Streamer_GetItemInternalID = (playerid: number, type: number, streamerid: number): number => {
    return samp.callNative("Streamer_GetItemInternalID", "iii", playerid, type, streamerid);
}

export const Streamer_GetItemStreamerID = (playerid: number, type: number, internalid: number): number => {
    return samp.callNative("Streamer_GetItemStreamerID", "iii", playerid, type, internalid);
}

export const Streamer_IsItemVisible = (playerid: number, type: number, id: number): number => {
    return samp.callNative("Streamer_IsItemVisible", "iii", playerid, type, id);
}

export const Streamer_DestroyAllVisibleItems = (playerid: number, type: number, serverwide: number): void => {
    samp.callNative("Streamer_DestroyAllVisibleItems", "iii", playerid, type, serverwide);
}

export const Streamer_CountVisibleItems = (playerid: number, type: number, serverwide: number): number => {
    return samp.callNative("Streamer_CountVisibleItems", "iii", playerid, type, serverwide);
}

export const Streamer_DestroyAllItems = (type: number, serverwide: number): void => {
    samp.callNative("Streamer_DestroyAllItems", "ii", type, serverwide);
}

export const Streamer_CountItems = (type: number, serverwide: number): number => {
    return samp.callNative("Streamer_CountItems", "ii", type, serverwide);
}

/** @deprecated */
export const Streamer_GetNearbyItems = (x: number, y: number, z: number, type: number, items: [], maxitems: number, range: number, worldid: number): number => {
    return samp.callNative("Streamer_GetNearbyItems", "iiiiiiii", x, y, z, type, items, maxitems, range, worldid)
}

/** @deprecated */
export const Streamer_GetAllVisibleItems = (playerid: number, type: number): Array<any> => {
    return samp.callNative("Streamer_GetAllVisibleItems", "iiI", playerid, type);
}

export const Streamer_GetItemPos = (type: number, id: number): Array<any> => {
    return samp.callNative("Streamer_GetItemPos", "iiFFF", type, id);
}

export const Streamer_SetItemPos = (type: number, id: number, x: number, y: number, z: number): void => {
    samp.callNative("Streamer_SetItemPos", "iifff", type, id, x, y, z);
}

export const Streamer_GetItemOffset = (type: number, id: number): Array<any> => {
    return samp.callNative("Streamer_GetItemOffset", "iiFFF", type, id);
}

export const Streamer_SetItemOffset = (type: number, id: number, x: number, y: number, z: number): void => {
    samp.callNative("Streamer_SetItemOffset", "iifff", type, id, x, y, z);
}

// => Objects

export const CreateDynamicObject = (modelid: number, x: number, y: number, z: number, rx: number, ry: number, rz: number, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 300, drawdistance = 300, areaid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicObject", "iffffffiiiffii", modelid, x, y, z, rx, ry, rz, worldid, interiorid, playerid, streamdistance, drawdistance, areaid, priority);
}

export const DestroyDynamicObject = (objectid: number): void => {
    samp.callNative("DestroyDynamicObject", "i", objectid);
}

export const IsValidDynamicObject = (objectid: number): number => {
    return samp.callNative("IsValidDynamicObject", "i", objectid);
}

export const GetDynamicObjectPos = (objectid: number): Array<any> => {
    return samp.callNative("GetDynamicObjectPos", "iFFF", objectid);
}

export const SetDynamicObjectPos = (objectid: number, x: number, y: number, z: number): void => {
    samp.callNative("SetDynamicObjectPos", "ifff", objectid, x, y, z);
}

export const GetDynamicObjectRot = (objectid: number): Array<any> => {
    return samp.callNative("GetDynamicObjectRot", "iFFF", objectid);
}

export const SetDynamicObjectRot = (objectid: number, rx: number, ry: number, rz: number): void => {
    samp.callNative("SetDynamicObjectRot", "ifff", objectid, rx, ry, rz);
}

export const GetDynamicObjectNoCameraCol = (objectid: number): number => {
    return samp.callNative("GetDynamicObjectNoCameraCol", "i", objectid);
}

export const SetDynamicObjectNoCameraCol = (objectid: number): void => {
    samp.callNative("SetDynamicObjectNoCameraCol", "i", objectid);
}

export const MoveDynamicObject = (objectid: number, x: number, y: number, z: number, speed: number, rx = -1000, ry = -1000, rz = -1000): void => {
    samp.callNative("MoveDynamicObject", "ifffffff", objectid, x, y, z, speed, rx, ry, rz);
}

export const StopDynamicObject = (objectid: number): void => {
    samp.callNative("StopDynamicObject", "i", objectid);
}

export const IsDynamicObjectMoving = (objectid: number): number => {
    return samp.callNative("IsDynamicObjectMoving", "i", objectid);
}

export const AttachCameraToDynamicObject = (playerid: number, objectid: number): void => {
    samp.callNative("AttachCameraToDynamicObject", "ii", playerid, objectid);
}

export const AttachDynamicObjectToObject = (objectid: number, attachtoid: number, offsetx: number, offsety: number, offsetz: number, rx: number, ry: number, rz: number, syncrotation = -1): void => {
    samp.callNative("AttachDynamicObjectToObject", "iiffffffi", objectid, attachtoid, offsetx, offsety, offsetz, rx, ry, rz, syncrotation);
}

export const AttachDynamicObjectToPlayer = (objectid: number, playerid: number, offsetx: number, offsety: number, offsetz: number, rx: number, ry: number, rz: number): void => {
    samp.callNative("AttachDynamicObjectToPlayer", "iiffffff", objectid, playerid, offsetx, offsety, offsetz, rx, ry, rz);
}

export const AttachDynamicObjectToVehicle = (objectid: number, vehicleid: number, offsetx: number, offsety: number, offsetz: number, rx: number, ry: number, rz: number): void => {
    samp.callNative("AttachDynamicObjectToVehicle", "iiffffff", objectid, vehicleid, offsetx, offsety, offsetz, rx, ry, rz);
}

export const EditDynamicObject = (playerid: number, objectid: number): void => {
    samp.callNative("EditDynamicObject", "ii", playerid, objectid);
}

export const IsDynamicObjectMaterialUsed = (objectid: number, materialindex: number): number => {
    return samp.callNative("IsDynamicObjectMaterialUsed", "ii", objectid, materialindex);
}

export const RemoveDynamicObjectMaterial = (objectid: number, materialindex: number): void => {
    samp.callNative("RemoveDynamicObjectMaterial", "ii", objectid, materialindex);
}

export const GetDynamicObjectMaterial = (objectid: number, materialindex: number): { modelId: number, txdName: string, textureName: string, materialColor: number } => {
    const data = samp.callNative("GetDynamicObjectMaterial", "iiISSI", objectid, materialindex);
    return { modelId: data[0], txdName: data[1], textureName: data[2], materialColor: data[3] };
}

export const SetDynamicObjectMaterial = (objectid: number, materialindex: number, modelid: number, txdname: string, texturename: string, materialcolor = 0): void => {
    samp.callNative("SetDynamicObjectMaterial", "iiissi", objectid, materialindex, modelid, txdname, texturename, materialcolor);
}

export const IsDynamicObjectMaterialTextUsed = (objectid: number, materialindex: number): number => {
    return samp.callNative("IsDynamicObjectMaterialTextUsed", "ii", objectid, materialindex);
}

export const RemoveDynamicObjectMaterialText = (objectid: number, materialindex: number): void => {
    samp.callNative("RemoveDynamicObjectMaterialText", "ii", objectid, materialindex);
}

export const GetDynamicObjectMaterialText = (objectid: number, materialindex: number): { text: string, materialSize: number, fontFace: string, fontSize: number, bold: number, fontColor: number, backColor: number, textAligment: number } => {
    const data = samp.callNative("GetDynamicObjectMaterialText", "iiSISIIIII", objectid, materialindex);
    return { text: data[0], materialSize: data[1], fontFace: data[2], fontSize: data[3], bold: data[4], fontColor: data[5], backColor: data[6], textAligment: data[7] };
}

export const SetDynamicObjectMaterialText = (objectid: number, materialindex: number, text: string, materialsize: number, fontface = "Arial", fontsize = 24, bold = 1, fontcolor = 0xFFFFFFFF, backcolor = 0, textalignment = 0): void => {
    samp.callNative("SetDynamicObjectMaterialText", "iisisiiiii", objectid, materialindex, text, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
}

export const GetPlayerCameraTargetDynObject = (playerid: number): number => {
    return samp.callNative("GetPlayerCameraTargetDynObject", "i", playerid);
}

// => Pickups

export const CreateDynamicPickup = (modelid: number, type: number, x: number, y: number, z: number, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200, areaid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicPickup", "iifffiiifii", modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority);
}

export const DestroyDynamicPickup = (pickupid: number): void => {
    samp.callNative("DestroyDynamicPickup", "i", pickupid);
}

export const IsValidDynamicPickup = (pickupid: number): number => {
    return samp.callNative("IsValidDynamicPickup", "i", pickupid);
}

// => Checkpoints

export const CreateDynamicCP = (x: number, y: number, z: number, size: number, worldid = -1, interiorid = -1, playerid = -1): number => {
    return samp.callNative("CreateDynamicCP", "ffffiiii", x, y, z, size, worldid, interiorid, playerid);
}

export const DestroyDynamicCP = (checkpointid: number): void => {
    samp.callNative("DestroyDynamicCP", "i", checkpointid);
}

export const IsValidDynamicCP = (checkpointid: number): number => {
    return samp.callNative("IsValidDynamicCP", "i", checkpointid);
}

export const IsPlayerInDynamicCP = (playerid: number, checkpointid: number): number => {
    return samp.callNative("IsPlayerInDynamicCP", "ii", playerid, checkpointid);
}

export const GetPlayerVisibleDynamicCP = (playerid: number): number => {
    return samp.callNative("GetPlayerVisibleDynamicCP", "i", playerid);
}

// => Race Checkpoints

export const CreateDynamicRaceCP = (type: number, x: number, y: number, z: number, nextx: number, nexty: number, nextz: number, size: number, worldid = -1, interiorid = -1, playerid = -1): number => {
    return samp.callNative("CreateDynamicRaceCP", "ifffffffiii", type, x, y, z, nextx, nexty, nextz, size, worldid, interiorid, playerid);
}

export const DestroyDynamicRaceCP = (checkpointid: number): void => {
    samp.callNative("DestroyDynamicRaceCP", "i", checkpointid);
}

export const IsValidDynamicRaceCP = (checkpointid: number): number => {
    return samp.callNative("IsValidDynamicRaceCP", "i", checkpointid);
}

export const IsPlayerInDynamicRaceCP = (playerid: number, checkpointid: number): number => {
    return samp.callNative("IsPlayerInDynamicRaceCP", "ii", playerid, checkpointid);
}

export const GetPlayerVisibleDynamicRaceCP = (playerid: number): number => {
    return samp.callNative("GetPlayerVisibleDynamicRaceCP", "i", playerid);
}

// => Map Icons

export const CreateDynamicMapIcon = (x: number, y: number, z: number, type: number, color: number, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200, style = 0, areaid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicMapIcon", "fffiiiiifiii", x, y, z, type, color, worldid, interiorid, playerid, streamdistance, style, areaid, priority);
}

export const DestroyDynamicMapIcon = (iconid: number): void => {
    samp.callNative("DestroyDynamicMapIcon", "i", iconid);
}

export const IsValidDynamicMapIcon = (iconid: number): number => {
    return samp.callNative("IsValidDynamicMapIcon", "i", iconid);
}

// => 3D Text Labels

export const CreateDynamic3DTextLabel = (text: string, color: number, x: number, y: number, z: number, drawdistance: number, attachedplayer = 0xFFFF, attachedvehicle = 0xFFFF, testlos = 0, worldid = -1, interiorid = -1, playerid = -1, streamdistance = 200, areaid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamic3DTextLabel", "siffffiiiiiifii", text, color, x, y, z, drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid, playerid, streamdistance, areaid, priority);
}

export const DestroyDynamic3DTextLabel = (id: number): void => {
    samp.callNative("DestroyDynamic3DTextLabel", "i", id);
}

export const IsValidDynamic3DTextLabel = (id: number): number => {
    return samp.callNative("DestroyDynamic3DTextLabel", "i", id);
}

export const GetDynamic3DTextLabelText = (id: number): string => {
    return samp.callNative("GetDynamic3DTextLabelText", "iS", id);
}

export const UpdateDynamic3DTextLabelText = (id: number, color: number, text: string): void => {
    samp.callNative("UpdateDynamic3DTextLabelText", "iis", id, color, text);
}

// => Areas

export const CreateDynamicCircle = (x: number, y: number, size: number, worldid = -1, interiorid = -1, playerid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicCircle", "fffiiii", x, y, size, worldid, interiorid, playerid, priority);
}

export const CreateDynamicCylinder = (x: number, y: number, minz: number, maxz: number, size: number, worldid = -1, interiorid = -1, playerid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicCylinder", "fffffiiii", x, y, minz, maxz, size, worldid, interiorid, playerid, priority);
}

export const CreateDynamicSphere = (x: number, y: number, z: number, size: number, worldid = -1, interiorid = -1, playerid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicSphere", "ffffiiii", x, y, z, size, worldid, interiorid, playerid, priority);
}

export const CreateDynamicRectangle = (minx: number, miny: number, maxx: number, maxy: number, worldid = -1, interiorid = -1, playerid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicRectangle", "ffffiiii", minx, miny, maxx, maxy, worldid, interiorid, playerid, priority);
}

export const CreateDynamicCuboid = (minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number, worldid = -1, interiorid = -1, playerid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicCuboid", "ffffffiiii", minx, miny, minz, maxx, maxy, maxz, worldid, interiorid, playerid, priority);
}

export const CreateDynamicCube = (minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number, worldid = -1, interiorid = -1, playerid = -1, priority = 0): number => {
    return samp.callNative("CreateDynamicCube", "ffffffiiii", minx, miny, minz, maxx, maxy, maxz, worldid, interiorid, playerid, priority);
}

/** @deprecated */
export const CreateDynamicPolygon = (): any => { }

export const DestroyDynamicArea = (areaid: number): void => {
    samp.callNative("DestroyDynamicArea", "i", areaid);
}

export const IsValidDynamicArea = (areaid: number): number => {
    return samp.callNative("IsValidDynamicArea", "i", areaid);
}

export const GetDynamicAreaType = (areaid: number): number => {
    return samp.callNative("GetDynamicAreaType", "i", areaid);
}

/** @deprecated */
export const GetDynamicPolygonPoints = (areaid: number): any => { }

export const GetDynamicPolygonNumberPoints = (areaid: number): number => {
    return samp.callNative("GetDynamicPolygonNumberPoints", "i", areaid);
}

export const IsPlayerInDynamicArea = (playerid: number, areaid: number, recheck = 0): number => {
    return samp.callNative("IsPlayerInDynamicArea", "iii", playerid, areaid, recheck);
}

export const IsPlayerInAnyDynamicArea = (playerid: number, recheck = 0): number => {
    return samp.callNative("IsPlayerInAnyDynamicArea", "ii", playerid, recheck);
}

export const IsAnyPlayerInDynamicArea = (areaid: number, recheck = 0): number => {
    return samp.callNative("IsAnyPlayerInDynamicArea", "ii", areaid, recheck);
}

export const IsAnyPlayerInAnyDynamicArea = (recheck = 0): number => {
    return samp.callNative("IsAnyPlayerInAnyDynamicArea", "i", recheck);
}

export const GetPlayerDynamicAreas = (playerid: number): Array<any> => {
    return samp.callNative("GetPlayerDynamicAreas", "iS", playerid);
}

export const GetPlayerNumberDynamicAreas = (playerid: number): number => {
    return samp.callNative("GetPlayerNumberDynamicAreas", "i", playerid);
}

export const IsPointInDynamicArea = (areaid: number, x: number, y: number, z: number): number => {
    return samp.callNative("IsPointInDynamicArea", "ifff", areaid, x, y, z);
}

export const IsPointInAnyDynamicArea = (x: number, y: number, z: number): number => {
    return samp.callNative("IsPointInAnyDynamicArea", "fff", x, y, z);
}

export const IsLineInDynamicArea = (areaid: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number => {
    return samp.callNative("IsLineInDynamicArea", "iffffff", areaid, x1, y1, z1, x2, y2, z2);
}

export const IsLineInAnyDynamicArea = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number => {
    return samp.callNative("IsLineInDynamicArea", "ffffff", x1, y1, z1, x2, y2, z2);
}

export const GetDynamicAreasForPoint = (x: number, y: number, z: number): Array<any> => {
    return samp.callNative("GetDynamicAreasForPoint", "fffS", x, y, z);
}

export const GetNumberDynamicAreasForPoint = (x: number, y: number, z: number): number => {
    return samp.callNative("GetNumberDynamicAreasForPoint", "fff", x, y, z);
}

export const GetDynamicAreasForLine = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Array<any> => {
    return samp.callNative("GetDynamicAreasForLine", "ffffffS", x1, y1, z1, x2, y2, z2);
}

export const GetNumberDynamicAreasForLine = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number => {
    return samp.callNative("GetNumberDynamicAreasForLine", "ffffff", x1, y1, z1, x2, y2, z2);
}

export const AttachDynamicAreaToObject = (areaid: number, objectid: number): void => {
    samp.callNative("AttachDynamicAreaToObject", "ii", areaid, objectid);
}

export const AttachDynamicAreaToPlayer = (areaid: number, playerid: number, offsetx = 0, offsety = 0, offsetz = 0): void => {
    samp.callNative("AttachDynamicAreaToPlayer", "iifff", areaid, playerid, offsetx, offsety, offsetz);
}

export const AttachDynamicAreaToVehicle = (areaid: number, vehicleid: number, offsetx = 0, offsety = 0, offsetz = 0): void => {
    samp.callNative("AttachDynamicAreaToVehicle", "iifff", areaid, vehicleid, offsetx, offsety, offsetz);
}

export const ToggleDynAreaSpectateMode = (areaid: number, toggle: boolean): void => {
    samp.callNative("ToggleDynAreaSpectateMode", "ii", areaid, toggle);
}

export const IsToggleDynAreaSpectateMode = (areaid: number): number => {
    return samp.callNative("IsToggleDynAreaSpectateMode", "i", areaid);
}