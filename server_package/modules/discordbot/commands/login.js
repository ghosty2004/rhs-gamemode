const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const Errors = require("../../errors");
const { getPlayer } = require("../../functions");
const Player = require("../../player");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
    const stringOptions = new SlashCommandStringOption();

    slashCommand.setName("login");
    slashCommand.setDescription("Create a login session to server");

    stringOptions.setName("id");
    stringOptions.setDescription("Your playerid from server");
    stringOptions.setRequired(true);

    slashCommand.addStringOption(stringOptions)
    return slashCommand;
}

module.exports = {
    data: getSlashCommand(),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let target = getPlayer(interaction.options.get("id").value);
        if(!target) return interaction.reply(Errors.PLAYER_NOT_CONNECTED);
        if(!Player.Info[target.playerid].LoggedIn) return interaction.reply(Errors.PLAYER_NOT_LOGGED);
        if(Player.Info[target.playerid].Discord != "0") return interaction.reply("This player already logged in to a discord account. Use /discordsignout for logout.");
        interaction.reply(`Login request have been sent to **${target.GetPlayerName(24)}(${target.playerid})**!`);
        target.SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}${interaction.member.user.tag} {5865F2}has sent a login request. Use {FFFFFF}/acceptlogin {5865F2}or {FFFFFF}/declinelogin {5865F2}for response!`);
        Player.Info[target.playerid].DiscordLoginRequest.From = interaction.member.user.id;
    }
}