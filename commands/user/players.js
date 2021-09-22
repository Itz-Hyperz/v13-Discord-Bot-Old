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
const axios = require('axios')
const chalk = require('chalk')

exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    if(!client.config.fivem_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});
    if(!client.config.fivem_module.playersCommand) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

    await client.config.fivem_module.servers.forEach(async server => {
        if(server.server >= 2) {
            setTimeout(async () => {
                let check = await axios({
                    method: 'get',
                    url: `http://${server.serverIPPort}/players.json`,
                }).catch(e => console.log(e));
                if(check) {
                    let array = [];
                    await check.data.forEach(d => {
                        array.push(`\`${d.id}\` - ${d.name}`)
                    });
                    setTimeout(async () => {
                        let embed = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setColor(client.config.colorhex)
                        .setTitle(`Server ${server.server} Players`)
                        .setDescription(`**ID** - **Username**\n${array.reverse().join("\n")}`)
                        message.channel.send({ embeds: [embed] }).then((msg) => {
                            if(client.config.deleteCommands) {
                                setTimeout(() => {
                                    msg.delete().catch(e => {});
                                }, 18000);
                            }
                        }).catch(e => {});
                    }, 500)
                }
            }, 300)
        } else {
            let check = await axios({
                method: 'get',
                url: `http://${server.serverIPPort}/players.json`,
            }).catch(e => console.log(e));
            if(check) {
                let array = [];
                await check.data.forEach(d => {
                    array.push(`\`${d.id}\` - ${d.name}`)
                });
                setTimeout(async () => {
                    let embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor(client.config.colorhex)
                    .setTitle(`Server ${server.server} Players`)
                    .setDescription(`**ID** - **Username**\n${array.reverse().join("\n")}`)
                    message.channel.send({ embeds: [embed] }).then((msg) => {
                        if(client.config.deleteCommands) {
                            setTimeout(() => {
                                msg.delete().catch(e => {});
                            }, 18000);
                        }
                    }).catch(e => {});
                }, 500)
            }
        }
    });

}

exports.info = {
    name: "players",
    description: "View FiveM server players list!",
    aliases: ['fivemplayers', 'playerlist']
}