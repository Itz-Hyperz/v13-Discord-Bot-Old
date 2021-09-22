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

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

            let server = message.guild;
            let kickedmember = message.mentions.users.first().id;
            let target;
            if(message.mentions.users.first()) {
                target = await client.utils.userFetch(client, message.mentions.users.first().id)
            } else if(!isNaN(args[0])) {
                target = await client.utils.userFetch(client, args[0])
            } else {
                return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
            }

            try {
                
                if(!args[1]) {

                    const kickEmbed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                    .setTitle(`Kick Successful`)
                    .setDescription('I have kicked that member in this server.')
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                
                    message.channel.send({ embeds: [kickEmbed] }).catch(e => {})

                    const dmEmbed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`⚠️ You've Been Kicked! ⚠️`)
                    .addFields(
                        {name: `Kicked By:`, value: `${message.author.tag}`, inline: true},
                        {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                        {name: `Reason:`, value: `No reason provided...`},
                    )
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                
                    target.send({ embeds: [dmEmbed] }).catch(e => {});

                    setTimeout(async function(){
                        message.guild.members.cache.get(kickedmember).kick()
                        await con.query(`SELECT * FROM users WHERE userid='${kickedmember}'`, async (err, row) => {
                            await con.query(`UPDATE users SET kicks = kicks + 1 WHERE userid='${kickedmember}'`, async (err, row) => {});
                        });

                        await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                            let uniqueid = row[0].total + 1
                            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${kickedmember}', 'No reason provided.', '${uniqueid}', '${message.author.id}', 'Kick')`, async (err, row) => {});
                        });

                        if(client.config.logging_module.punishments) {

                            client.config.logging_module.punishmentsChannels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new MessageEmbed()
                                        .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                                        .setAuthor(`Action Logs - User Kicked`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `Enforcer:`, value: `${message.author.tag}`},
                                            {name: `User ID:`, value: `${kickedmember}`},
                                            {name: `User Tag:`, value: `${target.tag}`},
                                            {name: `Reason:`, value: `No reason provided`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${client.config.copyright}`)
                                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                                }
                            
                            }); 
                    
                        }

                    }, 2500)

                } else {

                    const kickEmbed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                    .setTitle(`Kick Successful`)
                    .setDescription('I have kicked that member in this server.')
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                
                    message.channel.send({ embeds: [kickEmbed] }).catch(e => {})

                    const dmEmbed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`⚠️ You've Been Kicked! ⚠️`)
                    .addFields(
                        {name: `Kicked By:`, value: `${message.author.tag}`, inline: true},
                        {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                        {name: `Reason:`, value: `${args.slice(1).join(" ")} `},
                    )
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                
                    target.send({ embeds: [dmEmbed] }).then(msg => {
                        message.channel.send({ content: `I have successfully alerted the user privately.` }).catch(e => {});
                    }).catch(e => {});

                    setTimeout(async function(){
                        message.guild.members.cache.get(kickedmember).kick()
                        await con.query(`SELECT * FROM users WHERE userid='${kickedmember}'`, async (err, row) => {
                            let curcount = row[0].kicks + 1
                            await con.query(`UPDATE users SET kicks='${curcount}' WHERE userid='${kickedmember}'`, async (err, row) => {});
                        });

                        await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                            let uniqueid = row[0].total + 1
                            let refinedreason = args.slice(1).join(" ").replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${kickedmember}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Kick')`, async (err, row) => {});
                        });

                        if(client.config.logging_module.punishments) {

                            client.config.logging_module.punishmentsChannels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new MessageEmbed()
                                        .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                                        .setAuthor(`Action Logs - User Kicked`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `Enforcer:`, value: `${message.author.tag}`},
                                            {name: `User ID:`, value: `${kickedmember}`},
                                            {name: `User Tag:`, value: `${target.tag}`},
                                            {name: `Reason:`, value: `${args.slice(1).join(" ")}`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${client.config.copyright}`)
                                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                                }
                            
                            }); 
                    
                        }

                    }, 2500)

                }

                // end of command shit here lol
                message.delete().catch(e => {});

            } catch(e) {
                if(client.config.debugmode) return console.log(e);
            }
}

exports.info = {
    name: 'kick',
    description: 'A command.',
    aliases: ['remove', 'kik']
}