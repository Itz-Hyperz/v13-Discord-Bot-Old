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

const { MessageEmbed } = require('discord.js')
const ms = require('ms')
exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    let check = await client.utils.permCheck(client, message, 'economyManagers')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    if(!client.config.economy_module.itemCreate) return message.channel.send({ content: "This module is disabled." }).catch(e => {});

            const filter = m => m.author.id === message.author.id;

            const starter = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**ITEM BUILDER STARTED!**\nType \`end\` to cancel the builder.`)
      
            const builder0 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **name** for this product.`)

            const builder0001 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please define a **price** for this product.\nEx: \`14\` for ${client.config.econCurrency}14`)
      
            const finish = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**Item has been listed!**`)

            let counted;

            message.channel.send({ embeds: [starter] }).catch(e => {});

            message.channel.send({ embeds: [builder0] }).then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                .then(collected => {
                    let content0l = collected.first().content.toLowerCase()
                    let content0 = collected.first().content

                    if(content0l === 'end') return message.channel.send({ content: `**Item Builder Cancelled!**` }).catch(e => {});
        
                    message.channel.send({ embeds: [builder0001] }).then(() => {
                        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                        .then(async collected => {
                            let content0001l = collected.first().content.toLowerCase()
                            let content0001 = Number(collected.first().content)
                            if(content0001l === 'end') return message.channel.send({ content: `**Item Builder Cancelled!**` }).catch(e => {});
                            if(!content0001) return message.channel.send({ content: "That is not a valid price!" });
                            await con.query(`SELECT COUNT(productId) as total FROM shop`, async (err, row) => {
                                if(err) throw err;
                                counted = Number(row[0].total + 1)
                            });
                            setTimeout(async () => {
                                await con.query(`INSERT INTO shop (productId, productName, productPrice) VALUES (${counted}, "${content0}", ${content0001})`, async (err, row) => {
                                    if(err) console.log(err)
                                });
                                message.channel.send({ embeds: [finish] })
                            }, 200)

                    }).catch(e => {});
                }).catch(e => {});
            }).catch(e => {});
        }).catch(e => {});
}

exports.info = {
    name: 'itemcreate',
    description: 'Econonmy System Component.',
    aliases: ['createitem', 'additem', 'itemadd', 'newshopitem']
}