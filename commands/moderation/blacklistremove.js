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
        const goodboiroles = client.config.utility_module.roleToGiveWhenUnBlacklisted

        if(pingeduser) {

                pingeduser.roles.remove(deRole)
                goodboiroles.forEach(r => {
                    pingeduser.roles.add(r)
                });


                try {

                    const roleEmbed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`You Were Un-Blacklisted!`)
                    .setDescription(`You were unblacklisted from the server!`)
                    .setThumbnail(`${client.config.utility_module.removeBlacklistImageURL}` || pingeduser.user.avatarURL({ dynamic: true }) || message.guild.iconURL({dynamic: true}))
                    .setFooter(`${client.config.copyright}`)
                
                    pingeduser.send({ embeds: [roleEmbed] }).catch(e => {})
                    

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
                        .setTitle(`Blacklist Entry Revoked!`)
                        .setDescription(`**User Tag:** ${pingeduser.user.tag}\n**User ID:** ${pingeduser.user.id}\n \n**Update:** \`The blacklist placed on this user was revoked!\``)
                        .setThumbnail(`${client.config.utility_module.removeBlacklistImageURL}` || pingeduser.user.avatarURL({ dynamic: true }) || message.guild.iconURL({dynamic: true}))
                        .setFooter(`${client.config.copyright}`)
                        thechannel.send({ embeds: [logembed] }).catch(e => {})
                    }
                
                });

    } else {
        message.channel.send({ content: `I was unable to find that user.` }).catch(e => {})
    }
} else {
    message.channel.send({ content: `This module is disabled.` }).catch(e => {})
}
}

exports.info = {
    name: 'blacklistremove',
    description: 'Removes a user from the blacklist role.',
    aliases: ['removeblacklist', 'unblacklist']
}