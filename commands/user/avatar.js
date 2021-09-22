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

    let deUser;

    if(message.mentions.users.first()) {
        deUser = await client.utils.userFetch(client, message.mentions.users.first().id);
    } else if(!isNaN(args[0])) {
        deUser = await client.utils.userFetch(client, args[0]);
    } else {
        deUser = message.author;
    }

    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(`${deUser.username}'s Avatar`)
    .setImage(deUser.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(client.config.copyright)

    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "avatar",
    description: "Get a users avatar.",
    aliases: ['stealav', 'stealavatar', 'getavatar', 'grabavatar', 'avgrab']
}