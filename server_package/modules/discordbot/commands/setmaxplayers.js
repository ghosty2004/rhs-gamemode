const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const { NOT_ENOUGH_ADMIN } = require("../../errors");
const { SetMaxPlayers } = require("../../../libs/ysf");

const Function = require("../../functions");

module.exports = {
    data: new SlashCommandBuilder().setName("setmaxplayers").setDescription("Set server max players").addStringOption(option => option.setName("maxplayers").setDescription("The maximum players who can join").setRequired(true)),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let accId = await Function.discordUserData.loginSessionId(interaction.user);
        if(!accId) return interaction.reply("You need to have a login session. Use /login !");
        if(await Function.discordUserData.columnValue(interaction.user, "rcontype") < 2) return interaction.reply(NOT_ENOUGH_ADMIN.ENG);
        let maxplayers = parseInt(interaction.options.get("maxplayers").value);
        if(maxplayers < 1 || maxplayers > 1000) return interaction.reply("Invalid maxplayers value (1-1000) !");
        SetMaxPlayers(maxplayers);
        interaction.reply(`You have successfully seted server max players to: **${maxplayers}**.`);
    }
}