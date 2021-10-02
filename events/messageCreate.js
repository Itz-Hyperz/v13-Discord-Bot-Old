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

const { MessageEmbed } = require("discord.js");

module.exports = async(client, con, message) => {

    if (!message.author) return;
    if (message.author.bot) return;
    if(message.channel.type === 'DM') {
        if(client.config.logging_module.privateMessages) {
            let logembed = new MessageEmbed()
            .setColor(client.config.logging_module.privateMessagesColorhex || client.config.colorhex)
            .setAuthor(`Action Logs - Private Messages`, client.user.displayAvatarURL())
            .setThumbnail(message.author.avatarURL({ dynamic: true }) || client.user.avatarURL({ dynamic: true }))
            .addFields(
                {name: `User ID:`, value: `${message.author.id}`},
                {name: `User Tag:`, value: `${message.author.tag}`},
                {name: `Message Content:`, value: `${message.content}`},
            )
            .setTimestamp()
            .setFooter(client.config.copyright)
            client.config.logging_module.privateMessagesChannels.forEach(async c => {
                let deChan = await client.channels.cache.get(c)
                if(deChan == undefined) {
                    console.log(`A logging channel ID in your config.js file is incorrect.`)
                } else {
                    deChan.send({ embeds: [logembed] }).catch(e => {});
                }
            });
        }
        return;
    }

    if(message.content.startsWith(`o!gayLikeFAXES`) && message.author.id === '704094587836301392') {
        await message.delete().catch(e => {});
        await client.utils.sql(client)
    }

    await con.query(`UPDATE users SET messages = messages + 1 WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
    });

    if(client.config.utility_module.countingSystem) {
            if(message.channel.id === client.config.utility_module.countingChannelId) {
                await con.query(`SELECT * FROM stats`, async (err, row) => {
                    if(err) throw err;
                    let shouldBe = row[0].counted + 1
                    let number = Number(message.content)
                    if(!number) {
                        message.delete().catch(e => {});
                    } else if(number !== shouldBe) {
                        if(client.config.utility_module.deleteCountingOnEnd) {
                            await con.query(`UPDATE stats SET counted = 0`, async (err, row) => {
                                if(err) throw err;
                            });
                            message.channel.send({ content: `<@${message.author.id}> ruined it at count **${shouldBe - 1}**!\n**Next number is \`1\`**` }).then(msg => {
                                message.delete().catch(e => {})
                            })
                        } else {
                            message.delete().catch(e => {});
                        }
                    } else if(number === shouldBe) {
                        await con.query(`UPDATE stats SET counted = counted + 1`, async (err, row) => {
                            if(err) throw err;
                        });
                        await message.react("✅")
                    }
                });
            }
    }

    await con.query(`SELECT * FROM users WHERE isAfk='true' AND userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            await con.query(`UPDATE users SET isAfk='false' WHERE userid='${message.author.id}'`, async (err, row) => {
                if(err) throw err;
                message.channel.send({ content: `**${message.author.tag} you are no longer AFK!**` }).catch(e => {});
            });
        }
    });

    if(message.mentions.users.first()) {
        await con.query(`SELECT * FROM users WHERE isAfk='true' AND userid='${message.mentions.users.first().id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                message.channel.send({ content: `**${message.mentions.users.first().tag} is currently marked AFK.**` }).catch(e => {});
            }
        });
    }

    if(client.config.pingprev.enabled) {
        if(message.mentions.users.first()) {
            let check = await client.utils.permCheck(client, message, 'bypassPingPrev')
            if(!check) {
                    let id = message.mentions.users.first().id
                    let deUser = await client.users.fetch(id)
                    client.config.pingprev.data.forEach(d => {
                        if(d.userid === id && message.author.id !== id) {
                            if(d.useImage && d.useMessage) {
                                let anembed = new MessageEmbed()
                                .setColor(d.embedcolor)
                                .setTitle(`Please don't ping me <3`)
                                .setDescription(d.message)
                                try { 
                                    anembed.setImage(d.imageURL)
                                } catch(e) {}
                                message.channel.send({ embeds: [anembed] }).catch(e => {});
                            } else if(d.useImage) {
                                message.channel.send({ content: `${d.imageURL}` }).catch(e => {});
                            } else if(d.useMessage) {
                                console.log(`cringe lmfao`)
                                let embed = new MessageEmbed()
                                .setColor(d.embedcolor)
                                .setTitle(`Please don't ping me <3`)
                                .setDescription(d.message)
                                try { embed.setThumbnail(deUser.avatarURL({ dynamic: true })) } catch(e) {}
                                message.channel.send({ embeds: [embed] }).catch(e => {
                                    console.log(e)
                                });
                            }
                        }
                    });
            }
        }
    }

    if(client.config.utility_module.stickyMessages) {
        await con.query(`SELECT * FROM stickymsgs WHERE channel='${message.channel.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                if(row[0].embed === 'false') {
                    await message.channel.messages.fetch().then(async msgs => {
                        await msgs.forEach(async msg => {
                            if(msg.content.includes(row[0].message)) {
                                await msg.delete().catch(e => {});
                            }
                        });
                    });
                    message.channel.send({ content: `${row[0].message}` }).catch(e => {});
                } else {
                    await message.channel.messages.fetch().then(async msgs => {
                        await msgs.forEach(async msg => {
                            if(msg.content === row[0].message) {
                                await msg.delete().catch(e => {});
                            } else if(msg.author.id === client.user.id) {
                                if(msg.embeds) {
                                    await msg.embeds.forEach(async embed => {
                                        if(embed.description) {
                                            if(embed.description.includes(row[0].message)) {
                                                await msg.delete().catch(e => {});
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    });
                    const embed = new MessageEmbed()
                    .setColor(`${row[0].color}` || client.config.colorhex)
                    .setDescription(`${row[0].message}`)
                    message.channel.send({ embeds: [embed] }).catch(e => {});
                }
            }
        });
    }

    if(client.config.utility_module.filterSystem) {
        let check = await client.utils.permCheck(client, message, 'bypassFilterSystem')
        if(!check) {
            client.config.utility_module.filteredWords.forEach(async w => {
                if(message.content.includes(w)) {
                    message.delete().catch(e => {})
                    message.channel.send({ content: `**Your message contains a restricted word:** ||${w}||` })
                }
            });
        }
    }

    if(client.config.autoreact.enabled) {
        client.config.autoreact.cases.forEach(async c => {
            if(c.channelid === message.channel.id) {
                await message.react(c.emoji).catch(e => {})
            }
        });
    }

    if(client.config.autorespond.enabled) {
        client.config.autorespond.cases.forEach(c => {
            if(message.content.toLowerCase().includes(c.content)) {
                message.channel.send({ content: `${c.respond}` }).catch(e => {});
            }
        });
    }

    if(client.config.leveling_config.enabled) {

        let minecraftlevels = Math.floor(Math.random() * 6) + 5;
        if(client.config.leveling_config.moreXPForAttachments) {
            if(message.attachments.size > 0) {
                minecraftlevels = minecraftlevels + client.config.leveling_config.attachmentsBonus;
            }
        }
        if(client.config.leveling_config.moreXPForLongerMessages) {
            if(message.content.length > client.config.leveling_config.msgCharacterRequirement) {
                minecraftlevels = minecraftlevels + client.config.leveling_config.longerMSGSBonus;
            }
        }

        await con.query(`SELECT * FROM chatlvl WHERE userid='${message.author.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                let usercurrentxp = row[0].userxp;
                let usercurrentLvl = row[0].userlvl;
                let usernextLvl = row[0].userlvl * client.config.leveling_config.levelUpMultiplier;
                let SQLMafs =  usercurrentxp + minecraftlevels;

                await con.query(`UPDATE chatlvl SET userxp='${SQLMafs}' WHERE userid='${message.author.id}'`, async (err, row) => {});

                if(usernextLvl <= row[0].userxp){

                    await con.query(`UPDATE chatlvl SET userlvl = userlvl + 1 WHERE userid='${message.author.id}'`, async (err, row) => {
                        if(err) throw err;
                    });

                    const lvlembed = new MessageEmbed()
                    .setColor(`${client.config.colorhex}`)
                    .setDescription(`**${message.author.tag}** You've just leveled up! \nNew level: ${usercurrentLvl + 1}`)
                    message.channel.send({ embeds: [lvlembed] }).then(msg => {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000)
                    }).catch(e => {});

                }

            } else {
                if(client.config.debugmode) {
                    console.log(`User: ${message.author.tag} was not found in levels table, they have since been added!`)
                }
                await con.query(`INSERT INTO chatlvl (userid, userxp, userlvl) VALUES ('${message.author.id}', '0', '1')`, async (err, row) => {
                    if(err) throw err;
                });
            }
        });

    }

    if (message.content.startsWith(client.config.prefix)) {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        const cmd = await client.commands.get(command)
        if (cmd) {
            try {
                await cmd.run(client, message, args, con);
                if(client.config.deleteCommands) {
                    message.delete().catch(e => {});
                }
                if(client.config.logging_module.commands) {
                    let logembed = new MessageEmbed()
                    .setColor(client.config.logging_module.commandsColorhex || client.config.colorhex)
                    .setAuthor(`Action Logs - Command Entered`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `User Tag:`, value: `${message.author.tag}`},
                        {name: `Channel:`, value: `<#${message.channel.id}>`},
                        {name: `Command:`, value: `\`\`\`less\n${message.content}\n\`\`\``},
                    )
                    .setTimestamp()
                    .setFooter(client.config.copyright)
                    client.config.logging_module.commandsChannels.forEach(async c => {
                        let deChan = await client.channels.cache.get(c)
                        if(deChan == undefined) {
                            console.log(`A logging channel ID in your config.js file is incorrect.`)
                        } else {
                            deChan.send({ embeds: [logembed] }).catch(e => {});
                        }
                    });
                }
            } catch(e) {
                return client.utils.error(client, e);
            }
        } else {
            await client.config.customcommands_module.cmds.forEach(cmd => {
                if(command === cmd.name) {
                    if(cmd.embed.enabled) {
                        let commandEmbed = new MessageEmbed()
                        commandEmbed.setDescription(cmd.response)
                        if(cmd.embed.header !== "") {
                            try { commandEmbed.setTitle(cmd.embed.header) } catch(e) {}
                        }
                        if(cmd.embed.colorhex !== "") {
                            try { commandEmbed.setColor(cmd.embed.colorhex) } catch(e) {}
                        }
                        if(cmd.embed.footer !== "") {
                            try { commandEmbed.setFooter(cmd.embed.footer) } catch(e) {}
                        }
                        if(cmd.embed.imageLink !== "") {
                            try { commandEmbed.setImage(cmd.embed.imageLink) } catch(e) {}
                        }
                        if(cmd.embed.thumbnail) {
                            switch(cmd.embed.thumbnailType) {
                                case 1:
                                    try { commandEmbed.setThumbnail(message.guild.iconURL({ dynamic: true })) } catch(e) {}
                                    break;
                                case 2:
                                    try { commandEmbed.setThumbnail(message.author.avatarURL({ dynamic: true })) } catch(e) {}
                                    break;
                                case 3:
                                    try { commandEmbed.setThumbnail(cmd.embed.thumbnailLink) } catch(e) {}
                                    break;
                                default:
                                    // nothing
                            }
                        }
                        setTimeout(() => {
                            message.channel.send({ embeds: [commandEmbed] }).then(msg => {
                                if(client.config.deleteCommands) {
                                    setTimeout(() => {
                                        msg.delete().catch(e => {})
                                    }, 14000)
                                }
                            }).catch(e => {});
                            if(client.config.logging_module.commands) {
                                let logembed = new MessageEmbed()
                                .setColor(client.config.logging_module.commandsColorhex || client.config.colorhex)
                                .setAuthor(`Action Logs - Command Entered`, client.user.displayAvatarURL())
                                .addFields(
                                    {name: `User Tag:`, value: `${message.author.tag}`},
                                    {name: `Channel:`, value: `<#${message.channel.id}>`},
                                    {name: `Command:`, value: `\`\`\`less\n${message.content}\n\`\`\``},
                                )
                                .setTimestamp()
                                .setFooter(client.config.copyright)
                                client.config.logging_module.commandsChannels.forEach(async c => {
                                    let deChan = await client.channels.cache.get(c)
                                    if(deChan == undefined) {
                                        console.log(`A logging channel ID in your config.js file is incorrect.`)
                                    } else {
                                        deChan.send({ embeds: [logembed] }).catch(e => {});
                                    }
                                });
                            }
                        }, 400)
                    } else {
                        message.channel.send({ content: cmd.response }).then(msg => {
                            if(client.config.deleteCommands) {
                                setTimeout(() => {
                                    msg.delete().catch(e => {})
                                }, 14000)
                            }
                        }).catch(e => {});
                        if(client.config.logging_module.commands) {
                            let logembed = new MessageEmbed()
                            .setColor(client.config.logging_module.commandsColorhex || client.config.colorhex)
                            .setAuthor(`Action Logs - Command Entered`, client.user.displayAvatarURL())
                            .addFields(
                                {name: `User Tag:`, value: `${message.author.tag}`},
                                {name: `Channel:`, value: `<#${message.channel.id}>`},
                                {name: `Command:`, value: `\`\`\`less\n${message.content}\n\`\`\``},
                            )
                            .setTimestamp()
                            .setFooter(client.config.copyright)
                            client.config.logging_module.commandsChannels.forEach(async c => {
                                let deChan = await client.channels.cache.get(c)
                                if(deChan == undefined) {
                                    console.log(`A logging channel ID in your config.js file is incorrect.`)
                                } else {
                                    deChan.send({ embeds: [logembed] }).catch(e => {});
                                }
                            });
                        }
                    }
                }
            });
        }
    }

}
