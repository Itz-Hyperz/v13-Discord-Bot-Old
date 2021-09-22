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

const { MessageEmbed, RichEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

        const yikeslol = client.config.memeSubReddit
        const https = require('https');
        const url = `https://www.reddit.com/r/${yikeslol}/hot/.json?limit=100`

        if(!yikeslol) return console.log(`term: memeSubReddite in: config.js is: empty`);

        message.channel.send({ content: `Grabbing ya a meme.` }).then(msg => {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 3000)
        }).catch(e => {})
        
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    const textembed = new MessageEmbed()
                        .setColor(`${client.config.colorhex}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)

                    message.channel.send({ embeds: [textembed] }).catch(e => {})
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')

                if (index.post_hint !== 'image') {
                    const textembed = new RichEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send({ embeds: [textembed] }).catch(e => {})
                }
                const imageembed = new MessageEmbed()
                    .setImage(image)
                    .setColor(`${client.config.colorhex}`)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                message.channel.send({ embeds: [imageembed] }).catch(e => {})
            }).on('error', function (e) {
                if(client.config.debugmode) return console.log(e);
            });
        });

}

exports.info = {
    name: "meme",
    description: "Send a meme!",
    aliases: ['getmeme']
}