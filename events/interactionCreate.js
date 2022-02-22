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

const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Collection } = require(`discord.js`);
const ms = require('ms')
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
let sheesh;

module.exports = async(client, con, interaction) => {

    try {

        let edited = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(`${client.user.username} Help Menu`)
        .setThumbnail(client.user.avatarURL({ dynamic: true }))

        let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('helpPageLeft')
            .setLabel(`Back`)
            .setStyle(`PRIMARY`),
        )
        .addComponents(
            new MessageButton()
            .setCustomId('helpPageRight')
            .setLabel(`Next`)
            .setStyle(`PRIMARY`),
        )

        let page2 = "`8ball` - Ask the 8 ball anything.\n`afk` - Make yourself as AFK.\n`ascii` - Write text via Figlet.\n`avatar` - Grab a users avatar.\n`birthday` - Add your birthday to the list.\n`credits` - See who created this bot.\n`ddos` - Sends a fake DDOS attack.\n`dice` - Roll the dice for a number.\n`divorce` - Break up with your spouse.\n`help` - View this menu.\n`hug` - Hug another user.\n`lb` - View the leaderboard.\n`level` - View a users current level.\n`maccept` - Accept a marriage request.\n`marry` - Ask someone to marry you.\n`meme` - Get a funny meme.\n`ping` - Check the bots latency.\n`removebday` - Remove your birthday from the list.\n`snipe` - Get the last deleted message.\n`timers` - Set a timer for something.\n`verify` - Verify yourself as a new member.\n`website` - View the main website.\n`wink` - Send a wink gif.";
        let page3 = "`balance` - Check your current balance.\n`buy` - Purchase something from the store.\n`crime` - Commit a naughty crime.\n`deposit` - Deposit money to the bank.\n`give` - Give an item to someone.\n`inventory` - View your current inventory.\n`itemcreate` - Create a store item.\n`itemdelete` - Delete a store item.\n`rob` - Rob another user.\n`shop` - View the shop and it's items.\n`transfer` - Send money to another user.\n`use` - Use an item from your inventory.\n`withdraw` - Take money out of the bank.\n`work` - Go to work and make money.";
        let page4 = "`pause` - Pause the current song.\n`play` - Play a new song.\n`queue` - View the queue of songs.\n`resume` - Resume the current song.\n`shuffle` - Shuffle the queue.\n`skip` - Skip to the next song.\n`stop` - Stop the current song.\n`volume` - Change the music's volume.\n`beefer` - Plays beefer.";
        let page5 = "`archive` - Archive a current ticket.\n`claim` - Claim a ticket.\n`close` - Close a ticket.\n`intro` - Intro inside of a ticket.\n`ticket` - Open a new ticket.\n`outro` - Outro out of a ticket.\n`panel` - Create a new ticket panel.\n`rename` - Rename a ticket.\n`unclaim` - Unclaim a ticket.\n`useradd` - Add a user to a ticket.\n`userremove` - Remove a user from a ticket.";
        let page6 = "`apply` - Apply for something.\n`report` - Create a bug report.\n`cancel` - Cancel an application.\n`server` - Get server info.\n`user` - Get user info.\n`review` - Create a review.\n`stickyadd` - Add a sticky message.\n`stickyremove` - Remove a sticky message.\n`suggest` - Create a suggestion.\n`support` - Send the support embed.";
        let page7 = "`embed` - Create an embededded message as the bot.\n`embedbuilder` - Run the embed message builder.\n`say` - Echo something as the bot.\n";
        let page8 = "`clientadd` - Add a client to the DB.\n`clientremove` - Remove a client from the DB.\n`gcreate` - Create a giveaway.\n`pay` - Send the pay embed(s).\n`restart` - Restart the bot client.\n`tos` - Ask a user to agree to your ToS.\n";
        let page9 = "`ban` - Ban a member from the server.\n`blacklistadd` - Add a blacklist.\n`blacklistremove` - Remove a blacklist.\n`case` - Check case information.\n`clients` - Check the list of clients.\n`delcase` - Remove a case from the DB.\n`dm` - Send a message to a user.\n`kick` - Kick a member from the server.\n`mute` - Mute a member in the server.\n`purge` - Clear message in a channel.\n`serverlock` - Activate the anti-raid system.\n`unban` - Unban a member in the server.\n`unbanall` - Unban all members in the server.\n`unmute` - Unmute a user in the server.\n`warn` - Warn a user in the server.";
        let page10 = "**Programming**\n[@Hyperz](https://hyperz.net) - *Physical Programming.*\n[@PlutoTheDev](https://plutothe.dev/) - *Ticket Transcripts B4 Rewrite.*\n[@FAXES](https://faxes.zone) - *Mental Support (FaxTherapy)*\n[@Beefer](https://github.com/BeeferDev) - *Mental Support.*\n\n**Helpful Sources**\n[GitHub](https://github.com/)\n[Stack Overflow](https://stackoverflow.com/)\n[DJS Docs](https://discord.js.org/)\n\n**Bug Testers**\n[@RagnaRok](https://godzcustoms.com/), [@SamTheMan](https://samtheman.shop/), [@Plzhelp69](https://www.youtube.com/channel/UC5P2Slz45-KqIwNLKYAWx5Q), [@Chr!s](https://github.com/GroddyCodes), [@Kuwu](https://kuwus-shack.tebex.io/category/1849092), [@Jordan2139](https://jordan2139.me/), [@MercGuyAnthony](https://brightant.xyz/s/discord), [@Killingit](https://www.twitch.tv/killingit102), [@Master Coomway](https://www.youtube.com/channel/UC5TcNg9rjOJz1YpkYinpuAA), [@JipyTheDev](https://github.com/joshua66553), [@Pax](https://paxgrapics.xyz/)";

        if (!interaction.isButton()) return;
        let message = interaction.message
        if(interaction.customId === 'archiveticket') {
            if(!client.config.tickets_module.usersManageTickets) {
                let per = client.config.permissions_module.support
                if(!interaction.member.roles.cache.some(h=>per.includes(h.id))) {
                    return interaction.reply({ content: `You cannot perform this action.`, ephemeral: true })
                }
            }
            interaction.reply({ content: `Ticket successfully archived! (Please wait)` })
            message.channel.messages.fetch({ limit: 100 }).then(async(collected) => {
                        var messages = {};
                        var members = ``;
                        collected.forEach(async(msg) => {
                            messages[msg.id] = {
                                author: { tag: msg.author.tag, id: msg.author.id },
                                content: msg.content || `Unknown`
                            };
                            try {
                                messages[msg.id].image = msg.attachments.array()[0].url;
                            } catch (e) {e => {if(client.config.debugmode) return console.log(e);}};
                            if (msg.embeds[0]) {
                                messages[msg.id].embeds = {
                                    title: msg.embeds[0].title,
                                    description: msg.embeds[0].description
                                };
                            };
                            if (!members.includes(msg.author.tag)) members += msg.author.tag + `\n`;
                        });
                        if (members == ``) members = `Unknown`;

                        var embed = new MessageEmbed()
                        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                        .setColor(`${client.config.logging_module.ticketTranscriptsColorHex || client.config.colorhex}`)
                        .setAuthor(`Ticket Closed`)
                        .addFields({
                            name: `Ticket ID`,
                            value: message.channel.name.replace(`ticket-`, ``),
                            inline: true
                        }, {
                            name: `Closing Member`,
                            value: `${message.author}`,
                            inline: true
                        }, {
                            name: `Members in Ticket`,
                            value: members,
                            inline: true
                        });

                        if (client.config.logging_module.ticketTranscripts) {
                            client.config.logging_module.ticketTranscriptsChannels.forEach(chan => {

                                const thechannel = client.channels.cache.get(chan)
                                if (!thechannel) {
                                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    thechannel.send({ embeds: [embed] }).catch(e => {
                                        console.log(e)
                                    });
                                }

                            });
                        }

                        if(client.config.tickets_module.archiveToHtmlFile) {
                            let messageCollection = new Collection();
                            let channelMessages = await message.channel.messages.fetch({ limit: 100 }).catch(err => console.log(`HTML Transcript Error: `, err));
                            messageCollection = messageCollection.concat(channelMessages);
                            let msgs = Array.from(messageCollection.values()).reverse()
                            fs.readFile('./src/utils/temp.html', 'utf8', async (err, wow) => {
                                if(err) {
                                    console.log(`HTML Transcript Error: `, err)
                                }
                                let data = wow.toString()
                                await fs.writeFile('./src/utils/ticket.html', data, (err) => {
                                    if(err) console.log(err)
                                });
                                let guildElement = document.createElement('div');
                                let guildText = document.createTextNode(message.guild.name);
                                let guildImg = document.createElement('img');
                                guildImg.setAttribute('src', message.guild.iconURL({ format: "png" }));
                                guildImg.setAttribute('width', '150');
                                guildElement.appendChild(guildImg);
                                guildElement.appendChild(guildText);
                                await fs.appendFile('./src/utils/ticket.html', guildElement.outerHTML, (err) => {
                                    if(err) {
                                        console.log(`HTML Transcript Error: `, err)
                                    }
                                })
                                msgs.forEach(async msg => {
                                    if(msg.embeds[0]) {
                                      msg.content = msg.embeds[0].description
                                    }
                                    let parentContainer = document.createElement("div");
                                    parentContainer.className = "parent-container";
                                    let avatarDiv = document.createElement("div");
                                    avatarDiv.className = "avatar-container";
                                    let img = document.createElement('img');
                                    img.setAttribute('src', msg.author.displayAvatarURL());
                                    img.className = "avatar";
                                    avatarDiv.appendChild(img);
                                    parentContainer.appendChild(avatarDiv);

                                    let messageContainer = document.createElement('div');
                                    messageContainer.className = "message-container";
                                    let nameElement = document.createElement("span");
                                    let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                                    nameElement.appendChild(name);
                                    messageContainer.append(nameElement);
                                    if(msg.content.startsWith("```")) {
                                        let m = msg.content.replace(/```/g, "");
                                        let codeNode = document.createElement("code");
                                        let textNode =  document.createTextNode(m);
                                        codeNode.appendChild(textNode);
                                        messageContainer.appendChild(codeNode);
                                    }
                                    else {
                                        let msgNode = document.createElement('span');
                                        let textNode = document.createTextNode(msg.content);
                                        msgNode.append(textNode);
                                        messageContainer.appendChild(msgNode);
                                    }
                                    parentContainer.appendChild(messageContainer);
                                    await fs.appendFile('./src/utils/ticket.html', parentContainer.outerHTML, (err) => {
                                        if(err) {
                                            console.log(err)
                                        }
                                    });
                                });
                                setTimeout(async () => {
                                    if (client.config.logging_module.ticketTranscripts) {
                                        client.config.logging_module.ticketTranscriptsChannels.forEach(chan => {

                                            const thechannel = client.channels.cache.get(chan)
                                            if (!thechannel) {
                                                console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                            } else {
                                                thechannel.send({ files: ['./src/utils/ticket.html'] }).catch(e => {
                                                    console.log(e)
                                                });
                                            }
            
                                        });
                                    }
                                }, 2000)
                            });
                        }

                        if(client.config.tickets_module.archiveToTxtFile) {
                                if (client.config.logging_module.ticketTranscripts) {
                                    var logger = ``;
        
                                    await Object.keys(messages).reverse().forEach(msg => {
                                        if (messages[msg].image == undefined) {
                                            if (messages[msg].embeds) {
                                                logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n• Embed: \n    TITLE: ${messages[msg].embeds.title}\n    DESCRIPTION: ${messages[msg].embeds.description}\n\n`;
                                            } else {
                                                logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n\n`;
                                            }
                                        } else {
                                            if (messages[msg].embeds) {
                                                logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n• Image: ${messages[msg].image}\n• Embed: \n    TITLE: ${messages[msg].embeds.title}\n    DESCRIPTION: ${messages[msg].embeds.description}\n\n`;
                                            } else {
                                                logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n• Image: ${messages[msg].image}\n\n`;
                                            }
                                        }
                                    })
                                    await fs.writeFileSync(`./src/utils/ticket.txt`, logger);
                                    const attach = new MessageAttachment(`./src/utils/ticket.txt`, `${message.channel.name}.txt`);
                                    client.config.logging_module.ticketTranscriptsChannels.forEach(chan => {
        
                                        const thechannel = client.channels.cache.get(chan)
                                        if (!thechannel) {
                                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                        } else {
                                            thechannel.send({ files: [attach] }).catch(e => {});
                                        }
        
                                    });
                                }
                        }
        
                            setTimeout(() => {
                                if(!message.channel || message.channel == undefined) return;
                                message.channel.delete().catch(e => {});
                            }, 8000);
            });
        } else if (interaction.customId === 'closeticket') {
            if(!client.config.tickets_module.usersManageTickets) {
                let per = client.config.permissions_module.support
                if(!interaction.member.roles.cache.some(h=>per.includes(h.id))) {
                    return interaction.reply({ content: `You cannot perform this action.`, ephemeral: true })
                }
            }
            interaction.reply({ content: `Ticket successfully closed! (Please wait)` })
            setTimeout(() => {
                if(!message.channel || message.channel == undefined) return;
                message.channel.delete();
            }, 8000);
        } else if (interaction.customId === 'createticket') {
            await con.query(`SELECT * FROM ticketpanels WHERE messageid='${message.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    try {
                        sheesh = row[0]
                        const guild = client.guilds.cache.get(client.config.your_guild_id)
        
                        var max = client.config.tickets_module.maxtickets
                        var bruh = 0
                            
                        await guild.channels.cache.forEach(c => {
                            if(c.name === `ticket-${interaction.user.username.toLowerCase()}`) {
                            bruh = bruh + 1
                            }
                        });
        
                        if(bruh >= max) return message.channel.send(`You may only have **${max} ticket(s)** open at a time.`).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch(e => {})
                            }, 5000)
                            bruh = 0
                        }).catch(e => {});
        
                        bruh = 0
        
                    } catch(e) {
                        console.log(e)
                    }
                
                    let everyoneRole = message.guild.roles.cache.find(role => role.name === "@everyone");
                    let permissionOverwriteArray = [{
                            id: interaction.user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                        },
                        {
                            id: everyoneRole.id,
                            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                        },
                        {
                            id: client.user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                        },
                    ]
                    client.config.permissions_module.support.forEach(role => {
                        let yeet = message.guild.roles.cache.get(role);
                        if (!yeet) {
                            console.log(`Role ID: ${role} is not in the server`)
                        } else {
                            let tempArray = {
                                id: role,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                            }
                            permissionOverwriteArray.push(tempArray);
                        }
                    });
                    let hello = await message.guild.channels.create(`ticket-${interaction.user.username}`, {
                        type: 'text'
                    }).catch(e => {
                        if (e) console.log(`I was not able to make a channel in  ${message.guild.id} || ${message.guild.name}`);
                    }).then(async chan => {
                        chan.setParent(sheesh.categoryid, {lockPermissions: false})
                        chan.permissionOverwrites.set(permissionOverwriteArray)
                        chan.setTopic(`Ticket for ${interaction.user.username}`)
                        let channel = chan
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
                            .setTitle(sheesh.title)
                            .setDescription(sheesh.openmessage)
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
                            });
                        }
                        interaction.reply({ content: `Your new ticket has been opened in <#${chan.id}>`, ephemeral: true }).then(msg => {
                        }).catch(e => {})
                    });
                }
            });
        } else if (interaction.customId === 'genter') {
            if(!client.config.giveaways_module.enabled) return;
            let amount;
            await con.query(`SELECT * FROM giveaways WHERE messageid='${message.id}' AND active='true'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    let uid = row[0].uniqueid
                    await con.query(`SELECT COUNT(*) as total FROM giveawayentrys WHERE gid='${uid}'`, async (err, row) => {
                        if(err) throw err;
                        amount = row[0].total
                    });
                    await con.query(`SELECT * FROM giveawayentrys WHERE userid='${interaction.user.id}' AND gid='${uid}'`, async (err, row) => {
                        if(err) throw err;
                        if(!row[0]) {
                            await con.query(`INSERT INTO giveawayentrys (userid, gid) VALUES ('${interaction.user.id}', '${uid}')`, async (err, row) => {
                                if(err) throw err;
                                interaction.reply({ content: `<@${interaction.user.id}> has entered the giveaway! We now have **${amount + 1}** entries!`, ephemeral: true }).then(msg => {
                                }).catch(e => {});
                            });
                        }
                    });
                }
            });
        } else if (interaction.customId === 'gend') {
            if(!client.config.giveaways_module.enabled) return;
                await con.query(`SELECT * FROM giveaways WHERE messageid='${message.id}' AND active='true'`, async (err, row) => {
                    if(err) throw err;
                    if(row[0]) {
                        if(interaction.user.id === row[0].starter) {
                            client.utils.giveawayPick(client, con, row[0].uniqueid)
                            interaction.reply({ content: `Ending giveaway, please wait!`, ephemeral: true }).then(msg => {
                            }).catch(e => {})
                        }
                    } else {
                        await con.query(`SELECT * FROM giveaways WHERE messageid='${message.id}' AND active='true'`, async (err, row) => {
                            if(err) throw err;
                            if(row[0]) {
                                if(interaction.user.id === row[0].starter) {
                                    interaction.reply({ content: `Something went wrong finding this giveaway in the database!`, ephemeral: true }).then(msg => {
                                    }).catch(e => {})
                                }
                            }
                        });
                    }
                });
        } else if (interaction.customId === 'greroll') {
            if(!client.config.giveaways_module.enabled) return;
            await con.query(`SELECT * FROM giveaways WHERE messageid='${message.id}' AND active='false'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    if(interaction.user.id === row[0].starter) {
                        let gid = row[0].uniqueid
                        interaction.reply({ content: `Re-Rolling, please wait!` }).then(msg => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 13000)
                        }).catch(e => {})
                        let entrys = [];
                        let winners = [];
                        let bruhmoment = [];
                        await con.query(`SELECT * FROM giveaways WHERE uniqueid='${gid}' AND active='false'`, async (err, row) => {
                            if(err) throw err;
                            if(row[0]) {
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
                                            setTimeout(async () => {
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
                                                        .setColor(client.config.giveaways_module.rerollGiveawayColor || client.config.colorhex)
                                                        .setTitle(client.config.giveaways_module.rerollHeaderText || `Giveaway Re-Rolled!`)
                                                        .setThumbnail(client.config.giveaways_module.rerollGiveawayThumbnailURL || chantosend.guild.iconURL({ dynamic: true }) || client.user.avatarURL({ dynamic: true }))
                                                        .setDescription(`**Information**\nPrize: ${bruh.prize}\nWinners: ${bruh.winners}\nTime Limit: ${bruh.timelimit}\n\n**Winners**\n${bruhmoment.join("\n")}`)
                                                        .setFooter(`Giveaway by: ${creator.tag}`)
                                                        await con.query(`UPDATE giveaways SET active='false' WHERE uniqueid='${bruh.uniqueid}'`, async (err, row) => {
                                                            if(err) throw err;
                                                        });
                                                        await chantosend.send({ embeds: [final] }).then(() => {
                                                            entrys = [];
                                                            winners = [];
                                                            bruhmoment = [];
                                                        }).catch(e => {
                                                            console.log(`\nGIVEAWAY ENDING ERROR: `, e.stack)
                                                        });
                                                    }, 4000)

                                                }, 6000)
                                            }, 5000)
                                        }
                                    });
                                }
                            }
                        });
                    }
                } else {
                    await con.query(`SELECT * FROM giveaways WHERE messageid='${message.id}' AND active='true'`, async (err, row) => {
                        if(err) throw err;
                        if(row[0]) {
                            if(interaction.user.id === row[0].starter) {
                                interaction.reply({ content: `You need to wait for the giveaway to finish in order to re-roll!`, ephemeral: true }).then(msg => {
                                }).catch(e => {})
                            }
                        }
                    });
                }
            });
        } else if (interaction.customId === 'helpPageLeft') {

            // CODE FOR GOING BACK PAGES

            if(message.embeds) {
                message.embeds.forEach(embed => {
                    if(embed.footer.text.includes('Page 1/10')) {
                        edited.fields = null;
                        edited.setDescription(page10);
                        edited.setFooter(`Page 10/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 2/10')) {
                        edited.setDescription(``);
                        edited.addFields(
                            { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
                            { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
                            { name: "About Server", value: `${client.config.aboutServer}`, inline: false, },
                            { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
                        )
                        edited.setFooter(`Page 1/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 3/10')) {
                        edited.fields = null;
                        edited.setDescription(page2);
                        edited.setFooter(`Page 2/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 4/10')) {
                        edited.fields = null;
                        edited.setDescription(page3);
                        edited.setFooter(`Page 3/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 5/10')) {
                        edited.fields = null;
                        edited.setDescription(page4);
                        edited.setFooter(`Page 4/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 6/10')) {
                        edited.fields = null;
                        edited.setDescription(page5);
                        edited.setFooter(`Page 5/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 7/10')) {
                        edited.fields = null;
                        edited.setDescription(page6);
                        edited.setFooter(`Page 6/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 8/10')) {
                        edited.fields = null;
                        edited.setDescription(page7);
                        edited.setFooter(`Page 7/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 9/10')) {
                        edited.fields = null;
                        edited.setDescription(page8);
                        edited.setFooter(`Page 8/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 10/10')) {
                        edited.fields = null;
                        edited.setDescription(page9);
                        edited.setFooter(`Page 9/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    }
                });
            }
        } else if (interaction.customId === 'helpPageRight') {

            // CODE FOR GOING FORWARD PAGES

            if(message.embeds) {
                message.embeds.forEach(embed => {
                    if(embed.footer.text.includes('Page 1/10')) {
                        edited.fields = null;
                        edited.setDescription(page2);
                        edited.setFooter(`Page 2/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 2/10')) {
                        edited.fields = null;
                        edited.setDescription(page3);
                        edited.setFooter(`Page 3/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 3/10')) {
                        edited.fields = null;
                        edited.setDescription(page4);
                        edited.setFooter(`Page 4/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 4/10')) {
                        edited.fields = null;
                        edited.setDescription(page5);
                        edited.setFooter(`Page 5/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 5/10')) {
                        edited.fields = null;
                        edited.setDescription(page6);
                        edited.setFooter(`Page 6/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 6/10')) {
                        edited.fields = null;
                        edited.setDescription(page7);
                        edited.setFooter(`Page 7/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 7/10')) {
                        edited.fields = null;
                        edited.setDescription(page8);
                        edited.setFooter(`Page 8/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 8/10')) {
                        edited.fields = null;
                        edited.setDescription(page9);
                        edited.setFooter(`Page 9/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 9/10')) {
                        edited.fields = null;
                        edited.setDescription(page10);
                        edited.setFooter(`Page 10/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 10/10')) {
                        edited.setDescription(``);
                        edited.addFields(
                            { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
                            { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
                            { name: "About Server", value: `${client.config.aboutServer}`, inline: false, },
                            { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
                        )
                        edited.setFooter(`Page 1/10`)
                        message.edit({ embeds: [edited], components: [row] }).catch(e => {})
                        interaction.deferUpdate();
                    }
                });
            }
        }
    } catch(e) {}

}

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
