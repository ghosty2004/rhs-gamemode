const { SlashCommandBuilder, SlashCommandChannelOption, SlashCommandStringOption } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const logTypes = require("../../../data/logTypes");
const { UNEXPECTED } = require("../../errors");

const con = require("../../mysql");

const getSlashCommand = () => {
    const slashCommand = new SlashCommandBuilder();
        const channelOption = new SlashCommandChannelOption();
        const stringOptions = new SlashCommandStringOption();

        slashCommand.setName("togglelog");
        slashCommand.setDescription("Enable or Disable a server log"); 

        channelOption.setRequired(true);
        channelOption.setName("channel");
        channelOption.setDescription("Choose a channel");
        slashCommand.addChannelOption(channelOption);
        
        stringOptions.setRequired(true);
        stringOptions.setName("type");
        stringOptions.setDescription("Select a log type");

        logTypes.forEach((value) => {
            stringOptions.addChoice(value, value);
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
        let logChannel = interaction.options.get("channel").channel;
        let logType = interaction.options.get("type").value;
        if(!logChannel || !logType) return interaction.reply(UNEXPECTED);
        if(logChannel.type != "GUILD_TEXT") return interaction.reply(":x: You need to select a **GUILD_TEXT** channel.");
        if(!logTypes.some(s => s == logType)) return interaction.reply(":x: Invalid log **TYPE**.");
        con.query("SELECT * FROM discordChannelLogs WHERE guildId = ? AND channelId = ? AND type = ?", [interaction.guild.id, logChannel.id, logType], function(err, result) {
            if(result != 0) {
                con.query("DELETE FROM discordChannelLogs WHERE type = ? AND guildId = ? AND channelId = ?", [logType, interaction.guild.id, logChannel.id], function(err, result) {
                    if(err) return interaction.reply(UNEXPECTED);
                    interaction.reply(`:white_check_mark: You have successfully disabled logs from channel: **${logChannel.name}** | type: **${logType}**`);
                });
            }
            else {
                con.query("INSERT INTO discordChannelLogs (type, guildId, channelId) VALUES(?, ?, ?)", [logType, interaction.guild.id, logChannel.id], function(err, result) {
                    if(err) return interaction.reply(UNEXPECTED);
                    interaction.reply(`:white_check_mark: You have successfully enabled logs to channel: **${logChannel.name}** | type: **${logType}**`);
                });
            }
        });
    }
}