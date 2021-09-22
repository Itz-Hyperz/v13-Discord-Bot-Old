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

// Thanks Braxton
const { MessageEmbed, MessageAttachment, Collection } = require(`discord.js`);
const ms = require('ms')
const fs = require(`fs`);
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
exports.run = async (client, message, args, con) => {
    let array = [];
    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

    if(!client.config.tickets_module.usersManageTickets) {
        let check = await client.utils.permCheck(client, message, 'support')
        if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
    }
    if(!client.config.tickets_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

        if (!message.channel.name.includes(`ticket-`)) return message.channel.send({ content: `You can only run this command in a ticket channel!` }).catch(e => {})
            message.channel.send({ content: `Please confirm that you wish to archive this ticket.` }).then(balls => {
                balls.react('✅').then(() => balls.react('❌'));
                const johncena = async (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id && user.bot == false;
                };
                setTimeout(async() => {
                    balls.awaitReactions({ johncena, max: 1, time: 180000 }).then(async collected => {
                        const react23847 = collected.first();
                        if (react23847.emoji.name === '✅') {
                            message.channel.send({ content: `Ticket successfully archived! (Please wait)` })
        
                            var messages = {};
                            var members = ``;
                            message.channel.messages.fetch({ limit: 100, before: message.id }).then(async(collected) => {
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
                                                console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                            } else {
                                                thechannel.send({ files: [attach] }).catch(e => {
                                                    console.log(e)
                                                });
                                            }
            
                                        });
                                    }
                                }
                            });
        
                            setTimeout(() => {
                                message.channel.delete().catch(e => {console.log(e)});
                            }, 8000);
                        }
                        if (react23847.emoji.name === '❌') {
                            return message.channel.send({ content: `Cancelling ticket archive process.` }).catch(e => {})
                        }
                    })
                }, 2000)
            }).catch(e => {});
}

exports.info = {
    name: 'ticketarchive',
    description: 'A command.',
    aliases: ['transcript', 'archiveticket', 'archive']
}