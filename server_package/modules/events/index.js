const {EventEmitter} = require("events");

class Command {
    constructor() {
        return new EventEmitter();
    }
}

class DiscordCommand {
    constructor() {
        return new EventEmitter();
    }
}

module.exports = { Command, DiscordCommand }