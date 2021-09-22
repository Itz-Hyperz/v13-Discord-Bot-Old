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

    await con.query(`SELECT * FROM birthdays WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            await con.query(`DELETE FROM birthdays WHERE userid='${message.author.id}'`, async (err, row) => {
                if(err) throw err;
                let embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor(client.config.colorhex)
                .setDescription(`Your birthday has been **removed** from the database.`)
                message.channel.send({ embeds: [embed] }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {});
            });
        } else {
            message.channel.send({ content: "You don't currently have a birthday registered." }).then((msg) => {
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
    name: "removebday",
    description: "Remove a birthday!",
    aliases: ['removebirthday', 'rbday', 'rembday', 'birthdayremove']
}