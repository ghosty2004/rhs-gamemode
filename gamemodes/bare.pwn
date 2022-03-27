#include <a_samp>
#include <samp-node>
#include <map-zones>
#include <streamer>
#include <mapandreas>
#include <CPLoader>
#include <YSF>

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
}
event:getLocationData(RequestID[], Float:x, Float:y, Float:z) {
    new place[24];
    new MapZone:zone = GetMapZoneAtPoint(x, y, z);
    if(zone == INVALID_MAP_ZONE_ID) format(place, sizeof(place), "Unknown");
    else { GetMapZoneName(zone, place); }
    SAMPNode_CallEvent("locationResponse", RequestID, place);
}

/* =============== */
/* YSF Node Events */
/* =============== */
event:_SetMaxPlayers(maxplayers) return SetMaxPlayers(maxplayers);
event:_AddServerRule(const name[], const value[]) return AddServerRule(name, value);
event:_SetServerRule(const name[], const value[]) return SetServerRule(name, value);
event:_EnableConsoleMSGsForPlayer(playerid, color) return EnableConsoleMSGsForPlayer(playerid, color);
event:_IsValidNickName(const name[]) return IsValidNickName(name);
event:_AllowNickNameCharacter(const character[], bool:allow) return AllowNickNameCharacter(character[0], allow);
event:_IsNickNameCharacterAllowed(const character[]) return IsNickNameCharacterAllowed(character[0]);
event:_SetPlayerAdmin(playerid, bool:admin) return SetPlayerAdmin(playerid, admin);

/* ==================== */
/* CPLoader Node Events */
/* ==================== */
event:CreateCustomCheckpoint(Float:x, Float:y, Float:z, Float:size, drawdistance) { return CPS_AddCheckpoint(x, y, z, size, drawdistance); }
event:DeleteCustomCheckpoint(cpid) { return CPS_RemoveCheckpoint(cpid); }
event:GetPlayerCustomCheckpoint(playerid) { return CPS_GetPlayerCheckpoint(playerid); }
event:IsPlayerInAnyCustomCheckpoint(playerid) { return CPS_IsPlayerInAnyCheckpoint(playerid); }