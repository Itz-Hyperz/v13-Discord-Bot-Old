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

    const per = client.config.permissions_module.moderation
    if(!message.member.roles.cache.some(h=>per.includes(h.id))) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    let lol = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setAuthor(`Poll by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setDescription(args.join(" "))
    .setTimestamp()
    .setFooter(client.config.copyright)

    message.channel.send({ embeds: [lol] }).then(async msg => {
        await msg.react("👍")
        await msg.react("👎")
    }).catch(e => {});
                        

}

exports.info = {
    name: "poll",
    description: "Create a new poll",
    aliases: []
}