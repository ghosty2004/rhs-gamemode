const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { numberWithCommas } = require("../../functions");

const con = require("../../mysql");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
    const stringOptions = new SlashCommandStringOption();

    slashCommand.setName("stats");
    slashCommand.setDescription("Show someone's stats"); 

    stringOptions.setName("user");
    stringOptions.setDescription("ID/Name of the specific user");
    stringOptions.setRequired(true);

    slashCommand.addStringOption(stringOptions);

    return slashCommand;
}

module.exports = {
    data: getSlashCommand(),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let user = interaction.options.get("user").value;
        con.query("SELECT * FROM users WHERE ID = ? OR name = ?", [user, user], function(err, result) {
            if(!err && result != 0) {
                const embed = new MessageEmbed();
                embed.setColor("RANDOM");
                embed.setTitle(`${result[0].name}'s stats:`, true);
                embed.addField("ID:", `${result[0].ID}`, true);
                embed.addField("Name:", `${result[0].name}`, true);
                embed.addField("Money:", `$${numberWithCommas(result[0].money)}`, true);
                embed.addField("Coins:", `${numberWithCommas(result[0].coins)}`, true);
                embed.addField("Respect:", `+${result[0].respect_positive} / -${result[0].respect_negative}`, true);
                embed.addField("Online Time:", `${result[0].hours} hrs, ${result[0].minutes} mins, ${result[0].seconds} secs`, true);
                interaction.reply({embeds: [embed]});
            }
            else interaction.reply(`This user not exists in our database.`);
        });
    }
};