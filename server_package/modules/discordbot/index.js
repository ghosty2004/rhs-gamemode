/* Modules */
const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");

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

const { DISCORD_BOT } = require("../../data/settings");

bot.login(DISCORD_BOT.TOKEN).catch((error) => {
    console.log(error);
});

/* ============== */
/* Custom Modules */
/* ============== */
const { DiscordCommand } = require("../events");
const { getPlayers } = require("samp-node-lib");

const Function = require("../functions");
const con = require("../mysql");
const Player = require("../player");
const Server = require("../server");
const logTypes = require("../../data/logTypes");

/* ======================= */
/* Slash Command Variables */
/* ======================= */
const commandFiles = fs.readdirSync('./server_package/modules/discordbot/commands').filter(file => file.endsWith('.js'));
const commands = [];
bot.commands = new Discord.Collection();

// => Settings
const DEVELOPER_GUILD_ID = "873994029816242198"; 
const Add_Slash_Commands_To_API = true;

// => Load Some vars
con.on("finishedLoad", () => {
    con.query("SELECT ID, name FROM users ORDER BY month_hours DESC LIMIT 25", function(err, result) {
        if(err) return;
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
            bot.commands.set(command.data.name, command);
        }
    });
});

/* ========= */
/* Functions */
/* ========= */
function getUserLoginSession(userId) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM users WHERE discord = ?", [userId], function(err, result) {
            if(err || result == 0) resolve(false);
            else resolve(result[0].ID);
        });
    });
}

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
                embed.addField("Money:", `$${Function.numberWithCommas(result[0].money)}`, true);
                embed.addField("Coins:", `${Function.numberWithCommas(result[0].coins)}`, true);
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

CMD.on("users", (message) => {
    con.query("SELECT * FROM users ORDER BY ", function(err, result) {
        result.slice(0, 25);
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

/* ========== */
/* Bot Events */
/* ========== */
bot.once("ready", () => {
    console.log(`Discord BOT: ${bot.user.tag} is ready.`);

    /* Interval */
    setInterval(() => {
        const OnlineTime = Function.timestampToHMS(Server.Info.StartTime);
        bot.user.setStatus("dnd");
        bot.user.setActivity({name: `${getPlayers().length} players | ${OnlineTime.hours} hrs and ${OnlineTime.minutes} mins uptime`, type: "PLAYING"});
    }, 10 * 1000);

    /* ============================================== */
    /* Chcek if channels exists in discordChannelLogs */
    /* ============================================== */
    con.query("SELECT * FROM discordChannelLogs", function(err, result) {
        if(err) return;
        for(let i = 0; i < result.length; i++) {
            let guild = bot.guilds.cache.get(result[i].guildId);
            if(!guild) return con.query("DELETE FROM discordChannelLogs WHERE guildId = ?", [result[i].guildId]);
            let channel = guild.channels.cache.get(result[i].channelId);
            if(!channel) return con.query("DELETE FROM discordChannelLogs WHERE guildId = ? AND channelId = ?", [result[i].guildId, result[i].channelId]);
        }
    });

    /* ======================= */
    /* Slash Commands Register */
    /* ======================= */
    const CLIENT_ID = bot.user.id;
    const rest = new REST({version: '9'}).setToken(DISCORD_BOT.TOKEN);
    const removeCommands = require("./removeCommands");
    (async () => {
        try {
            if(!DEVELOPER_GUILD_ID) {
                rest.get(Routes.applicationCommands(CLIENT_ID)).then(async(data) => {
                    /* ====================== */
                    /* Command pending delete */
                    /* ====================== */
                    data.forEach(async(i) => {
                        if(removeCommands.some(s => s == i.name)) {
                            await rest.delete(
                                Routes.applicationCommand(i.application_id, i.id)
                            ).then(() => {
                                console.log(`Successfully removed slash command ${i.name} globally.`);
                            }).catch(() => {
                                console.log(`Could not remove slash command ${i.name} globally.`);
                            });
                        }
                    });
                    if(Add_Slash_Commands_To_API) {
                        /* ============ */
                        /* Add commandS */
                        /* ============ */
                        await rest.put(
                            Routes.applicationCommands(CLIENT_ID), {
                                body: commands
                            },
                        ).then(() => {
                            console.log('Successfully updated slash commands globally.');
                        }).catch(() => {
                            console.log("Could not update slash commands globally.");
                        });
                    }
                });
            } 
            else {
                bot.guilds.cache.forEach((guild) => {
                    rest.get(Routes.applicationGuildCommands(CLIENT_ID, guild.id)).then(async(data) => {
                        /* ====================== */
                        /* Command pending delete */
                        /* ====================== */
                        data.forEach(async(i) => {
                            if(removeCommands.some(s => s == i.name)) {
                                await rest.delete(
                                    Routes.applicationGuildCommand(i.application_id, guild.id, i.id)
                                ).then(() => {
                                    console.log(`Successfully removed slash command ${i.name} from guild: ${guild.name}.`);
                                }).catch((e) => {
                                    console.log(`Could not remove slash command ${i.name} from guild: ${guild.name}.`);
                                });
                            }
                        });
                        if(Add_Slash_Commands_To_API) {
                            /* ============ */
                            /* Add commandS */
                            /* ============ */
                            await rest.put(
                                Routes.applicationGuildCommands(CLIENT_ID, guild.id), {
                                    body: commands
                                },
                            ).then(() => {
                                console.log(`Successfully updated slash commands from guild: ${guild.name}.`);
                            }).catch((e) => {
                                console.log(`Could not update slash commands from developer guild: ${guild.name}.`);
                                console.log(e.rawError.errors.options[1]);
                            });   
                        }
                    }); 
                });
            }
        } catch(e) {
            console.error(e.stack);
        }
    })();
});

bot.on("messageCreate", (message) => {
    if(message.author.bot) return;

    if(message.channel.type == "DM") {
        let player = getPlayers().filter(f => Player.Info[f.playerid].DiscordLoginRequest.From == message.author.id);
        if(player) {
            if(message.content == Player.Info[player[0].playerid].DiscordLoginRequest.Code) {
                message.channel.send(`You have logged in with **${player[0].GetPlayerName(24)}**!`);
                player[0].SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}You have successfully logged in with your discord account {5865F2}${message.author.tag}{FFFFFF}!`)
                Player.Info[player[0].playerid].DiscordLoginRequest.From = null;
                Player.Info[player[0].playerid].DiscordLoginRequest.Code = 0;
                Player.Info[player[0].playerid].Discord = message.author.id;
                con.query("UPDATE users SET discord = ? WHERE ID = ?", [Player.Info[player[0].playerid].Discord, Player.Info[player[0].playerid].AccID])
            }
            else {
                message.channel.send("Invalid code provided.");
            }
        }
    }
    else if(message.channel.type == "GUILD_TEXT") {
        let params = message.content.substring().split(" ");
        params[0] = params[0].toLowerCase();

        if(params[0].startsWith(DISCORD_BOT.PREFIX)) {
            params[0] = params[0].replace(DISCORD_BOT.PREFIX, "");
            if(CMD.eventNames().some(s => s == params[0])) {
                CMD.emit(params[0], message, parseArgs());
                function parseArgs() { params.splice(0, 1); return params; }
            }  
        }
    }
});

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = bot.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

/**
 * @param {"joinLeave"|"changeName"|"trade"|"give"|"buster"|"reports"|"ban"|"kick"|"adminCommands"} type 
 * @param {String} title 
 * @param {Discord.ColorResolvable} color 
 * @param {String} description
 */
function sendLog(type, color, description) {
    con.query("SELECT * FROM discordChannelLogs WHERE type = ?", [type], function(err, result) {
        if(err || result == 0) return;
        for(let i = 0; i < result.length; i++) {
            let guild = bot.guilds.cache.get(result[i].guildId);
            if(!guild) return;
            let channel = guild.channels.cache.get(result[i].channelId);
            if(!channel) return;
            const embed = new Discord.MessageEmbed();
            embed.setColor(color);
            embed.setTitle(`${type} LOG`);
            embed.setDescription(description);
            channel.send({embeds: [embed]}).catch(() => {
                channel.send(description);
            });
        }
    });
}

module.exports = {bot, sendLog};