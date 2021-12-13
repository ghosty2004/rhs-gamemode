const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");

const Gang = require("../../gang");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
    slashCommand.setName("turfs");
    slashCommand.setDescription("Show turfs");
    return slashCommand;
}

module.exports = {
    data: getSlashCommand(),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let value = {}, count = 0; 
        for(let i = 1; i < 4; i++) if(!value[i]) value[i] = "";
        Gang.Get().forEach((i) => {
            count++;
            value[1] += `${count}\n`;
            value[2] += `${i.name}\n`;
            value[3] += `${Gang.Info[i.territory.owner].name}\n`; 
        }); 
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setTitle(`Turfs / Gang Zones (${count} total):`); 
        embed.addField("#", value[1], true);
        embed.addField("Gang", value[2], true);
        embed.addField("Owner", value[3], true); 
        interaction.reply({embeds: [embed]});
    }
}