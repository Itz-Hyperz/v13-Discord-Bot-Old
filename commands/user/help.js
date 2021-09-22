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

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { readdirSync} = require('fs');
const { join } = require('path');

exports.run = async (client, message, args, con) => {

    if(!args[0]) {
        helpEmbed(client, message)
    } else {
        readdirSync(join(__dirname, '../')).forEach(dir => {
            const commands = readdirSync(join(__dirname, '../', `${dir}`)).filter(f => f.endsWith('.js'));

            for (let file of commands) {
                let cinfo = require(`../${dir}/${file}`);
                if (args[0].toLowerCase() !== cinfo.info.name) continue;
                return commandEmbed(client, message, args, MessageEmbed, cinfo)
            }
        });
    }

}

exports.info = {
    name: "help",
    description: "View all commands and info about the bot!",
    aliases: ['commands']
}

async function helpEmbed(client, message) {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('helpPageLeft')
        .setLabel(`Back`)
        .setStyle(`PRIMARY`),
    )
    .addComponents(
        new MessageButton()
        .setCustomId('helpPageRight')
        .setLabel(`Next`)
        .setStyle(`PRIMARY`),
    )
    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(`${client.user.username} Help Menu`)
    .addFields(
        { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
        { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
        { name: "About Server", value: `${client.config.aboutServer}`, inline: false, },
        { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
    )
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(`Page 1/10`)
    message.channel.send({ embeds: [embed], components: [row] }).catch(e => {});
};

async function commandEmbed(client, message, args, MessageEmbed, cinfo) {
    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(`Command Help`)
    .setDescription(`**Name:** \`${cinfo.info.name}\`\n**Description:** \`${cinfo.info.description}\`\n**Aliases:** \`${cinfo.info.aliases.join(", ")}\`\n`)
    .setThumbnail(message.author.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(client.config.copyright)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
};