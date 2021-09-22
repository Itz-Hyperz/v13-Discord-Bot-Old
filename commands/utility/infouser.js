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

    let pingeduser;
    if(message.mentions.users.first()) {
        pingeduser = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        pingeduser = await client.utils.memberFetch(client, message.guild, args[0])
    } else {
        pingeduser = message.member
    }

    if (pingeduser == undefined) return message.channel.send({ content: `That user was not found.` }).catch(e => {});


    await con.query(`SELECT * FROM users WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            let row1 = row[0]
            await con.query(`SELECT * FROM chatlvl WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
                if(err) throw err;
                let lol;
                if(row[0]) {
                    lol = row[0].userlvl
                } else {
                    lol = 0
                }
                    await con.query(`SELECT COUNT(uniqueid) as total FROM cases WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
                        if(err) throw err;
                        let cringe;
                        if(row[0]) {
                            cringe = row[0].total
                        } else {
                            cringe = 0
                        }
                            let embed = new MessageEmbed()
                            .setColor(client.config.colorhex)
                            .setAuthor(`User Information ${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                            .setThumbnail(pingeduser.user.displayAvatarURL({dynamic: true}))
                            .addFields(
                                { name: 'Tag:', value: `${pingeduser.user.tag}`, inline: true},
                                { name: 'ID:', value: `${pingeduser.user.id}\n`, inline: true},
                                { name: 'Bot:', value: `${pingeduser.user.bot}`, inline: true},
                                { name: 'Cases:', value: `${cringe}`, inline: true},
                                { name: 'Nickname:', value: `${pingeduser.displayName}`, inline: true},
                                { name: 'Highest Role:', value: `${pingeduser.roles.highest}`, inline: true},
                                { name: 'Joined Server:', value: `\`\`\`${pingeduser.joinedAt.toLocaleString()}\`\`\``},
                                { name: 'Joined Discord:', value: `\`\`\`${pingeduser.user.createdAt.toLocaleString()}\`\`\``},
                                { name: 'Warnings:', value: `${row1.warns}`, inline: true},
                                { name: 'Kicks:', value: `${row1.kicks}`, inline: true},
                                { name: 'Bans:', value: `${row1.bans}`, inline: true},
                                { name: 'Mutes:', value: `${row1.mutes}`, inline: true},
                                { name: 'Joins:', value: `${row1.joins}`, inline: true},
                                { name: 'Leaves:', value: `${row1.joins}`, inline: true},
                                { name: 'Messages:', value: `${row1.messages}`, inline: true},
                                { name: 'Deleted Messages:', value: `${row1.delMessages}`, inline: true},
                                { name: 'Chat Level:', value: `${lol}`, inline: true},
                            )
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}`)

                            await message.channel.send({ embeds: [embed] }).catch(e => {});
                    });
            });
        } else {
            return message.channel.send({ content: "Something went wrong finding that user, make sure they are in the guild." }).then((msg) => {
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
    name: "infouser",
    description: "Check info about a user!",
    aliases: ['userinfo', 'user', 'ui']
}