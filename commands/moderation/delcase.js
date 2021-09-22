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

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    if(!args[0]) return message.channel.send({ content: `Please provide a case ID to remove.` }).catch(e => {});

                    try {

                    await con.query(`SELECT * FROM cases WHERE uniqueid='${args[0]}'`, async (err, row) => {
                        if(err) throw err;
                        if(!row[0]) return message.channel.send({ content: `That is not a valid case ID.` }).catch(e => {});

                        await con.query(`DELETE FROM cases WHERE uniqueid='${args[0]}'`, async (err, row) => {
                            if(err) throw err;
                            message.channel.send({ content: `I have removed that case from the database.` }).catch(e => {});
                        });

                    if(client.config.logging_module.punishments) {

                        client.config.logging_module.punishmentsChannels.forEach(async chan => {
                    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new MessageEmbed()
                                .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                                    .setAuthor(`Action Logs - Case Revoked`, client.user.displayAvatarURL())
                                    .addFields(
                                        {name: `Case ID:`, value: `${args[0]}`},
                                        {name: `Enforcer:`, value: `${message.author.tag}`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${client.config.copyright}`)
                                thechannel.send({ embeds: [logembed] }).catch(e => {})
                            }
                        
                        }); 
                
                    }
                
                });
                    
            } catch(e) {
                        
                if(client.config.debugmode) return console.log(e);
                    
            }
}

exports.info = {
    name: 'delcase',
    description: 'Unwarn a member.',
    aliases: ['caseremove', 'removecase', 'revokecase', 'deletecase', 'caserevoke', 'casedelete']
}