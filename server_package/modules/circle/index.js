const { CreatePickup, DestroyPickup, CreateVehicle, DestroyVehicle, getPlayers, SetPlayerPos, SetPlayerFacingAngle } = require("samp-node-lib");
const Player = require("../player");

const WeaponsModels = [-1, 331, 333, 334, 335, 336, 337, 338, 339, 341, 321, 322, 323,	324, 325, 326, 342, 343, 344, -1, -1, -1, 346, 347, 348, 349, 350, 351, 352, 353, 355, 356, 372, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 371];

module.exports = {
	DropWeaponsData: [],
    DropWeapons: function(player) { /* position: Array<number>, weapons: Array<number> */
		this.DeleteWeaponsPickupsFromPlayerId(player.playerid);
        let weapons = [];
		for(let i = 0; i <= 12; i++) {
			let data = player.GetPlayerWeaponData(i);
			if(data) if(data[0]) weapons.push(data);
		}

		const WEAPON_DROP_RADIUS = weapons.length * 0.4;
        const PI = 3.14159265354;
        let dots = weapons.length;
        let radianAngle, interval = (PI * 2) / dots;
		const position = player.GetPlayerPos();

        for(let i = 0, j = dots; i < weapons.length; ++ i) {
            radianAngle = interval * (j --);

			let tempX = position[0] + WEAPON_DROP_RADIUS * Math.cos(radianAngle);
			let tempY = position[1] + WEAPON_DROP_RADIUS * Math.sin(radianAngle);

			this.DropWeaponsData.push({
				owner: player.playerid,
				pickup: CreatePickup(WeaponsModels[weapons[i][0]], 1, tempX, tempY, position[2]),
				weaponId: weapons[i][0],
				weaponAmmo: weapons[i][1]
			});
        }
    },
	DeleteWeaponsPickupsFromPlayerId: function(playerid) {
		this.DropWeaponsData.filter(f => f.owner == playerid).forEach((i, index) => {
			DestroyPickup(i.pickup);
			this.DropWeaponsData.splice(index, 1);
		});
	},
	WeaponPickup(player, pickupid) {
		let index = this.DropWeaponsData.findIndex(f => f.pickup == pickupid);
		if(index != -1) {
			DestroyPickup(this.DropWeaponsData[index].pickup);
			player.GivePlayerWeapon(this.DropWeaponsData[index].weaponId, this.DropWeaponsData[index].weaponAmmo);
			this.DropWeaponsData.splice(index, 1);
		}
	},
	CreateCarsData: [],
	CreateCars: function(player, vehicles) { /* vehicles: Array<number> */
		const VEHICLES_RADIUS = vehicles.length * 1.5;
        let dots = vehicles.length;
        let radianAngle, interval = (Math.PI * 2) / dots;
		const position = player.GetPlayerPos();

        for(let i = 0, j = dots; i < vehicles.length; ++ i) {
            radianAngle = interval * (j --);

			let tempX = position[0] + VEHICLES_RADIUS * Math.cos(radianAngle);
			let tempY = position[1] + VEHICLES_RADIUS * Math.sin(radianAngle);
			
			let deltaX = tempX - position[0];
			let deltaY = tempY - position[1];
			let rad = Math.atan2(deltaY, deltaX);
			let deg = rad * (180 / Math.PI) + 90;

			this.CreateCarsData.push({
				owner: player.playerid,
				vehicle: CreateVehicle(vehicles[i], tempX, tempY, position[2], deg)
			});
        }
	},
	DeleteCreateCarsFromPlayerId: function(owner) {
		this.CreateCarsData.filter(f => f.owner == owner).forEach((i, index) => {
			DestroyVehicle(i.vehicle);
			this.CreateCarsData.splice(index, 1);
		});
	},
	GetAll: function(player) {
		let result = getPlayers().filter(f => Player.Info[f.playerid].LoggedIn && f.playerid != player.playerid);

		const VEHICLES_RADIUS = result.length * 1;
		let dots = result.length;
		let radianAngle, interval = (Math.PI * 2) / dots;
		const position = player.GetPlayerPos();

		for(let i = 0, j = dots; i < result.length; ++ i) {
			j = dots;
            radianAngle = interval * (j --);

			let tempX = position[0] + VEHICLES_RADIUS * Math.cos(radianAngle);
			let tempY = position[1] + VEHICLES_RADIUS * Math.sin(radianAngle);
			
			let deltaX = tempX - position[0];
			let deltaY = tempY - position[1];
			let rad = Math.atan2(deltaY, deltaX);
			let deg = rad * (180 / Math.PI) + 90;

			SetPlayerPos(result[i].playerid, tempX, tempY, position[2]);
			SetPlayerFacingAngle(result[i].playerid, deg);
        }
	}
}