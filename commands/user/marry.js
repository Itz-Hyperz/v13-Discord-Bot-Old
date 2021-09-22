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

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    if(!client.config.utility_module.marriageSystem) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

    let target;
    if(message.mentions.users.first()) {
        target = await client.utils.userFetch(client, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        target = await client.utils.userFetch(client, args[0])
    } else {
        return message.channel.send({ content: "I was unable to find that user." }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    }

    if(target.id === message.author.id) return message.channel.send({ content: "You cannot marry yourself." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    await con.query(`SELECT * FROM marriage WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            await con.query(`SELECT * FROM marriage WHERE spouse='${message.author.id}'`, async (err, row) => {
                if(err) throw err;
                if(!row[0]) {
                    await con.query(`SELECT * FROM marriage WHERE userid='${target.id}'`, async (err, row) => {
                        if(err) throw err;
                        if(!row[0]) {
                            await con.query(`SELECT * FROM marriage WHERE spouse='${target.id}'`, async (err, row) => {
                                if(err) throw err;
                                if(!row[0]) {
                                    await con.query(`INSERT INTO marriage (userid, spouse) VALUES ('${message.author.id}', 'waiting')`, async (err, row) => {
                                        if(err) throw err;
                                        message.channel.send({ content: `**You have requested to marry ${target.tag}.**\nThey have 2 minutes to respond before it is automatically denied.` }).then((msg) => {
                                            if(client.config.deleteCommands) {
                                                setTimeout(() => {
                                                    msg.delete().catch(e => {});
                                                }, 14000);
                                            }
                                        }).catch(e => {});
                                        let embed = new MessageEmbed()
                                        .setColor(client.config.colorhex)
                                        .setTitle(`❤️ New Marriage Request`)
                                        .setThumbnail(message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }))
                                        .setDescription(`${message.author.tag} has requested to marry you! You can respond to this by typing \`${client.config.prefix}maccept\` inside of <#${message.channel.id}>!`)
                                        .setTimestamp()
                                        .setFooter(client.config.copyright)
                                        target.send({ embeds: [embed] }).catch(e => {
                                            message.channel.send({ content: `<@${target.id}>`, embeds: [embed] }).catch(e => {})
                                        });
                                        setTimeout(async () => {
                                            await con.query(`SELECT * FROM marriage WHERE userid='${message.author.id}' AND spouse='waiting'`, async (err, row) => {
                                                if(err) throw err;
                                                if(row[0]) {
                                                    await con.query(`DELETE FROM marriage WHERE userid='${message.author.id}' AND spouse='waiting' LIMIT 1`, async (err, row) => {
                                                        if(err) throw err;
                                                        message.channel.send({ content: `${target.tag} didn't respond in time. Marriage cancelled.` }).then((msg) => {
                                                            if(client.config.deleteCommands) {
                                                                setTimeout(() => {
                                                                    msg.delete().catch(e => {});
                                                                }, 14000);
                                                            }
                                                        }).catch(e => {});
                                                    });
                                                }
                                            });
                                        }, 124000) // 2 minutes plus send delay if any
                                    })
                                } else {
                                    let founded = await client.users.fetch(row[0].userid)
                                    return message.channel.send({ content: `That user is already married to ${founded.tag}.` }).then((msg) => {
                                        if(client.config.deleteCommands) {
                                            setTimeout(() => {
                                                msg.delete().catch(e => {});
                                            }, 14000);
                                        }
                                    }).catch(e => {});
                                }
                            });
                        } else {
                            let founded = await client.users.fetch(row[0].spouse)
                            return message.channel.send({ content: `That user is already married to ${founded.tag}.` }).then((msg) => {
                                if(client.config.deleteCommands) {
                                    setTimeout(() => {
                                        msg.delete().catch(e => {});
                                    }, 14000);
                                }
                            }).catch(e => {});
                        }
                    });
                } else {
                    let founded = await client.users.fetch(row[0].userid)
                    return message.channel.send({ content: `You are already married to ${founded.tag}.` }).then((msg) => {
                        if(client.config.deleteCommands) {
                            setTimeout(() => {
                                msg.delete().catch(e => {});
                            }, 14000);
                        }
                    }).catch(e => {});
                }
            });
        } else {
            let founded = await client.users.fetch(row[0].spouse)
            return message.channel.send({ content: `You are already married to ${founded.tag}.` }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        }
    });

}

exports.info = {
    name: "marry",
    description: "Marriage System Component.",
    aliases: []
}