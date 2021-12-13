const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        interaction.reply("Pong!");
    }
}