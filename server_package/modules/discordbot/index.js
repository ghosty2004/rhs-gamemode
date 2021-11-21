const Discord = require("discord.js");
const { DISCORD_BOT } = require("../../data/settings");
const con = require("../mysql");
const bot = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});

bot.login(DISCORD_BOT.TOKEN).catch((error) => {
    console.log(error);
});

/* Custom Modules */
const { DiscordCommand } = require("../events");

/* ========= */
/* Functions */
/* ========= */
function SendUsage(message, text) {
    message.channel.send("```" + `USAGE: ${DISCORD_BOT.PREFIX}${text}` + "```");
}

function SendError(message, text) {
    message.channel.send("```" + `ERROR: ${text}` + "```");
}

function getStatsEmbed(user) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM users WHERE ID = ? OR name = ?", [user, user], function(err, result) {
            if(!err && result != 0) {
                const embed = new Discord.MessageEmbed();
                embed.setColor("RANDOM");
                embed.setTitle(`${result[0].name}'s stats:`, true);
                embed.addField("ID:", `${result[0].ID}`, true);
                embed.addField("Name:", `${result[0].name}`, true);
                embed.addField("Money:", `${result[0].money}`, true);
                embed.addField("Coins:", `${result[0].coins}`, true);
                embed.addField("Respect:", `+${result[0].respect_positive} / -${result[0].respect_negative}`, true);
                embed.addField("Online Time:", `${result[0].hours} hrs, ${result[0].minutes} mins, ${result[0].seconds} secs`, true);
                resolve(embed);
            }
            else resolve(false);
        });
    });
}

/* ============ */
/* Bot Commands */
/* ============ */
const CMD = new DiscordCommand();

CMD.on("stats", async (message, params) => {
    if(params[0]) {
        const embed = await getStatsEmbed(params[0]);
        if(embed) {
            message.channel.send({embeds: [embed]});
        }
        else SendError(message, "This user not exists in our database.");
    }
    else SendUsage(message, "stats [ID/Name]");
});

CMD.on("users", (message) => {
    con.query("SELECT * FROM users", function(err, result) {
        const row = new Discord.MessageActionRow();
        const select = new Discord.MessageSelectMenu();
        select.setCustomId("users");
        select.setPlaceholder("Select a user");
        const options = [];
        for(let i = 0; i < result.length; i++) {
            options.push({
                label: `${result[i].name}`,
                description: `Here you can find ${result[i].name}'s stats'`,
                value: `${i}`
            });
        }
        select.addOptions(options);
        row.addComponents(select);
        message.reply({content: "Select below:", components: [row]}).then(msg => {
            const collector = message.channel.createMessageComponentCollector({componentType: "SELECT_MENU", time: 15000});
            collector.on("collect", async i => {
                if(i.user.id == message.author.id) {
                    msg.delete();
                    const index = i.values[0];
                    message.reply({embeds: [await getStatsEmbed(result[index].ID)]});
                } 
            });
        });
    });
});

CMD.on("stats", (message, params) => {

});

/* ========== */
/* Bot Events */
/* ========== */
bot.on("ready", () => {
    console.log(`Discord BOT: ${bot.user.tag} is ready.`);
});

bot.on("messageCreate", (message) => {
    if(message.author.bot) return;
    let params = message.content.substring().split(" ");
    params[0] = params[0].toLowerCase();

    if(params[0].startsWith(DISCORD_BOT.PREFIX)) {
        params[0] = params[0].replace(DISCORD_BOT.PREFIX, "");
        if(CMD.eventNames().some(s => s == params[0])) {
            CMD.emit(params[0], message, parseArgs());
            function parseArgs() { params.splice(0, 1); return params; }
        }  
    }
});

module.exports = {bot};