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
const ms = require('ms')
exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    let check = await client.utils.permCheck(client, message, 'economyManagers')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    if(!client.config.economy_module.itemCreate) return message.channel.send({ content: "This module is disabled." }).catch(e => {});
    if(!args[0]) return message.channel.send({ content: "Please include a shop product Id to delete." }).catch(e => {});

    await con.query(`SELECT * FROM shop WHERE productId=${args[0]}`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            await con.query(`DELETE FROM shop WHERE productId=${args[0]}`, async (err, row) => {
                if(err) throw err;
                message.channel.send({ content: `I have deleted product Id \`${args[0]}\` from the database.` }).catch(e => {});
            });
        } else {
            return message.channel.send({ content: "I was unable to find a product with that Id." }).catch(e => {});
        }
    });

}

exports.info = {
    name: 'itemdelete',
    description: 'Econonmy System Component.',
    aliases: ['deleteitem', 'removeitem', 'itemremove', 'removeshopitem']
}