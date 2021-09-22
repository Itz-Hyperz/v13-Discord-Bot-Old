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

    if(!client.config.utility_module.useBugReports) return client.utils.sendError("This module is currently disabled.", message.channel)

    const per = client.config.permissions_module.bugreports
    if(!message.member.roles.cache.some(h=>per.includes(h.id))) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    const filter = m => m.author.id === message.author.id;
    
    let embed0 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`**Please state what you believe the severity of the bug is! (1-10)**\nType \`end\` if you wish to cancel.`)

    let embed1 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`**Please state what you belive the bug is!**\nType \`end\` if you wish to cancel.`)

    let embed2 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`**Please provide detailed instructions on how to find this bug!**\nType \`end\` if you wish to cancel.`)

    message.channel.send({ embeds: [embed0] }).then(() => {
        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
        .then(collected => {
            let newcol = collected.first().content.toLowerCase()
            if(newcol === 'end') {
                return message.channel.send({ content: "**Bug Report Cancelled.**" })
            } else {
                let data0 = collected.first().content
                message.channel.send({ embeds: [embed1] }).then(() => {
                    message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                    .then(collected => {
                        let newcol = collected.first().content.toLowerCase()
                        if(newcol === 'end') {
                            return message.channel.send({ content: "**Bug Report Cancelled.**" })
                        } else {
                            let data1 = collected.first().content
                            message.channel.send({ embeds: [embed2] }).then(() => {
                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                .then(collected => {
                                    let newcol = collected.first().content.toLowerCase()
                                    if(newcol === 'end') {
                                        return message.channel.send({ content: "**Bug Report Cancelled.**" })
                                    } else {
                                        message.channel.send({ content: client.config.utility_module.bugReportsSentMessage }).catch(e => {});
                                        let data2 = collected.first().content
                                        let embed3 = new MessageEmbed()
                                        .setAuthor(`${message.author.tag}'s Bug Report`, message.author.displayAvatarURL())
                                        .setColor(client.config.colorhex)
                                        .addField('Severity', data0, false)
                                        .addField('Brief Description', data1, false)
                                        .addField('Detailed Description', data2, false)
                                        .addField('NOTICE', `React with ✅ to mark this report as fixed.`, false)
                                        .setTimestamp()
                                        .setFooter(client.config.copyright)
                                        try { embed3.setThumbnail(message.guild.iconURL({ dynamic: true })) } catch(e) {}
                                        client.config.utility_module.bugReportsChannelIds.forEach(async c => {
                                            let chan = await client.channels.cache.get(c)
                                            chan.send({ embeds: [embed3] }).then(async msg => {
                                                await msg.react("✅")
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
    name: "bugreport",
    description: "Create a bug report.",
    aliases: ['reportbug', 'report', 'bug']
}