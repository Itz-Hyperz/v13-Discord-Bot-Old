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

    if(message.channel.name.includes('app-')) {
        let embed = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Cancelling & Closing Application!**\n⏰ 10 Seconds...`)
        message.channel.send({ embeds: [embed] }).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        setTimeout(() => {
            message.channel.delete().catch(e => {});
        }, 10000)
    } else {
        message.channel.send({ content: "This is not an application channel." }).catch(e => {});
    }

}

exports.info = {
    name: "cancel",
    description: "Cancel an active application!",
    aliases: ['appcancel', 'cancelapp', 'endapp']
}