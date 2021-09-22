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

    if(!client.config.utility_module.useReviews) return client.utils.sendError("This module is currently disabled.", message.channel)

    const per = client.config.permissions_module.reviews
    if(!message.member.roles.cache.some(h=>per.includes(h.id))) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    const filter = m => m.author.id === message.author.id;
    
    let embed0 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`**Please label the product/service your are reviewing.**\nType \`end\` if you wish to cancel.`)

    let embed1 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`**Please rate the product out of 5!**\nType \`end\` if you wish to cancel.`)
    
    let embed2 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`**Please include a message for your review!**\nType \`end\` if you wish to cancel.`)

    message.channel.send({ embeds: [embed0] }).then(() => {
        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
        .then(collected => {
            let newcol = collected.first().content.toLowerCase()
            if(newcol === 'end') {
                return message.channel.send({ content: "**Review Cancelled.**" })
            } else {
                let data0 = collected.first().content
                message.channel.send({ embeds: [embed1] }).then(() => {
                    message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                    .then(collected => {
                        let newcol = collected.first().content.toLowerCase()
                        if(newcol === 'end') {
                            return message.channel.send({ content: "**Review Cancelled.**" })
                        } else {
                            let data1 = collected.first().content
                            message.channel.send({ embeds: [embed2] }).then(() => {
                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                .then(collected => {
                                    let newcol = collected.first().content.toLowerCase()
                                    if(newcol === 'end') {
                                        return message.channel.send({ content: "**Review Cancelled.**" })
                                    } else {
                                        let check = Number(data1)
                                        if(!check) return message.channel.send({ content: "Please include a **valid** # of stars for a rating." }).catch(e => {});
                                        message.channel.send({ content: client.config.utility_module.reviewSentMessage }).catch(e => {});
                                        let data2 = collected.first().content
                                        let embed3 = new MessageEmbed()
                                        .setAuthor(`${message.author.tag}'s Review`, message.author.displayAvatarURL())
                                        .setColor(client.config.colorhex)
                                        .addField('Product / Service', data0, true)
                                        .addField('Rating', `${data1} ⭐'s`, true)
                                        .addField('Review Comment', data2, false)
                                        .setTimestamp()
                                        .setFooter(client.config.copyright)
                                        try { embed3.setThumbnail(message.guild.iconURL({ dynamic: true })) } catch(e) {}
                                        client.config.utility_module.reviewsChannelIds.forEach(async c => {
                                            let chan = await client.channels.cache.get(c)
                                            chan.send({ embeds: [embed3] }).then(async msg => {
                                                await msg.react("❤️")
                                            }).catch(e => {});
                                        });
                                    }
                                }).catch(e => {})
                            }).catch(e => {})
                        }
                    }).catch(e => {})
                }).catch(e => {})
            }
        }).catch(e => {})
    }).catch(e => {})

}

exports.info = {
    name: "review",
    description: "Leave a review.",
    aliases: ['idea']
}