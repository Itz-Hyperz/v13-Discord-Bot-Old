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

    try {

        if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

            if(!client.config.leveling_config.enabled) return message.channel.send({ content: `This module is currently disabled...` }).catch(e => {});

            let index = 0;
            let poop = [];
            let top15users = "";

            await con.query(`SELECT * FROM chatlvl ORDER BY userxp DESC LIMIT 15`, async (err, row) => {
                row.forEach(u => {
                    let t = message.guild.members.cache.find(p => p.id == u.userid);
                    if(t) {
                        poop.push({chatInfo: u, username: t.user.tag});
                    } else {
                        poop.push({chatInfo: u, username: "Unknown User (Left)"});
                    }
                });

                poop.forEach(Y => {
                    index++;
                    if(index < 10) index = `0${index}`;
                    if (index == 1) {
                        top15users += `\`${index}.\` :first_place: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    } else if (index == 2) {
                        top15users+= `\`${index}.\` :second_place: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    } else if (index == 3) {
                        top15users+= `\`${index}.\` :third_place: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    } else if ( index <= 15 ) {
                        top15users+= `\`${index}.\` :checkered_flag: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    }
                });

                const embed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`__${message.guild.name}__ Chat Leaderboard`)
                    .setThumbnail(message.guild.iconURL({dynamic: true}))
                    .setDescription(top15users)
                    .setFooter(`${client.config.copyright} | Requested By ${message.author.tag}`)
                
                    message.channel.send({ embeds: [embed] }).then((msg) => {
                        if(client.config.deleteCommands) {
                            setTimeout(() => {
                                msg.delete().catch(e => {});
                            }, 14000);
                        }
                    }).catch(e => {});

            });

        } catch(e) {
            if(client.config.main_config.debugmode) return console.log(e)
        }
}

exports.info = {
    name: 'lb',
    description: 'Check the leaderboard.',
    aliases: ['ranks', 'leaderboard']
}