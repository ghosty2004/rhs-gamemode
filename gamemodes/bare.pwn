#include <a_samp>
#include <samp-node>
#include <map-zones>
#include <streamer>
#include <mapandreas>

main() {}

forward findPositionZ(RequestID[], Float:x, Float:y);
public findPositionZ(RequestID[], Float:x, Float:y) {
	new Float:z;
    MapAndreas_Init(1);
	MapAndreas_FindZ_For2DCoord(x, y, z);
	SAMPNode_CallEvent("findPositionZResponse", RequestID, x, y, z);
	return true;
}

forward getLocationData(RequestID[], Float:x, Float:y, Float:z);
public getLocationData(RequestID[], Float:x, Float:y, Float:z) {
    new place[24];
    new MapZone:zone = GetMapZoneAtPoint(x, y, z);
    if(zone == INVALID_MAP_ZONE_ID) format(place, sizeof(place), "Unknown");
    else { GetMapZoneName(zone, place); }
    SAMPNode_CallEvent("locationResponse", RequestID, place);
    return true;
}

// => Objects
forward _CreateDynamicObject(modelid, Float:x, Float:y, Float:z, Float:rx, Float:ry, Float:rz, worldid, interiorid, playerid, Float:streamdistance, Float:drawdistance, areaid, priority);
public _CreateDynamicObject(modelid, Float:x, Float:y, Float:z, Float:rx, Float:ry, Float:rz, worldid, interiorid, playerid, Float:streamdistance, Float:drawdistance, areaid, priority) { return CreateDynamicObject(modelid, Float:x, Float:y, Float:z, Float:rx, Float:ry, Float:rz, worldid, interiorid, playerid, Float:streamdistance, Float:drawdistance, areaid, priority); }

forward _DestroyDynamicObject(objectid);
public _DestroyDynamicObject(objectid) { return DestroyDynamicObject(objectid); }

forward _IsValidDynamicObject(objectid);
public _IsValidDynamicObject(objectid) { return IsValidDynamicObject(objectid); }

forward _SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname[], texturename[], materialcolor);
public _SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname[], texturename[], materialcolor) { return SetDynamicObjectMaterial(objectid, materialindex, modelid, txdname, texturename, materialcolor); }

forward _SetDynamicObjectMaterialText(objectid, materialindex, text[], materialsize, fontface[], fontsize, bold, fontcolor, backcolor, textalignment);
public _SetDynamicObjectMaterialText(objectid, materialindex, text[], materialsize, fontface[], fontsize, bold, fontcolor, backcolor, textalignment) { return SetDynamicObjectMaterialText(objectid, materialindex, text, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment); }

// => Pickups
forward _CreateDynamicPickup(modelid, type, Float:x, Float:y, Float:z, worldid, interiorid, playerid, streamdistance, areaid, priority);
public _CreateDynamicPickup(modelid, type, Float:x, Float:y, Float:z, worldid, interiorid, playerid, streamdistance, areaid, priority) { return CreateDynamicPickup(modelid, type, x, y, z, worldid, interiorid, playerid, streamdistance, areaid, priority); }

forward _DestroyDynamicPickup(STREAMER_TAG_PICKUP:pickupid);
public _DestroyDynamicPickup(STREAMER_TAG_PICKUP:pickupid) { return DestroyDynamicPickup(STREAMER_TAG_PICKUP:pickupid); }

forward _IsValidDynamicPickup(STREAMER_TAG_PICKUP:pickupid);
public _IsValidDynamicPickup(STREAMER_TAG_PICKUP:pickupid) { return IsValidDynamicPickup(STREAMER_TAG_PICKUP:pickupid); }

// => 3D Text Labels
forward _CreateDynamic3DTextLabel(text[], color, Float:x, Float:y, Float:z, Float:drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid);
public _CreateDynamic3DTextLabel(text[], color, Float:x, Float:y, Float:z, Float:drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid) { 
    return CreateDynamic3DTextLabel(text, color, Float:x, Float:y, Float:z, Float:drawdistance, attachedplayer, attachedvehicle, testlos, worldid, interiorid); 
}

forward _DestroyDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id);
public _DestroyDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id) { return DestroyDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id); }

forward _IsValidDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id);
public _IsValidDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id) { return IsValidDynamic3DTextLabel(STREAMER_TAG_3D_TEXT_LABEL:id); }

forward _UpdateDynamic3DTextLabelText(STREAMER_TAG_3D_TEXT_LABEL:id, color, text[]);
public _UpdateDynamic3DTextLabelText(STREAMER_TAG_3D_TEXT_LABEL:id, color, text[]) { return UpdateDynamic3DTextLabelText(STREAMER_TAG_3D_TEXT_LABEL:id, color, text); }

// => Updates
forward _samp_Streamer_Update(playerid);
public _samp_Streamer_Update(playerid) { return Streamer_Update(playerid); }
