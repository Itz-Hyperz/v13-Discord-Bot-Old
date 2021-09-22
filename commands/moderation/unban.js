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

const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, con) => {

    let g = message.guild

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

          if(args[1]) {
            message.channel.send({ content: `I couldn't find a user with the ID: \`${args.join(" ")}\`` }).catch(e => {})
          } else {
            let memberbanned = args[0]
            if(!client.users.fetch(memberbanned)) {
              message.channel.send({ content: `I couldn't find a user with the ID: \`${args.join(" ")}\`` }).catch(e => {})
            } else {

          try {
            g.bans.fetch().then(bs => {
              bs.forEach(b => {
                if(b.user.id == memberbanned) {
                  g.members.unban(`${memberbanned}`).catch(e => {if(client.config.debugmode) return console.log(e);});
                }
              });
            });
          } catch(e) {
            if(client.config.debugmode) return console.log(e);
          }

          con.query(`SELECT * FROM offlinebans WHERE id='${memberbanned}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
              await con.query(`DELETE FROM offlinebans WHERE id='${memberbanned}'`, async (err, row) => {
                if(err) throw err;
              });
            }
          });

          await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
            let uniqueid = row[0].total + 1
            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${memberbanned}', 'User Un-banned', '${uniqueid}', '${message.author.id}', 'Un-Ban')`, async (err, row) => {});
          });

          if(client.config.logging_module.punishments) {

            client.config.logging_module.punishmentsChannels.forEach(async chan => {
        
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const logembed = new MessageEmbed()
                    .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                        .setAuthor(`Action Logs - User Un-Banned`, client.user.displayAvatarURL())
                        .addFields(
                            {name: `User ID:`, value: `${memberbanned}`},
                            {name: `Enforcer:`, value: `${message.author.tag}`},
                        )
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)
                    thechannel.send({ embeds: [logembed] }).catch(e => {});
                }
            
            }); 
    
        }

          const embed = new MessageEmbed()
          .setColor(client.config.colorhex)
          .setTitle("User Un-Banned")
          .setDescription("I have un-banned that user.")
          .setTimestamp()
          .setFooter(`${client.config.copyright}`)
          message.channel.send({ embeds: [embed] }).catch(e => {});
        }
        }
}

exports.info = {
  name: 'unban',
  description: 'Unbans a user.',
  aliases: ['unbanish', 'pardon']
}