/*
  _   _                  ____        _     ____                          _                    _ 
 | | | |_   _ _ __   ___| __ )  ___ | |_  |  _ \ ___ _ __ ___   __ _ ___| |_ ___ _ __ ___  __| |
 | |_| | | | | '_ \ / _ \  _ \ / _ \| __| | |_) / _ \ '_ ` _ \ / _` / __| __/ _ \ '__/ _ \/ _` |
 |  _  | |_| | |_) |  __/ |_) | (_) | |_  |  _ <  __/ | | | | | (_| \__ \ ||  __/ | |  __/ (_| |
 |_| |_|\__, | .__/ \___|____/ \___/ \__| |_| \_\___|_| |_| |_|\__,_|___/\__\___|_|  \___|\__,_|
        |___/|_|                                                                                
            
We have tried our very hardest to make this the #1 Discord bot around to date! With tons of new
features that not even some of the current bots around have! As-well with the new updated frame-
work on DiscordJS V13! We have hopefull mastered this new land, and we plan to keep it that way!
*/

const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const mysql = require('mysql');
const chalk = require('chalk');
const DisTube = require("distube")

let useSQL = true; // DO NOT CHANGE THIS, IT MAY BREAK THE BOT
let con;

class HDClient extends Client {
    constructor(options = {}) {
        super(options);

        this.config = require(`../config`);
        this.utils = require(`./utils/utils`);

        this.snipes = new Collection();
        this.commands = new Collection();
        this.aliases = new Collection();
    };
};

const client = new HDClient({
    intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
    partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});

client.distube = new DisTube.default(client, { searchSongs: 10, emitNewSongOnly: true, nsfw: true })

const invites = require('discord-invites13')
invites.loggerSetup(client)

global.__basedir = __dirname;

setTimeout(() => {
    const version = Number(process.version.split('.')[0].replace('v', ''));
    if (version < 16) return console.log(chalk.blue('\n\nPlease upgrade to Node v16 or higher\nPlease upgrade to Node v16 or higher\nPlease upgrade to Node v16 or higher\n\n'));
}, 8000);

const init = async() => {
    try {

        if (useSQL) {
            try {
                con = mysql.createConnection(client.config.database)
                setTimeout(() => {
                    console.log('MySQL Successfully Connected!')
                }, 4000);
            } catch (e) {
                client.utils.error(client, e)
                return process.exit(1);
            }
        }

        // Command Handler
        const categories = readdirSync(join(__dirname, `../`, `commands`));
        for (let category of categories) {
            const commands = readdirSync(join(__dirname, `../`, `commands/`, category));
            for (let command of commands) {
                let info = require(`../commands/${category}/${command}`);
                if (info.info.name) {
                    client.commands.set(info.info.name, info);
                    if(client.config.logCommandLoading) {
                        setTimeout(() => {
                            console.log(`${chalk.blue('Loaded Command')} ../commands/${category}/${command}`)
                        }, 9000)
                    }
                } else {
                    console.log(`No help name or additional info found for ${command}`);
                    continue;
                }
                if (info.info.aliases[0]) {
                    try {
                        info.info.aliases.forEach(a => {
                            client.commands.set(a, info);
                        })
                    } catch(e) {
                        console.log(`An error occured when adding aliases for ${command}`);
                        continue;
                    }
                }
            }
        };

        // Event handler
        const events = readdirSync(join(__dirname, `../`, `events`));
        events.forEach(e => {
            const name = e.split('.')[0];
            const event = require(`../events/${e}`);
            client.on(name, event.bind(null, client, con));
            delete require.cache[require.resolve(`../events/${e}`)];
        });

    client.login(client.config.token).catch(e => console.log(e));
    } catch(e) {
        console.log(e)
    }
}

process.on('unhandledRejection', (err) => { 
    if(err !== "DiscordAPIError: Unknown Message") {
        console.log(chalk.red(`\nFATAL ERROR: \n\n`, err.stack))
    }
});

exports.init = init;