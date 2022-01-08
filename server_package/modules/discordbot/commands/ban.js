const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const { NOT_ENOUGH_ADMIN, PLAYER_NOT_CONNECTED } = require("../../errors");

const Function = require("../../functions");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();

    slashCommand.setName("ban");
    slashCommand.setDescription("Ban a player");

    slashCommand.addStringOption(option => 
        option.setName("target").setDescription("Target ID or Name").setRequired(true)
    );

    slashCommand.addStringOption(option => 
        option.setName("days").setDescription("The days").setRequired(true)
    );

    slashCommand.addStringOption(option => 
        option.setName("reason").setDescription("The reason").setRequired(true)
    );

    return slashCommand;
}

module.exports = {
    data: getSlashCommand(),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let accId = await Function.discordUserData.loginSessionId(interaction.user);
        if(!accId) return interaction.reply("You need to have a login session. Use /login !");
        if(await Function.discordUserData.adminLevel(interaction.user) < 3) return interaction.reply(NOT_ENOUGH_ADMIN);
        let target = Function.getPlayer(interaction.options.get("target").value);
        if(!target) return interaction.reply(PLAYER_NOT_CONNECTED);
        let days = parseInt(interaction.options.get("days").value);
        if(days < 1 || days > 99) return interaction.reply("Invalid day(s) (1-99) !");
        let reason = interaction.options.get("reason").value;
        if(!reason) return interaction.reply("You need to provide a reason !");
        Function.banTargetByAdmin({name: interaction.user.tag, accId: accId}, target, days, reason);
        interaction.reply(`You have succesfully banned **${target.GetPlayerName(24)} [${target.playerid}]**.\nDays: **${days}** | Reason: **${reason}**.`);
    }
}