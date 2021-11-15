export declare function CreateDynamicPickup(modelid: number, type: number, x: number, y: number, z: number, worldid: number, interiorid: number, playerid: number, streamdistance: number, areaid: number, priority: number): number;
export declare function DestroyDynamicPickup(pickupid: number): void;
export declare function IsValidDynamicPickup(pickupid: number): boolean;
export declare function CreateDynamic3DTextLabel(text: string, color: number, x: number, y: number, z: number, drawdistance: number): number;
export declare function IsValidDynamic3DTextLabel(id: number): boolean;
export declare function UpdateDynamic3DTextLabelText(id: number, color: number, text: string): void;
export declare function Update(playerid: number): void;
export declare function UpdateAll(): void;