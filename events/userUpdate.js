const { MessageEmbed } = require('discord.js')

module.exports = async (client, con, oldUser, newUser) =>{

        if(client.config.logging_module.userUpdate) {

            client.config.logging_module.userUpdateChannels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {

                    var logembed;

                    if(oldUser.displayAvatarURL() != newUser.displayAvatarURL()) {

                        logembed = new MessageEmbed()
                        .setColor(`${client.config.logging_module.userUpdateColorhex || client.config.colorhex}`)
                        .setAuthor(`Action Logs - User Updated`, client.user.displayAvatarURL())
                        .setDescription(`${newUser.tag} has updated their avatar.`)
                        .setImage(`${newUser.displayAvatarURL({ dynamic: true })}`)
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)
                        await thechannel.send({ embeds: [logembed] }).catch(e => {})

                    } else {

                        logembed = new MessageEmbed()
                        .setColor(`${client.config.logging_module.userUpdateColorhex || client.config.colorhex}`)
                        .setAuthor(`Action Logs - User Updated`, client.user.displayAvatarURL())
                        .setThumbnail(`${newUser.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            {name: `Actioned By:`, value: `${newUser.tag || "someone"}`},
                            {name: `Before Changes:`, value: `\`Tag:\` ${oldUser.tag}\n\`ID:\` ${oldUser.id}\n\`Username:\` ${oldUser.username}\n\`#:\` ${oldUser.discriminator}`},
                            {name: `After Changes:`, value: `\`Tag:\` ${newUser.tag}\n\`ID:\` ${newUser.id}\n\`Username:\` ${newUser.username}\n\`#:\` ${newUser.discriminator}`},
                        )
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)
                        await thechannel.send({ embeds: [logembed] }).catch(e => {})

                    }
                }
            
            });

        }
}