const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");

const Clan = require("../../clan");

const { getNameByAccID } = require("../../functions");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
    const stringOptions = new SlashCommandStringOption();

    slashCommand.setName("claninfo");
    slashCommand.setDescription("Show a clan info"); 

    stringOptions.setName("clan");
    stringOptions.setDescription("Select a clan");
    stringOptions.setRequired(true);

    Clan.Get().sort(function(a, b){return b.kills-a.kills}).splice(0, 25).forEach((value) => {
        stringOptions.addChoice(`${value.name}`, `${value.id}`);
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
        let clan = interaction.options.get("clan").value;
        let result = Clan.Get().find(f => f.id == clan);
        if(result) {
            const embed = new MessageEmbed();
            embed.setColor("RANDOM");
            embed.setTitle(`Clan ${result.name}'s INFO:`, true);
            embed.addField("ID:", `${result.id}`, true);
            embed.addField("Name:", `${result.name}`, true);
            embed.addField("Owner:", `${await getNameByAccID(result.owner)}`, true);
            embed.addField("Skin", `(${result.skin.leader} / ${result.skin.member})`, true);
            embed.addField("Kills:", `${result.kills}`, true);
            embed.addField("Deaths:", `${result.deaths}`, true);
            interaction.reply({embeds: [embed]});
        }
        else interaction.reply(`This clan not exists.`);
    }
};