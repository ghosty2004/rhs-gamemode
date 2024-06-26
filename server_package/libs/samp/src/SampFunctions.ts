/*
MIT License

Copyright (c) 2020 Peter Szombati

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
import {CARMODTYPE, FIGHT_STYLE, PLAYER_STATE, TEXTDRAW_ALIGN, VEHICLE_MODEL_INFO, WEAPONSKILL} from "./SampEnum";
import {SMART_DIALOG_CALLBACK} from "./SampInterface";

import { EventEmitter } from "events";

export const SendClientMessage = (playerid: number, color: number, message: string): number => {
    return SampFunctions.SendClientMessage(playerid, color, message);
};
export const SendClientMessageToAll = (color: number, message: string): number => {
    return SampFunctions.SendClientMessageToAll(color, message);
};
export const SendPlayerMessageToPlayer = (playerid: number, senderid: number, message: string): number => {
    return SampFunctions.SendPlayerMessageToPlayer(playerid, senderid, message);
};
export const SendPlayerMessageToAll = (senderid: number, message: string): number => {
    return SampFunctions.SendPlayerMessageToAll(senderid, message);
};
export const SendDeathMessage = (killer: number, killee: number, weapon: number): number => {
    return SampFunctions.SendDeathMessage(killer, killee, weapon);
};
export const SendDeathMessageToPlayer = (playerid: number, killer: number, killee: number, weapon: number): number => {
    return SampFunctions.SendDeathMessageToPlayer(playerid, killer, killee, weapon);
};
export const GameTextForAll = (string: string, time: number, style: number): number => {
    return SampFunctions.GameTextForAll(string, time, style);
};
export const GameTextForPlayer = (playerid: number, string: string, time: number, style: number): number => {
    return SampFunctions.GameTextForPlayer(playerid, string, time, style);
};
export const SetTimer = (funcname: string, interval: number, repeating: number): number => {
    return SampFunctions.SetTimer(funcname, interval, repeating);
};
export const KillTimer = (timerid: number): number => {
    return SampFunctions.KillTimer(timerid);
};
export const GetTickCount = (): number => {
    return SampFunctions.GetTickCount();
};
export const GetMaxPlayers = (): number => {
    return SampFunctions.GetMaxPlayers();
};
export const VectorSize = (x: number, y: number, z: number): number => {
    return SampFunctions.VectorSize(x, y, z);
};
export const asin = (value: number): number => {
    return SampFunctions.asin(value);
};
export const acos = (value: number): number => {
    return SampFunctions.acos(value);
};
export const atan = (value: number): number => {
    return SampFunctions.atan(value);
};
export const atan2 = (y: number, x: number): number => {
    return SampFunctions.atan2(y, x);
};
export const GetPlayerPoolSize = (): number => {
    return SampFunctions.GetPlayerPoolSize();
};
export const GetVehiclePoolSize = (): number => {
    return SampFunctions.GetVehiclePoolSize();
};
export const GetActorPoolSize = (): number => {
    return SampFunctions.GetActorPoolSize();
};
export const SHA256_PassHash = (password: string, salt: string, ret_hash_len: number): string => {
    return SampFunctions.SHA256_PassHash(password, salt, ret_hash_len);
};
export const SetSVarInt = (varname: string, int_value: number): number => {
    return SampFunctions.SetSVarInt(varname, int_value);
};
export const GetSVarInt = (varname: string): number => {
    return SampFunctions.GetSVarInt(varname);
};
export const SetSVarString = (varname: string, string_value: string): number => {
    return SampFunctions.SetSVarString(varname, string_value);
};
export const GetSVarString = (varname: string, len: number): string => {
    return SampFunctions.GetSVarString(varname, len);
};
export const SetSVarFloat = (varname: string, float_value: number): number => {
    return SampFunctions.SetSVarFloat(varname, float_value);
};
export const GetSVarFloat = (varname: string): number => {
    return SampFunctions.GetSVarFloat(varname);
};
export const DeleteSVar = (varname: string): number => {
    return SampFunctions.DeleteSVar(varname);
};
export const GetSVarsUpperIndex = (): number => {
    return SampFunctions.GetSVarsUpperIndex();
};
export const GetSVarNameAtIndex = (index: number, ret_len: number): string => {
    return SampFunctions.GetSVarNameAtIndex(index, ret_len);
};
export const GetSVarType = (varname: string): number => {
    return SampFunctions.GetSVarType(varname);
};
export const SetGameModeText = (string: string): number => {
    return SampFunctions.SetGameModeText(string);
};
export const SetTeamCount = (count: number): number => {
    return SampFunctions.SetTeamCount(count);
};
export const AddPlayerClass = (modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, weapon1: number, weapon1_ammo: number, weapon2: number, weapon2_ammo: number, weapon3: number, weapon3_ammo: number): number => {
    return SampFunctions.AddPlayerClass(modelid, spawn_x, spawn_y, spawn_z, z_angle, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
};
export const AddPlayerClassEx = (teamid: number, modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, weapon1: number, weapon1_ammo: number, weapon2: number, weapon2_ammo: number, weapon3: number, weapon3_ammo: number): number => {
    return SampFunctions.AddPlayerClassEx(teamid, modelid, spawn_x, spawn_y, spawn_z, z_angle, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
};
export const AddStaticVehicle = (modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, color1: number, color2: number): number => {
    return SampFunctions.AddStaticVehicle(modelid, spawn_x, spawn_y, spawn_z, z_angle, color1, color2);
};
export const AddStaticVehicleEx = (modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, color1: number, color2: number, respawn_delay: number, addsiren: number): number => {
    return SampFunctions.AddStaticVehicleEx(modelid, spawn_x, spawn_y, spawn_z, z_angle, color1, color2, respawn_delay, addsiren);
};
export const AddStaticPickup = (model: number, type: number, X: number, Y: number, Z: number, virtualworld: number): number => {
    return SampFunctions.AddStaticPickup(model, type, X, Y, Z, virtualworld);
};
export const CreatePickup = (model: number, type: number, X: number, Y: number, Z: number, virtualworld: number): number => {
    return SampFunctions.CreatePickup(model, type, X, Y, Z, virtualworld);
};
export const DestroyPickup = (pickup: number): number => {
    return SampFunctions.DestroyPickup(pickup);
};
export const ShowNameTags = (show: number): number => {
    return SampFunctions.ShowNameTags(show);
};
export const ShowPlayerMarkers = (mode: number): number => {
    return SampFunctions.ShowPlayerMarkers(mode);
};
export const GameModeExit = (): number => {
    return SampFunctions.GameModeExit();
};
export const SetWorldTime = (hour: number): number => {
    return SampFunctions.SetWorldTime(hour);
};
export const GetWeaponName = (weaponid: number, len: number): string => {
    return SampFunctions.GetWeaponName(weaponid, len);
};
export const EnableTirePopping = (enable: number): number => {
    return SampFunctions.EnableTirePopping(enable);
};
export const EnableVehicleFriendlyFire = (): number => {
    return SampFunctions.EnableVehicleFriendlyFire();
};
export const AllowInteriorWeapons = (allow: number): number => {
    return SampFunctions.AllowInteriorWeapons(allow);
};
export const SetWeather = (weatherid: number): number => {
    return SampFunctions.SetWeather(weatherid);
};
export const GetGravity = (): number => {
    return SampFunctions.GetGravity();
};
export const SetGravity = (gravity: number): number => {
    return SampFunctions.SetGravity(gravity);
};
export const AllowAdminTeleport = (allow: number): number => {
    return SampFunctions.AllowAdminTeleport(allow);
};
export const SetDeathDropAmount = (amount: number): number => {
    return SampFunctions.SetDeathDropAmount(amount);
};
export const CreateExplosion = (X: number, Y: number, Z: number, type: number, Radius: number): number => {
    return SampFunctions.CreateExplosion(X, Y, Z, type, Radius);
};
export const EnableZoneNames = (enable: number): number => {
    return SampFunctions.EnableZoneNames(enable);
};
export const UsePlayerPedAnims = (): number => {
    return SampFunctions.UsePlayerPedAnims();
};
export const DisableInteriorEnterExits = (): number => {
    return SampFunctions.DisableInteriorEnterExits();
};
export const SetNameTagDrawDistance = (distance: number): number => {
    return SampFunctions.SetNameTagDrawDistance(distance);
};
export const DisableNameTagLOS = (): number => {
    return SampFunctions.DisableNameTagLOS();
};
export const LimitGlobalChatRadius = (chat_radius: number): number => {
    return SampFunctions.LimitGlobalChatRadius(chat_radius);
};
export const LimitPlayerMarkerRadius = (marker_radius: number): number => {
    return SampFunctions.LimitPlayerMarkerRadius(marker_radius);
};
export const ConnectNPC = (name: string, script: string): number => {
    return SampFunctions.ConnectNPC(name, script);
};
export const IsPlayerNPC = (playerid: number): number => {
    return SampFunctions.IsPlayerNPC(playerid);
};
export const IsPlayerAdmin = (playerid: number): number => {
    return SampFunctions.IsPlayerAdmin(playerid);
};
export const Kick = (playerid: number): number => {
    return SampFunctions.Kick(playerid);
};
export const Ban = (playerid: number): number => {
    return SampFunctions.Ban(playerid);
};
export const BanEx = (playerid: number, reason: string): number => {
    return SampFunctions.BanEx(playerid, reason);
};
export const SendRconCommand = (command: string): number => {
    return SampFunctions.SendRconCommand(command);
};
export const GetPlayerNetworkStats = (playerid: number, retstr_size: number): string => {
    return SampFunctions.GetPlayerNetworkStats(playerid, retstr_size);
};
export const GetNetworkStats = (retstr_size: number): string => {
    return SampFunctions.GetNetworkStats(retstr_size);
};
export const GetPlayerVersion = (playerid: number, len: number): string => {
    return SampFunctions.GetPlayerVersion(playerid, len);
};
export const BlockIpAddress = (ip_address: string, timems: number): number => {
    return SampFunctions.BlockIpAddress(ip_address, timems);
};
export const UnBlockIpAddress = (ip_address: string): number => {
    return SampFunctions.UnBlockIpAddress(ip_address);
};
export const GetServerVarAsString = (varname: string, len: number): string => {
    return SampFunctions.GetServerVarAsString(varname, len);
};
export const GetServerVarAsInt = (varname: string): number => {
    return SampFunctions.GetServerVarAsInt(varname);
};
export const GetServerVarAsBool = (varname: string): number => {
    return SampFunctions.GetServerVarAsBool(varname);
};
export const GetConsoleVarAsString = (varname: string, len: number): string => {
    return SampFunctions.GetConsoleVarAsString(varname, len);
};
export const GetConsoleVarAsInt = (varname: string): number => {
    return SampFunctions.GetConsoleVarAsInt(varname);
};
export const GetConsoleVarAsBool = (varname: string): number => {
    return SampFunctions.GetConsoleVarAsBool(varname);
};
export const GetServerTickRate = (): number => {
    return SampFunctions.GetServerTickRate();
};
export const NetStats_GetConnectedTime = (playerid: number): number => {
    return SampFunctions.NetStats_GetConnectedTime(playerid);
};
export const NetStats_MessagesReceived = (playerid: number): number => {
    return SampFunctions.NetStats_MessagesReceived(playerid);
};
export const NetStats_BytesReceived = (playerid: number): number => {
    return SampFunctions.NetStats_BytesReceived(playerid);
};
export const NetStats_MessagesSent = (playerid: number): number => {
    return SampFunctions.NetStats_MessagesSent(playerid);
};
export const NetStats_BytesSent = (playerid: number): number => {
    return SampFunctions.NetStats_BytesSent(playerid);
};
export const NetStats_MessagesRecvPerSecond = (playerid: number): number => {
    return SampFunctions.NetStats_MessagesRecvPerSecond(playerid);
};
export const NetStats_PacketLossPercent = (playerid: number): number => {
    return SampFunctions.NetStats_PacketLossPercent(playerid);
};
export const NetStats_ConnectionStatus = (playerid: number): number => {
    return SampFunctions.NetStats_ConnectionStatus(playerid);
};
export const NetStats_GetIpPort = (playerid: number, ip_port_len: number): string => {
    return SampFunctions.NetStats_GetIpPort(playerid, ip_port_len);
};
export const CreateMenu = (title: string, columns: number, x: number, y: number, col1width: number, col2width: number): number => {
    return SampFunctions.CreateMenu(title, columns, x, y, col1width, col2width);
};
export const DestroyMenu = (menuid: number): number => {
    return SampFunctions.DestroyMenu(menuid);
};
export const AddMenuItem = (menuid: number, column: number, menutext: string): number => {
    return SampFunctions.AddMenuItem(menuid, column, menutext);
};
export const SetMenuColumnHeader = (menuid: number, column: number, columnheader: string): number => {
    return SampFunctions.SetMenuColumnHeader(menuid, column, columnheader);
};
export const ShowMenuForPlayer = (menuid: number, playerid: number): number => {
    return SampFunctions.ShowMenuForPlayer(menuid, playerid);
};
export const HideMenuForPlayer = (menuid: number, playerid: number): number => {
    return SampFunctions.HideMenuForPlayer(menuid, playerid);
};
export const IsValidMenu = (menuid: number): number => {
    return SampFunctions.IsValidMenu(menuid);
};
export const DisableMenu = (menuid: number): number => {
    return SampFunctions.DisableMenu(menuid);
};
export const DisableMenuRow = (menuid: number, row: number): number => {
    return SampFunctions.DisableMenuRow(menuid, row);
};
export const GetPlayerMenu = (playerid: number): number => {
    return SampFunctions.GetPlayerMenu(playerid);
};
export const TextDrawCreate = (x: number, y: number, text: string): number => {
    return SampFunctions.TextDrawCreate(x, y, text);
};
export const TextDrawDestroy = (text: number): number => {
    return SampFunctions.TextDrawDestroy(text);
};
export const TextDrawLetterSize = (text: number, x: number, y: number): number => {
    return SampFunctions.TextDrawLetterSize(text, x, y);
};
export const TextDrawTextSize = (text: number, x: number, y: number): number => {
    return SampFunctions.TextDrawTextSize(text, x, y);
};
export const TextDrawAlignment = (text: number, alignment: number): number => {
    return SampFunctions.TextDrawAlignment(text, alignment);
};
export const TextDrawColor = (text: number, color: number): number => {
    return SampFunctions.TextDrawColor(text, color);
};
export const TextDrawUseBox = (text: number, use: number): number => {
    return SampFunctions.TextDrawUseBox(text, use);
};
export const TextDrawBoxColor = (text: number, color: number): number => {
    return SampFunctions.TextDrawBoxColor(text, color);
};
export const TextDrawSetShadow = (text: number, size: number): number => {
    return SampFunctions.TextDrawSetShadow(text, size);
};
export const TextDrawSetOutline = (text: number, size: number): number => {
    return SampFunctions.TextDrawSetOutline(text, size);
};
export const TextDrawBackgroundColor = (text: number, color: number): number => {
    return SampFunctions.TextDrawBackgroundColor(text, color);
};
export const TextDrawFont = (text: number, font: number): number => {
    return SampFunctions.TextDrawFont(text, font);
};
export const TextDrawSetProportional = (text: number, set: number): number => {
    return SampFunctions.TextDrawSetProportional(text, set);
};
export const TextDrawSetSelectable = (text: number, set: number): number => {
    return SampFunctions.TextDrawSetSelectable(text, set);
};
export const TextDrawShowForPlayer = (playerid: number, text: number): number => {
    return SampFunctions.TextDrawShowForPlayer(playerid, text);
};
export const TextDrawHideForPlayer = (playerid: number, text: number): number => {
    return SampFunctions.TextDrawHideForPlayer(playerid, text);
};
export const TextDrawShowForAll = (text: number): number => {
    return SampFunctions.TextDrawShowForAll(text);
};
export const TextDrawHideForAll = (text: number): number => {
    return SampFunctions.TextDrawHideForAll(text);
};
export const TextDrawSetString = (text: number, string: string): number => {
    return SampFunctions.TextDrawSetString(text, string);
};
export const TextDrawSetPreviewModel = (text: number, modelindex: number): number => {
    return SampFunctions.TextDrawSetPreviewModel(text, modelindex);
};
export const TextDrawSetPreviewRot = (text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number => {
    return SampFunctions.TextDrawSetPreviewRot(text, fRotX, fRotY, fRotZ, fZoom);
};
export const TextDrawSetPreviewVehCol = (text: number, color1: number, color2: number): number => {
    return SampFunctions.TextDrawSetPreviewVehCol(text, color1, color2);
};
export const GangZoneCreate = (minx: number, miny: number, maxx: number, maxy: number): number => {
    return SampFunctions.GangZoneCreate(minx, miny, maxx, maxy);
};
export const GangZoneDestroy = (zone: number): number => {
    return SampFunctions.GangZoneDestroy(zone);
};
export const GangZoneShowForPlayer = (playerid: number, zone: number, color: number): number => {
    return SampFunctions.GangZoneShowForPlayer(playerid, zone, color);
};
export const GangZoneShowForAll = (zone: number, color: number): number => {
    return SampFunctions.GangZoneShowForAll(zone, color);
};
export const GangZoneHideForPlayer = (playerid: number, zone: number): number => {
    return SampFunctions.GangZoneHideForPlayer(playerid, zone);
};
export const GangZoneHideForAll = (zone: number): number => {
    return SampFunctions.GangZoneHideForAll(zone);
};
export const GangZoneFlashForPlayer = (playerid: number, zone: number, flashcolor: number): number => {
    return SampFunctions.GangZoneFlashForPlayer(playerid, zone, flashcolor);
};
export const GangZoneFlashForAll = (zone: number, flashcolor: number): number => {
    return SampFunctions.GangZoneFlashForAll(zone, flashcolor);
};
export const GangZoneStopFlashForPlayer = (playerid: number, zone: number): number => {
    return SampFunctions.GangZoneStopFlashForPlayer(playerid, zone);
};
export const GangZoneStopFlashForAll = (zone: number): number => {
    return SampFunctions.GangZoneStopFlashForAll(zone);
};
export const Create3DTextLabel = (text: string, color: number, X: number, Y: number, Z: number, DrawDistance: number, virtualworld: number, testLOS: number): number => {
    return SampFunctions.Create3DTextLabel(text, color, X, Y, Z, DrawDistance, virtualworld, testLOS);
};
export const Delete3DTextLabel = (id: number): number => {
    return SampFunctions.Delete3DTextLabel(id);
};
export const Attach3DTextLabelToPlayer = (id: number, playerid: number, OffsetX: number, OffsetY: number, OffsetZ: number): number => {
    return SampFunctions.Attach3DTextLabelToPlayer(id, playerid, OffsetX, OffsetY, OffsetZ);
};
export const Attach3DTextLabelToVehicle = (id: number, vehicleid: number, OffsetX: number, OffsetY: number, OffsetZ: number): number => {
    return SampFunctions.Attach3DTextLabelToVehicle(id, vehicleid, OffsetX, OffsetY, OffsetZ);
};
export const Update3DTextLabelText = (id: number, color: number, text: string): number => {
    return SampFunctions.Update3DTextLabelText(id, color, text);
};
export const CreatePlayer3DTextLabel = (playerid: number, text: string, color: number, X: number, Y: number, Z: number, DrawDistance: number, attachedplayer: number, attachedvehicle: number, testLOS: number): number => {
    return SampFunctions.CreatePlayer3DTextLabel(playerid, text, color, X, Y, Z, DrawDistance, attachedplayer, attachedvehicle, testLOS);
};
export const DeletePlayer3DTextLabel = (playerid: number, id: number): number => {
    return SampFunctions.DeletePlayer3DTextLabel(playerid, id);
};
export const UpdatePlayer3DTextLabelText = (playerid: number, id: number, color: number, text: string): number => {
    return SampFunctions.UpdatePlayer3DTextLabelText(playerid, id, color, text);
};
export const ShowPlayerDialog = (playerid: number, dialogid: number, style: number, caption: string, info: string, button1: string, button2: string): number => {
    return SampFunctions.ShowPlayerDialog(playerid, dialogid, style, caption, info, button1, button2);
};
export const gpci = (playerid: number, maxlen: number): string => {
    return SampFunctions.gpci(playerid, maxlen);
};
export const CreateActor = (modelid: number, X: number, Y: number, Z: number, Rotation: number): number => {
    return SampFunctions.CreateActor(modelid, X, Y, Z, Rotation);
};
export const DestroyActor = (actorid: number): number => {
    return SampFunctions.DestroyActor(actorid);
};
export const IsActorStreamedIn = (actorid: number, forplayerid: number): number => {
    return SampFunctions.IsActorStreamedIn(actorid, forplayerid);
};
export const SetActorVirtualWorld = (actorid: number, vworld: number): number => {
    return SampFunctions.SetActorVirtualWorld(actorid, vworld);
};
export const GetActorVirtualWorld = (actorid: number): number => {
    return SampFunctions.GetActorVirtualWorld(actorid);
};
export const ApplyActorAnimation = (actorid: number, animlib: string, animname: string, fDelta: number, loop: number, lockx: number, locky: number, freeze: number, time: number): number => {
    return SampFunctions.ApplyActorAnimation(actorid, animlib, animname, fDelta, loop, lockx, locky, freeze, time);
};
export const ClearActorAnimations = (actorid: number): number => {
    return SampFunctions.ClearActorAnimations(actorid);
};
export const SetActorPos = (actorid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.SetActorPos(actorid, X, Y, Z);
};
export const GetActorPos = (actorid: number): Array<any> => {
    return SampFunctions.GetActorPos(actorid);
};
export const SetActorFacingAngle = (actorid: number, ang: number): number => {
    return SampFunctions.SetActorFacingAngle(actorid, ang);
};
export const GetActorFacingAngle = (actorid: number): number => {
    return SampFunctions.GetActorFacingAngle(actorid);
};
export const SetActorHealth = (actorid: number, health: number): number => {
    return SampFunctions.SetActorHealth(actorid, health);
};
export const GetActorHealth = (actorid: number): number => {
    return SampFunctions.GetActorHealth(actorid);
};
export const SetActorInvulnerable = (actorid: number, invulnerable: number): number => {
    return SampFunctions.SetActorInvulnerable(actorid, invulnerable);
};
export const IsActorInvulnerable = (actorid: number): number => {
    return SampFunctions.IsActorInvulnerable(actorid);
};
export const IsValidActor = (actorid: number): number => {
    return SampFunctions.IsValidActor(actorid);
};
export const HTTP = (index: number, type: number, url: string, data: string, callback: string): number => {
    return SampFunctions.HTTP(index, type, url, data, callback);
};
export const CreateObject = (modelid: number, X: number, Y: number, Z: number, rX: number, rY: number, rZ: number, DrawDistance: number): number => {
    return SampFunctions.CreateObject(modelid, X, Y, Z, rX, rY, rZ, DrawDistance);
};
export const AttachObjectToVehicle = (objectid: number, vehicleid: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotX: number, RotY: number, RotZ: number): number => {
    return SampFunctions.AttachObjectToVehicle(objectid, vehicleid, OffsetX, OffsetY, OffsetZ, RotX, RotY, RotZ);
};
export const AttachObjectToObject = (objectid: number, attachtoid: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotX: number, RotY: number, RotZ: number, SyncRotation: number): number => {
    return SampFunctions.AttachObjectToObject(objectid, attachtoid, OffsetX, OffsetY, OffsetZ, RotX, RotY, RotZ, SyncRotation);
};
export const AttachObjectToPlayer = (objectid: number, playerid: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotX: number, RotY: number, RotZ: number): number => {
    return SampFunctions.AttachObjectToPlayer(objectid, playerid, OffsetX, OffsetY, OffsetZ, RotX, RotY, RotZ);
};
export const SetObjectPos = (objectid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.SetObjectPos(objectid, X, Y, Z);
};
export const GetObjectPos = (objectid: number): Array<any> => {
    return SampFunctions.GetObjectPos(objectid);
};
export const SetObjectRot = (objectid: number, RotX: number, RotY: number, RotZ: number): number => {
    return SampFunctions.SetObjectRot(objectid, RotX, RotY, RotZ);
};
export const GetObjectRot = (objectid: number): Array<any> => {
    return SampFunctions.GetObjectRot(objectid);
};
export const GetObjectModel = (objectid: number): number => {
    return SampFunctions.GetObjectModel(objectid);
};
export const SetObjectNoCameraCol = (objectid: number): number => {
    return SampFunctions.SetObjectNoCameraCol(objectid);
};
export const IsValidObject = (objectid: number): number => {
    return SampFunctions.IsValidObject(objectid);
};
export const DestroyObject = (objectid: number): number => {
    return SampFunctions.DestroyObject(objectid);
};
export const MoveObject = (objectid: number, X: number, Y: number, Z: number, Speed: number, RotX: number, RotY: number, RotZ: number): number => {
    return SampFunctions.MoveObject(objectid, X, Y, Z, Speed, RotX, RotY, RotZ);
};
export const StopObject = (objectid: number): number => {
    return SampFunctions.StopObject(objectid);
};
export const IsObjectMoving = (objectid: number): number => {
    return SampFunctions.IsObjectMoving(objectid);
};
export const EditObject = (playerid: number, objectid: number): number => {
    return SampFunctions.EditObject(playerid, objectid);
};
export const EditPlayerObject = (playerid: number, objectid: number): number => {
    return SampFunctions.EditPlayerObject(playerid, objectid);
};
export const SelectObject = (playerid: number): number => {
    return SampFunctions.SelectObject(playerid);
};
export const CancelEdit = (playerid: number): number => {
    return SampFunctions.CancelEdit(playerid);
};
export const CreatePlayerObject = (playerid: number, modelid: number, X: number, Y: number, Z: number, rX: number, rY: number, rZ: number, DrawDistance: number): number => {
    return SampFunctions.CreatePlayerObject(playerid, modelid, X, Y, Z, rX, rY, rZ, DrawDistance);
};
export const AttachPlayerObjectToVehicle = (playerid: number, objectid: number, vehicleid: number, fOffsetX: number, fOffsetY: number, fOffsetZ: number, fRotX: number, fRotY: number, RotZ: number): number => {
    return SampFunctions.AttachPlayerObjectToVehicle(playerid, objectid, vehicleid, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, RotZ);
};
export const SetPlayerObjectPos = (playerid: number, objectid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.SetPlayerObjectPos(playerid, objectid, X, Y, Z);
};
export const GetPlayerObjectPos = (playerid: number, objectid: number): Array<any> => {
    return SampFunctions.GetPlayerObjectPos(playerid, objectid);
};
export const SetPlayerObjectRot = (playerid: number, objectid: number, RotX: number, RotY: number, RotZ: number): number => {
    return SampFunctions.SetPlayerObjectRot(playerid, objectid, RotX, RotY, RotZ);
};
export const GetPlayerObjectRot = (playerid: number, objectid: number): Array<any> => {
    return SampFunctions.GetPlayerObjectRot(playerid, objectid);
};
export const GetPlayerObjectModel = (playerid: number, objectid: number): number => {
    return SampFunctions.GetPlayerObjectModel(playerid, objectid);
};
export const SetPlayerObjectNoCameraCol = (playerid: number, objectid: number): number => {
    return SampFunctions.SetPlayerObjectNoCameraCol(playerid, objectid);
};
export const IsValidPlayerObject = (playerid: number, objectid: number): number => {
    return SampFunctions.IsValidPlayerObject(playerid, objectid);
};
export const DestroyPlayerObject = (playerid: number, objectid: number): number => {
    return SampFunctions.DestroyPlayerObject(playerid, objectid);
};
export const MovePlayerObject = (playerid: number, objectid: number, X: number, Y: number, Z: number, Speed: number, RotX: number, RotY: number, RotZ: number): number => {
    return SampFunctions.MovePlayerObject(playerid, objectid, X, Y, Z, Speed, RotX, RotY, RotZ);
};
export const StopPlayerObject = (playerid: number, objectid: number): number => {
    return SampFunctions.StopPlayerObject(playerid, objectid);
};
export const IsPlayerObjectMoving = (playerid: number, objectid: number): number => {
    return SampFunctions.IsPlayerObjectMoving(playerid, objectid);
};
export const AttachPlayerObjectToPlayer = (objectplayer: number, objectid: number, attachplayer: number, OffsetX: number, OffsetY: number, OffsetZ: number, rX: number, rY: number, rZ: number): number => {
    return SampFunctions.AttachPlayerObjectToPlayer(objectplayer, objectid, attachplayer, OffsetX, OffsetY, OffsetZ, rX, rY, rZ);
};
export const SetObjectMaterial = (objectid: number, materialindex: number, modelid: number, txdname: string, texturename: string, materialcolor: number): number => {
    return SampFunctions.SetObjectMaterial(objectid, materialindex, modelid, txdname, texturename, materialcolor);
};
export const SetPlayerObjectMaterial = (playerid: number, objectid: number, materialindex: number, modelid: number, txdname: string, texturename: string, materialcolor: number): number => {
    return SampFunctions.SetPlayerObjectMaterial(playerid, objectid, materialindex, modelid, txdname, texturename, materialcolor);
};
export const SetObjectMaterialText = (objectid: number, text: string, materialindex: number, materialsize: number, fontface: string, fontsize: number, bold: number, fontcolor: number, backcolor: number, textalignment: number): number => {
    return SampFunctions.SetObjectMaterialText(objectid, text, materialindex, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
};
export const SetPlayerObjectMaterialText = (playerid: number, objectid: number, text: string, materialindex: number, materialsize: number, fontface: string, fontsize: number, bold: number, fontcolor: number, backcolor: number, textalignment: number): number => {
    return SampFunctions.SetPlayerObjectMaterialText(playerid, objectid, text, materialindex, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
};
export const SetObjectsDefaultCameraCol = (disable: number): number => {
    return SampFunctions.SetObjectsDefaultCameraCol(disable);
};
export const SetSpawnInfo = (playerid: number, team: number, skin: number, x: number, y: number, z: number, rotation: number, weapon1: number, weapon1_ammo: number, weapon2: number, weapon2_ammo: number, weapon3: number, weapon3_ammo: number): number => {
    return SampFunctions.SetSpawnInfo(playerid, team, skin, x, y, z, rotation, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
};
export const SpawnPlayer = (playerid: number): number => {
    return SampFunctions.SpawnPlayer(playerid);
};
export const SetPlayerPos = (playerid: number, x: number, y: number, z: number): number => {
    return SampFunctions.SetPlayerPos(playerid, x, y, z);
};
export const SetPlayerPosFindZ = (playerid: number, x: number, y: number, z: number): number => {
    return SampFunctions.SetPlayerPosFindZ(playerid, x, y, z);
};
export const GetPlayerPos = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerPos(playerid);
};
export const SetPlayerFacingAngle = (playerid: number, ang: number): number => {
    return SampFunctions.SetPlayerFacingAngle(playerid, ang);
};
export const GetPlayerFacingAngle = (playerid: number): number => {
    return SampFunctions.GetPlayerFacingAngle(playerid);
};
export const IsPlayerInRangeOfPoint = (playerid: number, range: number, x: number, y: number, z: number): number => {
    return SampFunctions.IsPlayerInRangeOfPoint(playerid, range, x, y, z);
};
export const GetPlayerDistanceFromPoint = (playerid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.GetPlayerDistanceFromPoint(playerid, X, Y, Z);
};
export const IsPlayerStreamedIn = (playerid: number, forplayerid: number): number => {
    return SampFunctions.IsPlayerStreamedIn(playerid, forplayerid);
};
export const SetPlayerInterior = (playerid: number, interiorid: number): number => {
    return SampFunctions.SetPlayerInterior(playerid, interiorid);
};
export const GetPlayerInterior = (playerid: number): number => {
    return SampFunctions.GetPlayerInterior(playerid);
};
export const SetPlayerHealth = (playerid: number, health: number): number => {
    return SampFunctions.SetPlayerHealth(playerid, health);
};
export const GetPlayerHealth = (playerid: number): number => {
    return SampFunctions.GetPlayerHealth(playerid);
};
export const SetPlayerArmour = (playerid: number, armour: number): number => {
    return SampFunctions.SetPlayerArmour(playerid, armour);
};
export const GetPlayerArmour = (playerid: number): number => {
    return SampFunctions.GetPlayerArmour(playerid);
};
export const SetPlayerAmmo = (playerid: number, weaponslot: number, ammo: number): number => {
    return SampFunctions.SetPlayerAmmo(playerid, weaponslot, ammo);
};
export const GetPlayerAmmo = (playerid: number): number => {
    return SampFunctions.GetPlayerAmmo(playerid);
};
export const GetPlayerWeaponState = (playerid: number): number => {
    return SampFunctions.GetPlayerWeaponState(playerid);
};
export const GetPlayerTargetPlayer = (playerid: number): number => {
    return SampFunctions.GetPlayerTargetPlayer(playerid);
};
export const GetPlayerTargetActor = (playerid: number): number => {
    return SampFunctions.GetPlayerTargetActor(playerid);
};
export const SetPlayerTeam = (playerid: number, teamid: number): number => {
    return SampFunctions.SetPlayerTeam(playerid, teamid);
};
export const GetPlayerTeam = (playerid: number): number => {
    return SampFunctions.GetPlayerTeam(playerid);
};
export const SetPlayerScore = (playerid: number, score: number): number => {
    return SampFunctions.SetPlayerScore(playerid, score);
};
export const GetPlayerScore = (playerid: number): number => {
    return SampFunctions.GetPlayerScore(playerid);
};
export const GetPlayerDrunkLevel = (playerid: number): number => {
    return SampFunctions.GetPlayerDrunkLevel(playerid);
};
export const SetPlayerDrunkLevel = (playerid: number, level: number): number => {
    return SampFunctions.SetPlayerDrunkLevel(playerid, level);
};
export const SetPlayerColor = (playerid: number, color: number): number => {
    return SampFunctions.SetPlayerColor(playerid, color);
};
export const GetPlayerColor = (playerid: number): number => {
    return SampFunctions.GetPlayerColor(playerid);
};
export const SetPlayerSkin = (playerid: number, skinid: number): number => {
    return SampFunctions.SetPlayerSkin(playerid, skinid);
};
export const GetPlayerSkin = (playerid: number): number => {
    return SampFunctions.GetPlayerSkin(playerid);
};
export const GivePlayerWeapon = (playerid: number, weaponid: number, ammo: number): number => {
    return SampFunctions.GivePlayerWeapon(playerid, weaponid, ammo);
};
export const ResetPlayerWeapons = (playerid: number): number => {
    return SampFunctions.ResetPlayerWeapons(playerid);
};
export const SetPlayerArmedWeapon = (playerid: number, weaponid: number): number => {
    return SampFunctions.SetPlayerArmedWeapon(playerid, weaponid);
};
export const GetPlayerWeaponData = (playerid: number, slot: number): Array<any> => {
    return SampFunctions.GetPlayerWeaponData(playerid, slot);
};
export const GivePlayerMoney = (playerid: number, money: number): number => {
    return SampFunctions.GivePlayerMoney(playerid, money);
};
export const ResetPlayerMoney = (playerid: number): number => {
    return SampFunctions.ResetPlayerMoney(playerid);
};
export const SetPlayerName = (playerid: number, name: string): number => {
    return SampFunctions.SetPlayerName(playerid, name);
};
export const GetPlayerMoney = (playerid: number): number => {
    return SampFunctions.GetPlayerMoney(playerid);
};
export const GetPlayerState = (playerid: number): PLAYER_STATE => {
    return SampFunctions.GetPlayerState(playerid);
};
export const GetPlayerIp = (playerid: number, len: number): string => {
    return SampFunctions.GetPlayerIp(playerid, len);
};
export const GetPlayerPing = (playerid: number): number => {
    return SampFunctions.GetPlayerPing(playerid);
};
export const GetPlayerWeapon = (playerid: number): number => {
    return SampFunctions.GetPlayerWeapon(playerid);
};
export const GetPlayerKeys = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerKeys(playerid);
};
export const GetPlayerName = (playerid: number, len: number): string => {
    return SampFunctions.GetPlayerName(playerid, len);
};
export const SetPlayerTime = (playerid: number, hour: number, minute: number): number => {
    return SampFunctions.SetPlayerTime(playerid, hour, minute);
};
export const GetPlayerTime = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerTime(playerid);
};
export const TogglePlayerClock = (playerid: number, toggle: number): number => {
    return SampFunctions.TogglePlayerClock(playerid, toggle);
};
export const SetPlayerWeather = (playerid: number, weather: number): number => {
    return SampFunctions.SetPlayerWeather(playerid, weather);
};
export const ForceClassSelection = (playerid: number): number => {
    return SampFunctions.ForceClassSelection(playerid);
};
export const SetPlayerWantedLevel = (playerid: number, level: number): number => {
    return SampFunctions.SetPlayerWantedLevel(playerid, level);
};
export const GetPlayerWantedLevel = (playerid: number): number => {
    return SampFunctions.GetPlayerWantedLevel(playerid);
};
export const SetPlayerFightingStyle = (playerid: number, style: number): number => {
    return SampFunctions.SetPlayerFightingStyle(playerid, style);
};
export const GetPlayerFightingStyle = (playerid: number): number => {
    return SampFunctions.GetPlayerFightingStyle(playerid);
};
export const SetPlayerVelocity = (playerid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.SetPlayerVelocity(playerid, X, Y, Z);
};
export const GetPlayerVelocity = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerVelocity(playerid);
};
export const PlayCrimeReportForPlayer = (playerid: number, suspectid: number, crime: number): number => {
    return SampFunctions.PlayCrimeReportForPlayer(playerid, suspectid, crime);
};
export const PlayAudioStreamForPlayer = (playerid: number, url: string, posX: number, posY: number, posZ: number, distance: number, usepos: number): number => {
    return SampFunctions.PlayAudioStreamForPlayer(playerid, url, posX, posY, posZ, distance, usepos);
};
export const StopAudioStreamForPlayer = (playerid: number): number => {
    return SampFunctions.StopAudioStreamForPlayer(playerid);
};
export const SetPlayerShopName = (playerid: number, shopname: string): number => {
    return SampFunctions.SetPlayerShopName(playerid, shopname);
};
export const SetPlayerSkillLevel = (playerid: number, skill: WEAPONSKILL, level: number): number => {
    return SampFunctions.SetPlayerSkillLevel(playerid, skill, level);
};
export const GetPlayerSurfingVehicleID = (playerid: number): number => {
    return SampFunctions.GetPlayerSurfingVehicleID(playerid);
};
export const GetPlayerSurfingObjectID = (playerid: number): number => {
    return SampFunctions.GetPlayerSurfingObjectID(playerid);
};
export const RemoveBuildingForPlayer = (playerid: number, modelid: number, fX: number, fY: number, fZ: number, fRadius: number): number => {
    return SampFunctions.RemoveBuildingForPlayer(playerid, modelid, fX, fY, fZ, fRadius);
};
export const GetPlayerLastShotVectors = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerLastShotVectors(playerid);
};
export const SetPlayerAttachedObject = (playerid: number, index: number, modelid: number, bone: number, fOffsetX: number, fOffsetY: number, fOffsetZ: number, fRotX: number, fRotY: number, fRotZ: number, fScaleX: number, fScaleY: number, fScaleZ: number, materialcolor1: number, materialcolor2: number): number => {
    return SampFunctions.SetPlayerAttachedObject(playerid, index, modelid, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ, materialcolor1, materialcolor2);
};
export const RemovePlayerAttachedObject = (playerid: number, index: number): number => {
    return SampFunctions.RemovePlayerAttachedObject(playerid, index);
};
export const IsPlayerAttachedObjectSlotUsed = (playerid: number, index: number): number => {
    return SampFunctions.IsPlayerAttachedObjectSlotUsed(playerid, index);
};
export const EditAttachedObject = (playerid: number, index: number): number => {
    return SampFunctions.EditAttachedObject(playerid, index);
};
export const CreatePlayerTextDraw = (playerid: number, x: number, y: number, text: string): number => {
    return SampFunctions.CreatePlayerTextDraw(playerid, x, y, text);
};
export const PlayerTextDrawDestroy = (playerid: number, text: number): void => {
    SampFunctions.PlayerTextDrawDestroy(playerid, text);
};
export const PlayerTextDrawLetterSize = (playerid: number, text: number, x: number, y: number): number => {
    return SampFunctions.PlayerTextDrawLetterSize(playerid, text, x, y);
};
export const PlayerTextDrawTextSize = (playerid: number, text: number, x: number, y: number): number => {
    return SampFunctions.PlayerTextDrawTextSize(playerid, text, x, y);
};
export const PlayerTextDrawAlignment = (playerid: number, text: number, alignment: TEXTDRAW_ALIGN): number => {
    return SampFunctions.PlayerTextDrawAlignment(playerid, text, alignment);
};
export const PlayerTextDrawColor = (playerid: number, text: number, color: number): number => {
    return SampFunctions.PlayerTextDrawColor(playerid, text, color);
};
export const PlayerTextDrawUseBox = (playerid: number, text: number, use: 0 | 1): number => {
    return SampFunctions.PlayerTextDrawUseBox(playerid, text, use);
};
export const PlayerTextDrawBoxColor = (playerid: number, text: number, color: number): number => {
    return SampFunctions.PlayerTextDrawBoxColor(playerid, text, color);
};
export const PlayerTextDrawSetShadow = (playerid: number, text: number, size: number): number => {
    return SampFunctions.PlayerTextDrawSetShadow(playerid, text, size);
};
export const PlayerTextDrawSetOutline = (playerid: number, text: number, size: number): number => {
    return SampFunctions.PlayerTextDrawSetOutline(playerid, text, size);
};
export const PlayerTextDrawBackgroundColor = (playerid: number, text: number, color: number): number => {
    return SampFunctions.PlayerTextDrawBackgroundColor(playerid, text, color);
};
export const PlayerTextDrawFont = (playerid: number, text: number, font: number): number => {
    return SampFunctions.PlayerTextDrawFont(playerid, text, font);
};
export const PlayerTextDrawSetProportional = (playerid: number, text: number, set: number): number => {
    return SampFunctions.PlayerTextDrawSetProportional(playerid, text, set);
};
export const PlayerTextDrawSetSelectable = (playerid: number, text: number, set: number): number => {
    return SampFunctions.PlayerTextDrawSetSelectable(playerid, text, set);
};
export const PlayerTextDrawShow = (playerid: number, text: number): number => {
    return SampFunctions.PlayerTextDrawShow(playerid, text);
};
export const PlayerTextDrawHide = (playerid: number, text: number): number => {
    return SampFunctions.PlayerTextDrawHide(playerid, text);
};
export const PlayerTextDrawSetString = (playerid: number, text: number, string: string): number => {
    return SampFunctions.PlayerTextDrawSetString(playerid, text, string);
};
export const PlayerTextDrawSetPreviewModel = (playerid: number, text: number, modelindex: number): number => {
    return SampFunctions.PlayerTextDrawSetPreviewModel(playerid, text, modelindex);
};
export const PlayerTextDrawSetPreviewRot = (playerid: number, text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number => {
    return SampFunctions.PlayerTextDrawSetPreviewRot(playerid, text, fRotX, fRotY, fRotZ, fZoom);
};
export const PlayerTextDrawSetPreviewVehCol = (playerid: number, text: number, color1: number, color2: number): number => {
    return SampFunctions.PlayerTextDrawSetPreviewVehCol(playerid, text, color1, color2);
};
export const SetPVarInt = (playerid: number, varname: string, int_value: number): number => {
    return SampFunctions.SetPVarInt(playerid, varname, int_value);
};
export const GetPVarInt = (playerid: number, varname: string): number => {
    return SampFunctions.GetPVarInt(playerid, varname);
};
export const SetPVarString = (playerid: number, varname: string, string_value: string): number => {
    return SampFunctions.SetPVarString(playerid, varname, string_value);
};
export const GetPVarString = (playerid: number, varname: string, len: number): string => {
    return SampFunctions.GetPVarString(playerid, varname, len);
};
export const SetPVarFloat = (playerid: number, varname: string, float_value: number): number => {
    return SampFunctions.SetPVarFloat(playerid, varname, float_value);
};
export const GetPVarFloat = (playerid: number, varname: string): number => {
    return SampFunctions.GetPVarFloat(playerid, varname);
};
export const DeletePVar = (playerid: number, varname: string): number => {
    return SampFunctions.DeletePVar(playerid, varname);
};
export const GetPVarsUpperIndex = (playerid: number): number => {
    return SampFunctions.GetPVarsUpperIndex(playerid);
};
export const GetPVarNameAtIndex = (playerid: number, index: number, ret_len: number): string => {
    return SampFunctions.GetPVarNameAtIndex(playerid, index, ret_len);
};
export const GetPVarType = (playerid: number, varname: string): number => {
    return SampFunctions.GetPVarType(playerid, varname);
};
export const SetPlayerChatBubble = (playerid: number, text: string, color: number, drawdistance: number, expiretime: number): number => {
    return SampFunctions.SetPlayerChatBubble(playerid, text, color, drawdistance, expiretime);
};
export const PutPlayerInVehicle = (playerid: number, vehicleid: number, seatid: number): number => {
    return SampFunctions.PutPlayerInVehicle(playerid, vehicleid, seatid);
};
export const GetPlayerVehicleID = (playerid: number): number => {
    return SampFunctions.GetPlayerVehicleID(playerid);
};
export const GetPlayerVehicleSeat = (playerid: number): number => {
    return SampFunctions.GetPlayerVehicleSeat(playerid);
};
export const RemovePlayerFromVehicle = (playerid: number): number => {
    return SampFunctions.RemovePlayerFromVehicle(playerid);
};
export const TogglePlayerControllable = (playerid: number, toggle: number): number => {
    return SampFunctions.TogglePlayerControllable(playerid, toggle);
};
export const PlayerPlaySound = (playerid: number, soundid: number, x: number, y: number, z: number): number => {
    return SampFunctions.PlayerPlaySound(playerid, soundid, x, y, z);
};
export const ApplyAnimation = (playerid: number, animlib: string, animname: string, fDelta: number, loop: number, lockx: number, locky: number, freeze: number, time: number, forcesync: number): number => {
    return SampFunctions.ApplyAnimation(playerid, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync);
};
export const ClearAnimations = (playerid: number, forcesync: number): number => {
    return SampFunctions.ClearAnimations(playerid, forcesync);
};
export const GetPlayerAnimationIndex = (playerid: number): number => {
    return SampFunctions.GetPlayerAnimationIndex(playerid);
};
export const GetAnimationName = (index: number, len1: number, len2: number): Array<any> => {
    return SampFunctions.GetAnimationName(index, len1, len2);
};
export const GetPlayerSpecialAction = (playerid: number): number => {
    return SampFunctions.GetPlayerSpecialAction(playerid);
};
export const SetPlayerSpecialAction = (playerid: number, actionid: number): number => {
    return SampFunctions.SetPlayerSpecialAction(playerid, actionid);
};
export const DisableRemoteVehicleCollisions = (playerid: number, disable: number): number => {
    return SampFunctions.DisableRemoteVehicleCollisions(playerid, disable);
};
export const SetPlayerCheckpoint = (playerid: number, x: number, y: number, z: number, size: number): number => {
    return SampFunctions.SetPlayerCheckpoint(playerid, x, y, z, size);
};
export const DisablePlayerCheckpoint = (playerid: number): number => {
    return SampFunctions.DisablePlayerCheckpoint(playerid);
};
export const SetPlayerRaceCheckpoint = (playerid: number, type: number, x: number, y: number, z: number, nextx: number, nexty: number, nextz: number, size: number): number => {
    return SampFunctions.SetPlayerRaceCheckpoint(playerid, type, x, y, z, nextx, nexty, nextz, size);
};
export const DisablePlayerRaceCheckpoint = (playerid: number): number => {
    return SampFunctions.DisablePlayerRaceCheckpoint(playerid);
};
export const SetPlayerWorldBounds = (playerid: number, x_max: number, x_min: number, y_max: number, y_min: number): number => {
    return SampFunctions.SetPlayerWorldBounds(playerid, x_max, x_min, y_max, y_min);
};
export const SetPlayerMarkerForPlayer = (playerid: number, showplayerid: number, color: number): number => {
    return SampFunctions.SetPlayerMarkerForPlayer(playerid, showplayerid, color);
};
export const ShowPlayerNameTagForPlayer = (playerid: number, showplayerid: number, show: number): number => {
    return SampFunctions.ShowPlayerNameTagForPlayer(playerid, showplayerid, show);
};
export const SetPlayerMapIcon = (playerid: number, iconid: number, x: number, y: number, z: number, markertype: number, color: number, style: number): number => {
    return SampFunctions.SetPlayerMapIcon(playerid, iconid, x, y, z, markertype, color, style);
};
export const RemovePlayerMapIcon = (playerid: number, iconid: number): number => {
    return SampFunctions.RemovePlayerMapIcon(playerid, iconid);
};
export const AllowPlayerTeleport = (playerid: number, allow: number): number => {
    return SampFunctions.AllowPlayerTeleport(playerid, allow);
};
export const SetPlayerCameraPos = (playerid: number, x: number, y: number, z: number): number => {
    return SampFunctions.SetPlayerCameraPos(playerid, x, y, z);
};
export const SetPlayerCameraLookAt = (playerid: number, x: number, y: number, z: number, cut: number): number => {
    return SampFunctions.SetPlayerCameraLookAt(playerid, x, y, z, cut);
};
export const SetCameraBehindPlayer = (playerid: number): number => {
    return SampFunctions.SetCameraBehindPlayer(playerid);
};
export const GetPlayerCameraPos = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerCameraPos(playerid);
};
export const GetPlayerCameraFrontVector = (playerid: number): Array<any> => {
    return SampFunctions.GetPlayerCameraFrontVector(playerid);
};
export const GetPlayerCameraMode = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraMode(playerid);
};
export const EnablePlayerCameraTarget = (playerid: number, enable: number): number => {
    return SampFunctions.EnablePlayerCameraTarget(playerid, enable);
};
export const GetPlayerCameraTargetObject = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraTargetObject(playerid);
};
export const GetPlayerCameraTargetVehicle = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraTargetVehicle(playerid);
};
export const GetPlayerCameraTargetPlayer = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraTargetPlayer(playerid);
};
export const GetPlayerCameraTargetActor = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraTargetActor(playerid);
};
export const GetPlayerCameraAspectRatio = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraAspectRatio(playerid);
};
export const GetPlayerCameraZoom = (playerid: number): number => {
    return SampFunctions.GetPlayerCameraZoom(playerid);
};
export const AttachCameraToObject = (playerid: number, objectid: number): number => {
    return SampFunctions.AttachCameraToObject(playerid, objectid);
};
export const AttachCameraToPlayerObject = (playerid: number, playerobjectid: number): number => {
    return SampFunctions.AttachCameraToPlayerObject(playerid, playerobjectid);
};
export const InterpolateCameraPos = (playerid: number, FromX: number, FromY: number, FromZ: number, ToX: number, ToY: number, ToZ: number, time: number, cut: number): number => {
    return SampFunctions.InterpolateCameraPos(playerid, FromX, FromY, FromZ, ToX, ToY, ToZ, time, cut);
};
export const InterpolateCameraLookAt = (playerid: number, FromX: number, FromY: number, FromZ: number, ToX: number, ToY: number, ToZ: number, time: number, cut: number): number => {
    return SampFunctions.InterpolateCameraLookAt(playerid, FromX, FromY, FromZ, ToX, ToY, ToZ, time, cut);
};
export const IsPlayerConnected = (playerid: number): number => {
    return SampFunctions.IsPlayerConnected(playerid);
};
export const IsPlayerInVehicle = (playerid: number, vehicleid: number): number => {
    return SampFunctions.IsPlayerInVehicle(playerid, vehicleid);
};
export const IsPlayerInAnyVehicle = (playerid: number): number => {
    return SampFunctions.IsPlayerInAnyVehicle(playerid);
};
export const IsPlayerInCheckpoint = (playerid: number): number => {
    return SampFunctions.IsPlayerInCheckpoint(playerid);
};
export const IsPlayerInRaceCheckpoint = (playerid: number): number => {
    return SampFunctions.IsPlayerInRaceCheckpoint(playerid);
};
export const SetPlayerVirtualWorld = (playerid: number, worldid: number): number => {
    return SampFunctions.SetPlayerVirtualWorld(playerid, worldid);
};
export const GetPlayerVirtualWorld = (playerid: number): number => {
    return SampFunctions.GetPlayerVirtualWorld(playerid);
};
export const EnableStuntBonusForPlayer = (playerid: number, enable: number): number => {
    return SampFunctions.EnableStuntBonusForPlayer(playerid, enable);
};
export const EnableStuntBonusForAll = (enable: number): number => {
    return SampFunctions.EnableStuntBonusForAll(enable);
};
export const TogglePlayerSpectating = (playerid: number, toggle: number): number => {
    return SampFunctions.TogglePlayerSpectating(playerid, toggle);
};
export const PlayerSpectatePlayer = (playerid: number, targetplayerid: number, mode: number): number => {
    return SampFunctions.PlayerSpectatePlayer(playerid, targetplayerid, mode);
};
export const PlayerSpectateVehicle = (playerid: number, targetvehicleid: number, mode: number): number => {
    return SampFunctions.PlayerSpectateVehicle(playerid, targetvehicleid, mode);
};
export const StartRecordingPlayerData = (playerid: number, recordtype: number, recordname: string): number => {
    return SampFunctions.StartRecordingPlayerData(playerid, recordtype, recordname);
};
export const StopRecordingPlayerData = (playerid: number): number => {
    return SampFunctions.StopRecordingPlayerData(playerid);
};
export const SelectTextDraw = (playerid: number, hovercolor: number): number => {
    return SampFunctions.SelectTextDraw(playerid, hovercolor);
};
export const CancelSelectTextDraw = (playerid: number): number => {
    return SampFunctions.CancelSelectTextDraw(playerid);
};
export const CreateExplosionForPlayer = (playerid: number, X: number, Y: number, Z: number, type: number, Radius: number): number => {
    return SampFunctions.CreateExplosionForPlayer(playerid, X, Y, Z, type, Radius);
};
export const SendClientCheck = (playerid: number, type: number, memAddr: number, memOffset: number, byteCount: number): number => {
    return SampFunctions.SendClientCheck(playerid, type, memAddr, memOffset, byteCount);
};
export const db_open = (name: string): number => {
    return SampFunctions.db_open(name);
};
export const db_close = (db: number): number => {
    return SampFunctions.db_close(db);
};
export const db_query = (db: number, query: string): number => {
    return SampFunctions.db_query(db, query);
};
export const db_free_result = (dbresult: number): number => {
    return SampFunctions.db_free_result(dbresult);
};
export const db_num_rows = (dbresult: number): number => {
    return SampFunctions.db_num_rows(dbresult);
};
export const db_next_row = (dbresult: number): number => {
    return SampFunctions.db_next_row(dbresult);
};
export const db_num_fields = (dbresult: number): number => {
    return SampFunctions.db_num_fields(dbresult);
};
export const db_field_name = (dbresult: number, field: number, maxlength: number): string => {
    return SampFunctions.db_field_name(dbresult, field, maxlength);
};
export const db_get_field = (dbresult: number, field: number, maxlength: number): string => {
    return SampFunctions.db_get_field(dbresult, field, maxlength);
};
export const db_get_field_int = (result: number, field: number): number => {
    return SampFunctions.db_get_field_int(result, field);
};
export const db_get_field_float = (result: number, field: number): number => {
    return SampFunctions.db_get_field_float(result, field);
};
export const db_get_field_assoc = (dbresult: number, field: string, maxlength: number): string => {
    return SampFunctions.db_get_field_assoc(dbresult, field, maxlength);
};
export const db_get_field_assoc_int = (result: number, field: string): number => {
    return SampFunctions.db_get_field_assoc_int(result, field);
};
export const db_get_field_assoc_float = (result: number, field: string): number => {
    return SampFunctions.db_get_field_assoc_float(result, field);
};
export const db_get_mem_handle = (db: number): number => {
    return SampFunctions.db_get_mem_handle(db);
};
export const db_get_result_mem_handle = (result: number): number => {
    return SampFunctions.db_get_result_mem_handle(result);
};
export const db_debug_openfiles = (): number => {
    return SampFunctions.db_debug_openfiles();
};
export const db_debug_openresults = (): number => {
    return SampFunctions.db_debug_openresults();
};
export const CreateVehicle = (vehicletype: number, x: number, y: number, z: number, rotation: number, color1: number, color2: number, respawn_delay: number, addsiren: number): number => {
    return SampFunctions.CreateVehicle(vehicletype, x, y, z, rotation, color1, color2, respawn_delay, addsiren);
};
export const DestroyVehicle = (vehicleid: number): number => {
    return SampFunctions.DestroyVehicle(vehicleid);
};
export const IsVehicleStreamedIn = (vehicleid: number, forplayerid: number): number => {
    return SampFunctions.IsVehicleStreamedIn(vehicleid, forplayerid);
};
export const GetVehiclePos = (vehicleid: number) => {
    return SampFunctions.GetVehiclePos(vehicleid);
};
export const SetVehiclePos = (vehicleid: number, x: number, y: number, z: number): number => {
    return SampFunctions.SetVehiclePos(vehicleid, x, y, z);
};
export const GetVehicleZAngle = (vehicleid: number): number => {
    return SampFunctions.GetVehicleZAngle(vehicleid);
};
export const GetVehicleRotationQuat = (vehicleid: number): Array<any> => {
    return SampFunctions.GetVehicleRotationQuat(vehicleid);
};
export const GetVehicleDistanceFromPoint = (vehicleid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.GetVehicleDistanceFromPoint(vehicleid, X, Y, Z);
};
export const SetVehicleZAngle = (vehicleid: number, z_angle: number): number => {
    return SampFunctions.SetVehicleZAngle(vehicleid, z_angle);
};
export const SetVehicleParamsForPlayer = (vehicleid: number, playerid: number, objective: number, doorslocked: number): number => {
    return SampFunctions.SetVehicleParamsForPlayer(vehicleid, playerid, objective, doorslocked);
};
export const ManualVehicleEngineAndLights = (): number => {
    return SampFunctions.ManualVehicleEngineAndLights();
};
export const SetVehicleParamsEx = (vehicleid: number, engine: number, lights: number, alarm: number, doors: number, bonnet: number, boot: number, objective: number): number => {
    return SampFunctions.SetVehicleParamsEx(vehicleid, engine, lights, alarm, doors, bonnet, boot, objective);
};
export const GetVehicleParamsEx = (vehicleid: number): Array<any> => {
    return SampFunctions.GetVehicleParamsEx(vehicleid);
};
export const GetVehicleParamsSirenState = (vehicleid: number): number => {
    return SampFunctions.GetVehicleParamsSirenState(vehicleid);
};
export const SetVehicleParamsCarDoors = (vehicleid: number, driver: number, passenger: number, backleft: number, backright: number): number => {
    return SampFunctions.SetVehicleParamsCarDoors(vehicleid, driver, passenger, backleft, backright);
};
export const GetVehicleParamsCarDoors = (vehicleid: number) => {
    return SampFunctions.GetVehicleParamsCarDoors(vehicleid);
};
export const SetVehicleParamsCarWindows = (vehicleid: number, driver: number, passenger: number, backleft: number, backright: number): number => {
    return SampFunctions.SetVehicleParamsCarWindows(vehicleid, driver, passenger, backleft, backright);
};
export const GetVehicleParamsCarWindows = (vehicleid: number) => {
    return SampFunctions.GetVehicleParamsCarWindows(vehicleid);
};
export const SetVehicleToRespawn = (vehicleid: number): number => {
    return SampFunctions.SetVehicleToRespawn(vehicleid);
};
export const LinkVehicleToInterior = (vehicleid: number, interiorid: number): number => {
    return SampFunctions.LinkVehicleToInterior(vehicleid, interiorid);
};
export const AddVehicleComponent = (vehicleid: number, componentid: number): number => {
    return SampFunctions.AddVehicleComponent(vehicleid, componentid);
};
export const RemoveVehicleComponent = (vehicleid: number, componentid: number): number => {
    return SampFunctions.RemoveVehicleComponent(vehicleid, componentid);
};
export const ChangeVehicleColor = (vehicleid: number, color1: number, color2: number): number => {
    return SampFunctions.ChangeVehicleColor(vehicleid, color1, color2);
};
export const ChangeVehiclePaintjob = (vehicleid: number, paintjobid: number): number => {
    return SampFunctions.ChangeVehiclePaintjob(vehicleid, paintjobid);
};
export const SetVehicleHealth = (vehicleid: number, health: number): number => {
    return SampFunctions.SetVehicleHealth(vehicleid, health);
};
export const GetVehicleHealth = (vehicleid: number): number => {
    return SampFunctions.GetVehicleHealth(vehicleid);
};
export const AttachTrailerToVehicle = (trailerid: number, vehicleid: number): number => {
    return SampFunctions.AttachTrailerToVehicle(trailerid, vehicleid);
};
export const DetachTrailerFromVehicle = (vehicleid: number): number => {
    return SampFunctions.DetachTrailerFromVehicle(vehicleid);
};
export const IsTrailerAttachedToVehicle = (vehicleid: number): number => {
    return SampFunctions.IsTrailerAttachedToVehicle(vehicleid);
};
export const GetVehicleTrailer = (vehicleid: number): number => {
    return SampFunctions.GetVehicleTrailer(vehicleid);
};
export const SetVehicleNumberPlate = (vehicleid: number, numberplate: string): number => {
    return SampFunctions.SetVehicleNumberPlate(vehicleid, numberplate);
};
export const GetVehicleModel = (vehicleid: number): number => {
    return SampFunctions.GetVehicleModel(vehicleid);
};
export const GetVehicleComponentInSlot = (vehicleid: number, slot: CARMODTYPE): number => {
    return SampFunctions.GetVehicleComponentInSlot(vehicleid, slot);
};
export const GetVehicleComponentType = (component: number): CARMODTYPE | -1 => {
    return SampFunctions.GetVehicleComponentType(component);
};
export const RepairVehicle = (vehicleid: number): number => {
    return SampFunctions.RepairVehicle(vehicleid);
};
export const GetVehicleVelocity = (vehicleid: number): Array<any> => {
    return SampFunctions.GetVehicleVelocity(vehicleid);
};
export const SetVehicleVelocity = (vehicleid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.SetVehicleVelocity(vehicleid, X, Y, Z);
};
export const SetVehicleAngularVelocity = (vehicleid: number, X: number, Y: number, Z: number): number => {
    return SampFunctions.SetVehicleAngularVelocity(vehicleid, X, Y, Z);
};
export const GetVehicleDamageStatus = (vehicleid: number) => {
    return SampFunctions.GetVehicleDamageStatus(vehicleid);
};
export const UpdateVehicleDamageStatus = (vehicleid: number, panels: number, doors: number, lights: number, tires: number): number => {
    return SampFunctions.UpdateVehicleDamageStatus(vehicleid, panels, doors, lights, tires);
};
export const GetVehicleModelInfo = (vehiclemodel: number, infotype: VEHICLE_MODEL_INFO) => {
    return SampFunctions.GetVehicleModelInfo(vehiclemodel, infotype);
};
export const SetVehicleVirtualWorld = (vehicleid: number, worldid: number): number => {
    return SampFunctions.SetVehicleVirtualWorld(vehicleid, worldid);
};
export const GetVehicleVirtualWorld = (vehicleid: number): number => {
    return SampFunctions.GetVehicleVirtualWorld(vehicleid);
};
export const IsValidVehicle = (vehicleid: number): number => {
    return SampFunctions.IsValidVehicle(vehicleid);
};

export class SampFunctions {
    static SendClientMessage(playerid: number, color: number, message: string): number {
        return samp.callNative('SendClientMessage', 'iis', playerid, color, message);
    }

    static SendClientMessageToAll(color: number, message: string): number {
        return samp.callNative('SendClientMessageToAll', 'is', color, message);
    }

    static SendPlayerMessageToPlayer(playerid: number, senderid: number, message: string): number {
        return samp.callNative('SendPlayerMessageToPlayer', 'iis', playerid, senderid, message);
    }

    static SendPlayerMessageToAll(senderid: number, message: string): number {
        return samp.callNative('SendPlayerMessageToAll', 'is', senderid, message);
    }

    static SendDeathMessage(killer: number, killee: number, weapon: number): number {
        return samp.callNative('SendDeathMessage', 'iii', killer, killee, weapon);
    }

    static SendDeathMessageToPlayer(playerid: number, killer: number, killee: number, weapon: number): number {
        return samp.callNative('SendDeathMessageToPlayer', 'iiii', playerid, killer, killee, weapon);
    }

    static GameTextForAll(string: string, time: number, style: number): number {
        return samp.callNative('GameTextForAll', 'sii', string, time, style);
    }

    static GameTextForPlayer(playerid: number, string: string, time: number, style: number): number {
        return samp.callNative('GameTextForPlayer', 'isii', playerid, string, time, style);
    }

    static SetTimer(funcname: string, interval: number, repeating: number): number {
        return samp.callNative('SetTimer', 'sii', funcname, interval, repeating);
    }

    static KillTimer(timerid: number): number {
        return samp.callNative('KillTimer', 'i', timerid);
    }

    static GetTickCount(): number {
        return samp.callNative('GetTickCount', '',);
    }

    static GetMaxPlayers(): number {
        return samp.callNative('GetMaxPlayers', '',);
    }

    static VectorSize(x: number, y: number, z: number): number {
        return samp.callNativeFloat('VectorSize', 'fff', x, y, z);
    }

    static asin(value: number): number {
        return samp.callNativeFloat('asin', 'f', value);
    }

    static acos(value: number): number {
        return samp.callNativeFloat('acos', 'f', value);
    }

    static atan(value: number): number {
        return samp.callNativeFloat('atan', 'f', value);
    }

    static atan2(y: number, x: number): number {
        return samp.callNativeFloat('atan2', 'ff', y, x);
    }

    static GetPlayerPoolSize(): number {
        return samp.callNative('GetPlayerPoolSize', '',);
    }

    static GetVehiclePoolSize(): number {
        return samp.callNative('GetVehiclePoolSize', '',);
    }

    static GetActorPoolSize(): number {
        return samp.callNative('GetActorPoolSize', '',);
    }

    static SHA256_PassHash(password: string, salt: string, ret_hash_len: number): string {
        return samp.callNative('SHA256_PassHash', 'ssSi', password, salt, ret_hash_len);
    }

    static SetSVarInt(varname: string, int_value: number): number {
        return samp.callNative('SetSVarInt', 'si', varname, int_value);
    }

    static GetSVarInt(varname: string): number {
        return samp.callNative('GetSVarInt', 's', varname);
    }

    static SetSVarString(varname: string, string_value: string): number {
        return samp.callNative('SetSVarString', 'ss', varname, string_value);
    }

    static GetSVarString(varname: string, len: number): string {
        return samp.callNative('GetSVarString', 'sSi', varname, len);
    }

    static SetSVarFloat(varname: string, float_value: number): number {
        return samp.callNative('SetSVarFloat', 'sf', varname, float_value);
    }

    static GetSVarFloat(varname: string): number {
        return samp.callNativeFloat('GetSVarFloat', 's', varname);
    }

    static DeleteSVar(varname: string): number {
        return samp.callNative('DeleteSVar', 's', varname);
    }

    static GetSVarsUpperIndex(): number {
        return samp.callNative('GetSVarsUpperIndex', '',);
    }

    static GetSVarNameAtIndex(index: number, ret_len: number): string {
        return samp.callNative('GetSVarNameAtIndex', 'iSi', index, ret_len);
    }

    static GetSVarType(varname: string): number {
        return samp.callNative('GetSVarType', 's', varname);
    }

    static SetGameModeText(string: string): number {
        return samp.callNative('SetGameModeText', 's', string);
    }

    static SetTeamCount(count: number): number {
        return samp.callNative('SetTeamCount', 'i', count);
    }

    static AddPlayerClass(modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, weapon1: number, weapon1_ammo: number, weapon2: number, weapon2_ammo: number, weapon3: number, weapon3_ammo: number): number {
        return samp.callNative('AddPlayerClass', 'iffffiiiiii', modelid, spawn_x, spawn_y, spawn_z, z_angle, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
    }

    static AddPlayerClassEx(teamid: number, modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, weapon1: number, weapon1_ammo: number, weapon2: number, weapon2_ammo: number, weapon3: number, weapon3_ammo: number): number {
        return samp.callNative('AddPlayerClassEx', 'iiffffiiiiii', teamid, modelid, spawn_x, spawn_y, spawn_z, z_angle, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
    }

    static AddStaticVehicle(modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, color1: number, color2: number): number {
        return samp.callNative('AddStaticVehicle', 'iffffii', modelid, spawn_x, spawn_y, spawn_z, z_angle, color1, color2);
    }

    static AddStaticVehicleEx(modelid: number, spawn_x: number, spawn_y: number, spawn_z: number, z_angle: number, color1: number, color2: number, respawn_delay: number, addsiren: number): number {
        return samp.callNative('AddStaticVehicleEx', 'iffffiiii', modelid, spawn_x, spawn_y, spawn_z, z_angle, color1, color2, respawn_delay, addsiren);
    }

    static AddStaticPickup(model: number, type: number, X: number, Y: number, Z: number, virtualworld: number): number {
        return samp.callNative('AddStaticPickup', 'iifffi', model, type, X, Y, Z, virtualworld);
    }

    static CreatePickup(model: number, type: number, X: number, Y: number, Z: number, virtualworld: number): number {
        return samp.callNative('CreatePickup', 'iifffi', model, type, X, Y, Z, virtualworld);
    }

    static DestroyPickup(pickup: number): number {
        return samp.callNative('DestroyPickup', 'i', pickup);
    }

    static ShowNameTags(show: number): number {
        return samp.callNative('ShowNameTags', 'i', show);
    }

    static ShowPlayerMarkers(mode: number): number {
        return samp.callNative('ShowPlayerMarkers', 'i', mode);
    }

    static GameModeExit(): number {
        return samp.callNative('GameModeExit', '',);
    }

    static SetWorldTime(hour: number): number {
        return samp.callNative('SetWorldTime', 'i', hour);
    }

    static GetWeaponName(weaponid: number, len: number): string {
        return samp.callNative('GetWeaponName', 'iSi', weaponid, len);
    }

    static EnableTirePopping(enable: number): number {
        return samp.callNative('EnableTirePopping', 'i', enable);
    }

    static EnableVehicleFriendlyFire(): number {
        return samp.callNative('EnableVehicleFriendlyFire', '',);
    }

    static AllowInteriorWeapons(allow: number): number {
        return samp.callNative('AllowInteriorWeapons', 'i', allow);
    }

    static SetWeather(weatherid: number): number {
        return samp.callNative('SetWeather', 'i', weatherid);
    }

    static GetGravity(): number {
        return samp.callNativeFloat('GetGravity', '',);
    }

    static SetGravity(gravity: number): number {
        return samp.callNative('SetGravity', 'f', gravity);
    }

    static AllowAdminTeleport(allow: number): number {
        return samp.callNative('AllowAdminTeleport', 'i', allow);
    }

    static SetDeathDropAmount(amount: number): number {
        return samp.callNative('SetDeathDropAmount', 'i', amount);
    }

    static CreateExplosion(X: number, Y: number, Z: number, type: number, Radius: number): number {
        return samp.callNative('CreateExplosion', 'fffif', X, Y, Z, type, Radius);
    }

    static EnableZoneNames(enable: number): number {
        return samp.callNative('EnableZoneNames', 'i', enable);
    }

    static UsePlayerPedAnims(): number {
        return samp.callNative('UsePlayerPedAnims', '',);
    }

    static DisableInteriorEnterExits(): number {
        return samp.callNative('DisableInteriorEnterExits', '',);
    }

    static SetNameTagDrawDistance(distance: number): number {
        return samp.callNative('SetNameTagDrawDistance', 'f', distance);
    }

    static DisableNameTagLOS(): number {
        return samp.callNative('DisableNameTagLOS', '',);
    }

    static LimitGlobalChatRadius(chat_radius: number): number {
        return samp.callNative('LimitGlobalChatRadius', 'f', chat_radius);
    }

    static LimitPlayerMarkerRadius(marker_radius: number): number {
        return samp.callNative('LimitPlayerMarkerRadius', 'f', marker_radius);
    }

    static ConnectNPC(name: string, script: string): number {
        return samp.callNative('ConnectNPC', 'ss', name, script);
    }

    static IsPlayerNPC(playerid: number): number {
        return samp.callNative('IsPlayerNPC', 'i', playerid);
    }

    static IsPlayerAdmin(playerid: number): number {
        return samp.callNative('IsPlayerAdmin', 'i', playerid);
    }

    static Kick(playerid: number): number {
        return samp.callNative('Kick', 'i', playerid);
    }

    static Ban(playerid: number): number {
        return samp.callNative('Ban', 'i', playerid);
    }

    static BanEx(playerid: number, reason: string): number {
        return samp.callNative('BanEx', 'is', playerid, reason);
    }

    static SendRconCommand(command: string): number {
        return samp.callNative('SendRconCommand', 's', command);
    }

    static GetPlayerNetworkStats(playerid: number, retstr_size: number): string {
        return samp.callNative('GetPlayerNetworkStats', 'iSi', playerid, retstr_size);
    }

    static GetNetworkStats(retstr_size: number): string {
        return samp.callNative('GetNetworkStats', 'Si', retstr_size);
    }

    static GetPlayerVersion(playerid: number, len: number): string {
        return samp.callNative('GetPlayerVersion', 'iSi', playerid, len);
    }

    static BlockIpAddress(ip_address: string, timems: number): number {
        return samp.callNative('BlockIpAddress', 'si', ip_address, timems);
    }

    static UnBlockIpAddress(ip_address: string): number {
        return samp.callNative('UnBlockIpAddress', 's', ip_address);
    }

    static GetServerVarAsString(varname: string, len: number): string {
        return samp.callNative('GetServerVarAsString', 'sSi', varname, len);
    }

    static GetServerVarAsInt(varname: string): number {
        return samp.callNative('GetServerVarAsInt', 's', varname);
    }

    static GetServerVarAsBool(varname: string): number {
        return samp.callNative('GetServerVarAsBool', 's', varname);
    }

    static GetConsoleVarAsString(varname: string, len: number): string {
        return samp.callNative('GetConsoleVarAsString', 'sSi', varname, len);
    }

    static GetConsoleVarAsInt(varname: string): number {
        return samp.callNative('GetConsoleVarAsInt', 's', varname);
    }

    static GetConsoleVarAsBool(varname: string): number {
        return samp.callNative('GetConsoleVarAsBool', 's', varname);
    }

    static GetServerTickRate(): number {
        return samp.callNative('GetServerTickRate', '',);
    }

    static NetStats_GetConnectedTime(playerid: number): number {
        return samp.callNative('NetStats_GetConnectedTime', 'i', playerid);
    }

    static NetStats_MessagesReceived(playerid: number): number {
        return samp.callNative('NetStats_MessagesReceived', 'i', playerid);
    }

    static NetStats_BytesReceived(playerid: number): number {
        return samp.callNative('NetStats_BytesReceived', 'i', playerid);
    }

    static NetStats_MessagesSent(playerid: number): number {
        return samp.callNative('NetStats_MessagesSent', 'i', playerid);
    }

    static NetStats_BytesSent(playerid: number): number {
        return samp.callNative('NetStats_BytesSent', 'i', playerid);
    }

    static NetStats_MessagesRecvPerSecond(playerid: number): number {
        return samp.callNative('NetStats_MessagesRecvPerSecond', 'i', playerid);
    }

    static NetStats_PacketLossPercent(playerid: number): number {
        return samp.callNativeFloat('NetStats_PacketLossPercent', 'i', playerid);
    }

    static NetStats_ConnectionStatus(playerid: number): number {
        return samp.callNative('NetStats_ConnectionStatus', 'i', playerid);
    }

    static NetStats_GetIpPort(playerid: number, ip_port_len: number): string {
        return samp.callNative('NetStats_GetIpPort', 'iSi', playerid, ip_port_len);
    }

    static CreateMenu(title: string, columns: number, x: number, y: number, col1width: number, col2width: number): number {
        return samp.callNative('CreateMenu', 'siffff', title, columns, x, y, col1width, col2width);
    }

    static DestroyMenu(menuid: number): number {
        return samp.callNative('DestroyMenu', 'i', menuid);
    }

    static AddMenuItem(menuid: number, column: number, menutext: string): number {
        return samp.callNative('AddMenuItem', 'iis', menuid, column, menutext);
    }

    static SetMenuColumnHeader(menuid: number, column: number, columnheader: string): number {
        return samp.callNative('SetMenuColumnHeader', 'iis', menuid, column, columnheader);
    }

    static ShowMenuForPlayer(menuid: number, playerid: number): number {
        return samp.callNative('ShowMenuForPlayer', 'ii', menuid, playerid);
    }

    static HideMenuForPlayer(menuid: number, playerid: number): number {
        return samp.callNative('HideMenuForPlayer', 'ii', menuid, playerid);
    }

    static IsValidMenu(menuid: number): number {
        return samp.callNative('IsValidMenu', 'i', menuid);
    }

    static DisableMenu(menuid: number): number {
        return samp.callNative('DisableMenu', 'i', menuid);
    }

    static DisableMenuRow(menuid: number, row: number): number {
        return samp.callNative('DisableMenuRow', 'ii', menuid, row);
    }

    static GetPlayerMenu(playerid: number): number {
        return samp.callNative('GetPlayerMenu', 'i', playerid);
    }

    static TextDrawCreate(x: number, y: number, text: string): number {
        return samp.callNative('TextDrawCreate', 'ffs', x, y, text);
    }

    static TextDrawDestroy(text: number): number {
        return samp.callNative('TextDrawDestroy', 'i', text);
    }

    static TextDrawLetterSize(text: number, x: number, y: number): number {
        return samp.callNative('TextDrawLetterSize', 'iff', text, x, y);
    }

    static TextDrawTextSize(text: number, x: number, y: number): number {
        return samp.callNative('TextDrawTextSize', 'iff', text, x, y);
    }

    static TextDrawAlignment(text: number, alignment: number): number {
        return samp.callNative('TextDrawAlignment', 'ii', text, alignment);
    }

    static TextDrawColor(text: number, color: number): number {
        return samp.callNative('TextDrawColor', 'ii', text, color);
    }

    static TextDrawUseBox(text: number, use: number): number {
        return samp.callNative('TextDrawUseBox', 'ii', text, use);
    }

    static TextDrawBoxColor(text: number, color: number): number {
        return samp.callNative('TextDrawBoxColor', 'ii', text, color);
    }

    static TextDrawSetShadow(text: number, size: number): number {
        return samp.callNative('TextDrawSetShadow', 'ii', text, size);
    }

    static TextDrawSetOutline(text: number, size: number): number {
        return samp.callNative('TextDrawSetOutline', 'ii', text, size);
    }

    static TextDrawBackgroundColor(text: number, color: number): number {
        return samp.callNative('TextDrawBackgroundColor', 'ii', text, color);
    }

    static TextDrawFont(text: number, font: number): number {
        return samp.callNative('TextDrawFont', 'ii', text, font);
    }

    static TextDrawSetProportional(text: number, set: number): number {
        return samp.callNative('TextDrawSetProportional', 'ii', text, set);
    }

    static TextDrawSetSelectable(text: number, set: number): number {
        return samp.callNative('TextDrawSetSelectable', 'ii', text, set);
    }

    static TextDrawShowForPlayer(playerid: number, text: number): number {
        return samp.callNative('TextDrawShowForPlayer', 'ii', playerid, text);
    }

    static TextDrawHideForPlayer(playerid: number, text: number): number {
        return samp.callNative('TextDrawHideForPlayer', 'ii', playerid, text);
    }

    static TextDrawShowForAll(text: number): number {
        return samp.callNative('TextDrawShowForAll', 'i', text);
    }

    static TextDrawHideForAll(text: number): number {
        return samp.callNative('TextDrawHideForAll', 'i', text);
    }

    static TextDrawSetString(text: number, string: string): number {
        return samp.callNative('TextDrawSetString', 'is', text, string);
    }

    static TextDrawSetPreviewModel(text: number, modelindex: number): number {
        return samp.callNative('TextDrawSetPreviewModel', 'ii', text, modelindex);
    }

    static TextDrawSetPreviewRot(text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number {
        return samp.callNative('TextDrawSetPreviewRot', 'iffff', text, fRotX, fRotY, fRotZ, fZoom);
    }

    static TextDrawSetPreviewVehCol(text: number, color1: number, color2: number): number {
        return samp.callNative('TextDrawSetPreviewVehCol', 'iii', text, color1, color2);
    }

    static GangZoneCreate(minx: number, miny: number, maxx: number, maxy: number): number {
        return samp.callNative('GangZoneCreate', 'ffff', minx, miny, maxx, maxy);
    }

    static GangZoneDestroy(zone: number): number {
        return samp.callNative('GangZoneDestroy', 'i', zone);
    }

    static GangZoneShowForPlayer(playerid: number, zone: number, color: number): number {
        return samp.callNative('GangZoneShowForPlayer', 'iii', playerid, zone, color);
    }

    static GangZoneShowForAll(zone: number, color: number): number {
        return samp.callNative('GangZoneShowForAll', 'ii', zone, color);
    }

    static GangZoneHideForPlayer(playerid: number, zone: number): number {
        return samp.callNative('GangZoneHideForPlayer', 'ii', playerid, zone);
    }

    static GangZoneHideForAll(zone: number): number {
        return samp.callNative('GangZoneHideForAll', 'i', zone);
    }

    static GangZoneFlashForPlayer(playerid: number, zone: number, flashcolor: number): number {
        return samp.callNative('GangZoneFlashForPlayer', 'iii', playerid, zone, flashcolor);
    }

    static GangZoneFlashForAll(zone: number, flashcolor: number): number {
        return samp.callNative('GangZoneFlashForAll', 'ii', zone, flashcolor);
    }

    static GangZoneStopFlashForPlayer(playerid: number, zone: number): number {
        return samp.callNative('GangZoneStopFlashForPlayer', 'ii', playerid, zone);
    }

    static GangZoneStopFlashForAll(zone: number): number {
        return samp.callNative('GangZoneStopFlashForAll', 'i', zone);
    }

    static Create3DTextLabel(text: string, color: number, X: number, Y: number, Z: number, DrawDistance: number, virtualworld: number, testLOS: number): number {
        return samp.callNative('Create3DTextLabel', 'siffffii', text, color, X, Y, Z, DrawDistance, virtualworld, testLOS);
    }

    static Delete3DTextLabel(id: number): number {
        return samp.callNative('Delete3DTextLabel', 'i', id);
    }

    static Attach3DTextLabelToPlayer(id: number, playerid: number, OffsetX: number, OffsetY: number, OffsetZ: number): number {
        return samp.callNative('Attach3DTextLabelToPlayer', 'iifff', id, playerid, OffsetX, OffsetY, OffsetZ);
    }

    static Attach3DTextLabelToVehicle(id: number, vehicleid: number, OffsetX: number, OffsetY: number, OffsetZ: number): number {
        return samp.callNative('Attach3DTextLabelToVehicle', 'iifff', id, vehicleid, OffsetX, OffsetY, OffsetZ);
    }

    static Update3DTextLabelText(id: number, color: number, text: string): number {
        return samp.callNative('Update3DTextLabelText', 'iis', id, color, text);
    }

    static CreatePlayer3DTextLabel(playerid: number, text: string, color: number, X: number, Y: number, Z: number, DrawDistance: number, attachedplayer: number, attachedvehicle: number, testLOS: number): number {
        return samp.callNative('CreatePlayer3DTextLabel', 'isiffffiii', playerid, text, color, X, Y, Z, DrawDistance, attachedplayer, attachedvehicle, testLOS);
    }

    static DeletePlayer3DTextLabel(playerid: number, id: number): number {
        return samp.callNative('DeletePlayer3DTextLabel', 'ii', playerid, id);
    }

    static UpdatePlayer3DTextLabelText(playerid: number, id: number, color: number, text: string): number {
        return samp.callNative('UpdatePlayer3DTextLabelText', 'iiis', playerid, id, color, text);
    }

    static ShowPlayerDialog(playerid: number, dialogid: number, style: number, caption: string, info: string, button1: string, button2: string): number {
        return samp.callNative('ShowPlayerDialog', 'iiissss', playerid, dialogid, style, caption, info, button1, button2);
    }

    static gpci(playerid: number, maxlen: number): string {
        return samp.callNative('gpci', 'iSi', playerid, maxlen);
    }

    static CreateActor(modelid: number, X: number, Y: number, Z: number, Rotation: number): number {
        return samp.callNative('CreateActor', 'iffff', modelid, X, Y, Z, Rotation);
    }

    static DestroyActor(actorid: number): number {
        return samp.callNative('DestroyActor', 'i', actorid);
    }

    static IsActorStreamedIn(actorid: number, forplayerid: number): number {
        return samp.callNative('IsActorStreamedIn', 'ii', actorid, forplayerid);
    }

    static SetActorVirtualWorld(actorid: number, vworld: number): number {
        return samp.callNative('SetActorVirtualWorld', 'ii', actorid, vworld);
    }

    static GetActorVirtualWorld(actorid: number): number {
        return samp.callNative('GetActorVirtualWorld', 'i', actorid);
    }

    static ApplyActorAnimation(actorid: number, animlib: string, animname: string, fDelta: number, loop: number, lockx: number, locky: number, freeze: number, time: number): number {
        return samp.callNative('ApplyActorAnimation', 'issfiiiii', actorid, animlib, animname, fDelta, loop, lockx, locky, freeze, time);
    }

    static ClearActorAnimations(actorid: number): number {
        return samp.callNative('ClearActorAnimations', 'i', actorid);
    }

    static SetActorPos(actorid: number, X: number, Y: number, Z: number): number {
        return samp.callNative('SetActorPos', 'ifff', actorid, X, Y, Z);
    }

    static GetActorPos(actorid: number): Array<any> {
        return samp.callNative('GetActorPos', 'iFFF', actorid);
    }

    static SetActorFacingAngle(actorid: number, ang: number): number {
        return samp.callNative('SetActorFacingAngle', 'if', actorid, ang);
    }

    static GetActorFacingAngle(actorid: number): number {
        return samp.callNative('GetActorFacingAngle', 'iF', actorid);
    }

    static SetActorHealth(actorid: number, health: number): number {
        return samp.callNative('SetActorHealth', 'if', actorid, health);
    }

    static GetActorHealth(actorid: number): number {
        return samp.callNative('GetActorHealth', 'iF', actorid);
    }

    static SetActorInvulnerable(actorid: number, invulnerable: number): number {
        return samp.callNative('SetActorInvulnerable', 'ii', actorid, invulnerable);
    }

    static IsActorInvulnerable(actorid: number): number {
        return samp.callNative('IsActorInvulnerable', 'i', actorid);
    }

    static IsValidActor(actorid: number): number {
        return samp.callNative('IsValidActor', 'i', actorid);
    }

    static HTTP(index: number, type: number, url: string, data: string, callback: string): number {
        return samp.callNative('HTTP', 'iisss', index, type, url, data, callback);
    }

    static CreateObject(modelid: number, X: number, Y: number, Z: number, rX: number, rY: number, rZ: number, DrawDistance: number): number {
        return samp.callNative('CreateObject', 'ifffffff', modelid, X, Y, Z, rX, rY, rZ, DrawDistance);
    }

    static AttachObjectToVehicle(objectid: number, vehicleid: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotX: number, RotY: number, RotZ: number): number {
        return samp.callNative('AttachObjectToVehicle', 'iiffffff', objectid, vehicleid, OffsetX, OffsetY, OffsetZ, RotX, RotY, RotZ);
    }

    static AttachObjectToObject(objectid: number, attachtoid: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotX: number, RotY: number, RotZ: number, SyncRotation: number): number {
        return samp.callNative('AttachObjectToObject', 'iiffffffi', objectid, attachtoid, OffsetX, OffsetY, OffsetZ, RotX, RotY, RotZ, SyncRotation);
    }

    static AttachObjectToPlayer(objectid: number, playerid: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotX: number, RotY: number, RotZ: number): number {
        return samp.callNative('AttachObjectToPlayer', 'iiffffff', objectid, playerid, OffsetX, OffsetY, OffsetZ, RotX, RotY, RotZ);
    }

    static SetObjectPos(objectid: number, X: number, Y: number, Z: number): number {
        return samp.callNative('SetObjectPos', 'ifff', objectid, X, Y, Z);
    }

    static GetObjectPos(objectid: number): Array<any> {
        return samp.callNative('GetObjectPos', 'iFFF', objectid);
    }

    static SetObjectRot(objectid: number, RotX: number, RotY: number, RotZ: number): number {
        return samp.callNative('SetObjectRot', 'ifff', objectid, RotX, RotY, RotZ);
    }

    static GetObjectRot(objectid: number): Array<any> {
        return samp.callNative('GetObjectRot', 'iFFF', objectid);
    }

    static GetObjectModel(objectid: number): number {
        return samp.callNative('GetObjectModel', 'i', objectid);
    }

    static SetObjectNoCameraCol(objectid: number): number {
        return samp.callNative('SetObjectNoCameraCol', 'i', objectid);
    }

    static IsValidObject(objectid: number): number {
        return samp.callNative('IsValidObject', 'i', objectid);
    }

    static DestroyObject(objectid: number): number {
        return samp.callNative('DestroyObject', 'i', objectid);
    }

    static MoveObject(objectid: number, X: number, Y: number, Z: number, Speed: number, RotX: number, RotY: number, RotZ: number): number {
        return samp.callNative('MoveObject', 'ifffffff', objectid, X, Y, Z, Speed, RotX, RotY, RotZ);
    }

    static StopObject(objectid: number): number {
        return samp.callNative('StopObject', 'i', objectid);
    }

    static IsObjectMoving(objectid: number): number {
        return samp.callNative('IsObjectMoving', 'i', objectid);
    }

    static EditObject(playerid: number, objectid: number): number {
        return samp.callNative('EditObject', 'ii', playerid, objectid);
    }

    static EditPlayerObject(playerid: number, objectid: number): number {
        return samp.callNative('EditPlayerObject', 'ii', playerid, objectid);
    }

    static SelectObject(playerid: number): number {
        return samp.callNative('SelectObject', 'i', playerid);
    }

    static CancelEdit(playerid: number): number {
        return samp.callNative('CancelEdit', 'i', playerid);
    }

    static CreatePlayerObject(playerid: number, modelid: number, X: number, Y: number, Z: number, rX: number, rY: number, rZ: number, DrawDistance: number): number {
        return samp.callNative('CreatePlayerObject', 'iifffffff', playerid, modelid, X, Y, Z, rX, rY, rZ, DrawDistance);
    }

    static AttachPlayerObjectToVehicle(playerid: number, objectid: number, vehicleid: number, fOffsetX: number, fOffsetY: number, fOffsetZ: number, fRotX: number, fRotY: number, RotZ: number): number {
        return samp.callNative('AttachPlayerObjectToVehicle', 'iiiffffff', playerid, objectid, vehicleid, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, RotZ);
    }

    static SetPlayerObjectPos(playerid: number, objectid: number, X: number, Y: number, Z: number): number {
        return samp.callNative('SetPlayerObjectPos', 'iifff', playerid, objectid, X, Y, Z);
    }

    static GetPlayerObjectPos(playerid: number, objectid: number): Array<any> {
        return samp.callNative('GetPlayerObjectPos', 'iiFFF', playerid, objectid);
    }

    static SetPlayerObjectRot(playerid: number, objectid: number, RotX: number, RotY: number, RotZ: number): number {
        return samp.callNative('SetPlayerObjectRot', 'iifff', playerid, objectid, RotX, RotY, RotZ);
    }

    static GetPlayerObjectRot(playerid: number, objectid: number): Array<any> {
        return samp.callNative('GetPlayerObjectRot', 'iiFFF', playerid, objectid);
    }

    static GetPlayerObjectModel(playerid: number, objectid: number): number {
        return samp.callNative('GetPlayerObjectModel', 'ii', playerid, objectid);
    }

    static SetPlayerObjectNoCameraCol(playerid: number, objectid: number): number {
        return samp.callNative('SetPlayerObjectNoCameraCol', 'ii', playerid, objectid);
    }

    static IsValidPlayerObject(playerid: number, objectid: number): number {
        return samp.callNative('IsValidPlayerObject', 'ii', playerid, objectid);
    }

    static DestroyPlayerObject(playerid: number, objectid: number): number {
        return samp.callNative('DestroyPlayerObject', 'ii', playerid, objectid);
    }

    static MovePlayerObject(playerid: number, objectid: number, X: number, Y: number, Z: number, Speed: number, RotX: number, RotY: number, RotZ: number): number {
        return samp.callNative('MovePlayerObject', 'iifffffff', playerid, objectid, X, Y, Z, Speed, RotX, RotY, RotZ);
    }

    static StopPlayerObject(playerid: number, objectid: number): number {
        return samp.callNative('StopPlayerObject', 'ii', playerid, objectid);
    }

    static IsPlayerObjectMoving(playerid: number, objectid: number): number {
        return samp.callNative('IsPlayerObjectMoving', 'ii', playerid, objectid);
    }

    static AttachPlayerObjectToPlayer(objectplayer: number, objectid: number, attachplayer: number, OffsetX: number, OffsetY: number, OffsetZ: number, rX: number, rY: number, rZ: number): number {
        return samp.callNative('AttachPlayerObjectToPlayer', 'iiiffffff', objectplayer, objectid, attachplayer, OffsetX, OffsetY, OffsetZ, rX, rY, rZ);
    }

    static SetObjectMaterial(objectid: number, materialindex: number, modelid: number, txdname: string, texturename: string, materialcolor: number): number {
        return samp.callNative('SetObjectMaterial', 'iiissi', objectid, materialindex, modelid, txdname, texturename, materialcolor);
    }

    static SetPlayerObjectMaterial(playerid: number, objectid: number, materialindex: number, modelid: number, txdname: string, texturename: string, materialcolor: number): number {
        return samp.callNative('SetPlayerObjectMaterial', 'iiiissi', playerid, objectid, materialindex, modelid, txdname, texturename, materialcolor);
    }

    static SetObjectMaterialText(objectid: number, text: string, materialindex: number, materialsize: number, fontface: string, fontsize: number, bold: number, fontcolor: number, backcolor: number, textalignment: number): number {
        return samp.callNative('SetObjectMaterialText', 'isiisiiiii', objectid, text, materialindex, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
    }

    static SetPlayerObjectMaterialText(playerid: number, objectid: number, text: string, materialindex: number, materialsize: number, fontface: string, fontsize: number, bold: number, fontcolor: number, backcolor: number, textalignment: number): number {
        return samp.callNative('SetPlayerObjectMaterialText', 'iisiisiiiii', playerid, objectid, text, materialindex, materialsize, fontface, fontsize, bold, fontcolor, backcolor, textalignment);
    }

    static SetObjectsDefaultCameraCol(disable: number): number {
        return samp.callNative('SetObjectsDefaultCameraCol', 'i', disable);
    }

    static SetSpawnInfo(playerid: number, team: number, skin: number, x: number, y: number, z: number, rotation: number, weapon1: number, weapon1_ammo: number, weapon2: number, weapon2_ammo: number, weapon3: number, weapon3_ammo: number): number {
        return samp.callNative('SetSpawnInfo', 'iiiffffiiiiii', playerid, team, skin, x, y, z, rotation, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
    }

    static SpawnPlayer(playerid: number): number {
        return samp.callNative('SpawnPlayer', 'i', playerid);
    }

    static SetPlayerPos(playerid: number, x: number, y: number, z: number): number {
        return samp.callNative('SetPlayerPos', 'ifff', playerid, x, y, z);
    }

    static SetPlayerPosFindZ(playerid: number, x: number, y: number, z: number): number {
        return samp.callNative('SetPlayerPosFindZ', 'ifff', playerid, x, y, z);
    }

    static GetPlayerPos(playerid: number): Array<any> {
        return samp.callNative('GetPlayerPos', 'iFFF', playerid);
    }

    static SetPlayerFacingAngle(playerid: number, ang: number): number {
        return samp.callNative('SetPlayerFacingAngle', 'if', playerid, ang);
    }

    static GetPlayerFacingAngle(playerid: number): number {
        return samp.callNative('GetPlayerFacingAngle', 'iF', playerid);
    }

    static IsPlayerInRangeOfPoint(playerid: number, range: number, x: number, y: number, z: number): number {
        return samp.callNative('IsPlayerInRangeOfPoint', 'iffff', playerid, range, x, y, z);
    }

    static GetPlayerDistanceFromPoint(playerid: number, X: number, Y: number, Z: number): number {
        return samp.callNativeFloat('GetPlayerDistanceFromPoint', 'ifff', playerid, X, Y, Z);
    }

    static IsPlayerStreamedIn(playerid: number, forplayerid: number): number {
        return samp.callNative('IsPlayerStreamedIn', 'ii', playerid, forplayerid);
    }

    static SetPlayerInterior(playerid: number, interiorid: number): number {
        return samp.callNative('SetPlayerInterior', 'ii', playerid, interiorid);
    }

    static GetPlayerInterior(playerid: number): number {
        return samp.callNative('GetPlayerInterior', 'i', playerid);
    }

    static SetPlayerHealth(playerid: number, health: number): number {
        return samp.callNative('SetPlayerHealth', 'if', playerid, health);
    }

    static GetPlayerHealth(playerid: number): number {
        return samp.callNative('GetPlayerHealth', 'iF', playerid);
    }

    static SetPlayerArmour(playerid: number, armour: number): number {
        return samp.callNative('SetPlayerArmour', 'if', playerid, armour);
    }

    static GetPlayerArmour(playerid: number): number {
        return samp.callNative('GetPlayerArmour', 'iF', playerid);
    }

    static SetPlayerAmmo(playerid: number, weaponslot: number, ammo: number): number {
        return samp.callNative('SetPlayerAmmo', 'iii', playerid, weaponslot, ammo);
    }

    static GetPlayerAmmo(playerid: number): number {
        return samp.callNative('GetPlayerAmmo', 'i', playerid);
    }

    static GetPlayerWeaponState(playerid: number): number {
        return samp.callNative('GetPlayerWeaponState', 'i', playerid);
    }

    static GetPlayerTargetPlayer(playerid: number): number {
        return samp.callNative('GetPlayerTargetPlayer', 'i', playerid);
    }

    static GetPlayerTargetActor(playerid: number): number {
        return samp.callNative('GetPlayerTargetActor', 'i', playerid);
    }

    static SetPlayerTeam(playerid: number, teamid: number): number {
        return samp.callNative('SetPlayerTeam', 'ii', playerid, teamid);
    }

    static GetPlayerTeam(playerid: number): number {
        return samp.callNative('GetPlayerTeam', 'i', playerid);
    }

    static SetPlayerScore(playerid: number, score: number): number {
        return samp.callNative('SetPlayerScore', 'ii', playerid, score);
    }

    static GetPlayerScore(playerid: number): number {
        return samp.callNative('GetPlayerScore', 'i', playerid);
    }

    static GetPlayerDrunkLevel(playerid: number): number {
        return samp.callNative('GetPlayerDrunkLevel', 'i', playerid);
    }

    static SetPlayerDrunkLevel(playerid: number, level: number): number {
        return samp.callNative('SetPlayerDrunkLevel', 'ii', playerid, level);
    }

    static SetPlayerColor(playerid: number, color: number): number {
        return samp.callNative('SetPlayerColor', 'ii', playerid, color);
    }

    static GetPlayerColor(playerid: number): number {
        return samp.callNative('GetPlayerColor', 'i', playerid);
    }

    static SetPlayerSkin(playerid: number, skinid: number): number {
        return samp.callNative('SetPlayerSkin', 'ii', playerid, skinid);
    }

    static GetPlayerSkin(playerid: number): number {
        return samp.callNative('GetPlayerSkin', 'i', playerid);
    }

    static GivePlayerWeapon(playerid: number, weaponid: number, ammo: number): number {
        return samp.callNative('GivePlayerWeapon', 'iii', playerid, weaponid, ammo);
    }

    static ResetPlayerWeapons(playerid: number): number {
        return samp.callNative('ResetPlayerWeapons', 'i', playerid);
    }

    static SetPlayerArmedWeapon(playerid: number, weaponid: number): number {
        return samp.callNative('SetPlayerArmedWeapon', 'ii', playerid, weaponid);
    }

    static GetPlayerWeaponData(playerid: number, slot: number): Array<any> {
        return samp.callNative('GetPlayerWeaponData', 'iiII', playerid, slot);
    }

    static GivePlayerMoney(playerid: number, money: number): number {
        return samp.callNative('GivePlayerMoney', 'ii', playerid, money);
    }

    static ResetPlayerMoney(playerid: number): number {
        return samp.callNative('ResetPlayerMoney', 'i', playerid);
    }

    static SetPlayerName(playerid: number, name: string): number {
        return samp.callNative('SetPlayerName', 'is', playerid, name);
    }

    static GetPlayerMoney(playerid: number): number {
        return samp.callNative('GetPlayerMoney', 'i', playerid);
    }

    static GetPlayerState(playerid: number): number {
        return samp.callNative('GetPlayerState', 'i', playerid);
    }

    static GetPlayerIp(playerid: number, len: number): string {
        return samp.callNative('GetPlayerIp', 'iSi', playerid, len);
    }

    static GetPlayerPing(playerid: number): number {
        return samp.callNative('GetPlayerPing', 'i', playerid);
    }

    static GetPlayerWeapon(playerid: number): number {
        return samp.callNative('GetPlayerWeapon', 'i', playerid);
    }

    static GetPlayerKeys(playerid: number): Array<any> {
        return samp.callNative('GetPlayerKeys', 'iIII', playerid);
    }

    static GetPlayerName(playerid: number, len: number): string {
        return samp.callNative('GetPlayerName', 'iSi', playerid, len);
    }

    static SetPlayerTime(playerid: number, hour: number, minute: number): number {
        return samp.callNative('SetPlayerTime', 'iii', playerid, hour, minute);
    }

    static GetPlayerTime(playerid: number): Array<any> {
        return samp.callNative('GetPlayerTime', 'iII', playerid);
    }

    static TogglePlayerClock(playerid: number, toggle: number): number {
        return samp.callNative('TogglePlayerClock', 'ii', playerid, toggle);
    }

    static SetPlayerWeather(playerid: number, weather: number): number {
        return samp.callNative('SetPlayerWeather', 'ii', playerid, weather);
    }

    static ForceClassSelection(playerid: number): number {
        return samp.callNative('ForceClassSelection', 'i', playerid);
    }

    static SetPlayerWantedLevel(playerid: number, level: number): number {
        return samp.callNative('SetPlayerWantedLevel', 'ii', playerid, level);
    }

    static GetPlayerWantedLevel(playerid: number): number {
        return samp.callNative('GetPlayerWantedLevel', 'i', playerid);
    }

    static SetPlayerFightingStyle(playerid: number, style: FIGHT_STYLE): number {
        return samp.callNative('SetPlayerFightingStyle', 'ii', playerid, style);
    }

    static GetPlayerFightingStyle(playerid: number): FIGHT_STYLE {
        return samp.callNative('GetPlayerFightingStyle', 'i', playerid);
    }

    static SetPlayerVelocity(playerid: number, X: number, Y: number, Z: number): number {
        return samp.callNative('SetPlayerVelocity', 'ifff', playerid, X, Y, Z);
    }

    static GetPlayerVelocity(playerid: number): Array<any> {
        return samp.callNative('GetPlayerVelocity', 'iFFF', playerid);
    }

    static PlayCrimeReportForPlayer(playerid: number, suspectid: number, crime: number): number {
        return samp.callNative('PlayCrimeReportForPlayer', 'iii', playerid, suspectid, crime);
    }

    static PlayAudioStreamForPlayer(playerid: number, url: string, posX: number, posY: number, posZ: number, distance: number, usepos: number): number {
        return samp.callNative('PlayAudioStreamForPlayer', 'isffffi', playerid, url, posX, posY, posZ, distance, usepos);
    }

    static StopAudioStreamForPlayer(playerid: number): number {
        return samp.callNative('StopAudioStreamForPlayer', 'i', playerid);
    }

    static SetPlayerShopName(playerid: number, shopname: string): number {
        return samp.callNative('SetPlayerShopName', 'is', playerid, shopname);
    }

    static SetPlayerSkillLevel(playerid: number, skill: WEAPONSKILL, level: number): number {
        return samp.callNative('SetPlayerSkillLevel', 'iii', playerid, skill, level);
    }

    static GetPlayerSurfingVehicleID(playerid: number): number {
        return samp.callNative('GetPlayerSurfingVehicleID', 'i', playerid);
    }

    static GetPlayerSurfingObjectID(playerid: number): number {
        return samp.callNative('GetPlayerSurfingObjectID', 'i', playerid);
    }

    static RemoveBuildingForPlayer(playerid: number, modelid: number, fX: number, fY: number, fZ: number, fRadius: number): number {
        return samp.callNative('RemoveBuildingForPlayer', 'iiffff', playerid, modelid, fX, fY, fZ, fRadius);
    }

    static GetPlayerLastShotVectors(playerid: number): Array<any> {
        return samp.callNative('GetPlayerLastShotVectors', 'iFFFFFF', playerid);
    }

    static SetPlayerAttachedObject(playerid: number, index: number, modelid: number, bone: number, fOffsetX: number, fOffsetY: number, fOffsetZ: number, fRotX: number, fRotY: number, fRotZ: number, fScaleX: number, fScaleY: number, fScaleZ: number, materialcolor1: number, materialcolor2: number): number {
        return samp.callNative('SetPlayerAttachedObject', 'iiiifffffffffii', playerid, index, modelid, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ, materialcolor1, materialcolor2);
    }

    static RemovePlayerAttachedObject(playerid: number, index: number): number {
        return samp.callNative('RemovePlayerAttachedObject', 'ii', playerid, index);
    }

    static IsPlayerAttachedObjectSlotUsed(playerid: number, index: number): number {
        return samp.callNative('IsPlayerAttachedObjectSlotUsed', 'ii', playerid, index);
    }

    static EditAttachedObject(playerid: number, index: number): number {
        return samp.callNative('EditAttachedObject', 'ii', playerid, index);
    }

    static CreatePlayerTextDraw(playerid: number, x: number, y: number, text: string): number {
        return samp.callNative('CreatePlayerTextDraw', 'iffs', playerid, x, y, text);
    }

    static PlayerTextDrawDestroy(playerid: number, text: number): void {
        samp.callNative('PlayerTextDrawDestroy', 'ii', playerid, text);
    }

    static PlayerTextDrawLetterSize(playerid: number, text: number, x: number, y: number): number {
        return samp.callNative('PlayerTextDrawLetterSize', 'iiff', playerid, text, x, y);
    }

    static PlayerTextDrawTextSize(playerid: number, text: number, x: number, y: number): number {
        return samp.callNative('PlayerTextDrawTextSize', 'iiff', playerid, text, x, y);
    }

    static PlayerTextDrawAlignment(playerid: number, text: number, alignment: TEXTDRAW_ALIGN): number {
        return samp.callNative('PlayerTextDrawAlignment', 'iii', playerid, text, alignment);
    }

    static PlayerTextDrawColor(playerid: number, text: number, color: number): number {
        return samp.callNative('PlayerTextDrawColor', 'iii', playerid, text, color);
    }

    static PlayerTextDrawUseBox(playerid: number, text: number, use: 0 | 1): number {
        return samp.callNative('PlayerTextDrawUseBox', 'iii', playerid, text, use);
    }

    static PlayerTextDrawBoxColor(playerid: number, text: number, color: number): number {
        return samp.callNative('PlayerTextDrawBoxColor', 'iii', playerid, text, color);
    }

    static PlayerTextDrawSetShadow(playerid: number, text: number, size: number): number {
        return samp.callNative('PlayerTextDrawSetShadow', 'iii', playerid, text, size);
    }

    static PlayerTextDrawSetOutline(playerid: number, text: number, size: number): number {
        return samp.callNative('PlayerTextDrawSetOutline', 'iii', playerid, text, size);
    }

    static PlayerTextDrawBackgroundColor(playerid: number, text: number, color: number): number {
        return samp.callNative('PlayerTextDrawBackgroundColor', 'iii', playerid, text, color);
    }

    static PlayerTextDrawFont(playerid: number, text: number, font: number): number {
        return samp.callNative('PlayerTextDrawFont', 'iii', playerid, text, font);
    }

    static PlayerTextDrawSetProportional(playerid: number, text: number, set: number): number {
        return samp.callNative('PlayerTextDrawSetProportional', 'iii', playerid, text, set);
    }

    static PlayerTextDrawSetSelectable(playerid: number, text: number, set: number): number {
        return samp.callNative('PlayerTextDrawSetSelectable', 'iii', playerid, text, set);
    }

    static PlayerTextDrawShow(playerid: number, text: number): number {
        return samp.callNative('PlayerTextDrawShow', 'ii', playerid, text);
    }

    static PlayerTextDrawHide(playerid: number, text: number): number {
        return samp.callNative('PlayerTextDrawHide', 'ii', playerid, text);
    }

    static PlayerTextDrawSetString(playerid: number, text: number, string: string): number {
        return samp.callNative('PlayerTextDrawSetString', 'iis', playerid, text, string);
    }

    static PlayerTextDrawSetPreviewModel(playerid: number, text: number, modelindex: number): number {
        return samp.callNative('PlayerTextDrawSetPreviewModel', 'iii', playerid, text, modelindex);
    }

    static PlayerTextDrawSetPreviewRot(playerid: number, text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number {
        return samp.callNative('PlayerTextDrawSetPreviewRot', 'iiffff', playerid, text, fRotX, fRotY, fRotZ, fZoom);
    }

    static PlayerTextDrawSetPreviewVehCol(playerid: number, text: number, color1: number, color2: number): number {
        return samp.callNative('PlayerTextDrawSetPreviewVehCol', 'iiii', playerid, text, color1, color2);
    }

    static SetPVarInt(playerid: number, varname: string, int_value: number): number {
        return samp.callNative('SetPVarInt', 'isi', playerid, varname, int_value);
    }

    static GetPVarInt(playerid: number, varname: string): number {
        return samp.callNative('GetPVarInt', 'is', playerid, varname);
    }

    static SetPVarString(playerid: number, varname: string, string_value: string): number {
        return samp.callNative('SetPVarString', 'iss', playerid, varname, string_value);
    }

    static GetPVarString(playerid: number, varname: string, len: number): string {
        return samp.callNative('GetPVarString', 'isSi', playerid, varname, len);
    }

    static SetPVarFloat(playerid: number, varname: string, float_value: number): number {
        return samp.callNative('SetPVarFloat', 'isf', playerid, varname, float_value);
    }

    static GetPVarFloat(playerid: number, varname: string): number {
        return samp.callNativeFloat('GetPVarFloat', 'is', playerid, varname);
    }

    static DeletePVar(playerid: number, varname: string): number {
        return samp.callNative('DeletePVar', 'is', playerid, varname);
    }

    static GetPVarsUpperIndex(playerid: number): number {
        return samp.callNative('GetPVarsUpperIndex', 'i', playerid);
    }

    static GetPVarNameAtIndex(playerid: number, index: number, ret_len: number): string {
        return samp.callNative('GetPVarNameAtIndex', 'iiSi', playerid, index, ret_len);
    }

    static GetPVarType(playerid: number, varname: string): number {
        return samp.callNative('GetPVarType', 'is', playerid, varname);
    }

    static SetPlayerChatBubble(playerid: number, text: string, color: number, drawdistance: number, expiretime: number): number {
        return samp.callNative('SetPlayerChatBubble', 'isifi', playerid, text, color, drawdistance, expiretime);
    }

    static PutPlayerInVehicle(playerid: number, vehicleid: number, seatid: number): number {
        return samp.callNative('PutPlayerInVehicle', 'iii', playerid, vehicleid, seatid);
    }

    static GetPlayerVehicleID(playerid: number): number {
        return samp.callNative('GetPlayerVehicleID', 'i', playerid);
    }

    static GetPlayerVehicleSeat(playerid: number): number {
        return samp.callNative('GetPlayerVehicleSeat', 'i', playerid);
    }

    static RemovePlayerFromVehicle(playerid: number): number {
        return samp.callNative('RemovePlayerFromVehicle', 'i', playerid);
    }

    static TogglePlayerControllable(playerid: number, toggle: number): number {
        return samp.callNative('TogglePlayerControllable', 'ii', playerid, toggle);
    }

    static PlayerPlaySound(playerid: number, soundid: number, x: number, y: number, z: number): number {
        return samp.callNative('PlayerPlaySound', 'iifff', playerid, soundid, x, y, z);
    }

    static ApplyAnimation(playerid: number, animlib: string, animname: string, fDelta: number, loop: number, lockx: number, locky: number, freeze: number, time: number, forcesync: number): number {
        return samp.callNative('ApplyAnimation', 'issfiiiiii', playerid, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync);
    }

    static ClearAnimations(playerid: number, forcesync: number): number {
        return samp.callNative('ClearAnimations', 'ii', playerid, forcesync);
    }

    static GetPlayerAnimationIndex(playerid: number): number {
        return samp.callNative('GetPlayerAnimationIndex', 'i', playerid);
    }

    static GetAnimationName(index: number, len1: number, len2: number): Array<any> {
        return samp.callNative('GetAnimationName', 'iSiSi', index, len1, len2);
    }

    static GetPlayerSpecialAction(playerid: number): number {
        return samp.callNative('GetPlayerSpecialAction', 'i', playerid);
    }

    static SetPlayerSpecialAction(playerid: number, actionid: number): number {
        return samp.callNative('SetPlayerSpecialAction', 'ii', playerid, actionid);
    }

    static DisableRemoteVehicleCollisions(playerid: number, disable: number): number {
        return samp.callNative('DisableRemoteVehicleCollisions', 'ii', playerid, disable);
    }

    static SetPlayerCheckpoint(playerid: number, x: number, y: number, z: number, size: number): number {
        return samp.callNative('SetPlayerCheckpoint', 'iffff', playerid, x, y, z, size);
    }

    static DisablePlayerCheckpoint(playerid: number): number {
        return samp.callNative('DisablePlayerCheckpoint', 'i', playerid);
    }

    static SetPlayerRaceCheckpoint(playerid: number, type: number, x: number, y: number, z: number, nextx: number, nexty: number, nextz: number, size: number): number {
        return samp.callNative('SetPlayerRaceCheckpoint', 'iifffffff', playerid, type, x, y, z, nextx, nexty, nextz, size);
    }

    static DisablePlayerRaceCheckpoint(playerid: number): number {
        return samp.callNative('DisablePlayerRaceCheckpoint', 'i', playerid);
    }

    static SetPlayerWorldBounds(playerid: number, x_max: number, x_min: number, y_max: number, y_min: number): number {
        return samp.callNative('SetPlayerWorldBounds', 'iffff', playerid, x_max, x_min, y_max, y_min);
    }

    static SetPlayerMarkerForPlayer(playerid: number, showplayerid: number, color: number): number {
        return samp.callNative('SetPlayerMarkerForPlayer', 'iii', playerid, showplayerid, color);
    }

    static ShowPlayerNameTagForPlayer(playerid: number, showplayerid: number, show: number): number {
        return samp.callNative('ShowPlayerNameTagForPlayer', 'iii', playerid, showplayerid, show);
    }

    static SetPlayerMapIcon(playerid: number, iconid: number, x: number, y: number, z: number, markertype: number, color: number, style: number): number {
        return samp.callNative('SetPlayerMapIcon', 'iifffiii', playerid, iconid, x, y, z, markertype, color, style);
    }

    static RemovePlayerMapIcon(playerid: number, iconid: number): number {
        return samp.callNative('RemovePlayerMapIcon', 'ii', playerid, iconid);
    }

    static AllowPlayerTeleport(playerid: number, allow: number): number {
        return samp.callNative('AllowPlayerTeleport', 'ii', playerid, allow);
    }

    static SetPlayerCameraPos(playerid: number, x: number, y: number, z: number): number {
        return samp.callNative('SetPlayerCameraPos', 'ifff', playerid, x, y, z);
    }

    static SetPlayerCameraLookAt(playerid: number, x: number, y: number, z: number, cut: number): number {
        return samp.callNative('SetPlayerCameraLookAt', 'ifffi', playerid, x, y, z, cut);
    }

    static SetCameraBehindPlayer(playerid: number): number {
        return samp.callNative('SetCameraBehindPlayer', 'i', playerid);
    }

    static GetPlayerCameraPos(playerid: number): Array<any> {
        return samp.callNative('GetPlayerCameraPos', 'iFFF', playerid);
    }

    static GetPlayerCameraFrontVector(playerid: number): Array<any> {
        return samp.callNative('GetPlayerCameraFrontVector', 'iFFF', playerid);
    }

    static GetPlayerCameraMode(playerid: number): number {
        return samp.callNative('GetPlayerCameraMode', 'i', playerid);
    }

    static EnablePlayerCameraTarget(playerid: number, enable: number): number {
        return samp.callNative('EnablePlayerCameraTarget', 'ii', playerid, enable);
    }

    static GetPlayerCameraTargetObject(playerid: number): number {
        return samp.callNative('GetPlayerCameraTargetObject', 'i', playerid);
    }

    static GetPlayerCameraTargetVehicle(playerid: number): number {
        return samp.callNative('GetPlayerCameraTargetVehicle', 'i', playerid);
    }

    static GetPlayerCameraTargetPlayer(playerid: number): number {
        return samp.callNative('GetPlayerCameraTargetPlayer', 'i', playerid);
    }

    static GetPlayerCameraTargetActor(playerid: number): number {
        return samp.callNative('GetPlayerCameraTargetActor', 'i', playerid);
    }

    static GetPlayerCameraAspectRatio(playerid: number): number {
        return samp.callNativeFloat('GetPlayerCameraAspectRatio', 'i', playerid);
    }

    static GetPlayerCameraZoom(playerid: number): number {
        return samp.callNativeFloat('GetPlayerCameraZoom', 'i', playerid);
    }

    static AttachCameraToObject(playerid: number, objectid: number): number {
        return samp.callNative('AttachCameraToObject', 'ii', playerid, objectid);
    }

    static AttachCameraToPlayerObject(playerid: number, playerobjectid: number): number {
        return samp.callNative('AttachCameraToPlayerObject', 'ii', playerid, playerobjectid);
    }

    static InterpolateCameraPos(playerid: number, FromX: number, FromY: number, FromZ: number, ToX: number, ToY: number, ToZ: number, time: number, cut: number): number {
        return samp.callNative('InterpolateCameraPos', 'iffffffii', playerid, FromX, FromY, FromZ, ToX, ToY, ToZ, time, cut);
    }

    static InterpolateCameraLookAt(playerid: number, FromX: number, FromY: number, FromZ: number, ToX: number, ToY: number, ToZ: number, time: number, cut: number): number {
        return samp.callNative('InterpolateCameraLookAt', 'iffffffii', playerid, FromX, FromY, FromZ, ToX, ToY, ToZ, time, cut);
    }

    static IsPlayerConnected(playerid: number): number {
        return samp.callNative('IsPlayerConnected', 'i', playerid);
    }

    static IsPlayerInVehicle(playerid: number, vehicleid: number): number {
        return samp.callNative('IsPlayerInVehicle', 'ii', playerid, vehicleid);
    }

    static IsPlayerInAnyVehicle(playerid: number): number {
        return samp.callNative('IsPlayerInAnyVehicle', 'i', playerid);
    }

    static IsPlayerInCheckpoint(playerid: number): number {
        return samp.callNative('IsPlayerInCheckpoint', 'i', playerid);
    }

    static IsPlayerInRaceCheckpoint(playerid: number): number {
        return samp.callNative('IsPlayerInRaceCheckpoint', 'i', playerid);
    }

    static SetPlayerVirtualWorld(playerid: number, worldid: number): number {
        return samp.callNative('SetPlayerVirtualWorld', 'ii', playerid, worldid);
    }

    static GetPlayerVirtualWorld(playerid: number): number {
        return samp.callNative('GetPlayerVirtualWorld', 'i', playerid);
    }

    static EnableStuntBonusForPlayer(playerid: number, enable: number): number {
        return samp.callNative('EnableStuntBonusForPlayer', 'ii', playerid, enable);
    }

    static EnableStuntBonusForAll(enable: number): number {
        return samp.callNative('EnableStuntBonusForAll', 'i', enable);
    }

    static TogglePlayerSpectating(playerid: number, toggle: number): number {
        return samp.callNative('TogglePlayerSpectating', 'ii', playerid, toggle);
    }

    static PlayerSpectatePlayer(playerid: number, targetplayerid: number, mode: number): number {
        return samp.callNative('PlayerSpectatePlayer', 'iii', playerid, targetplayerid, mode);
    }

    static PlayerSpectateVehicle(playerid: number, targetvehicleid: number, mode: number): number {
        return samp.callNative('PlayerSpectateVehicle', 'iii', playerid, targetvehicleid, mode);
    }

    static StartRecordingPlayerData(playerid: number, recordtype: number, recordname: string): number {
        return samp.callNative('StartRecordingPlayerData', 'iis', playerid, recordtype, recordname);
    }

    static StopRecordingPlayerData(playerid: number): number {
        return samp.callNative('StopRecordingPlayerData', 'i', playerid);
    }

    static SelectTextDraw(playerid: number, hovercolor: number): number {
        return samp.callNative('SelectTextDraw', 'ii', playerid, hovercolor);
    }

    static CancelSelectTextDraw(playerid: number): number {
        return samp.callNative('CancelSelectTextDraw', 'i', playerid);
    }

    static CreateExplosionForPlayer(playerid: number, X: number, Y: number, Z: number, type: number, Radius: number): number {
        return samp.callNative('CreateExplosionForPlayer', 'ifffif', playerid, X, Y, Z, type, Radius);
    }

    static SendClientCheck(playerid: number, type: number, memAddr: number, memOffset: number, byteCount: number): number {
        return samp.callNative('SendClientCheck', 'iiiii', playerid, type, memAddr, memOffset, byteCount);
    }

    static db_open(name: string): number {
        return samp.callNative('db_open', 's', name);
    }

    static db_close(db: number): number {
        return samp.callNative('db_close', 'i', db);
    }

    static db_query(db: number, query: string): number {
        return samp.callNative('db_query', 'is', db, query);
    }

    static db_free_result(dbresult: number): number {
        return samp.callNative('db_free_result', 'i', dbresult);
    }

    static db_num_rows(dbresult: number): number {
        return samp.callNative('db_num_rows', 'i', dbresult);
    }

    static db_next_row(dbresult: number): number {
        return samp.callNative('db_next_row', 'i', dbresult);
    }

    static db_num_fields(dbresult: number): number {
        return samp.callNative('db_num_fields', 'i', dbresult);
    }

    static db_field_name(dbresult: number, field: number, maxlength: number): string {
        return samp.callNative('db_field_name', 'iiSi', dbresult, field, maxlength);
    }

    static db_get_field(dbresult: number, field: number, maxlength: number): string {
        return samp.callNative('db_get_field', 'iiSi', dbresult, field, maxlength);
    }

    static db_get_field_int(result: number, field: number): number {
        return samp.callNative('db_get_field_int', 'ii', result, field);
    }

    static db_get_field_float(result: number, field: number): number {
        return samp.callNativeFloat('db_get_field_float', 'ii', result, field);
    }

    static db_get_field_assoc(dbresult: number, field: string, maxlength: number): string {
        return samp.callNative('db_get_field_assoc', 'isSi', dbresult, field, maxlength);
    }

    static db_get_field_assoc_int(result: number, field: string): number {
        return samp.callNative('db_get_field_assoc_int', 'is', result, field);
    }

    static db_get_field_assoc_float(result: number, field: string): number {
        return samp.callNativeFloat('db_get_field_assoc_float', 'is', result, field);
    }

    static db_get_mem_handle(db: number): number {
        return samp.callNative('db_get_mem_handle', 'i', db);
    }

    static db_get_result_mem_handle(result: number): number {
        return samp.callNative('db_get_result_mem_handle', 'i', result);
    }

    static db_debug_openfiles(): number {
        return samp.callNative('db_debug_openfiles', '',);
    }

    static db_debug_openresults(): number {
        return samp.callNative('db_debug_openresults', '',);
    }

    static CreateVehicle(vehicletype: number, x: number, y: number, z: number, rotation: number, color1: number, color2: number, respawn_delay: number, addsiren: number): number {
        return samp.callNative('CreateVehicle', 'iffffiiii', vehicletype, x, y, z, rotation, color1, color2, respawn_delay, addsiren);
    }

    static DestroyVehicle(vehicleid: number): number {
        return samp.callNative('DestroyVehicle', 'i', vehicleid);
    }

    static IsVehicleStreamedIn(vehicleid: number, forplayerid: number): number {
        return samp.callNative('IsVehicleStreamedIn', 'ii', vehicleid, forplayerid);
    }

    static GetVehiclePos(vehicleid: number) {
        const values = samp.callNative('GetVehiclePos', 'iFFF', vehicleid);
        if (values.length < 3) {
            throw "VehicleID " + vehicleid + " not found";
        }
        return {
            x: values[0],
            y: values[1],
            z: values[2]
        }
    }

    static SetVehiclePos(vehicleid: number, x: number, y: number, z: number): number {
        return samp.callNative('SetVehiclePos', 'ifff', vehicleid, x, y, z);
    }

    static GetVehicleZAngle(vehicleid: number): number {
        return samp.callNative('GetVehicleZAngle', 'iF', vehicleid);
    }

    static GetVehicleRotationQuat(vehicleid: number): Array<any> {
        return samp.callNative('GetVehicleRotationQuat', 'iFFFF', vehicleid);
    }

    static GetVehicleDistanceFromPoint(vehicleid: number, X: number, Y: number, Z: number): number {
        return samp.callNativeFloat('GetVehicleDistanceFromPoint', 'ifff', vehicleid, X, Y, Z);
    }

    static SetVehicleZAngle(vehicleid: number, z_angle: number): number {
        return samp.callNative('SetVehicleZAngle', 'if', vehicleid, z_angle);
    }

    static SetVehicleParamsForPlayer(vehicleid: number, playerid: number, objective: number, doorslocked: number): number {
        return samp.callNative('SetVehicleParamsForPlayer', 'iiii', vehicleid, playerid, objective, doorslocked);
    }

    static ManualVehicleEngineAndLights(): number {
        return samp.callNative('ManualVehicleEngineAndLights', '',);
    }

    static SetVehicleParamsEx(vehicleid: number, engine: number, lights: number, alarm: number, doors: number, bonnet: number, boot: number, objective: number): number {
        return samp.callNative('SetVehicleParamsEx', 'iiiiiiii', vehicleid, engine, lights, alarm, doors, bonnet, boot, objective);
    }

    static GetVehicleParamsEx(vehicleid: number): Array<any> {
        return samp.callNative('GetVehicleParamsEx', 'iIIIIIII', vehicleid);
    }

    static GetVehicleParamsSirenState(vehicleid: number): number {
        return samp.callNative('GetVehicleParamsSirenState', 'i', vehicleid);
    }

    static SetVehicleParamsCarDoors(vehicleid: number, driver: number, passenger: number, backleft: number, backright: number): number {
        return samp.callNative('SetVehicleParamsCarDoors', 'iiiii', vehicleid, driver, passenger, backleft, backright);
    }

    static GetVehicleParamsCarDoors(vehicleid: number): {
        driver: -1 | 0 | 1,
        passenger: -1 | 0 | 1,
        backleft: -1 | 0 | 1,
        backright: -1 | 0 | 1
    } {
        const values = samp.callNative('GetVehicleParamsCarDoors', 'iIIII', vehicleid);
        return {
            driver: values[0],
            passenger: values[1],
            backleft: values[2],
            backright: values[3]
        }
    }

    static SetVehicleParamsCarWindows(vehicleid: number, driver: number, passenger: number, backleft: number, backright: number): number {
        return samp.callNative('SetVehicleParamsCarWindows', 'iiiii', vehicleid, driver, passenger, backleft, backright);
    }

    static GetVehicleParamsCarWindows(vehicleid: number): {
        driver: -1 | 0 | 1,
        passenger: -1 | 0 | 1,
        backleft: -1 | 0 | 1,
        backright: -1 | 0 | 1
    } {
        const values = samp.callNative('GetVehicleParamsCarWindows', 'iIIII', vehicleid);
        return {
            driver: values[0],
            passenger: values[1],
            backleft: values[2],
            backright: values[3]
        }
    }

    static SetVehicleToRespawn(vehicleid: number): number {
        return samp.callNative('SetVehicleToRespawn', 'i', vehicleid);
    }

    static LinkVehicleToInterior(vehicleid: number, interiorid: number): number {
        return samp.callNative('LinkVehicleToInterior', 'ii', vehicleid, interiorid);
    }

    static AddVehicleComponent(vehicleid: number, componentid: number): number {
        return samp.callNative('AddVehicleComponent', 'ii', vehicleid, componentid);
    }

    static RemoveVehicleComponent(vehicleid: number, componentid: number): number {
        return samp.callNative('RemoveVehicleComponent', 'ii', vehicleid, componentid);
    }

    static ChangeVehicleColor(vehicleid: number, color1: number, color2: number): number {
        return samp.callNative('ChangeVehicleColor', 'iii', vehicleid, color1, color2);
    }

    static ChangeVehiclePaintjob(vehicleid: number, paintjobid: number): number {
        return samp.callNative('ChangeVehiclePaintjob', 'ii', vehicleid, paintjobid);
    }

    static SetVehicleHealth(vehicleid: number, health: number): number {
        return samp.callNative('SetVehicleHealth', 'if', vehicleid, health);
    }

    static GetVehicleHealth(vehicleid: number): number {
        return samp.callNative('GetVehicleHealth', 'iF', vehicleid);
    }

    static AttachTrailerToVehicle(trailerid: number, vehicleid: number): number {
        return samp.callNative('AttachTrailerToVehicle', 'ii', trailerid, vehicleid);
    }

    static DetachTrailerFromVehicle(vehicleid: number): number {
        return samp.callNative('DetachTrailerFromVehicle', 'i', vehicleid);
    }

    static IsTrailerAttachedToVehicle(vehicleid: number): number {
        return samp.callNative('IsTrailerAttachedToVehicle', 'i', vehicleid);
    }

    static GetVehicleTrailer(vehicleid: number): number {
        return samp.callNative('GetVehicleTrailer', 'i', vehicleid);
    }

    static SetVehicleNumberPlate(vehicleid: number, numberplate: string): number {
        return samp.callNative('SetVehicleNumberPlate', 'is', vehicleid, numberplate);
    }

    static GetVehicleModel(vehicleid: number): number {
        return samp.callNative('GetVehicleModel', 'i', vehicleid);
    }

    static GetVehicleComponentInSlot(vehicleid: number, slot: CARMODTYPE): number {
        return samp.callNative('GetVehicleComponentInSlot', 'ii', vehicleid, slot);
    }

    static GetVehicleComponentType(component: number): CARMODTYPE | -1 {
        return samp.callNative('GetVehicleComponentType', 'i', component);
    }

    static RepairVehicle(vehicleid: number): number {
        return samp.callNative('RepairVehicle', 'i', vehicleid);
    }

    static GetVehicleVelocity(vehicleid: number): Array<any> {
        return samp.callNative('GetVehicleVelocity', 'iFFF', vehicleid);
    }

    static SetVehicleVelocity(vehicleid: number, X: number, Y: number, Z: number): number {
        return samp.callNative('SetVehicleVelocity', 'ifff', vehicleid, X, Y, Z);
    }

    static SetVehicleAngularVelocity(vehicleid: number, X: number, Y: number, Z: number): number {
        return samp.callNative('SetVehicleAngularVelocity', 'ifff', vehicleid, X, Y, Z);
    }

    static GetVehicleDamageStatus(vehicleid: number) {
        const values = samp.callNative('GetVehicleDamageStatus', 'iIIII', vehicleid);
        if (values.length < 4) {
            throw "VehicleID " + vehicleid + " not found";
        }
        return {
            panels: values[0],
            doors: values[1],
            lights: values[2],
            tires: values[3]
        }
    }

    static UpdateVehicleDamageStatus(vehicleid: number, panels: number, doors: number, lights: number, tires: number): number {
        return samp.callNative('UpdateVehicleDamageStatus', 'iiiii', vehicleid, panels, doors, lights, tires);
    }

    static GetVehicleModelInfo(vehiclemodel: number, infotype: VEHICLE_MODEL_INFO) {
        const values = samp.callNative('GetVehicleModelInfo', 'iiFFF', vehiclemodel, infotype);
        if (values.length < 3) {
            throw "ModelID " + vehiclemodel + " not found";
        }
        return {
            x: values[0],
            y: values[1],
            z: values[2]
        }
    }

    static SetVehicleVirtualWorld(vehicleid: number, worldid: number): number {
        return samp.callNative('SetVehicleVirtualWorld', 'ii', vehicleid, worldid);
    }

    static GetVehicleVirtualWorld(vehicleid: number): number {
        return samp.callNative('GetVehicleVirtualWorld', 'i', vehicleid);
    }

    static IsValidVehicle(vehicleid: number): number {
        return samp.callNative('IsValidVehicle', 'i', vehicleid);
    }
}