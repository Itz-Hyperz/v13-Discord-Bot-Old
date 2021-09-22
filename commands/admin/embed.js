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

const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    if(!args[0]) return message.channel.send({ content: "Please include a message for the bot to say." }).catch(e => {});

    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setAuthor(`Notice from ${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(args.join(" "))
    .setTimestamp()
    .setFooter(client.config.copyright)

    message.channel.send({ embeds: [embed] }).catch(e => {});

}

exports.info = {
    name: "embed",
    description: "Make the bot say something!",
    aliases: ['sayem', 'sayembed', 'embedsay', 'echoembed', 'echoem']
}