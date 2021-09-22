const { MessageEmbed } = require('discord.js')

module.exports = async (client, con, message, newMessage) =>{

    try {

    if(newMessage.parial) await newMessage.fetch();
    if (message.partial) await message.fetch();

    if(!message.guild) return;

    if(message.author.bot) {
        // Dont want spammmmmm
    } else {

    if(client.config.logging_module.editedMessages) {

        client.config.logging_module.editedMessagesChannels.forEach(async chan => {
    
            const thechannel = await client.channels.cache.get(chan)
            if(!thechannel) {
                console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
            } else {
                    const logembed = new MessageEmbed()
                    .setColor(client.config.logging_module.deletedMessagesColorhex || client.config.colorhex )
                    .setAuthor(`Action Logs - Message Updated`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `User:`, value: `${message.author.tag} - (${message.author.id})`},
                        {name: `Channel:`, value: `<#${message.channel.id}>`},
                        {name: `Before Changes:`, value: `${message.content}`},
                        {name: `After Changes:`, value: `${newMessage.content}`},
                    )
                    .setTimestamp()
                    .setFooter(`${client.config.copyright}`)
                thechannel.send({ embeds: [logembed] }).catch(e => {})
            }
        
        });

    }
}
} catch(e) {
    if(client.config.debugmode) return console.log(e);
}
}