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
const ms = require('ms')

exports.run = async (client, message, args, con) => {

    if(!args[0]) return message.channel.send({ content: "Please define a time.\nEx: \`10m\` is 10 minutes." }).catch(e => {});
    if(!args[1]) return message.channel.send({ content: "Please define a thing for the timer to remind you about.\nEx: \`Become MLG Gamer\`" }).catch(e => {});

    let embed1 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(`Timer Set!`)
    .setAuthor(`${message.author.tag}'s Timer`, message.author.displayAvatarURL())
    .setDescription(`I will remind you in \`${args[0]}\` to \`${args.slice(1).join(" ")}\``)
    .setTimestamp()
    .setFooter(client.config.copyright)

    let embed2 = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(`Timer Up!`)
    .setAuthor(`${message.author.tag}'s Timer`, message.author.displayAvatarURL())
    .setDescription(`**Time: **\`${args[0]}\`\n**Note: **\`${args.slice(1).join(" ")}\``)
    .setTimestamp()
    .setFooter(client.config.copyright)

    message.channel.send({ embeds: [embed1] }).catch(e => {})

    setTimeout(async () => {
        message.channel.send({ content: `<@${message.author.id}>`, embeds: [embed2] }).catch(e => {})
    }, ms(args[0]));

}

exports.info = {
    name: "timer",
    description: "Set a timer.",
    aliases: ['settimer']
}