const { MessageEmbed } = require('discord.js')

module.exports = async (client, con, oldChannel, newChannel) =>{

        if(oldChannel.partial) await oldChannel.fetch()
        if(newChannel.partial) await newChannel.fetch()

    if(oldChannel.type == 'category') return;
    if(newChannel.type == 'category') return;
    if(!oldChannel.parent) return;
    if(!newChannel.parent) return;

    if(oldChannel.id === client.config.serverstats_module.membercountchannelid) return;
    if(oldChannel.id === client.config.serverstats_module.usercountchannelid) return;
    if(oldChannel.id === client.config.serverstats_module.botcountchannelid) return;

    if(client.config.logging_module.channelUpdate) {

      client.config.logging_module.channelUpdateChannels.forEach(async chan => {

          const thechannel = await client.channels.cache.get(chan)
          if(!thechannel) {
              console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
          } else {
              const AuditLogFetch = await oldChannel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_UPDATE"});
              const Entry = AuditLogFetch.entries.first();
              const logembed = new MessageEmbed()
              .setColor(`${client.config.logging_module.channelUpdateColorhex || client.config.colorhex}`)
                    .setAuthor(`Action Logs - Channel Updated`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Before Changes:`, value: `\`Name:\` ${oldChannel.name}\n\`Type:\` ${oldChannel.type}\n\`ID:\` ${oldChannel.id}\n\`Created:\` ${oldChannel.createdAt.toLocaleString()}`},
                        {name: `After Changes:`, value: `\`Name:\` ${newChannel.name}\n\`Type:\` ${newChannel.type}\n\`ID:\` ${newChannel.id}\n\`Created:\` ${newChannel.createdAt.toLocaleString()}`},
                    )
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                }
            
            });
        }

}