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

    if(!client.config.utility_module.useSupportCommands) return client.utils.sendError("This module is currently disabled.", message.channel);

    const per = client.config.permissions_module.support
    if(!message.member.roles.cache.some(h=>per.includes(h.id))) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    let item = 'member'
    if(args[0] === 'customer') {
        item = 'customer'
    }

    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(client.config.utility_module.supportMessageHeader)
    .setTimestamp()
    .setFooter(client.config.copyright)

    if(item === 'customer') {
        embed.setDescription(client.config.utility_module.supportCustomerMessage)
    } else {
        embed.setDescription(client.config.utility_module.supportMemberMessage)
    }

    if(client.config.utility_module.supportMessageThumbnail) {
        try {
            embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
        } catch(e) {}
    }

    await message.channel.send({ embeds: [embed] }).catch(e => {});

}

exports.info = {
    name: "support",
    description: "See if im alive!",
    aliases: []
}