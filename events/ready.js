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

let i = 0;
const chalk = require('chalk');
const express = require("express");
const nodelogger = require('hyperz-nodelogger')
const logger = new nodelogger()
const { joinVoiceChannel } = require('@discordjs/voice');
const ms = require('ms')
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = async(client, con, ready) => {

    try {

        client.distube.on('error', (channel, error) => {
            console.error(error)
            channel.send({ content: `An error encoutered: ${error.slice(0, 1979)}` }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });

        client.distube.on('playSong', (queue, song) => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setAuthor(`Song Playing`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                {name: "Name", value: `${song.name}`, inline: true},
                {name: "Duration", value: `${song.formattedDuration}`, inline: true},
                {name: "Requestor", value: `${song.user}`, inline: true},
            )
            .setTimestamp()
            .setFooter(client.config.copyright)
            queue.textChannel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });

        client.distube.on("finish", queue => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setAuthor(`Queue Empty`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setDescription(`No more song in queue.`)
            .setTimestamp()
            .setFooter(client.config.copyright)
            queue.textChannel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });

        client.distube.on("initQueue", queue => {
            queue.autoplay = false;
            queue.volume = 100;
        });

        client.distube.on("addSong", (queue, song) => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setAuthor(`Song Added`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                {name: "Name", value: `${song.name}`, inline: true},
                {name: "Duration", value: `${song.formattedDuration}`, inline: true},
                {name: "Requestor", value: `${song.user}`, inline: true},
            )
            .setTimestamp()
            .setFooter(client.config.copyright)
            queue.textChannel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });

        client.distube.on("searchCancel", (message) => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setDescription(`Searching cancelled`)
            message.channel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });

        client.distube.on("searchNoResult", (message, query) => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setAuthor(`Error 404`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setDescription(`No result found for ${query}!`)
            .setTimestamp()
            .setFooter(client.config.copyright)
            message.channel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });

        client.distube.on("searchResult", (message, results) => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setAuthor(`Search Results`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setDescription(`**Choose an option from below**\n${results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
            .setTimestamp()
            .setFooter(client.config.copyright)
            message.channel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {
                console.log(e)
            });
        });

        client.distube.on("searchDone", (message, answer, query) => {});

        client.distube.on("searchInvalidAnswer", (message, answer) => {
            let music = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setAuthor(`Invalid Answer`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setDescription(`Invalid answer provided for search.`)
            .setTimestamp()
            .setFooter(client.config.copyright)
            message.channel.send({ embeds: [music] }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        });


        const app = express()
        app.listen(client.config.port)

        setInterval(() => {
            con.ping()
        }, ms('25m'))

        changeStatus(client)

        let lol = client.config.themeColor
        let frick;
        let themecolor;
        let commandcount = client.config.command_count + client.config.customcommands_module.cmds.length;
        let eventcount = client.config.event_count;
        switch(lol) {
            case "blue":
                frick = `${chalk.white(`Watching `)}${chalk.blue(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.blue(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.blue(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.blue(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.blue(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.blue(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.blue(commandcount)}\n${chalk.white(`Events: `)}${chalk.blue(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.blue('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'blue'
                break;
            case "green":
                frick = `${chalk.white(`Watching `)}${chalk.green(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.green(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.green(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.green(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.green(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.green(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.green(commandcount)}\n${chalk.white(`Events: `)}${chalk.green(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.green('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'green'
                break;
            case "red":
                frick = `${chalk.white(`Watching `)}${chalk.red(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.red(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.red(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.red(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.red(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.red(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.red(commandcount)}\n${chalk.white(`Events: `)}${chalk.red(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.red('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'red'
                break;
            case "yellow":
                frick = `${chalk.white(`Watching `)}${chalk.yellow(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.yellow(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.yellow(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.yellow(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.yellow(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.yellow(client.config.prefix)}${chalk.blue(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.yellow(commandcount)}\n${chalk.white(`Events: `)}${chalk.yellow(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.yellow('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.blue(client.config.debugmode)}`;
                themecolor = 'yellow'
                break;
            case "magenta":
                frick = `${chalk.white(`Watching `)}${chalk.magenta(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.magenta(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.magenta(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.magenta(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.magenta(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.magenta(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.magenta(commandcount)}\n${chalk.white(`Events: `)}${chalk.magenta(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.magenta('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'magenta'
                break;
            default:
                frick = `${chalk.white(`Watching `)}${chalk.blue(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.blue(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.blue(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.blue(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.blue(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.blue(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.blue(commandcount)}\n${chalk.white(`Events: `)}${chalk.blue(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.blue('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'blue'
        }
        
        await logger.hypelogger(`${client.user.username}`, '600', themecolor, frick, 'disabled', themecolor, 'single', true)
        setTimeout(() => {
            console.log(`\n\n    ------ CONSOLE LOGGING BEGINS BELOW ------\n\n`)
        }, 800)

        setTimeout(async () => {
            let counted = 0;
            await client.users.cache.forEach(async u => {
                await con.query(`SELECT * FROM users WHERE userid='${u.id}'`, async(err, row) => {
                    if(err) throw err;
                    if(!row[0]) {
                        await con.query(`INSERT INTO users (userid, warns, kicks, bans, mutes, isMuted, muteTime, joins, leaves, messages, delMessages, isAfk, balance, workCooldown, crimeCooldown, robCooldown, bank) VALUES ('${u.id}', 0, 0, 0, 0, 'false', 0, 1, 0, 0, 0, 'false', 0, 'false', 'false', 'false', 0)`, async (err, row) => {
                            if(err) throw err;
                            counted = counted + 1;
                        });
                    }
                });
            });

            if (client.config.serverstats_module.enabled) {
                const membercountc = client.config.serverstats_module.membercountchannelid
                const usercountc = client.config.serverstats_module.usercountchannelid
                const botcountc = client.config.serverstats_module.botcountchannelid
    
                // Member Count Code
                if (client.config.serverstats_module.useMemberCount) {
                    const updateMembers = async (guild) => {
                        const channel = await client.channels.cache.get(membercountc)
                        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
                    }
    
                    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
                    client.on('guildMemberRemove', (member) => updateMembers(member.guild))
    
                    const guild = client.guilds.cache.get(client.config.your_guild_id)
                    updateMembers(guild);
    
                    if (typeof aliases === 'string') {
                        aliases = [aliases]
                    }
                }
    
                // User Count Code
                if (client.config.serverstats_module.useUserCount) {
                    const updateUsers = async (guild) => {
    
                        const channel = await client.channels.cache.get(usercountc)
                        channel.setName(`Users: ${guild.members.cache.filter(member => !member.user.bot).size}`)
                    }
    
                    client.on('guildMemberAdd', (member) => updateUsers(member.guild))
                    client.on('guildMemberRemove', (member) => updateUsers(member.guild))
    
                    const guild = client.guilds.cache.get(client.config.your_guild_id)
                    updateUsers(guild);
    
                    if (typeof aliases === 'string') {
                        aliases = [aliases]
                    }
                }
    
                // Bot Count Code
                if (client.config.serverstats_module.useBotCount) {
                    const updateBots = async (guild) => {
    
                        const channel = await client.channels.cache.get(botcountc)
                        channel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`)
                    }
    
                    client.on('guildMemberAdd', (member) => updateBots(member.guild))
                    client.on('guildMemberRemove', (member) => updateBots(member.guild))
    
                    const guild = client.guilds.cache.get(client.config.your_guild_id)
                    updateBots(guild);
    
                    if (typeof aliases === 'string') {
                        aliases = [aliases]
                    }
                }
    
            }

            if(client.config.reactionroles.enabled) {
                client.config.reactionroles.reactions.forEach(async r => {
                  try {
                      await client.channels.cache.forEach(async c => {
                        if(c !== undefined) {
                            if(c.messages !== undefined) {
                                let msg = await c.messages.fetch(`${r.messageid}`).catch(e => {})
                                if(msg !== undefined) {
                                    try {
                                        await msg.react(`${r.reactionname}`)
                                    } catch(e) {}
                                }
                            }
                        }
                      });
                  } catch(e) {}
                });
            }

              // Ensure giveaways are continued
              await con.query(`SELECT * FROM giveaways WHERE active='true'`, async (err, rows) => {
                if(err) throw err;
                if(rows[0]) {
                    rows.forEach(async r => {
                        console.log(chalk.yellow(`Giveaway for ${r.prize} with ${r.winners} winners has had the timer reset due to the bot restarting!`))
                        setTimeout(async () => {
                            await con.query(`SELECT * FROM giveaways WHERE active='true' AND uniqueid='${r.uniqueid}' AND messageid='${r.messageid}'`, async (err, row) => {
                                if(err) throw err;
                                if(row[0]) {
                                    client.utils.giveawayPick(client, con, r.uniqueid)
                                }
                            });
                        }, ms(r.timelimit))
                    });
                }
              });

            setTimeout(() => {
                if(counted <= 10) {
                    console.log(`Imported ${counted} new users to the database!`)
                } else {
                    console.log(`Counting new users, please wait...`)
                    setTimeout(() => {
                        console.log(`Imported ${counted} new users to the database!`)
                    }, 22000)
                }
            }, 2000)
            if(client.config.utility_module.birthdaySystem) {
                setInterval(async () => {
                    let datetime = moment().format('MM-DD').toString();
                    await con.query(`SELECT * FROM birthdays`, async (err, rows) => {
                        if(err) throw err;
                        if(rows[0]) {
                            rows.forEach(async r => {
                                if(r.deDate.toString().includes(datetime)) {
                                    let guild = await client.guilds.cache.get(client.config.your_guild_id)
                                    let user = await client.users.fetch(r.userid)
                                    if(guild.members.cache.get(user.id)) {
                                        let bdayembed = new MessageEmbed()
                                        .setColor(client.config.utility_module.birthdayColorhex || client.config.colorhex)
                                        .setTitle(client.config.utility_module.birthdayHeaderText || `🥳 Happy Birthday!`)
                                        .setThumbnail(user.avatarURL({ dynamic: true }) || `https://images.emojiterra.com/google/android-11/512px/1f389.png`)
                                        .setDescription(`It's **${user.tag} (<@${user.id}>)'s** Birthday today! Wish them a happy birthday and let's celebrate!\n**Date:** ${r.deDate}`)
                                        .setTimestamp()
                                        .setFooter(client.config.copyright)
                                        client.config.utility_module.birthdayChannels.forEach(async c => {
                                            let thechannel = await client.channels.cache.get(c)
                                            if(thechannel !== undefined) {
                                                thechannel.send({ embeds: [bdayembed] }).then(() => {
                                                    if(client.config.utility_module.birthdayRoleToPing !== '') {
                                                        thechannel.send({ content: `<@&${client.config.utility_module.birthdayRoleToPing}>` }).catch(e => {})
                                                    }
                                                }).catch(e => {})
                                            } else {
                                                console.log(`A Birthday system channel ID is invalid...`)
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }, 46800000) // Every 13 hours (avoids double pings)
            }
            await con.query(`SELECT * FROM users WHERE workCooldown = 'true' OR robCooldown = 'true' OR crimeCooldown = 'true'`, async (err, rows) => {
                if(err) throw err;
                if(rows[0]) {
                    rows.forEach(async r => {
                        await con.query(`UPDATE users SET workCooldown = 'false', robCooldown = 'false', crimeCooldown = 'false' WHERE userid='${r.userid}'`, async (err, row) => {
                            if(err) throw err;
                        });
                    });
                }
            });
            if(client.config.fivem_module.enabled) {
                try {
                    client.config.fivem_module.servers.forEach(async e => {
                        
                        // Startup setup
                        let channel = await client.channels.cache.get(e.channelid);
                        let check = await axios({
                            method: 'get',
                            url: `http://${e.serverIPPort}/dynamic.json`,
                        }).catch(e => console.log(e));
                        if(check) {
                            if(check.data) {
                                channel.setName(`${e.name}: ${check.data.clients}/${check.data.sv_maxclients}`);
                            } else {
                                channel.setName(`${e.name}: 0`);
                            }
                        } else {
                            channel.setName(`${e.name}: 0`);
                        }

                        // Repeat setup on interval
                        setInterval(async () => {
                            let channel = await client.channels.cache.get(e.channelid);
                            let check = await axios({
                                method: 'get',
                                url: `http://${e.serverIPPort}/dynamic.json`,
                            }).catch(e => console.log(chalk.yellow(`FiveM Integration Fetching Issue: `, e)));
                            if(check) {
                                if(check.data) {
                                    channel.setName(`${e.name}: ${check.data.clients}/${check.data.sv_maxclients}`);
                                } else {
                                    channel.setName(`${e.name}: 0`);
                                }
                            } else {
                                channel.setName(`${e.name}: 0`);
                            }
                        }, ms(`${client.config.fivem_module.refreshRate}`))
    
                    });
                } catch(e) {
                    if(client.config.debugmode) {
                        console.log(chalk.yellow(`FiveM Integration Issue: `, e))
                    }
                }
            }
            const channel = client.channels.cache.get(client.config.voicechanneltojoin);
            if (!channel) return client.utils.error(client, "The voice channel does not exist (change config's voicechanneltojoin)!");
            let connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            if(connection) {
                console.log("Successfully connected to the voice channel!")
            }
        }, 2200);

    } catch(e) {
        console.log(e)
    }

}

async function changeStatus(client) {
    if (i >= client.config.presence.length) i = 0;
    await client.user.setPresence({
        activities: [{
            name: client.config.presence[i].name,
            type: client.config.presence[i].type
        }],
        status: client.config.presence[i].status
    });
    i++;
    setTimeout(() => {
        changeStatus(client);
    }, 10000)

};