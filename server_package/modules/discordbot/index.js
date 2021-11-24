const Discord = require("discord.js");
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

/* Custom Modules */
const { DiscordCommand } = require("../events");
const con = require("../mysql");
const { getPlayer } = require("../functions");

const Errors = require("../errors");
const Player = require("../player");
const { getPlayers } = require("samp-node-lib");

/* ============ */
/* MYSQL Events */
/* ============ */
con.on("error", (error) => {
    bot.users.cache.get("334979056095199233").send(`sql:${error}`);
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
    let user = await getUserLoginSession(message.author.id);
    if(params[0]) user = params[0];
    if(!user) return SendUsage(message, "stats [ID/Name]");
    const embed = await getStatsEmbed(user);
    if(!embed) return SendError(message, "This user not exists in our database.");
    message.channel.send({embeds: [embed]});
});

CMD.on("login", (message, params) => {
    if(!params[0]) return SendUsage(message, "login [Server ID]");
    let target = getPlayer(params[0]);
    if(!target) return SendError(message, Errors.PLAYER_NOT_CONNECTED);
    if(!Player.Info[target.playerid].LoggedIn) return SendError(message, Errors.PLAYER_NOT_LOGGED);
    if(Player.Info[target.playerid].Discord != "0") return SendError(message, "This player already logged in to a discord account. Use /discordsignout for logout.");
    message.channel.send(`Login request have been sent to **${target.GetPlayerName(24)}(${target.playerid})**!`);
    target.SendClientMessage(0x5865F2AA, `[DISCORD]: {FFFFFF}${message.author.tag} {5865F2}has sent a login request. Use {FFFFFF}/acceptlogin {5865F2}or {FFFFFF}/declinelogin {5865F2}for response!`);
    Player.Info[target.playerid].DiscordLoginRequest.From = message.author.id;
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

/* ========== */
/* Bot Events */
/* ========== */
bot.once("ready", () => {
    console.log(`Discord BOT: ${bot.user.tag} is ready.`);
});

bot.on("messageCreate", (message) => {
    try {
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
    }
    catch(e) {
        console.log(e.stack);
    }
});

module.exports = {bot};