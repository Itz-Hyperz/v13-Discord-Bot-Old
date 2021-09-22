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

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    let check = await client.utils.permCheck(client, message, 'managers')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    if(!args[0]) return message.channel.send({ content: "Please include an amount that should be paid." }).catch(e => {});

    if(client.config.utility_module.usePayPal) {
        let paypalEmbed = new MessageEmbed()
        .setColor(`#427ef5`)
        .setTitle(`PayPal Payment`)
        .setThumbnail(`https://img.icons8.com/color/452/paypal.png`)
        .setDescription(`**PayPal: ||${client.config.utility_module.aPayPalLink}||**\nNotify us if you have chosen this option.`)
        await message.channel.send({ embeds: [paypalEmbed] }).catch(e => {});
    }

    if(client.config.utility_module.useCashApp) {
        let cashappEmbed = new MessageEmbed()
        .setColor(`#0be000`)
        .setTitle(`CashApp Payment`)
        .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png`)
        .setDescription(`**CashApp: ||${client.config.utility_module.aCashAppLink}||**\nNotify us if you have chosen this option.`)
        await message.channel.send({ embeds: [cashappEmbed] }).catch(e => {});
    }

    if(client.config.utility_module.useVenmo) {
        let venmoEmbed = new MessageEmbed()
        .setColor(`#00cee0`)
        .setTitle(`Venmo Payment`)
        .setThumbnail(`https://global-uploads.webflow.com/5f4dd3623430990e705ccbba/5f7f7f2d126b05512021cf9b_app-icon.original.png`)
        .setDescription(`**Venmo: ||${client.config.utility_module.aVenmoLink}||**\nNotify us if you have chosen this option.`)
        await message.channel.send({ embeds: [venmoEmbed] }).catch(e => {});
    }

    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colorhex)
    .setDescription(`**Please pay \`${args[0]}\` to __one__ of the above payment methods.**`)
    await message.channel.send({ embeds: [embed] }).catch(e => {});

}

exports.info = {
    name: "pay",
    description: "Ask a user to agree to the terms of service!",
    aliases: ['invoice', 'charge']
}