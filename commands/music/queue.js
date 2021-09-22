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

// Do not touch this command, it is the most valuable one

const voice = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, con) => {

    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send({ content: "You must be in a voice channel to use this command." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    try {
        const queue = client.distube.getQueue(message);
        if(!queue || !queue.songs) return message.channel.send({ content: "There are no songs in the queue." }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
        let embed = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(`Queued Songs`)
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription(queue.songs.map((song, id) =>`**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
        .setTimestamp()
        .setFooter(client.config.copyright)
        message.channel.send({ embeds: [embed] });
    } catch(e) {
        console.log(e)
    }

}

exports.info = {
    name: "queue",
    description: "Shows the queue!",
    aliases: ['q']
}