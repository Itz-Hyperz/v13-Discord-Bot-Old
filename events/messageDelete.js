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
module.exports = async(client, con, message) => {

    try {
        if (message.partial) await message.fetch();

        if (message.author.bot) return;
        if (!message.author) return;

        await con.query(`UPDATE users SET delMessages = delMessages + 1 WHERE userid='${message.author.id}'`, async (err, row) => {
            if(err) throw err;
        });

        if(message.channel.id === client.config.utility_module.countingChannelId) return;

        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author.tag,
            member: message.member,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null
        });

        await con.query(`SELECT * FROM ticketpanels WHERE messageid='${message.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                await con.query(`DELETE FROM ticketpanels WHERE messageid='${message.id}'`, async (err, row) => {
                    if(err) throw err;
                });
            }
        });

        if(client.config.logging_module.deletedMessages) {
            let logembed = new MessageEmbed()
            .setColor(client.config.logging_module.deletedMessagesColorhex || client.config.colorhex )
            .setAuthor(`Action Logs - Deleted Message`, client.user.displayAvatarURL())
            .addFields(
                {name: `User ID:`, value: `${message.author.id}`},
                {name: `User Tag:`, value: `${message.author.tag}`},
                {name: `Channel:`, value: `<#${message.channel.id}>`},
                {name: `Message Content:`, value: `${message.content}`},
            )
            .setTimestamp()
            .setFooter(client.config.copyright)
            client.config.logging_module.deletedMessagesChannels.forEach(async c => {
                let deChan = await client.channels.cache.get(c)
                if(deChan == undefined) {
                    console.log(`A logging channel ID in your config.js file is incorrect.`)
                } else {
                    deChan.send({ embeds: [logembed] }).catch(e => {});
                }
            });
        }

    } catch(e) {}

}