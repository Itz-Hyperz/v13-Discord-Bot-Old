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
exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    let check = await client.utils.permCheck(client, message, 'support')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    if(!client.config.tickets_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});
    if(!client.config.tickets_module.useTicketPanel) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

            let deButton = client.config.tickets_module.panelButtonName || `Create a ticket!`
            let deStyle = client.config.tickets_module.panelButtonStyle || `SECONDARY`
            const filter = m => m.author.id === message.author.id;

            const starter = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**PANEL BUILDER STARTED!**\nType \`end\` to cancel the builder.`)
      
            const builder0 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **channel** to put this panel in.`)

            const builder0001 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **color** for the embed.`)

            const builder01 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **header** for the embed.`)
      
            const builder1 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **description** for the panel.`)
      
            const builder2 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **category id** for the tickets to go to.`)
      
            const builder3 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define an **opening message**.`)
      
            const finish = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**Panel has been posted!**`)

            let counted;

            message.channel.send({ embeds: [starter] }).catch(e => {});

            message.channel.send({ embeds: [builder0] }).then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                .then(collected => {
                    let content0l = collected.first().content.toLowerCase()
                    let thechannel;
        
                    if(content0l === 'end') return message.channel.send({ content: `**Panel Builder Cancelled!**` }).catch(e => {});
        
                    if(collected.first().mentions.channels.first()) {
                      thechannel = collected.first().mentions.channels.first().id
                    } else if(!isNaN(collected.first().content)) {
                      thechannel = collected.first().content
                    }
        
                    if(thechannel == undefined) return message.channel.send({ content: `Embed process cancelled, I was unable to find the provided channel.` });
        
                    message.channel.send({ embeds: [builder0001] }).then(() => {
                        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                        .then(collected => {
                            let content0001l = collected.first().content.toLowerCase()
                            let content0001 = collected.first().content

                            if(content0001l === 'end') return message.channel.send({ content: `**Panel Builder Cancelled!**` }).catch(e => {});

                            message.channel.send({ embeds: [builder01] }).then(() => {
                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                .then(collected => {
                                    let content00l = collected.first().content.toLowerCase()
                                    if(content00l === 'end') return message.channel.send({ content: `**Panel Builder Cancelled!**` }).catch(e => {});

                                    let contentbruh = collected.first().content

                                    let bruh = collected.first().content

                                    message.channel.send({ embeds: [builder1] }).then(() => {
                                    message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                    .then(collected => {
                                        let content1l = collected.first().content.toLowerCase()
                                        let content1 = collected.first().content
                            
                                        if(content1l === 'end') return message.channel.send({ content: `**Panel Builder Cancelled!**` }).catch(e => {});
                            
                                        message.channel.send({ embeds: [builder2] }).then(() => {
                                            message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                            .then(collected => {
                                                let content2l = collected.first().content.toLowerCase()
                                                let content2 = collected.first().content
                                    
                                                if(content2l === 'end') return message.channel.send({ content: `**Panel Builder Cancelled!**` }).catch(e => {});
                                    
                                                message.channel.send({ embeds: [builder3] }).then(() => {
                                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                                .then(collected => {
                                                    let content3l = collected.first().content.toLowerCase()
                                                    let content3 = collected.first().content
                                        
                                                    if(content3l === 'end') return message.channel.send({ content: `**Panel Builder Cancelled!**` }).catch(e => {});

                                                    con.query(`SELECT COUNT(uniqueid) as total FROM ticketpanels`, async (err, row) => {

                                                        if(err) throw err;
                                                        if(row[0]) {

                                                            counted = row[0].total + 1
                                                            try {
                                                                const row = new MessageActionRow()
                                                                .addComponents(
                                                                    new MessageButton()
                                                                        .setCustomId('createticket')
                                                                        .setLabel(`${deButton}`)
                                                                        .setStyle(`${deStyle}`),
                                                                )

                                                                    const panelEmbed = new MessageEmbed()
                                                                    .setColor(content0001 || client.config.tickets_module.ticketPanelColorHEX || client.config.colorhex)
                                                                    .setTitle(bruh || `Create A Ticket`)
                                                                    .setThumbnail(client.config.tickets_module.panelEmbedURL || message.guild.iconURL({ dynamic: true }))
                                                                    .setDescription(content1 || `Simply **press** the below button to create a new ticket!`)
                                                                    .setTimestamp()
                                                                    .setFooter(`${client.config.copyright}`)

                                                                    let deChan = await client.channels.cache.get(thechannel)
                                                                    await deChan.send({ embeds: [panelEmbed], components: [row] }).then(async msg => {
                                                                        await con.query(`INSERT INTO ticketpanels (uniqueid, messageid, title, categoryid, openmessage) VALUES ('${counted}', '${msg.id}', "${contentbruh}", '${content2}', "${content3}")`, async (err, row) => {
                                                                            if(err) throw err;
                                                                            message.channel.send({ embeds: [finish] }).catch(e => {});
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
            }).catch(e => {});
        }).catch(e => {});
}

exports.info = {
    name: 'ticketpanel',
    description: 'Creates a panel for tickets.',
    aliases: ['newpanel', 'createpanel', 'panelticket', 'panel']
}