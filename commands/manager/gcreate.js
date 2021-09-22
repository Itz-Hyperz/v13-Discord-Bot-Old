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

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const ms = require('ms')
exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    let check = await client.utils.permCheck(client, message, 'managers')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    if(!client.config.giveaways_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

            const filter = m => m.author.id === message.author.id;

            const starter = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**GIVEAWAY BUILDER STARTED!**\nType \`end\` to cancel the builder.`)
      
            const builder0 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **channel** to put this giveaway in.`)

            const builder0001 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **color** for the giveaway.`)
      
            const builder1 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **prize** for the giveaway.`)
      
            const builder2 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **time limit** for the giveaway to go to.`)
      
            const builder3 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define the **amount** of winners to have.`)
      
            const finish = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**Giveaway has been posted!**`)

            let counted;

            message.channel.send({ embeds: [starter] }).catch(e => {});

            message.channel.send({ embeds: [builder0] }).then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                .then(collected => {
                    let content0l = collected.first().content.toLowerCase()
                    let thechannel;
        
                    if(content0l === 'end') return message.channel.send({ content: `**Giveaway Builder Cancelled!**` }).catch(e => {});
        
                    if(collected.first().mentions.channels.first()) {
                      thechannel = collected.first().mentions.channels.first().id
                    } else if(!isNaN(collected.first().content)) {
                      thechannel = collected.first().content
                    }
        
                    if(thechannel == undefined) return message.channel.send({ content: `Giveaway process cancelled, I was unable to find the provided channel.` });
        
                    message.channel.send({ embeds: [builder0001] }).then(() => {
                        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                        .then(collected => {
                            let content0001l = collected.first().content.toLowerCase()
                            let content0001 = collected.first().content

                            if(content0001l === 'end') return message.channel.send({ content: `**Giveaway Builder Cancelled!**` }).catch(e => {});

                                    message.channel.send({ embeds: [builder1] }).then(() => {
                                    message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                    .then(collected => {
                                        let content1l = collected.first().content.toLowerCase()
                                        let content1 = collected.first().content
                            
                                        if(content1l === 'end') return message.channel.send({ content: `**Giveaway Builder Cancelled!**` }).catch(e => {});
                            
                                        message.channel.send({ embeds: [builder2] }).then(() => {
                                            message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                            .then(collected => {
                                                let content2l = collected.first().content.toLowerCase()
                                                let content2 = collected.first().content
                                    
                                                if(content2l === 'end') return message.channel.send({ content: `**Giveaway Builder Cancelled!**` }).catch(e => {});
                                    
                                                message.channel.send({ embeds: [builder3] }).then(() => {
                                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                                .then(collected => {
                                                    let content3l = collected.first().content.toLowerCase()
                                                    let content3 = collected.first().content
                                        
                                                    if(content3l === 'end') return message.channel.send({ content: `**Giveaway Builder Cancelled!**` }).catch(e => {});

                                                    if(!Number(content3)) return message.channel.send({ content: `**Your winners count must be a number!**` }).catch(e => {});

                                                    con.query(`SELECT COUNT(uniqueid) as total FROM giveaways`, async (err, row) => {

                                                        if(err) throw err;
                                                        if(row[0]) {

                                                            counted = row[0].total + 1
                                                            try {
                                                                const row = new MessageActionRow()
                                                                .addComponents(
                                                                    new MessageButton()
                                                                        .setCustomId('genter')
                                                                        .setLabel(client.config.giveaways_module.joinButton || `Click to enter!`)
                                                                        .setStyle(client.config.giveaways_module.joinButtonStyle || `PRIMARY`),
                                                                )
                                                                .addComponents(
                                                                    new MessageButton()
                                                                        .setCustomId('gend')
                                                                        .setLabel(client.config.giveaways_module.endButton || `End`)
                                                                        .setStyle(client.config.giveaways_module.endButtonStyle || `DANGER`),
                                                                )
                                                                .addComponents(
                                                                    new MessageButton()
                                                                        .setCustomId('greroll')
                                                                        .setLabel(client.config.giveaways_module.rerollButton || `Re-Roll`)
                                                                        .setStyle(client.config.giveaways_module.rerollButtonStyle || `SECONDARY`),
                                                                )

                                                                    const panelEmbed = new MessageEmbed()
                                                                    .setColor(content0001 || client.config.colorhex)
                                                                    .setTitle(client.config.giveaways_module.joinHeaderText || `New Giveaway!`)
                                                                    .setThumbnail(client.config.giveaways_module.startGiveawayThumnailURL || message.guild.iconURL({ dynamic: true }) || message.author.avatarURL({ dynmamic: true }) || client.user.avatarURL({ dynamic: true }))
                                                                    .setDescription(`**Prize:** ${content1}\n**Winners:** ${content3}\n**Time Limit:** ${content2}`)
                                                                    .setTimestamp()
                                                                    .setFooter(`${client.config.copyright}`)

                                                                    let deChan = await client.channels.cache.get(thechannel)
                                                                    await deChan.send({ embeds: [panelEmbed], components: [row] }).then(async msg => {
                                                                        await con.query(`INSERT INTO giveaways (uniqueid, messageid, channelid, prize, winners, timelimit, active, starter) VALUES ('${counted}', '${msg.id}', '${thechannel}', "${content1}", "${content3}", "${content2}", 'true', '${message.author.id}')`, async (err, row) => {
                                                                            if(err) throw err;
                                                                            message.channel.send({ embeds: [finish] }).catch(e => {});
                                                                            setTimeout(async () => {
                                                                                await con.query(`SELECT * FROM giveaways WHERE active='true' AND uniqueid='${counted}' AND messageid='${msg.id}'`, async (err, row) => {
                                                                                    if(err) throw err;
                                                                                    if(row[0]) {
                                                                                        client.utils.giveawayPick(client, con, counted)
                                                                                    }
                                                                                });
                                                                            }, ms(content2))
                                                                        });
                                                                    }).catch(e => {
                                                                        console.log(e)
                                                                    })
                                                
                                                            } catch(e) {
                                                                if(client.config.debugmode) return console.log(e);
                                                            }
                                                        }
                                                    })

                                                }).catch(e => {});
                                                }).catch(e => {});
                                            }).catch(e => {});
                                        }).catch(e => {});
                                    }).catch(e => {});
                        }).catch(e => {});
                    }).catch(e => {});
                }).catch(e => {});
            }).catch(e => {});
        }).catch(e => {});
}

exports.info = {
    name: 'gcreate',
    description: 'Creates a new giveaway.',
    aliases: ['createg']
}