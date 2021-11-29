#include <a_samp>
#include <samp-node>
#include <map-zones>
#include <streamer>
#include <mapandreas>
#include <CPLoader>

#define event:%0(%1) forward %0(%1); public %0(%1)

main() {}

/* ================= */
/* Custom Node Events */
/* ================= */
event:findPositionZ(RequestID[], Float:x, Float:y) {
    new Float:z;
    MapAndreas_Init(1);
	MapAndreas_FindZ_For2DCoord(x, y, z);
	SAMPNode_CallEvent("findPositionZResponse", RequestID, x, y, z);
	return true;
}
event:getLocationData(RequestID[], Float:x, Float:y, Float:z) {
    new place[24];
    new MapZone:zone = GetMapZoneAtPoint(x, y, z);
    if(zone == INVALID_MAP_ZONE_ID) format(place, sizeof(place), "Unknown");
    else { GetMapZoneName(zone, place); }
    SAMPNode_CallEvent("locationResponse", RequestID, place);
    return true;
}

/* ==================== */
/* CPLoader Node Events */
/* ==================== */
event:CreateCustomCheckpoint(Float:x, Float:y, Float:z, Float:size, drawdistance) { return CPS_AddCheckpoint(x, y, z, size, drawdistance); }
event:DeleteCustomCheckpoint(cpid) { return CPS_RemoveCheckpoint(cpid); }
event:GetPlayerCustomCheckpoint(playerid) { return CPS_GetPlayerCheckpoint(playerid); }
event:IsPlayerInAnyCustomCheckpoint(playerid) { return CPS_IsPlayerInAnyCheckpoint(playerid); }

/* ==================== */
/* Streamer Node Events */
/* ==================== */
event:_CreateDynamicObject(modelid, Float:x, Float:y, Float:z, Float:rx, Float:ry, Float:rz, worldid, interiorid, playerid, Float:streamdistance, Float:drawdistance, areaid, priority) { return CreateDynamicObject(modelid, Float:x, Float:y, Float:z, Float:rx, Float:ry, Float:rz, worldid, interiorid, playerid, Float:streamdistance, Float:drawdistance, areaid, priority); }
event:_DestroyDynamicObject(objectid) { return DestroyDynamicObject(objectid); }
event:_IsValidDynamicObject(objectid) { return IsValidDynamicObject(objectid); }
event:_SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname[], texturename[], materialcolor) { SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname, texturename, materialcolor); }
event:_SetDynamicObjectMaterialText(objectid, materialindex, text[], materialsize, fontface[], fontsize, bold, fontcolor, backcolor, textalignment) { return SetDynamicObjectMaterialText(objectid, materialindex, text, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment); }

event:_CreateDynamicPickup(modelid, type, Float:x, Float:y, Float:z, worldid, interiorid, playerid, streamdistance, areaid, priority) { return CreateDynamicPickup(modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority); }
event:_DestroyDynamicPickup(STREAMER_TAG_PICKUP:pickupid) { return DestroyDynamicPickup(STREAMER_TAG_PICKUP:pickupid); }
event:_IsValidDynamicPickup(STREAMER_TAG_PICKUP:pickupid) { return IsValidDynamicPickup(STREAMER_TAG_PICKUP:pickupid); }

event:_CreateDynamic3DTextLabel(text[], color, Float:x, Float:y, Float:z, Float:drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid) { return CreateDynamic3DTextLabel(text, color, Float:x, Float:y, Float:z, Float:drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid); }
event:_DestroyDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id) { return DestroyDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id); }
event:_IsValidDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id) { return IsValidDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id); }
event:_UpdateDynamic3DTextLabelText(STREAMER_TAG_3D_TEXT_LABEL:id, color, text[]) { return UpdateDynamic3DTextLabelText(STREAMER_TAG_3D_TEXT_LABEL:id, color, text); }

event:_Streamer_Update(playerid) { return Streamer_Update(playerid); }