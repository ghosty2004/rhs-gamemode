const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { getPlayers } = require("samp-node-lib");

const con = require("../../mysql");
const Gang = require("../../gang");
const Clan = require("../../clan");

const slashCommand = new SlashCommandBuilder();
slashCommand.setName("server");
slashCommand.setDescription("About server");

module.exports = {
    data: slashCommand,
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.addField("Gangs:", `${Gang.Get().length}`);
        embed.addField("Clans:", `${Clan.Get().length}`);
        embed.addField("Online Players:", `${getPlayers().length}`);
        embed.addField("Total users:", `${await new Promise((resolve, reject) => { con.query("SELECT COUNT(*) AS count FROM users", function(err, result) { resolve(result[0].count); }); })}`);
        interaction.reply({embeds: [embed]});
    }
}