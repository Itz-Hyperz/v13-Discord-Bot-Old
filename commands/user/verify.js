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

const { MessageEmbed, MessageActionRow } = require('discord.js');

exports.run = async (client, message, args, con) => {

    if(!message.member) return message.channel.send({ content: "Something went wrong, make sure you are running this command in a guild." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    if(!client.config.user_join_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    if(!client.config.user_join_module.verificationSystem) return message.channel.send({ content: "This module is currently disabled." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    if(!message.member.roles.cache.has(client.config.user_join_module.verifiedRoleIds[0])) {
        let embed = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(`You Were Verified!`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`You have **successfully** verified yourself for __${message.guild.name}!__`)
        .setTimestamp()
        .setFooter(client.config.copyright)
        message.author.send({ embeds: [embed] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    }

    await client.config.user_join_module.verifiedRoleIds.forEach(async r => {
        if(!message.member.roles.cache.has(r)) {
            message.member.roles.add(r)
        }
    });

}

exports.info = {
    name: "verify",
    description: "Verify that you agree to the rules and such.",
    aliases: []
}