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

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    if(!client.config.utility_module.birthdaySystem) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

    await con.query(`SELECT * FROM birthdays WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            return message.channel.send({ content: `You already have a birthday on record.\n**Note:** to delete it, simply run \`${client.config.prefix}removebday\`` }).catch(e => {});
        } else {

            const filter = m => m.author.id === message.author.id;

            const starter = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**BIRTHDAY BUILDER STARTED!**\nType \`end\` to cancel the builder.`)
      
            const builder0 = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`Please state your date of birth.\n**Note:** It must be formatted like this: \`MM-DD-YYYY\` otherwise it **won't work**.`)
      
            const finish = new MessageEmbed()
            .setColor(`${client.config.colorhex}`)
            .setDescription(`**Your birthday has been added!**`)

            message.channel.send({ embeds: [starter] })

            message.channel.send({ embeds: [builder0] }).then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                .then(async collected => {
                    let content0l = collected.first().content.toLowerCase()
                    let content0 = collected.first().content

                    if(content0l === 'end') return message.channel.send({ content: `**Birthday Builder Cancelled!**` }).then((msg) => {
                        if(client.config.deleteCommands) {
                            setTimeout(() => {
                                msg.delete().catch(e => {});
                            }, 14000);
                        }
                    }).catch(e => {});

                    await con.query(`INSERT INTO birthdays (userid, deDate) VALUES ('${message.author.id}', "${content0}")`, async (err, row) => {
                        if(err) throw err;
                        message.channel.send({ embeds: [finish] })
                    });
                    
            }).catch(e => {});
        }).catch(e => {});
        }
    });
}

exports.info = {
    name: 'birthday',
    description: 'Adds a new birthday.',
    aliases: ['addbday', 'bday', 'addbirthday']
}