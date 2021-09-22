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


            var pingeduser;
            if(message.mentions.users.first()) {
                pingeduser = message.mentions.users.first()
            } else if(!isNaN(args[0])) {
                pingeduser = await client.users.fetch(args[0])
            } else {
                pingeduser = message.author
            }

            if(!pingeduser) return;

            con.query(`SELECT * FROM chatlvl WHERE userid='${pingeduser.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    const embed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`Users Current Level:`)
                    .setThumbnail(`${pingeduser.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`**Current XP:** ${row[0].userxp}\n**Current Level:** ${row[0].userlvl}`)
                    .setFooter(`${client.config.copyright} | Requested By ${message.author.tag}`)

                    message.channel.send({ embeds: [embed] }).then((msg) => {
                        if(client.config.deleteCommands) {
                            setTimeout(() => {
                                msg.delete().catch(e => {});
                            }, 14000);
                        }
                    }).catch(e => {});
                } else {
                    message.channel.send({ content: `I was unable to find that user...` }).then((msg) => {
                        if(client.config.deleteCommands) {
                            setTimeout(() => {
                                msg.delete().catch(e => {});
                            }, 14000);
                        }
                    }).catch(e => {});
                }
            });

        } catch(e) {
            if(config.main_config.debugmode) return console.log(e)
        }
}

exports.info = {
    name: 'level',
    description: 'Check your level.',
    aliases: ['xp', 'rank', 'lvl']
}