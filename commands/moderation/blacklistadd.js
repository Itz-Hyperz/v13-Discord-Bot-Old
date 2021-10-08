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

    try {

        if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

        let check = await client.utils.permCheck(client, message, 'blacklists')
        if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

            if(client.config.utility_module.useBlacklistSystem) {

                let pingeduser;
                if(message.mentions.users.first()) {
                    pingeduser = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
                } else if(!isNaN(args[0])) {
                    pingeduser = await client.utils.memberFetch(client, message.guild, args[0])
                } else {
                    return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
                }

        const deRole = client.config.utility_module.blacklistedRoleID

        if(pingeduser) {
          
            if(pingeduser.user.id === '') {
              return message.channel.send({ content: "Error 403: Cannot remove my creator :]" }).catch(e => {});
            }

            message.channel.send({ content: `Processing Blacklist...` }).catch(e => {})

            try {
                pingeduser.roles.cache.forEach(r => {
                    if(r.name !== '@everyone') {
                        pingeduser.roles.remove(r, {timeout: 2000}).catch(e => {
                            console.log(`\nUnabled to remove role ${r.name} from ${pingeduser.user.tag}`)
                        });
                    }
                });
            } catch(e) {
                if(client.config.debugmode) return console.log(e);
            }

            setTimeout(function(){
                pingeduser.roles.add(deRole)
            }, 2500);

            if(!args[1]) {

                    try {

                        const roleEmbed = new MessageEmbed()
                        .setColor(client.config.colorhex)
                        .setTitle(`You Were Blacklisted! 🤡`)
                        .setDescription(`You were blacklisted for the reason: N/A\n*If you leave the server, you may be auto-banned.*`)
                        .setThumbnail(`${client.config.utility_module.addBlacklistImageURL}` || pingeduser.user.avatarURL({ dynamic: true }) || message.guild.iconURL({dynamic: true}))
                        .setFooter(`${client.config.copyright}`)
                    
                        pingeduser.send({ embeds: [roleEmbed] })

                    } catch(e) {
                        if(client.config.debugmode) return console.log(e);
                    }

                    client.config.utility_module.logBlacklistsChannels.forEach(chan => {
        
                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            const logembed = new MessageEmbed()
                            .setColor(`${client.config.colorhex}`)
                            .setTitle(`🤡  New Blacklist Entry!`)
                            .setDescription(`**User Tag:** ${pingeduser.user.tag}\n**User ID:** ${pingeduser.user.id}\n \n**Reason:** \`No reason was entered.\``)
                            .setThumbnail(`${client.config.utility_module.addBlacklistImageURL}` || pingeduser.user.avatarURL({ dynamic: true }) || message.guild.iconURL({dynamic: true}))
                            .setFooter(`If they leave the server they may be banned.`)
                            thechannel.send({ embeds: [logembed] })
                        }
                    
                    });
            } else {

                try {
                    const roleEmbed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`You Were Blacklisted! 🤡`)
                    .setDescription(`You were blacklisted for the reason(s):\n **${args.slice(1).join(" ")}**\n \n*If you leave the server, you may be auto-banned.*`)
                    .setThumbnail(`${client.config.utility_module.addBlacklistImageURL}` || pingeduser.user.avatarURL({ dynamic: true }) || message.guild.iconURL({dynamic: true}))
                    .setFooter(`${client.config.copyright}`)
                
                    pingeduser.send({ embeds: [roleEmbed] })

                } catch(e) {
                    if(client.config.debugmode) return console.log(e);
                }

                client.config.utility_module.logBlacklistsChannels.forEach(chan => {
    
                    const thechannel = client.channels.cache.get(chan)
                    if(!thechannel) {
                        console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                    } else {
                        const logembed = new MessageEmbed()
                        .setColor(`${client.config.colorhex}`)
                        .setTitle(`🤡  New Blacklist Entry!`)
                        .setDescription(`**User Tag:** ${pingeduser.user.tag}\n**User ID:** ${pingeduser.user.id}\n \n**Reason:** \`${args.slice(1).join(" ")}\``)
                        .setThumbnail(`${client.config.utility_module.addBlacklistImageURL}` || pingeduser.user.avatarURL({ dynamic: true }) || message.guild.iconURL({dynamic: true}))
                        .setFooter(`If they leave the server they may be banned.`)
                        thechannel.send({ embeds: [logembed] })
                    }
                
                });
                console.log(`------ Ignore Errors Thrown Here ------`)

            }
    } else {
        message.channel.send({ content: `I was unable to find that user.` }).catch(e => {})
    }
} else {
    message.channel.send({ content: `This module is disabled.` }).catch(e => {if(client.config.debugmode) return console.log(e);})
}
} catch(e) {
    if(client.config.debugmode) return console.log(e);
}
}

exports.info = {
    name: 'blacklistadd',
    description: 'Adds a user to the blacklist role.',
    aliases: ['addblacklist', 'blacklist']
}
