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

    const msg = client.snipes.get(message.channel.id)

    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setAuthor(msg.author, msg.member.user.displayAvatarURL({dynamic: true}))
    .setTitle(`Sniped The Message!`)
    .setDescription(`\`\`\`${msg.content}\`\`\``)
    .setTimestamp()
    .setFooter(client.config.copyright)
    message.channel.send({ embeds: [embed] }).then(msg => {
        if(client.config.utility_module.deleteSnipes) {
            setTimeout(() => {
                msg.delete().catch(e => {})
            }, 60000)
        }
    }).catch(e => {})

}

exports.info = {
    name: "snipe",
    description: "See if im alive!",
    aliases: []
}