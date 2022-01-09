const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");

const { UNEXPECTED } = require("../../errors");
const { getRconRank } = require("../../functions");

const con = require("../../mysql");

module.exports = {
    data: new SlashCommandBuilder().setName("admins").setDescription("Show admin list"),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        con.query("SELECT name, admin, rcontype FROM users WHERE admin > 0", function(err, result) {
            if(err || result == 0) return interaction.reply(UNEXPECTED);
            if(result.length == 0) return interaction.reply("No available admins !");
            const embed = new MessageEmbed();
            embed.setColor("RANDOM");
            embed.setTitle(`Admins List (${result.length} total)`);
            embed.description = "";
            for(let i = 0; i < result.length; i++) {
                embed.description += `\n#${i+1}. [Name: **${result[i].name}** | Admin: **${result[i].admin}** | Rcon Rank: **${getRconRank(result[i].rcontype)}**]`;
            }
            interaction.reply({embeds: [embed]});
        });
    }
}