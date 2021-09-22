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
module.exports = async(client, con, guildMember) => {

    if(guildMember == undefined) return;

    await con.query(`SELECT * FROM users WHERE userid='${guildMember.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            await con.query(`INSERT INTO users (userid, warns, kicks, bans, mutes, isMuted, muteTime, joins, leaves, messages, delMessages, isAfk, balance, workCooldown, crimeCooldown, robCooldown, bank) VALUES ('${guildMember.user.id}', 0, 0, 0, 0, 'false', 0, 1, 1, 0, 0, 'false', 0, 'false', 'false', 'false', 0)`, async (err, row) => {
                if(err) throw err;
            });
        } else {
            await con.query(`UPDATE users SET leaves = leaves + 1 WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                if(err) throw err;
            });
        }
    });

    if(client.config.utility_module.useBlacklistSystem) {
        if(client.config.utility_module.blacklistEnforcement) {
            if(guildMember.roles.cache.find(r => r.id === client.config.utility_module.blacklistedRoleID)) {
                try {
                    guildMember.guild.members.ban(`${guildMember.user.id}`, {
                        reason: `User left the guild while blacklisted - ${client.user.tag}`
                    });
                    const leEmbed = new Discord.MessageEmbed()
                    .setColor(`${client.config.colorhex}`)
                    .setTitle(`Ban Enforced!`)
                    .setDescription(`**User Tag:** ${guildMember.user.tag}\n**User ID:** ${guildMember.user.id}\n \n**Reason:** \`Shadow Banned.\``)
                    .setThumbnail(`${client.config.utility_module.autoBanImageURL}` || guildMember.guild.iconURL({ dynamic: true }))
                    .setFooter(`${client.config.copyright}`)

                    client.config.utility_module.logBlacklistsChannels.forEach(chan => {

                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send({ embeds: [leEmbed] }).catch(e => {})
                            }
                        
                        });
                } catch(e) {}
            }
        }
    }

    if(client.config.leveling_config.enabled) {
        if(client.config.leveling_config.clearUsersOnLeave) {
            await con.query(`SELECT * FROM chatlvl WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    await con.query(`DELETE FROM chatlvl WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                        if(err) throw err;
                    });
                }
            });
        }
    }

    if(client.config.user_leave_module.enabled) {
        if(client.config.user_leave_module.messageType === 1) {
            client.config.user_leave_module.channelIds.forEach(async c => {
                let goodbyeChannel = await client.channels.cache.get(c)
                await goodbyeChannel.send({ content: `<@${guildMember.user.id}> (${guildMember.user.tag})\nhas left the server! ${client.config.user_leave_module.message}` }).catch(e => {
                    client.utils.error(client, e)
                });
            });
        } else if(client.config.user_leave_module.messageType === 2) {
            let leaveEmbed = new Discord.MessageEmbed()
            .setColor(client.config.user_leave_module.embedMessage.colorHex || client.config.colorhex)
            .setTitle(client.config.user_leave_module.embedMessage.header || 'Goodbye User!')
            .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas left the server!`)
            .setFooter(client.config.user_leave_module.embedMessage.footer || client.config.copyright)

            try {
                if(client.config.user_leave_module.embedMessage.footer === '') {
                    await leaveEmbed.setTimestamp()
                }
                if(client.config.user_leave_module.embedMessage.notice !== '') {
                    await leaveEmbed.addField("Notice:", client.config.user_leave_module.embedMessage.notice, false)
                }
                if(client.config.user_leave_module.embedMessage.showAccountDate) {
                    await leaveEmbed.addField("Account Age:", guildMember.user.createdAt.toLocaleString(), false)
                }
                await leaveEmbed.setThumbnail(guildMember.user.avatarURL())
            } catch(e) {}

            client.config.user_leave_module.channelIds.forEach(async c => {
                let goodbyeChannel = await client.channels.cache.get(c)
                await goodbyeChannel.send({ embeds: [leaveEmbed] }).catch(e => {
                    client.utils.error(client, e)
                });
            });
        } else if(client.config.user_leave_module.messageType === 3) {

            const image = await new Canvas.Goodbye()
            .setUsername(guildMember.user.username)
            .setDiscriminator(guildMember.user.discriminator)
            .setMemberCount(guildMember.guild.members.cache.size)
            .setGuildName(client.config.user_leave_module.cardMessage.serverName || guildMember.guild.name)
            .setAvatar(guildMember.user.avatarURL({dynamic: true, format: "png"}))
            .setColor("border", client.config.user_leave_module.cardMessage.borderColorHex)
            .setColor("username-box", client.config.user_leave_module.cardMessage.usernameBoxColorHex)
            .setColor("discriminator-box", client.config.user_leave_module.cardMessage.discriminatorBoxColorHex)
            .setColor("message-box", client.config.user_leave_module.cardMessage.messageBoxColorHex)
            .setColor("title", client.config.user_leave_module.cardMessage.titleColorHex)
            .setColor("avatar", client.config.user_leave_module.cardMessage.avatarColorHex)
            .setBackground(client.config.user_leave_module.cardMessage.backgroundImageURL)
            .toAttachment();

            let attachment = new Discord.MessageAttachment(image.toBuffer(), 'goodbye.png');
            client.config.user_leave_module.channelIds.forEach(async c => {
                let goodbyeChannel = await client.channels.cache.get(c)
                await goodbyeChannel.send({ files: [attachment] }).catch(e => {
                    client.utils.error(client, e)
                });
            });

        } else {
            console.log(`Invalid Message Type: ${client.config.user_leave_module.messageType}`)
        }

    }

}