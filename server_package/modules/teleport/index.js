module.exports = {
    /**
     * @type {[{id: Number, command: String, type: "stunts"|"jumps"|"drifts"|"challanges"|"partys"|"splaces"|"others"|"custom", name: String, position: Number[]}]}
     */
    Info: [],
    /**
     * @param {Number} id 
     * @param {"stunts"|"jumps"|"drifts"|"challanges"|"partys"|"splaces"|"others"|"custom"} type 
     * @param {String} command 
     * @param {String} name 
     * @param {Number[]} position 
     */
    Create(id, type, command, name, position) {
        if(this.Info.some(s => s.id == id)) return;
        this.Info.push({
            id: id,
            command: command,
            type: type,
            name: name,
            position: position
        });
    },
    /**
     * @param {String} commandname 
     */
    Delete(commandname) {
        let index = this.Info.findIndex(f => f.command == commandname);
        if(index == -1) return;
        this.Info.splice(index, 1);
    }
}