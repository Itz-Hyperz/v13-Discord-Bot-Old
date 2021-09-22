const { MessageEmbed } = require('discord.js')

module.exports = async (client, con, oldRole, newRole) =>{

        if(client.config.logging_module.roleUpdate) {

            client.config.logging_module.roleUpdateChannels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await newRole.guild.fetchAuditLogs({limit: 1, type: "ROLE_UPDATE"});
                    const Entry = AuditLogFetch.entries.first();
                    if(Entry !== undefined) {
                        const logembed = new MessageEmbed()
                        .setColor(`${client.config.logging_module.roleUpdateColorhex || client.config.colorhex}`)
                        .setAuthor(`Action Logs - Role Updated`, client.user.displayAvatarURL())
                        .addFields(
                            {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                            {name: `Before Changes:`, value: `\`Name:\` ${oldRole.name}\n\`Color:\` ${oldRole.hexColor}\n\`ID:\` ${oldRole.id}\n\`Created:\` ${oldRole.createdAt.toLocaleString()}\n\`Position:\` ${oldRole.position}\n\`Hoisted:\` ${oldRole.hoist}\n\`Mentionable:\` ${oldRole.mentionable}\n\`Deleted:\` ${oldRole.deleted}`},
                            {name: `After Changes:`, value: `\`Name:\` ${newRole.name}\n\`Color:\` ${newRole.hexColor}\n\`ID:\` ${newRole.id}\n\`Created:\` ${newRole.createdAt.toLocaleString()}\n\`Position:\` ${newRole.position}\n\`Hoisted:\` ${newRole.hoist}\n\`Mentionable:\` ${newRole.mentionable}\n\`Deleted:\` ${newRole.deleted}`},
                        )
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)
                        await thechannel.send({ embeds: [logembed] }).catch(e => {})
                    }
                }
            
            });

            }
}