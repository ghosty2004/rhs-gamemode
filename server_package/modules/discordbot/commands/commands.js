const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const { bot } = require("../");

module.exports = {
    data: new SlashCommandBuilder().setName("commands").setDescription("Show server commands"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        bot.emit("showCommands", interaction);
    }
}