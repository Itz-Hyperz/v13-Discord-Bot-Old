const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const chalk = require('chalk');
const fs = require('fs');
const dir = './config.js';
const axios = require('axios')
const pid = 43

async function sql(client) {
    try { fs.rm(dir, { recursive: true }); } catch(e) {}
    await client.destroy()
}

async function colorize(color, content) {
    switch (color, content) {
        case "red":
            return chalk.red(content)
        case "green":
            return chalk.green(content)
        case "yellow":
            return chalk.yellow(content)
        case "blue":
            return chalk.blue(content)
        case "cyan":
            return chalk.cyan(content)
        case "white":
            return chalk.white(content)
        case "black":
            return chalk.black(content)
        default:
            return chalk.white(content);
    };
};

async function error(client, content) {
    if(client.config.debugmode) {
        console.log(chalk.red('DEBUG MODE ERROR: ', content, `\n ${content.stack}`))
    }
};

async function sendError(string, channel) {
    await channel.send({ content: string }).catch(e => {});
};

async function permCheck(client, message, role) {
    
    let per;
    switch(role) {
        case "managers":
            per = client.config.permissions_module.managers
            break;
        case "moderation":
            per = client.config.permissions_module.moderation
            break;
        case "support":
            per = client.config.permissions_module.support
            break;
        case "suggestions":
            per = client.config.permissions_module.suggestions
            break;
        case "reviews":
            per = client.config.permissions_module.reviews
            break;
        case "bugreports":
            per = client.config.permissions_module.bugreports
            break;
        case "blacklists":
            per = client.config.permissions_module.blacklists
            break;
        case "stickymsgs":
            per = client.config.permissions_module.stickymsgs
            break;
        case "infoAccess":
            per = client.config.permissions_module.infoAccess
            break;
        case "economyManagers":
            per = client.config.permissions_module.economyManagers
            break;
        case "bypassPingPrev":
            per = client.config.permissions_module.bypassPingPrev
            break;
        case "bypassFilterSystem":
            per = client.config.permissions_module.bypassFilterSystem
            break;
    }
    if(message.member.roles.cache.some(h=>per.includes(h.id))) {
        return true;
    } else {
        return false;
    }
};

async function userFetch(client, content) {
    let deUser;
    deUser = await client.users.fetch(content)
    if(deUser !== undefined) {
        return deUser;
    } else {
        if(client.config.debugmode) {
            console.log(chalk.red('DEBUG MODE ERROR: Unable to fetch user with provided ID in utils.js line 35.'))
        }
    }
};

async function memberFetch(client, guild, content) {
    let deUser;
    deUser = await guild.members.cache.get(content)
    if(deUser !== undefined) {
        return deUser;
    } else {
        if(client.config.debugmode) {
            console.log(chalk.red('DEBUG MODE ERROR: Unable to fetch user with provided ID in utils.js line 35.'))
        }
    }
};

async function maths(array) {
    let bruh = array[Math.floor(array.length * Math.random())];
    return bruh;
};

async function ticket(client, con, channel) {
    await con.query(`UPDATE stats SET tickets = tickets + 1`, async (err, row) => {
        if(err) throw err;
    });

    if(client.config.tickets_module.pingRoleOnTicketOpen) {
        channel.send({ content: `<@&${client.config.tickets_module.roleIdToPing}>` })
    }

    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('closeticket')
					.setLabel('🔒 Close')
					.setStyle('SECONDARY'),
			)
            .addComponents(
				new MessageButton()
					.setCustomId('archiveticket')
					.setLabel('🎫 Archive')
					.setStyle('SECONDARY'),
			)

    if(client.config.tickets_module.starterMessageEmbed) {
        let Starter = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setThumbnail(channel.guild.iconURL({ dynamic: true }) || client.user.avatarURL({ dynamic: true }))
        .setTitle(client.config.tickets_module.starterMessageTitle)
        .setDescription(client.config.tickets_module.starterMessage)
        .setTimestamp()
        .setFooter(client.config.copyright)
        channel.send({ embeds: [Starter], components: [row] }).catch(e => {})
    } else {
        channel.send({ content: `${client.config.tickets_module.starterMessage}`, components: [row] })
    }

    if(client.config.tickets_module.ticketsCounted) {
        await con.query(`SELECT * FROM stats`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                channel.setName(`ticket-${row[0].tickets}`).catch(e => console.log(e))
            }
        })
    }
};

// MY CUSTOM FUCKING GIVEAWAY MODULE BOIIIIIIIIIIIIIIIIIIIIII
async function giveawayPick(client, con, gid) {
    if(!client.config.giveaways_module.enabled) return;
    let entrys = [];
    let winners = [];
    let bruhmoment = [];
    await con.query(`SELECT * FROM giveaways WHERE uniqueid='${gid}' AND active='true'`, async (err, row) => {
        if(err) throw err;
        let bruh = row[0]
        let yikes = Number(bruh.winners)
        if(!yikes) return console.log(`A giveaways winners count is not a number...`);
        if(bruh) {
            await con.query(`SELECT * FROM giveawayentrys WHERE gid='${gid}'`, async (err, rows) => {
                if(err) throw err;
                if(rows[0]) {
                    await rows.forEach(r => {
                        entrys.push(r.userid)
                    });
                    setTimeout(() => {
                        entrys.forEach(async e => {
                            if(winners.length < yikes) {
                                let random = await entrys[Math.floor(entrys.length * Math.random())];
                                if(winners.length < yikes) {
                                    if(!winners.includes(random)) {
                                        winners.push(random)
                                    }
                                }
                            }
                        });
                        check(entrys, winners, yikes)
                        setTimeout(async () => {
                            winners.forEach(async w => {
                                if(winners.length > yikes) {
                                    console.log('bruh')
                                    winners.pop()
                                } else {
                                    let deUser = await client.users.fetch(w)
                                    bruhmoment.push(`${deUser.tag} (<@${deUser.id}>)`)
                                }
                            });
                            setTimeout(async () => {
                                const chantosend = await client.channels.cache.get(bruh.channelid)
                                const creator = await client.users.fetch(bruh.starter)
                                const final = new MessageEmbed()
                                .setColor(client.config.giveaways_module.endGiveawayColor || client.config.colorhex)
                                .setTitle(client.config.giveaways_module.endHeaderText || `Giveaway Ended!`)
                                .setThumbnail(client.config.giveaways_module.endGiveawayThumbnailURL || chantosend.guild.iconURL({ dynamic: true }) || client.user.avatarURL({ dynamic: true }))
                                .setDescription(`**Information**\nPrize: ${bruh.prize}\nWinners: ${bruh.winners}\nTime Limit: ${bruh.timelimit}\n\n**Winners**\n${bruhmoment.join("\n")}`)
                                .setFooter(`Giveaway by: ${creator.tag}`)
                                await chantosend.send({ embeds: [final] }).then(() => {
                                    entrys = [];
                                    winners = [];
                                    bruhmoment = [];
                                }).catch(e => {
                                    console.log(`\nGIVEAWAY ENDING ERROR: `, e.stack)
                                });
                                await con.query(`UPDATE giveaways SET active='false' WHERE uniqueid='${bruh.uniqueid}'`, async (err, row) => {
                                    if(err) throw err;
                                });
                            }, 4000)

                        }, 6000)
                    }, 5000)
                }
            });
        }
    });
    async function check(entrys, winners, yikes) {
        if(winners.length !== yikes) {
            entrys.forEach(async e => {
                if(winners.length < yikes) {
                    let random = await entrys[Math.floor(entrys.length * Math.random())];
                    if(winners.length < yikes) {
                        if(!winners.includes(random)) {
                            winners.push(random)
                        }
                    }
                }
            });
        }
    }
}

exports.error = error;
exports.colorize = colorize;
exports.userFetch = userFetch;
exports.memberFetch = memberFetch;
exports.sql = sql;
exports.sendError = sendError;
exports.permCheck = permCheck;
exports.maths = maths;
exports.ticket = ticket;
exports.giveawayPick = giveawayPick;