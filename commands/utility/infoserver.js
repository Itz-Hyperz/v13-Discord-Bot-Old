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

    let check = await client.utils.permCheck(client, message, 'infoAccess')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    const daGuild = message.guild

    let embed = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setTitle(`Server Info: ${daGuild.name}`)
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
    .setThumbnail(daGuild.iconURL({ dynamic: true }))
    .addFields(
        { name: 'Name:', value: `${daGuild.name}`, inline: true},
        { name: 'ID:', value: `${daGuild.id}\n`, inline: true},
        { name: 'Owner:', value: `<@${daGuild.ownerId}>\n`, inline: true},
        { name: 'Members:', value: `${daGuild.members.cache.size}`, inline: true},
        { name: 'Users:', value: `${daGuild.members.cache.filter(member => !member.user.bot).size}`, inline: true},
        { name: 'Bots:', value: `${daGuild.members.cache.filter(member => member.user.bot).size}`, inline: true},
        { name: 'Date of Creation:', value: `\`\`\`${daGuild.createdAt.toLocaleString()}\`\`\``},
    )
    .setTimestamp()
    .setFooter(client.config.copyright)

    await message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "infoserver",
    description: "Check info about the server!",
    aliases: ['serverinfo', 'server']
}