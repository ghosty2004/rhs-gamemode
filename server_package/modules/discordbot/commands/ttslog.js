const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const { getVoiceConnection, joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder().setName("ttslog").setDescription("Text to speech log"),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if(!connection) {
            interaction.guild.me.voice.channel
            let channel = interaction.member.voice.channel;
            if(!channel) return interaction.reply("You need to be in a voice channel !");
            joinVoiceChannel({
                channelId: channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
            interaction.reply("Enabled !");
        }
        else {
            connection.destroy();
            interaction.reply("Disabled !");
        }
    }
}