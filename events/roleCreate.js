const { MessageEmbed } = require('discord.js')

module.exports = async (client, con, role) =>{

        if(client.config.logging_module.roleCreate) {

            client.config.logging_module.roleCreateChannels.forEach(async chan => {
    
                const thechannel = await client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_CREATE"});
                    const Entry = AuditLogFetch.entries.first();
                    const logembed = new MessageEmbed()
                    .setColor(`${client.config.logging_module.roleCreateColorhex || client.config.colorhex}`)
                    .setAuthor(`Action Logs - Role Created`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Role ID:`, value: `${role.id}`},
                        {name: `Role Name:`, value: `${role.name}`},
                    )
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                }
            
            });

        }
}