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
module.exports = async(client, con, member, invite, inviter) => {
    if(client.config.logging_module.invites) {
        let logembed = new MessageEmbed()
        .setColor(client.config.logging_module.invitesColorhex || client.config.colorhex )
        .setTitle(`Invite Logging Info:`)
        .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
        .addFields(
            { name: `New Member:`, value: `${member.user.tag}`, inline: true },
            { name: `Invited By:`, value: `${inviter.tag}`, inline: true },
            { name: `Invite Code:`, value: `${invite.code}`, inline: true },
            { name: `Invite Uses:`, value: `${invite.uses}`, inline: true },
            { name: 'Highest Role:', value: `${member.roles.highest}`, inline: true },
            { name: `Joined Discord:`, value: `${member.user.createdAt.toLocaleString()}`, inline: true }, )
        .setTimestamp()
        .setFooter(`${client.config.copyright}`)
        client.config.logging_module.invitesChannels.forEach(async c => {
            let thechannel = await client.channels.cache.get(c)
            if(thechannel == undefined) {
                console.log(`Invite logging config channel ID is invalid.`)
            } else {
                thechannel.send({ embeds: [logembed] }).catch(e => {
                    console.log(e)
                });
            }
        });
    }

}