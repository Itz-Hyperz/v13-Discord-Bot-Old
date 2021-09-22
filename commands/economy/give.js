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

const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args, con) => {
    if(!client.config.economy_module.buyItem) return message.channel.send({ content: "This module is disabled." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    if(!args[0]) return message.channel.send({ content: "Please include a user to give the item to." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    if(!args[1]) return message.channel.send({ content: "Please include an item ID to use." }).then((msg) => {
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
        return message.channel.send({ content: "I was unable to find that user." }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    }

    let check = args.slice(1).join(" ").replace("-", "")
    let product = Number(check)
    if(!product) return message.channel.send({ content: "Please include an item ID to use." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    await con.query(`SELECT * FROM owneditems WHERE userid='${message.author.id}' AND productId=${product}`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            let lol = row[0]
            await con.query(`UPDATE owneditems SET userid='${target.id}' WHERE userid='${message.author.id}' AND productId=${product} LIMIT 1`, async (err, row) => {
                if(err) throw err;
                message.channel.send({ content: `${message.author.tag} has given ${target.tag} **1** ${lol.productName}!` }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {});
            });
        } else {
            message.channel.send({ content: "You don't have that item in your inventory." }).then((msg) => {
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
    name: "give",
    description: "A way to make money in the economy.",
    aliases: ['giveitem']
}