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

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    if(!client.config.utility_module.marriageSystem) return message.channel.send({ content: "This module is currently disabled." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    let target;
    if(message.mentions.users.first()) {
        target = await client.utils.userFetch(client, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        target = await client.utils.userFetch(client, args[0])
    } else {
        return message.channel.send({ content: "Please mention a user to accept their marriage request." }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    }

    if(target.id === message.author.id) return message.channel.send({ content: "You cannot marry yourself." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    await con.query(`SELECT * FROM marriage WHERE userid='${target.id}' AND spouse='waiting'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            await con.query(`UPDATE marriage SET spouse='${message.author.id}' WHERE userid='${target.id}' AND spouse='waiting'`, async (err, row) => {
                if(err) throw err;
                message.channel.send({ content: `You are now married to ${target.tag}.` })
            });
        } else {
            return message.channel.send({ content: `That user doesn't have an active request to marry you.` }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            }).catch(e => {});
        }
    });

}

exports.info = {
    name: "maccept",
    description: "Marriage System Component.",
    aliases: ['acceptm', 'marriageaccept', 'acceptmarriage']
}