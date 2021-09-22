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

const { MessageEmbed } = require("discord.js");

module.exports = async(client, con, distube, channel) => {

    if(!channel) return;
    if(channel.partial) await channel.fetch()

        if(client.config.logging_module.channelDelete) {

            client.config.logging_module.channelDeleteChannels.forEach(async chan => {
    
                const thechannel = await client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_DELETE"});
                    const Entry = AuditLogFetch.entries.first();
                    const logembed = new MessageEmbed()
                    .setColor(`${client.config.logging_module.channelDeleteColorhex || client.config.colorhex}`)
                    .setAuthor(`Action Logs - Channel Deleted`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Channel ID:`, value: `${channel.id}`},
                        {name: `Channel Name:`, value: `${channel.name}`},
                    )
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                }
            
            });

            }
}