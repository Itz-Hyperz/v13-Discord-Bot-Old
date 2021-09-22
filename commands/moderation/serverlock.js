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

const ms = require('ms');
var serverLock = false;
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

                client.on('guildMemberAdd', async member => {
                    if(member.guild.id == client.config.your_guild_id) {
                    if(serverLock) {
                        try{

                            const embed = new MessageEmbed()
                            .setColor(`${client.config.logging_module.serverLockColorhex || client.config.colorhex}`)
                            .setTitle(`⚠️  Notification  ⚠️`)
                            .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL({dynamic: true})}`)
                            .setDescription(`This is an automated message to inform you, that you have been __removed__ from **${member.guild.name}**.\n\n**Reason:** Server is in Lockdown Mode. We recommend you try joining at a later time!`)
                            .setTimestamp()
                            .setFooter(`${client.config.copyright}`)

                            member.send({ embeds: [embed] }).catch(e => {});

                        } catch(e) {

                            if(client.config.debugmode) return console.log(e);

                        }

                        setTimeout(() => {
                            member.guild.members.cache.get(member.user.id).kick()
                            if(client.config.debugmode) return console.log(`${member.user.tag} was kicked, server lockdown.`);
                        }, 2600)

                        if(client.config.logging_module.serverLock) {
                            client.config.logging_module.serverLockChannels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new MessageEmbed()
                                    .setColor(`${client.config.logging_module.serverLockColorHex || client.config.colorhex}`)
                                    .setTitle(`Lockdown Removal!`)
                                    .setThumbnail(`${member.user.avatarURL({dynamic: true})}`)
                                    .addFields(
                                        {name: `User:`, value: `${member.user.tag}`},
                                        {name: `Action:`, value: `Kicked`},
                                        {name: `Reason:`, value: `Server Lockdown`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${client.config.copyright}`)
    
                                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                                }
                            
                            });
                        }

                    }
                }
                });
            
                var farts = {};
            
                farts.toggleServerLock = function(bruhchan) {
                    serverLock = !serverLock;
                    bruhchan.send(`Server lockdown toggled: \`${serverLock}\``)

                    if(client.config.logging_module.serverLock) {
                        client.config.logging_module.serverLockChannels.forEach(async chan => {

                            let cringe = message.member
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new MessageEmbed()
                                .setColor(`${client.config.logging_module.serverLockColorHex || client.config.colorhex}`)
                                .setTitle(`Server Lockdown Toggled!`)
                                .setThumbnail(`${cringe.user.avatarURL({dynamic: true})}`)
                                .addFields(
                                    {name: `User:`, value: `${cringe.user.tag}`},
                                    {name: `Toggled:`, value: `${serverLock}`},
                                )
                                .setTimestamp()
                                .setFooter(`${client.config.copyright}`)

                                thechannel.send({ embeds: [logembed] }).catch(e => {})
                            }
                        
                        });
                    }

                };

                farts.toggleServerLock(message.channel);
}

exports.info = {
    name: 'serverlock',
    description: 'Lock the server.',
    aliases: ['lockserver', 'serverlockdown']
}