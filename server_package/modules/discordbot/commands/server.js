const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { getPlayers, GetServerTickRate } = require("samp-node-lib");

const Gang = require("../../gang");
const Clan = require("../../clan");

const { getTotalUsersCount } = require("../../functions");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
    slashCommand.setName("server");
    slashCommand.setDescription("About server");
    return slashCommand;
}

module.exports = {
    data: getSlashCommand(),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.addField("Gangs:", `${Gang.Get().length}`);
        embed.addField("Clans:", `${Clan.Get().length}`);
        embed.addField("Online players:", `${getPlayers().length}`);
        embed.addField("Total users:", `${await getTotalUsersCount()}`);
        embed.addField("Server ticks:", `${GetServerTickRate()}`);
        interaction.reply({embeds: [embed]});
    }
}