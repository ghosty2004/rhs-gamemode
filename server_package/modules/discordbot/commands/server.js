const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { getPlayers, GetServerTickRate } = require("samp-node-lib");

const Clan = require("../../clan");
const Gang = require("../../gang");
const Server = require("../../server");

const { timestampToHMS, getTotalUsersCount } = require("../../functions");

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
        const OnlineTime = timestampToHMS(Server.Info.StartTime);
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.addField("Gangs:", `${Gang.Get().length}`);
        embed.addField("Clans:", `${Clan.Get().length}`);
        embed.addField("Online players:", `${getPlayers().length}`);
        embed.addField("Total users:", `${await getTotalUsersCount()}`);
        embed.addField("Server ticks:", `${GetServerTickRate()}`);
        embed.addField("Server uptime:", `${OnlineTime.hours} hrs, ${OnlineTime.minutes} mins and ${OnlineTime.seconds} secs`);
        interaction.reply({embeds: [embed]});
    }
}