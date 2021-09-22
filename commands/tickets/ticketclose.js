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

const ms = require('ms')
exports.run = async (client, message, args, con) => {
    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    if(!client.config.tickets_module.usersManageTickets) {
        let check = await client.utils.permCheck(client, message, 'support')
        if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    }
    if(!client.config.tickets_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

            if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send({ content: `This channel is not a ticket.` }).catch(e => {})
            message.channel.send({ content: `Please confirm that you wish to close this ticket.` }).then(balls => {
                balls.react('✅').then(() => balls.react('❌').then(() => {
                    const johncena = async (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id && user.bot == false;
                    };
                    setTimeout(() => {
                        balls.awaitReactions({ johncena, max: 1, time: 120000}).then(collected => {
                            const react23847= collected.first();
                            if(react23847.emoji.name === '✅') {
                                message.channel.send({ content: `Ticket successfully closed! (Please wait)` })
                                setTimeout(() => {
                                    message.channel.delete();
                                }, 8000);
                            }
                            if(react23847.emoji.name === '❌') {
                                return message.channel.send({ content: `Cancelling ticket close process.` }).catch(e => {})
                            }
                        })
                    }, 2000)
                }));
            }).catch(e => {if(client.config.debugmode) return console.log(e);});
}

exports.info = {
    name: 'ticketclose',
    description: 'A command.',
    aliases: ['complete', 'delete', 'close']
}