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

    if(!client.config.utility_module.useClientCommands) return message.channel.send({ content: "This module is disabled." });

    let pingeduser;
    if(message.mentions.users.first()) {
        pingeduser = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        pingeduser = await client.utils.memberFetch(client, message.guild, args[0])
    } else {
        return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
    }

    if(!pingeduser) return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});

    await con.query(`SELECT * FROM clients WHERE userid='${pingeduser.user.id}'`, async(err, row) => {
        if(err) throw err;
        if(!row[0]) {
            let embed = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setDescription(`${pingeduser.user.tag} is **not** a client.`)
            return message.channel.send({ embeds: [embed] }).catch(e => {});
        } else {
                await con.query(`DELETE FROM clients WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
                    if(err) throw err;
                    await pingeduser.roles.remove(client.config.utility_module.clientRoleId)
                    let embed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setDescription(`**${pingeduser.user.tag}** is no-longer a client!`)
                    return message.channel.send({ embeds: [embed] }).catch(e => {});
                });
        }
    });

}

exports.info = {
    name: "clientremove",
    description: "Remove a user from the list of clients!",
    aliases: ['removeclient']
}