const {EventEmitter} = require("events");

class Command {
    constructor() {
        return new EventEmitter();
    }
}

module.exports = {Command}