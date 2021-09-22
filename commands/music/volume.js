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

const voice = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args, con) => {

    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send({ content: "You must be in a voice channel to use this command." });

    let error = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`You must include a new volume.`)
    if(!args[0]) return message.channel.send({ embeds: [error] })
    if(!Number(args[0]) && args[0] !== '0') return message.channel.send(`Please include a valid number to set the volume to.`) 

    try {
        client.distube.setVolume(message, Number(args[0]))
    } catch(e) {
        console.log(e)
    }

}

exports.info = {
    name: "volume",
    description: "Change the volume of the music!",
    aliases: ['v', 'vol']
}