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

const Canvas = require("discord-canvas");
const Discord = require("discord.js");
const ms = require('ms');
module.exports = async(client, con, guildMember) => {

    if(guildMember == undefined) return;

    await con.query(`SELECT * FROM users WHERE userid='${guildMember.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            await con.query(`INSERT INTO users (userid, warns, kicks, bans, mutes, isMuted, muteTime, joins, leaves, messages, delMessages, isAfk, balance, workCooldown, crimeCooldown, robCooldown, bank) VALUES ('${guildMember.user.id}', 0, 0, 0, 0, 'false', 0, 1, 0, 0, 0, 'false', 0, 'false', 'false', 'false', 0)`, async (err, row) => {
                if(err) throw err;
            });
        } else {
            await con.query(`UPDATE users SET joins = joins + 1 WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                if(err) throw err;
            });
        }
    });

    await con.query(`SELECT * FROM offlinebans WHERE id='${guildMember.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            guildMember.guild.members.ban(guildMember.user.id, {
                reason: row[0].reason
            }).catch(e => {
                console.log(e)
            });
        }
    });

    if(client.config.user_join_module.verificationSystem) {
        if(client.config.user_join_module.dmVerification) {
            let verifyEmbed = new Discord.MessageEmbed()
            .setColor(client.config.colorhex)
            .setThumbnail(guildMember.guild.iconURL({ dynamic: true }))
            .setTitle(`Verification`)
            .setDescription(`In order to continue, you must verify yourself in the server. You can do this by typing \`${client.config.prefix}verify\` inside of <#${client.config.user_join_module.verificationChannelId}>`)
            .setTimestamp()
            .setFooter(client.config.copyright)

            try {
               await guildMember.user.send({ embeds: [verifyEmbed] })
            } catch(e) {}
        }
    }

    if(client.config.user_join_module.autoRoleSystem) {
        client.config.user_join_module.autoRoleIds.forEach(async r => {
            await guildMember.roles.add(r);
        });
    }

    if(client.config.alt_prevention.enabled) {
        if (Date.now() - guildMember.user.createdAt < ms(client.config.alt_prevention.timelimit)) {
            if(guildMember.user.bot) {
                if(!client.config.alt_prevention.botsBypass) {
                    if(client.config.logging_module.altPrevention) {
                        let logEmbed = new Discord.MessageEmbed()
                        .setColor(client.config.logging_module.altPreventionColorhex || client.config.colorhex)
                        .setTitle(`Alt Account Detected!`)
                        .setDescription(`**User:** ${guildMember.user.tag} - (${guildMember.user.id})\n**Account Age:** ${guildMember.user.createdAt.toLocaleString()}`)
                        .setThumbnail(guildMember.user.avatarURL({ dynamic: true }))
                        .setTimestamp()
                        .setFooter(client.config.copyright)
                        client.config.logging_module.altPreventionChannels.forEach(async c => {
                            let chan = await client.channels.cache.get(c);
                            await chan.send({ embeds: [logEmbed] }).catch(e => {});
                        });
                    }
                    if(client.config.alt_prevention.dmUsers) {
                        let embed = new Discord.MessageEmbed()
                        .setColor(client.config.colorhex)
                        .setTitle(`You Were Removed!`)
                        .setThumbnail(guildMember.guild.iconURL({ dynamic: true }))
                        .setDescription(client.config.alt_prevention.dmMessage)
                        .setTimestamp()
                        .setFooter(client.config.copyright)
                        try {
                            guildMember.user.send({ embeds: [embed] }).then(() => {
                                altKick(client, guildMember)
                            });
                        } catch(e) {
                            client.utils.error(client, e)
                        }
                    } else {
                        altKick(client, guildMember)
                    }
                }
            } else {
                if(client.config.logging_module.altPrevention) {
                    let logEmbed = new Discord.MessageEmbed()
                    .setColor(client.config.logging_module.altPreventionColorhex || client.config.colorhex)
                    .setTitle(`Alt Account Detected!`)
                    .setDescription(`**User:** ${guildMember.user.tag} - (${guildMember.user.id})\n**Account Age:** ${guildMember.user.createdAt.toLocaleString()}`)
                    .setThumbnail(guildMember.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter(client.config.copyright)
                    client.config.logging_module.altPreventionChannels.forEach(async c => {
                        let chan = await client.channels.cache.get(c);
                        await chan.send({ embeds: [logEmbed] }).catch(e => {});
                    });
                }
                if(client.config.alt_prevention.dmUsers) {
                    let embed = new Discord.MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`You Were Removed!`)
                    .setThumbnail(guildMember.guild.iconURL({ dynamic: true }))
                    .setDescription(client.config.alt_prevention.dmMessage)
                    .setTimestamp()
                    .setFooter(client.config.copyright)
                    try {
                        guildMember.user.send({ embeds: [embed] }).then(() => {
                            altKick(client, guildMember)
                        });
                    } catch(e) {
                        client.utils.error(client, e)
                    }
                } else {
                    altKick(client, guildMember)
                }
            }
        }
    }

    if(client.config.user_join_module.enabled) {
        if(client.config.user_join_module.messageType === 1) {
            client.config.user_join_module.channelIds.forEach(async c => {
                let welcomeChannel = await client.channels.cache.get(c)
                await welcomeChannel.send({ content: `<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined the server! ${client.config.user_join_module.message}` }).catch(e => {
                    client.utils.error(client, e)
                });
            });
        } else if(client.config.user_join_module.messageType === 2) {
            let welcomeEmbed = new Discord.MessageEmbed()
            .setColor(client.config.user_join_module.embedMessage.colorHex || client.config.colorhex)
            .setTitle(client.config.user_join_module.embedMessage.header || 'Welcome User!')
            .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined the server!`)
            .setFooter(client.config.user_join_module.embedMessage.footer || client.config.copyright)

            try {
                if(client.config.user_join_module.embedMessage.footer === '') {
                    await welcomeEmbed.setTimestamp()
                }
                if(client.config.user_join_module.embedMessage.notice !== '') {
                    await welcomeEmbed.addField("Notice:", client.config.user_join_module.embedMessage.notice, false)
                }
                if(client.config.user_join_module.embedMessage.showAccountDate) {
                    await welcomeEmbed.addField("Account Age:", guildMember.user.createdAt.toLocaleString(), false)
                }
                await welcomeEmbed.setThumbnail(guildMember.user.avatarURL())
            } catch(e) {}

            client.config.user_join_module.channelIds.forEach(async c => {
                let welcomeChannel = await client.channels.cache.get(c)
                await welcomeChannel.send({ embeds: [welcomeEmbed] }).catch(e => {
                    client.utils.error(client, e)
                });
            });
        } else if(client.config.user_join_module.messageType === 3) {

            const image = await new Canvas.Welcome()
            .setUsername(guildMember.user.username)
            .setDiscriminator(guildMember.user.discriminator)
            .setMemberCount(guildMember.guild.members.cache.size)
            .setGuildName(client.config.user_join_module.cardMessage.serverName || guildMember.guild.name)
            .setAvatar(guildMember.user.avatarURL({dynamic: true, format: "png"}))
            .setColor("border", client.config.user_join_module.cardMessage.borderColorHex)
            .setColor("username-box", client.config.user_join_module.cardMessage.usernameBoxColorHex)
            .setColor("discriminator-box", client.config.user_join_module.cardMessage.discriminatorBoxColorHex)
            .setColor("message-box", client.config.user_join_module.cardMessage.messageBoxColorHex)
            .setColor("title", client.config.user_join_module.cardMessage.titleColorHex)
            .setColor("avatar", client.config.user_join_module.cardMessage.avatarColorHex)
            .setBackground(client.config.user_join_module.cardMessage.backgroundImageURL)
            .toAttachment();

            let attachment = new Discord.MessageAttachment(image.toBuffer(), 'welcome.png');
            client.config.user_join_module.channelIds.forEach(async c => {
                let welcomeChannel = await client.channels.cache.get(c)
                await welcomeChannel.send({ files: [attachment] }).catch(e => {
                    client.utils.error(client, e)
                });
            });

        } else {
            console.log(`Invalid Message Type: ${client.config.user_join_module.messageType}`)
        }

    }

}

async function altKick(client, guildMember) {
    try {
        if(client.config.alt_prevention.removeAlts) {
            guildMember.guild.members.kick(guildMember, {
                reason: 'Alt Account Detected!'
            });
        }
    } catch(e) {}
};