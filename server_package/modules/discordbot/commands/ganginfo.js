const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { getGangFounders } = require("../../functions");

const Gang = require("../../gang");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
    const stringOptions = new SlashCommandStringOption();

    slashCommand.setName("ganginfo");
    slashCommand.setDescription("Show a gang info"); 

    stringOptions.setName("gang");
    stringOptions.setDescription("Select a gang");
    stringOptions.setRequired(true);

    Gang.Info.slice(0, 25).forEach((i) => {
        stringOptions.addChoice(`${i.name}`, `${i.id}`);
    });

    slashCommand.addStringOption(stringOptions);

    return slashCommand;
}

module.exports = {
    data: getSlashCommand(),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let gang = interaction.options.get("gang").value;
        let result = Gang.Info.find(f => f.id == gang);
        if(!result) return interaction.reply(`This gang not exists.`);
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setTitle(`Gang ${result.name}'s INFO:`, true);
        embed.addField("ID:", `${result.id}`, true);
        embed.addField("Name:", `${result.name}`, true);
        embed.addField("Points:", `${result.points}`, true);
        embed.addField("Captures:", `${result.captures}`, true);
        embed.addField("Kills:", `${result.kills}`, true);
        embed.addField("Deaths:", `${result.deaths}`, true);
        embed.addField("Founders:", `${await getGangFounders(result.id)}`);
        interaction.reply({embeds: [embed]});
    }
};