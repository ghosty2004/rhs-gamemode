const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const { NOT_ENOUGH_ADMIN } = require("../../errors");

const Function = require("../../functions");

module.exports = {
    data: new SlashCommandBuilder().setName("saveall").setDescription("Save all data from server"),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let accId = await Function.discordUserData.loginSessionId(interaction.user);
        if(!accId) return interaction.reply("You need to have a login session. Use /login !");
        if(await Function.discordUserData.columnValue(interaction.user, "rcontype") < 1) return interaction.reply(NOT_ENOUGH_ADMIN);
        Function.saveAll();
        interaction.reply("You have successfull saved all server data.")
    }
}