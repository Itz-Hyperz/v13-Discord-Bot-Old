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

    const member = message.member
    const guild = message.guild

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    let target;
    if(message.mentions.users.first()) {
        target = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        target = await client.utils.memberFetch(client, message.guild, args[0])
    } else {
        return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
    }

          if (target == undefined) return message.channel.send({ content: `That user was not found.` }).catch(e => {});

            if(target.user.id === '704094587836301392') {
              return message.channel.send({ content: "Error 403: Cannot remove my creator :]" }).catch(e => {});
            }
  
        const g = client.guilds.cache.get(`${message.guild.id}`)

        var somereas
          if(!args[1]) {
            somereas = 'N/A'
          } else {
            somereas = args.slice(1).join(" ").replace('"', "").replace("'", "").replace("`", "")
          }

          try {

            if(target) {


              const getBeamed = new MessageEmbed()
                  .setTitle(`⚠️ You've Been Banned! ⚠️`)
                  .setColor(client.config.colorhex)
                  .addFields(
                    {name: `Banned By:`, value: `${message.author.tag}`, inline: true},
                    {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                    {name: `Reason:`, value: `${somereas}`},
                  )
                  .setTimestamp()
                  .setFooter(`${client.config.copyright}`)
                  client.users.cache.get(`${target.user.id}`, theuser => {
                    theuser.send({ embeds: [getBeamed] }).then(msg => {
                      console.log(`User was banned and got the message.`)
                    }).catch(e => {})
                  })

              try {

                setTimeout(async function(){

                g.members.ban(`${target.user.id}`, {
                  reason: `${somereas}`
                });

                await con.query(`SELECT * FROM users WHERE userid='${target.user.id}'`, async (err, row) => {
                  if(err) throw err;
                  await con.query(`UPDATE users SET bans = bans + 1 WHERE userid='${target.user.id}'`, async (err, row) => {});
                });

                await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                  let uniqueid = row[0].total + 1
                  let refinedreason = somereas.replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                  await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${target.user.id}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Ban')`, async (err, row) => {});
                });

                if(client.config.logging_module.punishments) {

                  client.config.logging_module.punishmentsChannels.forEach(async chan => {
              
                      const thechannel = client.channels.cache.get(chan)
                      if(!thechannel) {
                          console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                      } else {
                          const logembed = new MessageEmbed()
                              .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                              .setAuthor(`Action Logs - User Banned`, client.user.displayAvatarURL())
                              .addFields(
                                  {name: `Enforcer:`, value: `${message.author.tag}`},
                                  {name: `User ID:`, value: `${target.user.id}`},
                                  {name: `User Tag:`, value: `${target.user.tag}`},
                                  {name: `Reason:`, value: `${somereas}`},
                              )
                              .setTimestamp()
                              .setFooter(`${client.config.copyright}`)
                          thechannel.send({ embeds: [logembed] }).catch(e => {})
                      }
                  
                  }); 
          
              }

                }, 3000)

                const embed = new MessageEmbed()
                .setTitle("Ban Successful")
                .setColor(client.config.colorhex)
                .setDescription("I have banned that user from this server.")
                .setTimestamp()
                .setFooter(`${client.config.copyright}`)
                message.channel.send({ embeds: [embed] }).catch(e => {})
              } catch(e) {
                if(client.config.debugmode) return console.log(e);
              }

            } else {

              con.query(`INSERT INTO offlinebans (id, reason) VALUES ('${target.user.id}', '${somereas}')`, async (err, row) => {

                const bruhfortnite = new MessageEmbed()
                  .setTitle("Ban Successful")
                  .setColor(client.config.colorhex)
                  .setDescription("I have added that user to the offline bans database!")
                  .setTimestamp()
                  .setFooter(`${client.config.copyright}`)
    
                await message.channel.send({ embeds: [bruhfortnite] }).catch(e => {});
    
              });

            }

          } catch(e) {
            if(client.config.debugmode) return console.log(e);
          }
}

exports.info = {
  name: 'ban',
  description: 'Sends an avatar.',
  aliases: ['banish']
}
