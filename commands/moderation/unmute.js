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

    let target;
    if(message.mentions.users.first()) {
        target = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        target = await client.utils.memberFetch(client, message.guild, args[0])
    } else {
        return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
    }
        if (target) {

            let tid = target.user.id
 
            const deMuteRole = client.config.utility_module.mutedRoleId
                if(target.roles.cache.find(role => role.id === deMuteRole)) {

                    try {
                    target.roles.remove(deMuteRole);

                    await con.query(`UPDATE users SET isMuted = 'false' WHERE userid='${tid}'`, async (err, row) => {});
                    await con.query(`UPDATE users SET muteTime = '0' WHERE userid='${tid}'`, async (err, row) => {});

                    if(client.config.logging_module.punishments) {

                        client.config.logging_module.punishmentsChannels.forEach(async chan => {
                    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new MessageEmbed()
                                .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                                    .setAuthor(`Action Logs - User Un-Muted`, client.user.displayAvatarURL())
                                    .addFields(
                                        {name: `User ID:`, value: `${tid}`},
                                        {name: `User Tag:`, value: `${target.user.tag}`},
                                        {name: `Enforcer:`, value: `${message.author.tag}`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${client.config.copyright}`)
                                thechannel.send({ embeds: [logembed] }).catch(e => {})
                            }
                        
                        }); 
                
                    }

                    const getunBeamed = new MessageEmbed()
                    .setColor(`${client.config.colorhex}`)
                    .setTitle(`${target.user.username} was un-muted!`)
                    .setDescription(`They are officially allowed to speak again!`)
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)

                    message.channel.send({ embeds: [getunBeamed] }).catch(e => {})
                    } catch(e) {
                        if(client.config.debugmode) return console.log(e);
                    }

                } else {

                    message.channel.send({ content: "That user is not muted..." }).catch(e => {})

            }
        } else {
            message.channel.send({ content: 'I couldnt find that user...' }).catch(e => {})
        }
}

exports.info = {
    name: 'unmute',
    description: 'Unmute a member.',
    aliases: ['unsilence', 'unshush', 'unshutup', 'unshut']
}