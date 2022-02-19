const { SampPlayer, CreateObject, DestroyObject, MoveObject, CreateExplosion } = require("../../samp-node-lib");
const { getRandomInt } = require("../functions");

module.exports = {
    /**
     * @type {Number}
     */
    Count: 0,
    /**
     * @type {[{count: Number, radius: Number, height: Number, owner: SampPlayer, amount: Number, position: {x: Number, y: Number, z: Number, angle: Number}, box: Number, timer: NodeJS.Timer}]}
     */
    List: [],
    /**
     * @param {Number} object 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} radius 
     */
    Sphere: function(objectid, x, y, z, radius) {
        DestroyObject(objectid);
        let types = [19281, 19291, 19298, 19297, 19296, 19295, 19294, 19293, 19292, 19290, 19282, 19289, 19288, 19287, 19286, 19285, 19284, 19283];
        let phi = 0, theta = 0;
        let aX = 0, aY = 0, aZ = 0;
        CreateExplosion(x, y, z, 12, 10);
        for(let i = 0; i < 26; i++) {
            aX = x + (radius * Math.sin(-phi) * Math.cos(-theta));
            aY = y + (radius * Math.sin(-phi) * Math.sin(-theta));
            aZ = z + (radius * Math.cos(-phi));
            let object = CreateObject(types[getRandomInt(0, types.length)], x, y, z, 0.0, 0.0, theta + 45);
            let time = MoveObject(object, aX, aY, aZ, 5.0);
            setTimeout(() => {
                DestroyObject(object);
            }, time);
            theta += 45.0; 
            if(theta == 360.0) {
                aX = 0.0, aY = 0.0, aZ = 0.0;
            }
            if((1+i)%8 == 1) phi += 45;
        }
    },
    /**
     * @param {Number} index 
     */
    Launch: function(count, first_time = false) {
        let index = this.List.findIndex(f => f.count == count);
        if(index != -1) {
            if(first_time == true) {
                this.List[index].timer = setInterval(() => {
                    this.Launch(count);
                }, 500);
            }

            this.List[index].amount--;
            if(!this.List[index].amount) {
                DestroyObject(this.List[index].box);
                clearInterval(this.List[index].timer);
                this.List.splice(index, 1);
            }
            else {
                let aX = this.List[index].position.x + (0 * Math.sin(-this.List[index].position.angle));
                let aY = this.List[index].position.y + (0 * Math.cos(-this.List[index].position.angle));
                let aZ = this.List[index].position.z + this.List[index].height;
                let object = CreateObject(354, this.List[index].position.x, this.List[index].position.y, this.List[index].position.z, 0, 0, 0);
                let time = MoveObject(object, aX, aY, aZ, 20);
                let radius = this.List[index].radius;

                setTimeout(() => {
                    this.Sphere(object, aX, aY, aZ, radius);
                }, time);
            }
        }
    },
    /** 
     * @param {SampPlayer} player 
     */
    Plant: function(player, count) {
        const RADIUS = count * 1.5;
        let dots = count;
        let radianAngle, interval = (Math.PI * 2) / dots;

        for(let i = 0, j = dots; i < count; ++ i) {
            radianAngle = interval * (j --);

			let tempX = player.position.x + RADIUS * Math.cos(radianAngle);
			let tempY = player.position.y + RADIUS * Math.sin(radianAngle);

            this.Count += 1;
            let temp_count = this.Count;

            let position = {
                x: tempX + (2.0 * Math.sin(-player.position.angle)),
                y: tempY + (2.0 * Math.cos(-player.position.angle)),
                z: player.position.z - 0.9,
                angle: player.position.angle
            };

            this.List.push({
                count: temp_count,
                radius: 10,
                height: 30,
                owner: player,
                amount: 30,
                position: position,
                box: CreateObject(2043, position.x, position.y, position.z, 0, 0, 0),
                timer: null
            });

            setTimeout(() => {
                this.Launch(temp_count, true);
            }, 5000);
        }
        
        player.GameTextForPlayer("~G~~H~~H~Fire works planted!~N~~Y~~H~The launch will start~N~~Y~~H~in~R~~H~ 5~Y~~H~ seconds!", 4000, 3);
    }
}