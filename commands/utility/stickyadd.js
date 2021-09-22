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

    let check = await client.utils.permCheck(client, message, 'stickymsgs')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    if(!client.config.utility_module.stickyMessages) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

    const filter = m => m.author.id === message.author.id;

    const build1 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setDescription(`**Welcome to the Sticky Message Builder!**\n**Type **\`end\`** to end the builder.**`)

    const build2 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setDescription(`**Please provide a channel for the sticky message to be placed in.**`)

    const build3 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setDescription(`**Would you like this message to be embeded?\nPlease choose** \`yes\` **or** \`no\``)

    const build4 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setDescription(`**Please provide a color HEX for the embed.**`)

    const build5 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setDescription(`**Please enter the message you would like the sticky message to say.**`)

    const build6 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setDescription(`**Sticky Message Created!**`)

    message.channel.send({ embeds: [build1] }).catch(e => {});

    message.channel.send({ embeds: [build2] }).then(() => {
        message.channel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
        .then(async collected => {
            let newcol = collected.first().content.toLowerCase()
            if(newcol === 'end') return message.channel.send({ content: `**Sticky Message Builder Ended.**` }).catch(e => {});
            let deChan;
            if(collected.first().mentions.channels.first()) {
                deChan = collected.first().mentions.channels.first().id
            } else if(!isNaN(collected.first().content)) {
                deChan = collected.first().content
            }
            let fetchedChan = await client.channels.cache.get(deChan)
            await con.query(`SELECT * FROM stickymsgs WHERE channel='${fetchedChan.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    return message.channel.send({ content: `There is already a sticky message in this channel.` }).catch(e => {});
                } else {
                    message.channel.send({ embeds: [build3] }).then(() => {
                        message.channel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                        .then(collected => {
                            let newcol = collected.first().content.toLowerCase()
                            if(newcol === 'end') return message.channel.send({ content: `**Sticky Message Builder Ended.**` }).catch(e => {});
                            let content3 = collected.first().content.toLowerCase()

                            if(content3 === 'yes') {
                                let embedf = 'true'
                                message.channel.send({ embeds: [build4] }).then(() => {
                                    message.channel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                    .then(collected => {
                                        let newcol = collected.first().content.toLowerCase()
                                        if(newcol === 'end') return message.channel.send({ content: `**Sticky Message Builder Ended.**` }).catch(e => {});
                                        let content4 = collected.first().content
                    
                                        message.channel.send({ embeds: [build5] }).then(async () => {
                                            message.channel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                            .then(async collected => {
                                                let newcol = collected.first().content.toLowerCase()
                                                if(newcol === 'end') return message.channel.send({ content: `**Sticky Message Builder Ended.**` }).catch(e => {});
                                                let content5 = collected.first().content
                                                
                                                await con.query(`INSERT INTO stickymsgs (channel, message, embed, color) VALUES ('${deChan}', '${content5}', '${embedf}', '${content4}')`, async (err, row) => {
                                                    if(err) {
                                                        console.log(err)
                                                    }
                                                }); 

                                                message.channel.send({ embeds: [build6] }).catch(e => {});
                            
                                            }).catch(e => {})
                                        }).catch(e => {})
                    
                                    }).catch(e => {})
                                }).catch(e => {})
                            } else if(content3 === 'no') {
                                let embedf = 'false'
                                message.channel.send({ embeds: [build5] }).then(async() => {
                                    message.channel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                    .then(async collected => {
                                        let newcol = collected.first().content.toLowerCase()
                                        if(newcol === 'end') return message.channel.send({ content: `**Sticky Message Builder Ended.**` }).catch(e => {});
                                        let content5 = collected.first().content
                                        await con.query(`INSERT INTO stickymsgs (channel, message, embed, color) VALUES ('${deChan}', '${content5}', '${embedf}', 'na')`, async (err, row) => {
                                            if(err) {
                                                console.log(err)
                                            }
                                        }); 
                                        message.channel.send({ embeds: [build6] }).catch(e => {});
                    
                                    }).catch(e => {})
                                }).catch(e => {})
                            } else {
                                return message.channel.send({ content: `Invalid entry, please choose \`yes\` or \`no\`\n**Builder Cancelled.**` }).catch(e => {});
                            }

                        }).catch(e => {})
                    }).catch(e => {})
                }
            });
        }).catch(e => {})
    }).catch(e => {})
    
}

exports.info = {
    name: "stickyadd",
    description: "Add a sticky message.",
    aliases: ['addsticky', 'newsticky', 'stickynew', 'stickycreate', 'createsticky']
}